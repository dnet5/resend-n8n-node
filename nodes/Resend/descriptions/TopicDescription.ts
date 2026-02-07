import type { INodeProperties } from 'n8n-workflow';

export const topicOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['topic'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a topic',
				action: 'Create a topic',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a topic',
				action: 'Delete a topic',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a topic',
				action: 'Get a topic',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many topics',
				action: 'Get many topics',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a topic',
				action: 'Update a topic',
			},
		],
		default: 'getMany',
	},
];

export const topicFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the topic (max 50 characters)',
		displayOptions: {
			show: {
				resource: ['topic'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Default Subscription',
		name: 'default_subscription',
		type: 'options',
		required: true,
		options: [
			{ name: 'Opt In', value: 'opt_in' },
			{ name: 'Opt Out', value: 'opt_out' },
		],
		default: 'opt_in',
		description: 'Default subscription behavior for contacts',
		displayOptions: {
			show: {
				resource: ['topic'],
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
				resource: ['topic'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Topic description (max 200 characters)',
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{ name: 'Public', value: 'public' },
					{ name: 'Private', value: 'private' },
				],
				default: 'public',
				description: 'Whether the topic is visible to contacts',
			},
		],
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Topic ID',
		name: 'topicId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the topic to retrieve',
		displayOptions: {
			show: {
				resource: ['topic'],
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
				resource: ['topic'],
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
				resource: ['topic'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Topic ID',
		name: 'topicId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the topic to update',
		displayOptions: {
			show: {
				resource: ['topic'],
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
				resource: ['topic'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Default Subscription',
				name: 'default_subscription',
				type: 'options',
				options: [
					{ name: 'Opt In', value: 'opt_in' },
					{ name: 'Opt Out', value: 'opt_out' },
				],
				default: 'opt_in',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{ name: 'Public', value: 'public' },
					{ name: 'Private', value: 'private' },
				],
				default: 'public',
			},
		],
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Topic ID',
		name: 'topicId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the topic to delete',
		displayOptions: {
			show: {
				resource: ['topic'],
				operation: ['delete'],
			},
		},
	},
];
