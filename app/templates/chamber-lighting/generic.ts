import { GetRequiredPinAliasesFn, RenderTemplateFn } from '@/templates/template-api';

// TODO: Use templateOptions to allow different pin configurations, brightness control, RGB etc.

export const getRequiredPinAliases: GetRequiredPinAliasesFn = (ctx) => {
	return ['chamber_lighting_pin'];
};

export const renderTemplate: RenderTemplateFn = (ctx) => {
	return `
# ${ctx.instance.title}
# ${ctx.instance.description}
[led chamber]
white_pin: ${ctx.getPrefixedPinFromAlias('chamber_lighting_pin')}
initial_WHITE: 0.5
`;
};
