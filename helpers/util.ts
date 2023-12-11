export const getScriptRoot = () => {
	// This is ... not great.. come up with something better
	return process.env.RATOS_SCRIPT_DIR ?? __dirname.split('configurator/')[0] + 'configurator/scripts/';
};
