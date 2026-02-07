import type { INodeProperties } from 'n8n-workflow';

export const emailOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['email'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a scheduled email',
				action: 'Cancel an email',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an email',
				action: 'Get an email',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve many emails',
				action: 'Get many emails',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send an email',
				action: 'Send an email',
			},
			{
				name: 'Send Batch',
				value: 'sendBatch',
				description: 'Send a batch of emails (up to 100)',
				action: 'Send a batch of emails',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a scheduled email',
				action: 'Update an email',
			},
		],
		default: 'send',
	},
];

export const emailFields: INodeProperties[] = [
	// ─── Send ────────────────────────────────────────────
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'you@example.com',
		description: 'Sender email address (must be a verified domain)',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'recipient@example.com',
		description: 'Recipient email address(es), comma-separated for multiple',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
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
				resource: ['email'],
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
				resource: ['email'],
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'Attachments',
				name: 'attachmentsUi',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Attachment',
				default: {},
				options: [
					{
						displayName: 'Attachment',
						name: 'attachmentValues',
						values: [
							{
								displayName: 'Filename',
								name: 'filename',
								type: 'string',
								default: '',
								description: 'Name of the attached file',
							},
							{
								displayName: 'Content (Base64)',
								name: 'content',
								type: 'string',
								default: '',
								description: 'Base64-encoded content of the file',
							},
							{
								displayName: 'Path (URL)',
								name: 'path',
								type: 'string',
								default: '',
								description: 'URL path to the file (alternative to content)',
							},
							{
								displayName: 'Content Type',
								name: 'content_type',
								type: 'string',
								default: '',
								placeholder: 'application/pdf',
								description: 'MIME type of the attachment',
							},
						],
					},
				],
			},
			{
				displayName: 'BCC',
				name: 'bcc',
				type: 'string',
				default: '',
				description: 'BCC recipient(s), comma-separated for multiple',
			},
			{
				displayName: 'CC',
				name: 'cc',
				type: 'string',
				default: '',
				description: 'CC recipient(s), comma-separated for multiple',
			},
			{
				displayName: 'Custom Headers',
				name: 'headersUi',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Header',
				default: {},
				options: [
					{
						displayName: 'Header',
						name: 'headerValues',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'HTML',
				name: 'html',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'HTML body of the email',
			},
			{
				displayName: 'Idempotency Key',
				name: 'idempotencyKey',
				type: 'string',
				default: '',
				description: 'Unique key to prevent duplicate sends (sent as Idempotency-Key header)',
			},
			{
				displayName: 'Reply To',
				name: 'reply_to',
				type: 'string',
				default: '',
				description: 'Reply-to address(es), comma-separated for multiple',
			},
			{
				displayName: 'Scheduled At',
				name: 'scheduled_at',
				type: 'string',
				default: '',
				placeholder: '2024-12-25T09:00:00Z',
				description: 'Schedule email for later delivery (ISO 8601 format)',
			},
			{
				displayName: 'Tags',
				name: 'tagsUi',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Tag',
				default: {},
				options: [
					{
						displayName: 'Tag',
						name: 'tagValues',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Template ID',
				name: 'template_id',
				type: 'string',
				default: '',
				description: 'ID of a template to use for the email body',
			},
			{
				displayName: 'Template Variables (JSON)',
				name: 'template_variables',
				type: 'json',
				default: '{}',
				description: 'JSON object of variables to substitute in the template',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Plain text body of the email',
			},
			{
				displayName: 'Topic ID',
				name: 'topic_id',
				type: 'string',
				default: '',
				description: 'ID of a topic to associate with this email',
			},
		],
	},

	// ─── Send Batch ──────────────────────────────────────
	{
		displayName: 'Emails (JSON)',
		name: 'emails',
		type: 'json',
		required: true,
		default: '[]',
		description: 'JSON array of email objects (max 100). Each object should have: from, to, subject, and optionally html, text, etc.',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['sendBatch'],
			},
		},
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotencyKey',
		type: 'string',
		default: '',
		description: 'Unique key to prevent duplicate batch sends',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['sendBatch'],
			},
		},
	},

	// ─── Get ─────────────────────────────────────────────
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the email to retrieve',
		displayOptions: {
			show: {
				resource: ['email'],
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
				resource: ['email'],
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
				resource: ['email'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},

	// ─── Update ──────────────────────────────────────────
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the scheduled email to update',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Scheduled At',
		name: 'scheduled_at',
		type: 'string',
		required: true,
		default: '',
		placeholder: '2024-12-25T09:00:00Z',
		description: 'New scheduled delivery time (ISO 8601 format)',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['update'],
			},
		},
	},

	// ─── Cancel ──────────────────────────────────────────
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the scheduled email to cancel',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['cancel'],
			},
		},
	},
];
