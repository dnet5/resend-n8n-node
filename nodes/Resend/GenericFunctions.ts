import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function resendApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | IDataObject[] = {},
	qs: IDataObject = {},
	headers: IDataObject = {},
): Promise<any> {
	const options: IHttpRequestOptions = {
		method,
		url: `https://api.resend.com${endpoint}`,
		qs,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		json: true,
	};

	if (method !== 'GET' && Object.keys(body).length > 0) {
		options.body = body;
	} else if (method !== 'GET' && Array.isArray(body) && body.length > 0) {
		options.body = body;
	}

	try {
		return await this.helpers.requestWithAuthentication.call(this, 'resendApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function resendApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: any[] = [];
	let responseData: any;

	do {
		responseData = await resendApiRequest.call(this, method, endpoint, body, qs);

		const items = responseData.data || [];
		returnData.push(...items);

		if (responseData.has_more && items.length > 0) {
			qs.after = items[items.length - 1].id;
		}
	} while (responseData.has_more);

	return returnData;
}
