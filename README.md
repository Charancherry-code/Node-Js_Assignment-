# School Management API

Node.js and Express.js APIs for adding schools to MySQL and listing them by proximity to a user location.

## Features

- `POST /addSchool` adds a school after validation
- `GET /listSchools?latitude=...&longitude=...` returns schools sorted by distance
- MySQL-backed persistence
- Haversine distance calculation

## Tech Stack

- Node.js
- Express.js
- MySQL
- express-validator

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   copy .env.example .env
   ```

3. Create the database and table:

   ```sql
   source db/schema.sql;
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT`
- `MYSQL_HOST`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`
- `MYSQL_PORT`

## API Endpoints

### Add School

- Method: `POST`
- Path: `/addSchool`
- Body:

```json
{
  "name": "Springfield High",
  "address": "742 Evergreen Terrace, Springfield",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### List Schools

- Method: `GET`
- Path: `/listSchools?latitude=12.9352&longitude=77.6245`

## Sample Responses

### Success: Add School

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Springfield High",
    "address": "742 Evergreen Terrace, Springfield",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
}
```

### Success: List Schools

```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Springfield High",
      "address": "742 Evergreen Terrace, Springfield",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "distanceKm": 3.212
    }
  ]
}
```

## Hosting

Deploy this service on Render, Railway, Fly.io, or any Node.js host that supports environment variables and a managed MySQL instance.

## Postman Collection

Import the collection from `postman/School Management API.postman_collection.json`.
