import type { INodeProperties } from 'n8n-workflow';

export const apiKeyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['apiKey'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an API key',
				action: 'Create an API key',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an API key',
				action: 'Delete an API key',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many API keys',
				action: 'Get many API keys',
			},
		],
		default: 'getMany',
	},
];

export const apiKeyFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the API key (max 50 characters)',
		displayOptions: {
			show: {
				resource: ['apiKey'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['apiKey'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				description: 'Restrict API key to a specific domain',
			},
			{
				displayName: 'Permission',
				name: 'permission',
				type: 'options',
				options: [
					{ name: 'Full Access', value: 'full_access' },
					{ name: 'Sending Access', value: 'sending_access' },
				],
				default: 'full_access',
				description: 'Permission level for the API key',
			},
		],
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
				resource: ['apiKey'],
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
				resource: ['apiKey'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'API Key ID',
		name: 'apiKeyId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the API key to delete',
		displayOptions: {
			show: {
				resource: ['apiKey'],
				operation: ['delete'],
			},
		},
	},
];
