# BiteSpeed Identity Reconciliation Service

A Node.js service that helps identify and link related contacts based on email and phone number information.

## Live Demo

API Endpoint: [https://bitspeed-jcgm.onrender.com/identify](https://bitspeed-jcgm.onrender.com/identify)

## Features

- Contact identification and linking
- Email and phone number validation
- Primary-secondary contact relationship management
- Automatic contact consolidation
- RESTful API design

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- TypeORM
- Docker (for containerization)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=bitespeed_db
NODE_ENV=development
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitespeed.git
cd bitespeed
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Documentation

### Identify Contact

**Endpoint:** `POST /identify`

**Request Body:**
```json
{
    "email": "user@example.com",
    "phoneNumber": "1234567890"
}
```

Note: At least one of `email` or `phoneNumber` must be provided.

**Response:**
```json
{
    "contact": {
        "primaryContatctId": 1,
        "emails": ["user@example.com"],
        "phoneNumbers": ["1234567890"],
        "secondaryContactIds": []
    }
}
```

## Testing the API

You can test the API using curl:

```bash
curl -X POST https://bitspeed-jcgm.onrender.com/identify \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "phoneNumber": "1234567890"}'
```

Or using tools like Postman:
1. Set the request method to POST
2. Enter the URL: https://bitspeed-jcgm.onrender.com/identify
3. Set Content-Type header to application/json
4. Add the request body in JSON format

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (invalid input)
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
