# PeerPing API Contract

This document provides a comprehensive overview of the PeerPing API, auto-generated from the OpenAPI specification.

## Overview

- **Base URL**: `https://api.peerping.com/v1` (production) / `https://api.peerping.dev/v1` (development)
- **Authentication**: Bearer token (JWT)
- **Content Type**: `application/json`
- **Error Format**: RFC7807 Problem Details

## API Conventions

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_jwt>
```

### Pagination
Cursor-based pagination with query parameters:
- `limit`: Number of items per page (default: 20, max: 100)
- `cursor`: Opaque cursor for next page

Response format:
```json
{
  "items": [...],
  "nextCursor": "opaque_cursor_string"
}
```

### Error Responses
Errors follow RFC7807 Problem Details format:
```json
{
  "type": "https://api.peerping.com/errors/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "The email field is invalid",
  "code": "INVALID_EMAIL"
}
```

### Idempotency
For POST operations that create resources, include an `Idempotency-Key` header:
```
Idempotency-Key: unique-client-generated-key
```

### Rate Limiting
Rate-limited endpoints return 429 with `Retry-After` header:
```
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "displayName": "John Doe",
  "role": "BOTH",
  "city": "London",
  "bio": "Passionate about languages",
  "agreedToTerms": true
}
```

**Response:** `201 Created`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 1800
}
```

#### POST /auth/login
Login with username/email and password.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:** `200 OK` (same as register)

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:** `200 OK` (new token pair)

#### POST /auth/logout
Logout and revoke refresh token.

**Response:** `204 No Content`

### Profile Management

#### GET /users/me
Get current user's complete profile.

**Response:** `200 OK`
```json
{
  "id": "0193e3dc-0000-7000-8000-000000000001",
  "username": "johndoe",
  "email": "john@example.com",
  "displayName": "John Doe",
  "avatarUrl": "https://cdn.peerping.com/users/123/avatars/456.jpg",
  "bio": "Passionate about languages and cooking",
  "role": "BOTH",
  "city": "London",
  "friendsCount": 42,
  "createdAt": "2024-01-15T10:30:00Z",
  "lastActiveAt": "2024-01-20T14:45:00Z",
  "tags": [
    {
      "id": "tag-uuid",
      "name": "Spanish",
      "intent": "LEARN"
    }
  ],
  "languages": ["en", "es"],
  "availability": ["EVE", "WKNDS"]
}
```

#### PATCH /users/me
Update profile fields.

**Request Body:**
```json
{
  "displayName": "John Smith",
  "bio": "Updated bio",
  "city": "Manchester"
}
```

#### PUT /users/me/tags
Replace user's tags (max 3).

**Request Body:**
```json
{
  "tags": [
    {
      "tagId": "tag-uuid",
      "intent": "LEARN"
    }
  ]
}
```

#### PUT /users/me/languages
Replace user's languages (max 5).

**Request Body:**
```json
{
  "languages": ["en", "es", "fr"]
}
```

#### PUT /users/me/availability
Replace user's availability.

**Request Body:**
```json
{
  "availability": ["MORN", "EVE", "WKNDS"]
}
```

Options: `MORN`, `EVE`, `WKNDS`, `WKNT`

#### POST /users/me/avatar/upload-url
Get presigned URL for avatar upload.

**Response:** `200 OK`
```json
{
  "uploadUrl": "https://s3.amazonaws.com/...",
  "fileKey": "users/123/avatars/456.jpg",
  "expiresAt": "2024-01-15T11:30:00Z"
}
```

### Discovery & Search

#### GET /discover
Get personalized discover feed (same city).

**Query Parameters:**
- `city` (optional): Override user's city
- `limit`: Items per page
- `cursor`: Pagination cursor

**Response:** `200 OK`
```json
{
  "items": [
    {
      "id": "user-uuid",
      "displayName": "Jane Smith",
      "avatarUrl": "https://cdn.peerping.com/...",
      "bio": "Love teaching cooking",
      "role": "TEACHER",
      "city": "London",
      "friendsCount": 15,
      "tags": [...],
      "languages": ["en"],
      "availability": ["EVE"],
      "isSaved": false,
      "isConnected": false
    }
  ],
  "nextCursor": "cursor_string"
}
```

#### GET /search
Search users with filters.

**Query Parameters:**
- `q`: Search query (name or tag)
- `city`: Filter by city
- `role`: Filter by role (LEARNER/TEACHER/BOTH)
- `lang`: Filter by language code
- `availability`: Filter by availability slot
- `limit`, `cursor`: Pagination

**Response:** Same format as discover

#### GET /tags
Get all available tags.

**Response:** `200 OK`
```json
[
  {
    "id": "tag-uuid",
    "name": "Spanish",
    "category": "language"
  }
]
```

### Social Features

#### POST /save/{userId}
Save a user profile.

**Response:** `201 Created`

#### DELETE /save/{userId}
Unsave a user profile.

**Response:** `204 No Content`

#### POST /block/{userId}
Block a user.

**Response:** `201 Created`

#### POST /report
Report a user (with Idempotency-Key).

**Request Body:**
```json
{
  "reportedUserId": "user-uuid",
  "reason": "SPAM",
  "detail": "Sending promotional messages"
}
```

Reasons: `SPAM`, `HARASSMENT`, `INAPPROPRIATE`, `FAKE_PROFILE`, `OTHER`

### Connections (Friend Requests)

#### POST /connections
Send friend request (with Idempotency-Key).

**Request Body:**
```json
{
  "recipientId": "user-uuid"
}
```

**Response:** `201 Created`
```json
{
  "id": "connection-uuid",
  "requester": {...},
  "recipient": {...},
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Rate Limit:** 10 requests per day

#### GET /connections
Get connections list.

**Query Parameters:**
- `status`: Filter by status (pending/accepted)
- `limit`, `cursor`: Pagination

#### PATCH /connections/{id}
Update connection status.

**Request Body:**
```json
{
  "action": "accept"
}
```

Actions: `accept`, `decline`, `cancel`

### Messaging

#### GET /conversations
Get conversation list.

**Response:** `200 OK`
```json
{
  "items": [
    {
      "id": "conversation-uuid",
      "otherUser": {...},
      "lastMessageAt": "2024-01-15T10:30:00Z",
      "lastMessage": {
        "id": "message-uuid",
        "body": "Hey there!",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    }
  ],
  "nextCursor": "cursor_string"
}
```

#### GET /conversations/{id}/messages
Get messages in conversation.

**Query Parameters:**
- `limit`, `cursor`: Pagination

#### POST /conversations/{id}/messages
Send message (with Idempotency-Key).

**Request Body:**
```json
{
  "body": "Hello! Would love to practice Spanish with you."
}
```

**Max Length:** 1000 characters

### Privacy (GDPR)

#### POST /privacy/export
Request data export.

**Response:** `202 Accepted`
```json
{
  "jobId": "job-uuid",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### GET /privacy/jobs/{jobId}
Check export job status.

**Response:** `200 OK`
```json
{
  "jobId": "job-uuid",
  "status": "COMPLETED",
  "createdAt": "2024-01-15T10:30:00Z",
  "completedAt": "2024-01-15T10:35:00Z",
  "resultUrl": "https://s3.amazonaws.com/..."
}
```

#### DELETE /users/me
Delete account (GDPR).

**Response:** `202 Accepted`

## Data Types

### User Roles
- `LEARNER`: Looking to learn skills
- `TEACHER`: Offering to teach skills
- `BOTH`: Can do both

### Availability Slots
- `MORN`: Mornings
- `EVE`: Evenings
- `WKNDS`: Weekends
- `WKNT`: Weeknights

### Connection Status
- `PENDING`: Awaiting response
- `ACCEPTED`: Connection established
- `DECLINED`: Request declined

### Report Reasons
- `SPAM`: Spam or advertising
- `HARASSMENT`: Harassment or bullying
- `INAPPROPRIATE`: Inappropriate content
- `FAKE_PROFILE`: Fake or impersonation
- `OTHER`: Other reason (with detail)

## Constraints

- Username: 3-30 characters, alphanumeric + underscore
- Password: 8-128 characters
- Bio: Max 120 characters
- Message: Max 1000 characters
- Tags: Max 3 per user
- Languages: Max 5 per user
- Friend requests: Max 10 per day
- Minimum age: 16+

## Security Notes

- Access tokens expire in 15-30 minutes
- Refresh tokens expire in 7-30 days
- Passwords hashed with bcrypt (10-12 rounds) or Argon2id
- All endpoints enforce block checks
- Brute force protection on auth endpoints