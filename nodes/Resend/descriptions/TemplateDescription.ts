import type { INodeProperties } from 'n8n-workflow';

export const templateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['template'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a template',
				action: 'Create a template',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a template',
				action: 'Delete a template',
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate a template',
				action: 'Duplicate a template',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a template',
				action: 'Get a template',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many templates',
				action: 'Get many templates',
			},
			{
				name: 'Publish',
				value: 'publish',
				description: 'Publish a template',
				action: 'Publish a template',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a template',
				action: 'Update a template',
			},
		],
		default: 'getMany',
	},
];

export const templateFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the template',
		displayOptions: {
			show: {
				resource: ['template'],
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
				resource: ['template'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Alias',
				name: 'alias',
				type: 'string',
				default: '',
				description: 'Alias for the template',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				description: 'Default sender email address',
			},
			{
				displayName: 'HTML',
				name: 'html',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				description: 'HTML body of the template',
			},
			{
				displayName: 'Reply To',
				name: 'reply_to',
				type: 'string',
				default: '',
				description: 'Default reply-to address',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Default subject line',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				description: 'Plain text body of the template',
			},
			{
				displayName: 'Variables (JSON)',
				name: 'variables',
				type: 'json',
				default: '[]',
				description: 'JSON array of variables: [{key, type, fallback_value}]',
			},
		],
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the template to retrieve',
		displayOptions: {
			show: {
				resource: ['template'],
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
				resource: ['template'],
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
				resource: ['template'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the template to update',
		displayOptions: {
			show: {
				resource: ['template'],
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
				resource: ['template'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Alias',
				name: 'alias',
				type: 'string',
				default: '',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
			},
			{
				displayName: 'HTML',
				name: 'html',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Reply To',
				name: 'reply_to',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
			},
			{
				displayName: 'Variables (JSON)',
				name: 'variables',
				type: 'json',
				default: '[]',
				description: 'JSON array of variables: [{key, type, fallback_value}]',
			},
		],
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the template to delete',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['delete'],
			},
		},
	},

	// ─── Publish ─────────────────────────────────────────
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the template to publish',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['publish'],
			},
		},
	},

	// ─── Duplicate ───────────────────────────────────────
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the template to duplicate',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['duplicate'],
			},
		},
	},
];
