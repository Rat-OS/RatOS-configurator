export interface GenericErrorResponse {
	result: 'error';
	data: {
		message: string;
	};
}
