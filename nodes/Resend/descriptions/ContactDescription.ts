import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a contact',
				action: 'Create a contact',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contact',
				action: 'Delete a contact',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a contact',
				action: 'Get a contact',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many contacts',
				action: 'Get many contacts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a contact',
				action: 'Update a contact',
			},
		],
		default: 'getMany',
	},
];

export const contactFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		description: 'Email address of the contact',
		displayOptions: {
			show: {
				resource: ['contact'],
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
				resource: ['contact'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Properties (JSON)',
				name: 'properties',
				type: 'json',
				default: '{}',
				description: 'Custom properties as a JSON object',
			},
			{
				displayName: 'Segment IDs',
				name: 'segments',
				type: 'string',
				default: '',
				description: 'Comma-separated list of segment IDs to add the contact to',
			},
			{
				displayName: 'Topics',
				name: 'topicsUi',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Topic',
				default: {},
				options: [
					{
						displayName: 'Topic',
						name: 'topicValues',
						values: [
							{
								displayName: 'Topic ID',
								name: 'id',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Subscription',
								name: 'subscription',
								type: 'options',
								options: [
									{ name: 'Subscribed', value: 'subscribed' },
									{ name: 'Unsubscribed', value: 'unsubscribed' },
								],
								default: 'subscribed',
							},
						],
					},
				],
			},
			{
				displayName: 'Unsubscribed',
				name: 'unsubscribed',
				type: 'boolean',
				default: false,
				description: 'Whether the contact is unsubscribed',
			},
		],
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Contact ID or Email',
		name: 'contactIdOrEmail',
		type: 'string',
		required: true,
		default: '',
		description: 'ID or email address of the contact',
		displayOptions: {
			show: {
				resource: ['contact'],
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
				resource: ['contact'],
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
				resource: ['contact'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Segment ID',
				name: 'segment_id',
				type: 'string',
				default: '',
				description: 'Filter contacts by segment ID',
			},
		],
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Contact ID or Email',
		name: 'contactIdOrEmail',
		type: 'string',
		required: true,
		default: '',
		description: 'ID or email address of the contact to update',
		displayOptions: {
			show: {
				resource: ['contact'],
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
				resource: ['contact'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Properties (JSON)',
				name: 'properties',
				type: 'json',
				default: '{}',
				description: 'Custom properties as a JSON object',
			},
			{
				displayName: 'Unsubscribed',
				name: 'unsubscribed',
				type: 'boolean',
				default: false,
				description: 'Whether the contact is unsubscribed',
			},
		],
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Contact ID or Email',
		name: 'contactIdOrEmail',
		type: 'string',
		required: true,
		default: '',
		description: 'ID or email address of the contact to delete',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['delete'],
			},
		},
	},
];
