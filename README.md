# n8n-nodes-resend

An [n8n](https://n8n.io/) community node for the [Resend](https://resend.com/) email API.

Resend is a modern email API for developers. This node provides full coverage of the Resend API with 10 resources and 50+ operations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-resend` and confirm

### Manual Installation

```bash
npm install n8n-nodes-resend
```

## Credentials

1. Create a [Resend account](https://resend.com/signup)
2. Go to **API Keys** in the Resend dashboard
3. Click **Create API Key**
4. In n8n, create a new **Resend API** credential and paste your key

## Resources & Operations

| Resource | Operations |
|----------|-----------|
| **Email** | Send, Send Batch, Get, Get Many, Update, Cancel |
| **Domain** | Create, Get, Get Many, Update, Delete, Verify |
| **API Key** | Create, Get Many, Delete |
| **Contact** | Create, Get, Get Many, Update, Delete |
| **Broadcast** | Create, Get, Get Many, Send, Update, Delete |
| **Segment** | Create, Get, Get Many, Update, Delete |
| **Topic** | Create, Get, Get Many, Update, Delete |
| **Template** | Create, Get, Get Many, Update, Delete, Publish, Duplicate |
| **Webhook** | Create, Get, Get Many, Update, Delete |
| **Contact Property** | Create, Get, Get Many, Update, Delete |

## Features

- **Full API coverage**: 10 resources, 53 operations
- **Pagination support**: Automatic cursor-based pagination with "Return All" toggle
- **Batch emails**: Send up to 100 emails in a single request
- **Idempotency**: Support for Idempotency-Key header on send operations
- **AI-ready**: `usableAsTool: true` for n8n AI agent workflows
- **Error handling**: `continueOnFail()` support for resilient workflows

## License

[MIT](LICENSE)
