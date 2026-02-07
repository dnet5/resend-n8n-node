import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import { resendApiRequest, resendApiRequestAllItems } from './GenericFunctions';
import {
	emailOperations,
	emailFields,
	domainOperations,
	domainFields,
	apiKeyOperations,
	apiKeyFields,
	contactOperations,
	contactFields,
	broadcastOperations,
	broadcastFields,
	segmentOperations,
	segmentFields,
	topicOperations,
	topicFields,
	templateOperations,
	templateFields,
	webhookOperations,
	webhookFields,
	contactPropertyOperations,
	contactPropertyFields,
} from './descriptions';

export class Resend implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Resend',
		name: 'resend',
		icon: 'file:resend.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Resend API',
		defaults: {
			name: 'Resend',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'resendApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'API Key', value: 'apiKey' },
					{ name: 'Broadcast', value: 'broadcast' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Contact Property', value: 'contactProperty' },
					{ name: 'Domain', value: 'domain' },
					{ name: 'Email', value: 'email' },
					{ name: 'Segment', value: 'segment' },
					{ name: 'Template', value: 'template' },
					{ name: 'Topic', value: 'topic' },
					{ name: 'Webhook', value: 'webhook' },
				],
				default: 'email',
			},
			...emailOperations,
			...emailFields,
			...domainOperations,
			...domainFields,
			...apiKeyOperations,
			...apiKeyFields,
			...contactOperations,
			...contactFields,
			...broadcastOperations,
			...broadcastFields,
			...segmentOperations,
			...segmentFields,
			...topicOperations,
			...topicFields,
			...templateOperations,
			...templateFields,
			...webhookOperations,
			...webhookFields,
			...contactPropertyOperations,
			...contactPropertyFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				// ──────────────────── EMAIL ────────────────────
				if (resource === 'email') {
					if (operation === 'send') {
						const body: IDataObject = {
							from: this.getNodeParameter('from', i) as string,
							to: (this.getNodeParameter('to', i) as string)
								.split(',')
								.map((e: string) => e.trim()),
							subject: this.getNodeParameter('subject', i) as string,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const headers: IDataObject = {};

						if (additionalFields.html) body.html = additionalFields.html;
						if (additionalFields.text) body.text = additionalFields.text;
						if (additionalFields.scheduled_at) body.scheduled_at = additionalFields.scheduled_at;
						if (additionalFields.template_id) body.template_id = additionalFields.template_id;
						if (additionalFields.topic_id) body.topic_id = additionalFields.topic_id;

						if (additionalFields.template_variables) {
							body.template_variables =
								typeof additionalFields.template_variables === 'string'
									? JSON.parse(additionalFields.template_variables)
									: additionalFields.template_variables;
						}

						if (additionalFields.cc) {
							body.cc = (additionalFields.cc as string)
								.split(',')
								.map((e: string) => e.trim());
						}
						if (additionalFields.bcc) {
							body.bcc = (additionalFields.bcc as string)
								.split(',')
								.map((e: string) => e.trim());
						}
						if (additionalFields.reply_to) {
							body.reply_to = (additionalFields.reply_to as string)
								.split(',')
								.map((e: string) => e.trim());
						}

						if (additionalFields.idempotencyKey) {
							headers['Idempotency-Key'] = additionalFields.idempotencyKey;
						}

						const headersUi = additionalFields.headersUi as IDataObject;
						if (headersUi?.headerValues) {
							const customHeaders: IDataObject = {};
							for (const header of headersUi.headerValues as IDataObject[]) {
								customHeaders[header.name as string] = header.value;
							}
							body.headers = customHeaders;
						}

						const tagsUi = additionalFields.tagsUi as IDataObject;
						if (tagsUi?.tagValues) {
							body.tags = tagsUi.tagValues;
						}

						const attachmentsUi = additionalFields.attachmentsUi as IDataObject;
						if (attachmentsUi?.attachmentValues) {
							body.attachments = attachmentsUi.attachmentValues;
						}

						responseData = await resendApiRequest.call(this, 'POST', '/emails', body, {}, headers);
					} else if (operation === 'sendBatch') {
						const emailsJson = this.getNodeParameter('emails', i) as string;
						const emails =
							typeof emailsJson === 'string' ? JSON.parse(emailsJson) : emailsJson;

						const headers: IDataObject = {};
						const idempotencyKey = this.getNodeParameter('idempotencyKey', i, '') as string;
						if (idempotencyKey) {
							headers['Idempotency-Key'] = idempotencyKey;
						}

						responseData = await resendApiRequest.call(
							this,
							'POST',
							'/emails/batch',
							emails,
							{},
							headers,
						);
					} else if (operation === 'get') {
						const emailId = this.getNodeParameter('emailId', i) as string;
						responseData = await resendApiRequest.call(this, 'GET', `/emails/${emailId}`);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/emails');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(this, 'GET', '/emails', {}, qs);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const emailId = this.getNodeParameter('emailId', i) as string;
						const body: IDataObject = {
							scheduled_at: this.getNodeParameter('scheduled_at', i) as string,
						};
						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/emails/${emailId}`,
							body,
						);
					} else if (operation === 'cancel') {
						const emailId = this.getNodeParameter('emailId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'POST',
							`/emails/${emailId}/cancel`,
						);
					}
				}

				// ──────────────────── DOMAIN ──────────────────
				else if (resource === 'domain') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await resendApiRequest.call(this, 'POST', '/domains', body);
					} else if (operation === 'get') {
						const domainId = this.getNodeParameter('domainId', i) as string;
						responseData = await resendApiRequest.call(this, 'GET', `/domains/${domainId}`);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/domains');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(this, 'GET', '/domains', {}, qs);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const domainId = this.getNodeParameter('domainId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/domains/${domainId}`,
							updateFields,
						);
					} else if (operation === 'delete') {
						const domainId = this.getNodeParameter('domainId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/domains/${domainId}`,
						);
					} else if (operation === 'verify') {
						const domainId = this.getNodeParameter('domainId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'POST',
							`/domains/${domainId}/verify`,
						);
					}
				}

				// ──────────────────── API KEY ─────────────────
				else if (resource === 'apiKey') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await resendApiRequest.call(this, 'POST', '/api-keys', body);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/api-keys');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/api-keys',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'delete') {
						const apiKeyId = this.getNodeParameter('apiKeyId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/api-keys/${apiKeyId}`,
						);
					}
				}

				// ──────────────────── CONTACT ─────────────────
				else if (resource === 'contact') {
					if (operation === 'create') {
						const body: IDataObject = {
							email: this.getNodeParameter('email', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						if (additionalFields.first_name) body.first_name = additionalFields.first_name;
						if (additionalFields.last_name) body.last_name = additionalFields.last_name;
						if (additionalFields.unsubscribed !== undefined)
							body.unsubscribed = additionalFields.unsubscribed;

						if (additionalFields.properties) {
							body.properties =
								typeof additionalFields.properties === 'string'
									? JSON.parse(additionalFields.properties)
									: additionalFields.properties;
						}

						if (additionalFields.segments) {
							body.segments = (additionalFields.segments as string)
								.split(',')
								.map((s: string) => s.trim());
						}

						const topicsUi = additionalFields.topicsUi as IDataObject;
						if (topicsUi?.topicValues) {
							body.topics = topicsUi.topicValues;
						}

						responseData = await resendApiRequest.call(this, 'POST', '/contacts', body);
					} else if (operation === 'get') {
						const contactIdOrEmail = this.getNodeParameter('contactIdOrEmail', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'GET',
							`/contacts/${contactIdOrEmail}`,
						);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};
						if (filters.segment_id) qs.segment_id = filters.segment_id;

						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(
								this,
								'GET',
								'/contacts',
								{},
								qs,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.limit = limit;
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/contacts',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const contactIdOrEmail = this.getNodeParameter('contactIdOrEmail', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};

						if (updateFields.first_name !== undefined) body.first_name = updateFields.first_name;
						if (updateFields.last_name !== undefined) body.last_name = updateFields.last_name;
						if (updateFields.unsubscribed !== undefined)
							body.unsubscribed = updateFields.unsubscribed;

						if (updateFields.properties) {
							body.properties =
								typeof updateFields.properties === 'string'
									? JSON.parse(updateFields.properties)
									: updateFields.properties;
						}

						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/contacts/${contactIdOrEmail}`,
							body,
						);
					} else if (operation === 'delete') {
						const contactIdOrEmail = this.getNodeParameter('contactIdOrEmail', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/contacts/${contactIdOrEmail}`,
						);
					}
				}

				// ──────────────────── BROADCAST ───────────────
				else if (resource === 'broadcast') {
					if (operation === 'create') {
						const body: IDataObject = {
							segment_id: this.getNodeParameter('segment_id', i) as string,
							from: this.getNodeParameter('from', i) as string,
							subject: this.getNodeParameter('subject', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						if (additionalFields.html) body.html = additionalFields.html;
						if (additionalFields.text) body.text = additionalFields.text;
						if (additionalFields.name) body.name = additionalFields.name;
						if (additionalFields.topic_id) body.topic_id = additionalFields.topic_id;
						if (additionalFields.reply_to) {
							body.reply_to = (additionalFields.reply_to as string)
								.split(',')
								.map((e: string) => e.trim());
						}

						responseData = await resendApiRequest.call(this, 'POST', '/broadcasts', body);
					} else if (operation === 'get') {
						const broadcastId = this.getNodeParameter('broadcastId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'GET',
							`/broadcasts/${broadcastId}`,
						);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/broadcasts');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/broadcasts',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'send') {
						const broadcastId = this.getNodeParameter('broadcastId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {};
						if (additionalFields.scheduled_at) body.scheduled_at = additionalFields.scheduled_at;

						responseData = await resendApiRequest.call(
							this,
							'POST',
							`/broadcasts/${broadcastId}/send`,
							body,
						);
					} else if (operation === 'update') {
						const broadcastId = this.getNodeParameter('broadcastId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ...updateFields };

						if (body.reply_to && typeof body.reply_to === 'string') {
							body.reply_to = (body.reply_to as string)
								.split(',')
								.map((e: string) => e.trim());
						}

						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/broadcasts/${broadcastId}`,
							body,
						);
					} else if (operation === 'delete') {
						const broadcastId = this.getNodeParameter('broadcastId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/broadcasts/${broadcastId}`,
						);
					}
				}

				// ──────────────────── SEGMENT ─────────────────
				else if (resource === 'segment') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						responseData = await resendApiRequest.call(this, 'POST', '/segments', body);
					} else if (operation === 'get') {
						const segmentId = this.getNodeParameter('segmentId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'GET',
							`/segments/${segmentId}`,
						);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/segments');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/segments',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const segmentId = this.getNodeParameter('segmentId', i) as string;
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/segments/${segmentId}`,
							body,
						);
					} else if (operation === 'delete') {
						const segmentId = this.getNodeParameter('segmentId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/segments/${segmentId}`,
						);
					}
				}

				// ──────────────────── TOPIC ───────────────────
				else if (resource === 'topic') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
							default_subscription: this.getNodeParameter(
								'default_subscription',
								i,
							) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await resendApiRequest.call(this, 'POST', '/topics', body);
					} else if (operation === 'get') {
						const topicId = this.getNodeParameter('topicId', i) as string;
						responseData = await resendApiRequest.call(this, 'GET', `/topics/${topicId}`);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/topics');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/topics',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const topicId = this.getNodeParameter('topicId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/topics/${topicId}`,
							updateFields,
						);
					} else if (operation === 'delete') {
						const topicId = this.getNodeParameter('topicId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/topics/${topicId}`,
						);
					}
				}

				// ──────────────────── TEMPLATE ────────────────
				else if (resource === 'template') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						if (additionalFields.html) body.html = additionalFields.html;
						if (additionalFields.subject) body.subject = additionalFields.subject;
						if (additionalFields.from) body.from = additionalFields.from;
						if (additionalFields.reply_to) body.reply_to = additionalFields.reply_to;
						if (additionalFields.text) body.text = additionalFields.text;
						if (additionalFields.alias) body.alias = additionalFields.alias;

						if (additionalFields.variables) {
							body.variables =
								typeof additionalFields.variables === 'string'
									? JSON.parse(additionalFields.variables)
									: additionalFields.variables;
						}

						responseData = await resendApiRequest.call(this, 'POST', '/templates', body);
					} else if (operation === 'get') {
						const templateId = this.getNodeParameter('templateId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'GET',
							`/templates/${templateId}`,
						);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/templates');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/templates',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const templateId = this.getNodeParameter('templateId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ...updateFields };

						if (body.variables && typeof body.variables === 'string') {
							body.variables = JSON.parse(body.variables);
						}

						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/templates/${templateId}`,
							body,
						);
					} else if (operation === 'delete') {
						const templateId = this.getNodeParameter('templateId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/templates/${templateId}`,
						);
					} else if (operation === 'publish') {
						const templateId = this.getNodeParameter('templateId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'POST',
							`/templates/${templateId}/publish`,
						);
					} else if (operation === 'duplicate') {
						const templateId = this.getNodeParameter('templateId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'POST',
							`/templates/${templateId}/duplicate`,
						);
					}
				}

				// ──────────────────── WEBHOOK ─────────────────
				else if (resource === 'webhook') {
					if (operation === 'create') {
						const body: IDataObject = {
							endpoint: this.getNodeParameter('endpoint', i) as string,
							events: this.getNodeParameter('events', i) as string[],
						};
						responseData = await resendApiRequest.call(this, 'POST', '/webhooks', body);
					} else if (operation === 'get') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'GET',
							`/webhooks/${webhookId}`,
						);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(this, 'GET', '/webhooks');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/webhooks',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/webhooks/${webhookId}`,
							updateFields,
						);
					} else if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/webhooks/${webhookId}`,
						);
					}
				}

				// ──────────────────── CONTACT PROPERTY ────────
				else if (resource === 'contactProperty') {
					if (operation === 'create') {
						const body: IDataObject = {
							key: this.getNodeParameter('key', i) as string,
							type: this.getNodeParameter('type', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.fallback_value)
							body.fallback_value = additionalFields.fallback_value;
						responseData = await resendApiRequest.call(
							this,
							'POST',
							'/contact-properties',
							body,
						);
					} else if (operation === 'get') {
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'GET',
							`/contact-properties/${propertyId}`,
						);
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await resendApiRequestAllItems.call(
								this,
								'GET',
								'/contact-properties',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { limit };
							const response = await resendApiRequest.call(
								this,
								'GET',
								'/contact-properties',
								{},
								qs,
							);
							responseData = response.data || response;
						}
					} else if (operation === 'update') {
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						const body: IDataObject = {
							fallback_value: this.getNodeParameter('fallback_value', i) as string,
						};
						responseData = await resendApiRequest.call(
							this,
							'PATCH',
							`/contact-properties/${propertyId}`,
							body,
						);
					} else if (operation === 'delete') {
						const propertyId = this.getNodeParameter('propertyId', i) as string;
						responseData = await resendApiRequest.call(
							this,
							'DELETE',
							`/contact-properties/${propertyId}`,
						);
					}
				}

				// ──── Normalize response ──────────────────────
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
