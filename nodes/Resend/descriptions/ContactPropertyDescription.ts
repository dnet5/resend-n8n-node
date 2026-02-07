import type { INodeProperties } from 'n8n-workflow';

export const contactPropertyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contactProperty'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a contact property',
				action: 'Create a contact property',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contact property',
				action: 'Delete a contact property',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a contact property',
				action: 'Get a contact property',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many contact properties',
				action: 'Get many contact properties',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a contact property',
				action: 'Update a contact property',
			},
		],
		default: 'getMany',
	},
];

export const contactPropertyFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		required: true,
		default: '',
		description: 'Property key (max 50 chars, alphanumeric + underscore)',
		displayOptions: {
			show: {
				resource: ['contactProperty'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		options: [
			{ name: 'String', value: 'string' },
			{ name: 'Number', value: 'number' },
		],
		default: 'string',
		description: 'Data type of the property',
		displayOptions: {
			show: {
				resource: ['contactProperty'],
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
				resource: ['contactProperty'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Fallback Value',
				name: 'fallback_value',
				type: 'string',
				default: '',
				description: 'Default value when the property is not set on a contact',
			},
		],
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Property ID',
		name: 'propertyId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the contact property to retrieve',
		displayOptions: {
			show: {
				resource: ['contactProperty'],
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
				resource: ['contactProperty'],
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
				resource: ['contactProperty'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Property ID',
		name: 'propertyId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the contact property to update',
		displayOptions: {
			show: {
				resource: ['contactProperty'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Fallback Value',
		name: 'fallback_value',
		type: 'string',
		required: true,
		default: '',
		description: 'New default value (key and type are immutable)',
		displayOptions: {
			show: {
				resource: ['contactProperty'],
				operation: ['update'],
			},
		},
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Property ID',
		name: 'propertyId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the contact property to delete',
		displayOptions: {
			show: {
				resource: ['contactProperty'],
				operation: ['delete'],
			},
		},
	},
];
