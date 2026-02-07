import type { INodeProperties } from 'n8n-workflow';

export const domainOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domain'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a domain',
				action: 'Create a domain',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a domain',
				action: 'Delete a domain',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a domain',
				action: 'Get a domain',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many domains',
				action: 'Get many domains',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a domain',
				action: 'Update a domain',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Verify a domain',
				action: 'Verify a domain',
			},
		],
		default: 'getMany',
	},
];

export const domainFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Domain Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'example.com',
		description: 'The domain name to add',
		displayOptions: {
			show: {
				resource: ['domain'],
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
				resource: ['domain'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Click Tracking',
				name: 'click_tracking',
				type: 'boolean',
				default: false,
				description: 'Whether to track link clicks',
			},
			{
				displayName: 'Custom Return Path',
				name: 'custom_return_path',
				type: 'string',
				default: '',
				description: 'Custom subdomain for the return path',
			},
			{
				displayName: 'Open Tracking',
				name: 'open_tracking',
				type: 'boolean',
				default: false,
				description: 'Whether to track email opens',
			},
			{
				displayName: 'Region',
				name: 'region',
				type: 'options',
				options: [
					{ name: 'US East 1', value: 'us-east-1' },
					{ name: 'EU West 1', value: 'eu-west-1' },
					{ name: 'SA East 1', value: 'sa-east-1' },
					{ name: 'AP Northeast 1', value: 'ap-northeast-1' },
				],
				default: 'us-east-1',
				description: 'Region where the domain is hosted',
			},
			{
				displayName: 'TLS',
				name: 'tls',
				type: 'options',
				options: [
					{ name: 'Opportunistic', value: 'opportunistic' },
					{ name: 'Enforced', value: 'enforced' },
				],
				default: 'opportunistic',
				description: 'TLS setting for the domain',
			},
		],
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the domain to retrieve',
		displayOptions: {
			show: {
				resource: ['domain'],
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
				resource: ['domain'],
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
				resource: ['domain'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the domain to update',
		displayOptions: {
			show: {
				resource: ['domain'],
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
				resource: ['domain'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Click Tracking',
				name: 'click_tracking',
				type: 'boolean',
				default: false,
				description: 'Whether to track link clicks',
			},
			{
				displayName: 'Custom Return Path',
				name: 'custom_return_path',
				type: 'string',
				default: '',
				description: 'Custom subdomain for the return path',
			},
			{
				displayName: 'Open Tracking',
				name: 'open_tracking',
				type: 'boolean',
				default: false,
				description: 'Whether to track email opens',
			},
			{
				displayName: 'TLS',
				name: 'tls',
				type: 'options',
				options: [
					{ name: 'Opportunistic', value: 'opportunistic' },
					{ name: 'Enforced', value: 'enforced' },
				],
				default: 'opportunistic',
				description: 'TLS setting for the domain',
			},
		],
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the domain to delete',
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['delete'],
			},
		},
	},

	// ─── Verify ──────────────────────────────────────────
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the domain to verify',
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['verify'],
			},
		},
	},
];
