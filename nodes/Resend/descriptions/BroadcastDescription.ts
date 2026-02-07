import type { INodeProperties } from 'n8n-workflow';

export const broadcastOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['broadcast'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a broadcast',
				action: 'Create a broadcast',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a broadcast',
				action: 'Delete a broadcast',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a broadcast',
				action: 'Get a broadcast',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many broadcasts',
				action: 'Get many broadcasts',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send a broadcast',
				action: 'Send a broadcast',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a broadcast',
				action: 'Update a broadcast',
			},
		],
		default: 'getMany',
	},
];

export const broadcastFields: INodeProperties[] = [
	// ─── Create ──────────────────────────────────────────
	{
		displayName: 'Segment ID',
		name: 'segment_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the segment to send the broadcast to',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'you@example.com',
		description: 'Sender email address',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		description: 'Email subject line',
		displayOptions: {
			show: {
				resource: ['broadcast'],
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
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'HTML',
				name: 'html',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				description: 'HTML body of the broadcast email',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Internal name for the broadcast',
			},
			{
				displayName: 'Reply To',
				name: 'reply_to',
				type: 'string',
				default: '',
				description: 'Reply-to address(es), comma-separated for multiple',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				description: 'Plain text body of the broadcast email',
			},
			{
				displayName: 'Topic ID',
				name: 'topic_id',
				type: 'string',
				default: '',
				description: 'ID of a topic to associate with this broadcast',
			},
		],
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the broadcast to retrieve',
		displayOptions: {
			show: {
				resource: ['broadcast'],
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
				resource: ['broadcast'],
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
				resource: ['broadcast'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Send ────────────────────────────────────────────
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the broadcast to send',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['send'],
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
				resource: ['broadcast'],
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'Scheduled At',
				name: 'scheduled_at',
				type: 'string',
				default: '',
				placeholder: '2024-12-25T09:00:00Z',
				description: 'Schedule broadcast for later (ISO 8601 format)',
			},
		],
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the broadcast to update',
		displayOptions: {
			show: {
				resource: ['broadcast'],
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
				resource: ['broadcast'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				description: 'Sender email address',
			},
			{
				displayName: 'HTML',
				name: 'html',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				description: 'HTML body of the broadcast email',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Internal name for the broadcast',
			},
			{
				displayName: 'Reply To',
				name: 'reply_to',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Segment ID',
				name: 'segment_id',
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
				displayName: 'Topic ID',
				name: 'topic_id',
				type: 'string',
				default: '',
			},
		],
	},

	// ─── Delete ──────────────────────────────────────────
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the broadcast to delete',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['delete'],
			},
		},
	},
];
