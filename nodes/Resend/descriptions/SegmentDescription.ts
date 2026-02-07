import type { INodeProperties } from 'n8n-workflow';

export const segmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['segment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a segment',
				action: 'Create a segment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a segment',
				action: 'Delete a segment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a segment',
				action: 'Get a segment',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many segments',
				action: 'Get many segments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a segment',
				action: 'Update a segment',
			},
		],
		default: 'getMany',
	},
];

export const segmentFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the segment',
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['create'],
			},
		},
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the segment to retrieve',
		displayOptions: {
			show: {
				resource: ['segment'],
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
				resource: ['segment'],
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
				resource: ['segment'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the segment to update',
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'New name for the segment',
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['update'],
			},
		},
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the segment to delete',
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['delete'],
			},
		},
	},
];
