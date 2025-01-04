# Proxmox Snippets API

A simple REST API server that allows you to upload and store Proxmox snippets that can be use with Proxmox VE for cicustom and user-data. This project provides an API endpoint to validate and store YAML snippets, which can be used with Proxmox VE.

## Why This Project?

Proxmox VE doesn't provide an official API to manage snippets. This project fills that gap by providing a simple API to upload and store snippets programmatically.

## Features

- YAML validation
- Secure API key authentication
- Automatic snippet folder creation
- MD5 hash-based file naming to prevent duplicates
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd proxmox-snippets-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
API_KEY=your_secret_api_key
SNIPPETS_FOLDER=snippets
PORT=3000
FILENAME_PREFIX=local:snippets/uploaded/
```

4. Build the project:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

For development, you can use:
```bash
npm run dev
```

## API Documentation

### Upload Snippet

**Endpoint:** `POST /api/snippet`

**Headers:**
- `Content-Type: application/json`
- `x-api-key: your_secret_api_key`

**Request Body:**
```json
{
  "snippet": "your_yaml_content_here",
  "vmId": "vm_identifier"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Snippet saved successfully",
  "data": {
    "fileName": "vm_identifier-md5hash.yaml",
    "prefixedFileName": "local:snippets/uploaded/vm_identifier-md5hash.yaml"
  }
}
```

**Error Responses:**

1. Invalid API Key (401):
```json
{
  "success": false,
  "message": "Invalid API key"
}
```

2. Invalid YAML (400):
```json
{
  "success": false,
  "message": "Invalid YAML content"
}
```

3. Missing Fields (400):
```json
{
  "success": false,
  "message": "Snippet is required and must be a string"
}
```

## Example Usage

Using curl:
```bash
curl -X POST http://localhost:3000/api/snippet \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secret_api_key" \
  -d '{
    "snippet": "key: value\nother: data",
    "vmId": "vm123"
  }'
```

Using Python with requests:
```python
import requests

url = "http://localhost:3000/api/snippet"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "your_secret_api_key"
}
data = {
    "snippet": "key: value\nother: data",
    "vmId": "vm123"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

## File Storage

Snippets are stored in the configured snippets folder with the following naming convention:
`{vmId}-{md5hash}.yaml`

The MD5 hash is generated from the snippet content, ensuring that identical snippets are not duplicated.

## Development

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm run watch` - Watch for changes and rebuild
- `npm start` - Start the production server

## Security Considerations

1. Always use a strong API key
2. Deploy behind a reverse proxy in production
3. Use HTTPS in production
4. Regularly backup your snippets folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.