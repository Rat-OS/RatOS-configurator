import { GetRequiredPinAliasesFn, RenderTemplateFn } from '@/templates/template-api';

// TODO: Use templateOptions to allow different pin configurations (2p/4p fans), etc.

export const getRequiredPinAliases: GetRequiredPinAliasesFn = (ctx) => {
	return ['chamber_filter_4p_fan_pin', 'chamber_filter_4p_fan_enable_pin'];
};

export const renderTemplate: RenderTemplateFn = (ctx) => {
	return `
# ${ctx.instance.title}
# ${ctx.instance.description}
[fan_generic filter]
pin: !${ctx.getPrefixedPinFromAlias('chamber_filter_4p_fan_pin')}
enable_pin: ${ctx.getPrefixedPinFromAlias('chamber_filter_4p_fan_enable_pin')}
`;
};
