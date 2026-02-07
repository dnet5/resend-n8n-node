import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a webhook',
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook',
				action: 'Delete a webhook',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a webhook',
				action: 'Get a webhook',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many webhooks',
				action: 'Get many webhooks',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a webhook',
				action: 'Update a webhook',
			},
		],
		default: 'getMany',
	},
];

const webhookEventOptions = [
	{ name: 'Contact Created', value: 'contact.created' },
	{ name: 'Contact Deleted', value: 'contact.deleted' },
	{ name: 'Contact Updated', value: 'contact.updated' },
	{ name: 'Domain Created', value: 'domain.created' },
	{ name: 'Domain Deleted', value: 'domain.deleted' },
	{ name: 'Domain Updated', value: 'domain.updated' },
	{ name: 'Email Bounced', value: 'email.bounced' },
	{ name: 'Email Clicked', value: 'email.clicked' },
	{ name: 'Email Complained', value: 'email.complained' },
	{ name: 'Email Delivered', value: 'email.delivered' },
	{ name: 'Email Delivery Delayed', value: 'email.delivery_delayed' },
	{ name: 'Email Failed', value: 'email.failed' },
	{ name: 'Email Opened', value: 'email.opened' },
	{ name: 'Email Received', value: 'email.received' },
	{ name: 'Email Sent', value: 'email.sent' },
];

export const webhookFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Endpoint URL',
		name: 'endpoint',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'https://example.com/webhook',
		description: 'URL that will receive webhook events',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Events',
		name: 'events',
		type: 'multiOptions',
		required: true,
		options: webhookEventOptions,
		default: [],
		description: 'Events to subscribe to',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the webhook to retrieve',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['get'],
			},
		},
	},

	// ─── Get Many ────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getMany'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 20,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the webhook to update',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the webhook is enabled',
			},
			{
				displayName: 'Endpoint URL',
				name: 'endpoint',
				type: 'string',
				default: '',
				description: 'New URL for the webhook',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: webhookEventOptions,
				default: [],
				description: 'Events to subscribe to',
			},
		],
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the webhook to delete',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['delete'],
			},
		},
	},
];
