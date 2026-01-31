import { KlipperConfigExtrasGenerator, KlipperConfigUtils } from '@/server/helpers/klipper-config';
import { getLogger } from '@/server/helpers/logger';
import { getJsonMetaDirectoryName, parseBoardPinConfig } from '@/server/helpers/metadata';
import { parseJsonMetaDirectory } from '@/server/routers/printer';
import { getErrorMessage } from '@/utils/exception-handling';
import { PinMap } from '@/zods/boards';
import { HARDWARE_REGISTRY, HardwareInstanceType, UnconnectedHardwareInstanceType } from '@/zods/hardware';
import type { PartialPrinterConfiguration } from '@/zods/printer-configuration';
import { HardwareInstance } from '@/zods/template-api';
import { PartialToolheadConfiguration, ToolNumber } from '@/zods/toolhead';
import { z } from 'zod';

/*
 * Here we define the new server-only template API.
 * The API is currently used only by filament sensor templates,
 * but the intention is to expand it to other template types in the future.
 *
 * Notably, printer templates, which inspired the template pattern used with
 * filament sensors, are not currently using this API.
 */

// The renderTemplate context object could be extended in the future if needed, eg with
// KlipperConfigUtils, KlipperConfigExtrasGenerator, KlipperConfigHelper

// Note: The current GetRequiredPinAliasesFn and GetRequiredPinAliasesContext concept is adequate
// for the hardware types currently using the Template API, but may need to be revisited
// if more varied hardware types are added that require additional context for pin alias resolution,
// or where building the list of valid options can't be done purely by filtering based on a list
// of pin aliases. Note also the existing general restirction (not Template API-specific) that
// only T0 can be used without a toolboard, and bear that in mind when contemplating future extensions.

export const GetRequiredPinAliasesContext = z.object({
	templateOptions: z.record(z.unknown()),
});

export type GetRequiredPinAliasesContext = z.infer<typeof GetRequiredPinAliasesContext>;

const GetPrefixedPinFromAliasFn = z
	.function()
	.describe(
		'Function that maps a pin alias (from PinMap) to an actual pin name, with a toolboard prefix ' +
			'when applicable, depending on the where the current hardware instance is connected.',
	)
	.args(PinMap.keyof())
	.returns(z.string());

type GetPrefixedPinFromAliasFn = z.infer<typeof GetPrefixedPinFromAliasFn>;

export const RenderTemplateContext = z.object({
	instance: HardwareInstance,
	section: z
		.string()
		.describe(
			'Identifies a particular section of configuration to be rendered, if applicable. Most templates will ignore this. Currently, ' +
				'the "section" concept is used in a couple of arguably over-coupled cases, ' +
				'but the intention is to make it more general in the future, once the dust has settled and ' +
				'use cases have emerged.',
		)
		.optional(),
	templateOptions: z.record(z.unknown()),
	getPrefixedPinFromAlias: GetPrefixedPinFromAliasFn,
	utils: z.custom<KlipperConfigUtils>(),
	extrasGenerator: z.custom<KlipperConfigExtrasGenerator>(),
});

export type RenderTemplateContext = z.infer<typeof RenderTemplateContext>;

export const RenderTemplateFn = z
	.function()
	.args(
		/* ctx */
		RenderTemplateContext,
	)
	.returns(z.union([z.string(), z.promise(z.string())]));

export type RenderTemplateFn = z.infer<typeof RenderTemplateFn>;

export const RenderToolheadTemplateContext = RenderTemplateContext.extend({
	toolNumber: ToolNumber,
});

export type RenderToolheadTemplateContext = z.infer<typeof RenderToolheadTemplateContext>;

export const RenderToolheadTemplateFn = z
	.function()
	.args(
		/* ctx */
		RenderToolheadTemplateContext,
	)
	.returns(z.union([z.string(), z.promise(z.string())]));

export type RenderToolheadTemplateFn = z.infer<typeof RenderToolheadTemplateFn>;

export const GetRequiredPinAliasesFn = z
	.function()
	.args(
		/* ctx */
		GetRequiredPinAliasesContext,
	)
	.returns(PinMap.keyof().array());

export type GetRequiredPinAliasesFn = z.infer<typeof GetRequiredPinAliasesFn>;

export const TemplateModule = z
	.object({
		getRequiredPinAliases: GetRequiredPinAliasesFn,
		renderTemplate: RenderTemplateFn.optional(),
		renderToolheadTemplate: RenderToolheadTemplateFn.optional(),
	})
	.superRefine((obj, ctx) => {
		if (!obj.renderTemplate && !obj.renderToolheadTemplate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'At least one of renderTemplate or renderToolheadTemplate must be defined',
			});
		}
	});

export type TemplateModule = z.infer<typeof TemplateModule>;

export async function renderTemplateAsync(
	instance: HardwareInstance | null | undefined,
	ctx: Omit<RenderTemplateContext, 'templateOptions' | 'instance' | 'getPrefixedPinFromAlias'>,
	toolNumber?: ToolNumber,
): Promise<string | null> {
	if (instance == null) {
		return null;
	}
	const directoryName = getJsonMetaDirectoryName(instance);
	let templateModule: TemplateModule;
	try {
		// NOTE: The import argument must be a template literal for webpack to parse it correctly
		/* webpackInclude: /\.ts$/ */
		templateModule = TemplateModule.parse(await import(`./${directoryName}/${instance.template}`));
	} catch (error) {
		getLogger().error(
			`Failed to load template module for ${instance.id} from ${directoryName}/${instance.template}:`,
			error,
		);
		throw new Error(
			`Failed to load template module for ${instance.id} from ${directoryName}/${instance.template}: ${getErrorMessage(error)}`,
			{ cause: error },
		);
	}

	if (toolNumber != null && !templateModule.renderToolheadTemplate) {
		getLogger().error(
			`Template module for ${instance.id} from ${directoryName}/${instance.template} does not export renderToolheadTemplate`,
		);
		throw new Error(
			`Template module for ${instance.id} from ${directoryName}/${instance.template} does not export renderToolheadTemplate`,
		);
	}

	if (toolNumber == null) {
		if (!templateModule.renderTemplate) {
			getLogger().error(
				`Template module for ${instance.id} from ${directoryName}/${instance.template} does not export renderTemplate`,
			);
			throw new Error(
				`Template module for ${instance.id} from ${directoryName}/${instance.template} does not export renderTemplate`,
			);
		}
		if (instance.connectedTo === 'toolboard') {
			getLogger().error(
				`Template module for ${instance.id} from ${directoryName}/${instance.template} is connected to a toolboard but no tool number was provided`,
			);
			throw new Error(
				`Template module for ${instance.id} from ${directoryName}/${instance.template} is connected to a toolboard but no tool number was provided`,
			);
		}
	}

	const getPrefixedPinFromAlias: GetPrefixedPinFromAliasFn =
		toolNumber == null
			? (alias) => {
					const pin = ctx.utils.getControlboardPins()?.[alias];
					if (!pin) {
						throw new Error(
							`No pin found for alias "${alias}" while rendering template for ${instance.type} ${instance.id} connected to ${instance.connectedTo}`,
						);
					}
					return pin;
				}
			: (alias) => {
					let pin: string | undefined;
					if (instance.connectedTo === 'controlboard') {
						pin = ctx.utils.getControlboardPins()?.[alias];
					} else {
						const th = ctx.utils.getToolhead(toolNumber);
						pin = th.getToolboardPins()[alias];
						if (pin) {
							pin = `${th.getToolboardName()}:${pin}`;
						}
					}
					if (!pin) {
						throw new Error(
							`No pin found for alias "${alias}" while rendering template for T${toolNumber} ${instance.type} ${instance.id} connected to ${instance.connectedTo}`,
						);
					}
					return pin;
				};

	try {
		return (
			await Promise.resolve(
				toolNumber == null
					? templateModule.renderTemplate!({
							...ctx,
							instance,
							getPrefixedPinFromAlias,
							templateOptions: instance.templateOptions ?? {},
						})
					: templateModule.renderToolheadTemplate!({
							...ctx,
							instance,
							toolNumber,
							getPrefixedPinFromAlias,
							templateOptions: instance.templateOptions ?? {},
						}),
			)
		).trim();
	} catch (error) {
		getLogger().error(
			`Failed to render template for ${instance.id} from ${directoryName}/${instance.template}:`,
			error,
		);
		throw new Error(
			`Failed to render template for ${instance.id} from ${directoryName}/${instance.template}: ${getErrorMessage(error)}`,
			{ cause: error },
		);
	}
}

/**
 * Return compatible hardware instances considering the controlboard and/or toolhead configuration.
 *
 * @param config A partial printer configuration or null. Only a subset is used:
 *               - `controlboard` — the selected control board (used to resolve pins)
 *               - `toolheads` — an array of toolheads (used when toolNumber is supplied)
 *
 * @param toolNumber Optional toolhead index to select the toolhead from the printer config.
 *                   If not provided, toolheadConfig must be provided.
 *
 * @param toolheadConfig Optional partial toolhead configuration to use directly. Only a subset is used:
 * 					- `toolboard` — the selected toolboard (used to resolve pins)
 * 					- `toolNumber` — the tool number (used for badge purposes), can also be provided via toolNumber param.
 *					Note:
 *                    You must provide either toolNumber or toolheadConfig to identify the toolhead.
 *                    You must also provide { controlboard } in config if you want to consider controlboard pins.
 *
 * Typical callers:
 *  - Pass a printer config and tool number; or
 *  - Pass a printer config and toolheadConfig; or
 *  - Pass a minimal { controlboard } config and toolheadConfig.
 */
export async function getCompatibleHardwareInstancesAsync<K extends keyof typeof HARDWARE_REGISTRY>(
	type: K,
	config?: PartialPrinterConfiguration | null,
	toolNumber?: number | null,
	toolheadConfig?: PartialToolheadConfiguration | null,
): Promise<HardwareInstanceType<K>[]> {
	if (toolNumber != null && toolheadConfig?.toolNumber != null && toolheadConfig.toolNumber !== toolNumber) {
		throw new Error('toolNumber and toolheadConfig.toolNumber do not match.');
	}
	toolNumber ??= toolheadConfig?.toolNumber;
	if (
		toolheadConfig == null &&
		toolNumber != null &&
		config?.toolheads != null &&
		config.toolheads.length > toolNumber
	) {
		toolheadConfig = config.toolheads[toolNumber];
	}
	const toolboard = toolheadConfig?.toolboard;
	const controlboard = config?.controlboard;
	const hasToolboard = toolboard != null;
	const hasControlboard = controlboard != null;

	if (!hasToolboard && !hasControlboard) {
		return [];
	}

	const toolboardPins = hasToolboard ? await parseBoardPinConfig(toolboard) : null;

	// TODO: For now, don't allow T1 components to connect to the controlboard. This is a big hammer to stop
	// users using the same controlboard pins for two sensors, one associated with each toolhead. There are
	// valid use cases: for example, IDEX with two chassis-mounted filament sensors both connected to the controlboard.
	// However, right now we don't have the logic to support this safely, so we block it for now. A user could
	// of course add custom config for the T1 control-board connected hardware.
	const controlboardPins = toolNumber !== 1 && hasControlboard ? await parseBoardPinConfig(controlboard!) : null;

	const directoryName = getJsonMetaDirectoryName(type);
	const allUnconnectedInstances: UnconnectedHardwareInstanceType<K>[] = await parseJsonMetaDirectory(directoryName);
	const compatibleConnectedInstances: HardwareInstanceType<K>[] = [];

	for (const item of allUnconnectedInstances) {
		// NOTE: The import argument must be a template literal for webpack to parse it correctly
		/* webpackInclude: /\.ts$/ */
		const templateModule = TemplateModule.parse(await import(`../templates/${directoryName}/${item.template}`));
		const requiredPins = templateModule.getRequiredPinAliases({ templateOptions: item.templateOptions ?? {} });

		if (controlboardPins && requiredPins.every((pin) => controlboardPins[pin] != null)) {
			const instance = {
				...item,
				connectedTo: 'controlboard',
				badge: [
					{
						color: 'purple',
						children: controlboard!.name,
					},
				],
			} satisfies HardwareInstance;
			compatibleConnectedInstances.push(instance);
		}

		if (toolboardPins && requiredPins.every((pin) => toolboardPins[pin] != null)) {
			const instance = {
				...item,
				connectedTo: 'toolboard',
				badge: [
					{
						color: 'sky',
						children: `${toolboard!.name} T${toolNumber}`,
					},
				],
			} satisfies HardwareInstance;
			compatibleConnectedInstances.push(instance);
		}
	}

	return compatibleConnectedInstances;
}
