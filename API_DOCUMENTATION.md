# QuickShort API Documentation

Complete API reference for the QuickShort URL Shortener backend service.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Profile Management](#profile-management)
  - [URL Management](#url-management)
  - [URL Analytics](#url-analytics)
  - [Redirect Service](#redirect-service)
  - [Payment Integration](#payment-integration)

---

## Overview

The QuickShort API is a RESTful service built with Express.js and TypeScript. All endpoints return JSON responses and use standard HTTP status codes.

**API Version:** 1.0  
**Content-Type:** `application/json` (except file uploads: `multipart/form-data`)

---

## Base URL

```
Local Development: http://localhost:5000/api
Production: https://your-backend.vercel.app/api
```

All endpoints in this documentation are relative to the base URL.

---

## Authentication

Most endpoints require JWT authentication. The token is automatically stored in HTTP-only cookies after login.

### Cookie-based (Automatic)
```
Cookie: authToken=<jwt_token>
```

### Header-based (Manual)
```
Authorization: Bearer <jwt_token>
```

### Protected Routes

Endpoints marked with 🔒 require authentication. Include the token in cookies or headers.

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errorSources": [
    {
      "path": "field_name",
      "message": "Specific error detail"
    }
  ],
  "stack": "Error stack trace (development only)"
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (e.g., email already exists) |
| 500 | Internal Server Error |

### Common Error Messages

```json
// Validation Error
{
  "success": false,
  "message": "Validation Error",
  "errorSources": [
    {"path": "email", "message": "Invalid email format"}
  ]
}

// Authentication Error
{
  "success": false,
  "message": "Not authenticated"
}

// Not Found
{
  "success": false,
  "message": "Not Found",
  "errorSources": []
}
```

---

## API Endpoints

---

## User Authentication

### 1. Register New User

Create a new user account with email verification.

**Endpoint:** `POST /user/create`  
**Authentication:** None

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules:**
- `fullName`: Required, 3-50 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully. Please check your email to verify your account.",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "isVerified": false,
    "createdAt": "2026-03-12T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `409` - Email already exists


---

### 2. Verify Email

Verify user email address with the token sent via email.

**Endpoint:** `GET /user/verify-email?token={token}`  
**Authentication:** None

**Query Parameters:**
- `token` (required): Email verification token from email

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Invalid or expired token
- `409` - Email already verified

**Browser Example:**
```
http://localhost:5000/api/user/verify-email?token=a1b2c3d4e5f6...
```

---

### 3. Resend Verification Email

Send a new verification email if the previous one expired.

**Endpoint:** `POST /user/resend-verification`  
**Authentication:** None

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Verification email sent successfully"
}
```

**Error Responses:**
- `404` - User not found
- `409` - Email already verified

---

### 4. Login

Authenticate user and receive JWT token in cookies.

**Endpoint:** `POST /user/login`  
**Authentication:** None

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "email": "john@example.com",
      "fullName": "John Doe",
      "status": "user",
      "isVerified": true,
      "createdAt": "2026-03-12T10:00:00.000Z",
      "updatedAt": "2026-03-12T10:00:00.000Z"
    }
  }
}
```

**Note:** JWT token is automatically set in HTTP-only cookie `authToken`.

**Error Responses:**
- `401` - Invalid credentials
- `403` - Email not verified


---

### 5. Logout

Clear authentication token.

**Endpoint:** `POST /user/logout`  
**Authentication:** None (but should be called when logged in)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```


---

### 6. Get Current User

Get logged-in user's profile information.

**Endpoint:** `GET /user/me` 🔒  
**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "john@example.com",
    "fullName": "John Doe",
    "status": "user",
    "isVerified": true,
    "proExpiresAt": null,
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:00:00.000Z"
  }
}
```

**Note:** This endpoint also auto-downgrades expired Pro users to free tier.


---

### 7. Request Password Reset

Send password reset link to user's email.

**Endpoint:** `POST /user/request-password-reset`  
**Authentication:** None

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

**Error Response:**
- `404` - User not found

---

### 8. Reset Password

Reset user password with token from email.

**Endpoint:** `POST /user/reset-password`  
**Authentication:** None

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Error Responses:**
- `400` - Invalid or expired token
- `400` - Validation error

---

## Profile Management

### 1. Create Profile

Create user profile with photo upload.

**Endpoint:** `POST /profile/create` 🔒  
**Authentication:** Required  
**Content-Type:** `multipart/form-data`

**Request Body:**
```json
{
  "gender": "Male",
  "country": "Bangladesh",
  "contactNumber": "01700000000",
  "photo": File
}
```

**Form Fields:**
- `gender` (optional): Male | Female | Other
- `country` (optional): String
- `contactNumber` (optional): String
- `photo` (optional): Image file (jpg, png, webp)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Profile created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "john@example.com",
    "gender": "Male",
    "country": "Bangladesh",
    "contactNumber": "01700000000",
    "userPhoto": "https://res.cloudinary.com/.../photo.jpg",
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:00:00.000Z"
  }
}
```


---

### 2. Get My Profile

Retrieve current user's profile.

**Endpoint:** `GET /profile/me` 🔒  
**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "john@example.com",
    "gender": "Male",
    "country": "Bangladesh",
    "contactNumber": "01700000000",
    "userPhoto": "https://res.cloudinary.com/.../photo.jpg",
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:00:00.000Z"
  }
}
```

**Note:** Creates empty profile if doesn't exist (for legacy users).


---

### 3. Update Profile

Update user profile information and/or photo.

**Endpoint:** `PATCH /profile/update` 🔒  
**Authentication:** Required  
**Content-Type:** `multipart/form-data`

**Request Body:**
```json
{
  "gender": "Female",
  "country": "India",
  "contactNumber": "9876543210",
  "photo": File
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "john@example.com",
    "gender": "Female",
    "country": "India",
    "contactNumber": "9876543210",
    "userPhoto": "https://res.cloudinary.com/.../new-photo.jpg",
    "updatedAt": "2026-03-12T11:00:00.000Z"
  }
}
```


---

## URL Management

### 1. Create Short URL

Create a new shortened URL with optional custom short code.

**Endpoint:** `POST /url/create` 🔒  
**Authentication:** Required

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/path",
  "customShortCode": "mycustom"
}
```

**Validation Rules:**
- `originalUrl`: Required, valid URL format
- `customShortCode`: Optional, 4-20 characters (alphanumeric + hyphens/underscores), Pro users only

**Success Response (201):**
```json
{
  "success": true,
  "message": "URL created successfully",
  "data": {
    "originalUrl": "https://www.example.com/very/long/url/path",
    "shortCode": "mycustom"
  }
}
```

**Note:** If no custom code provided, generates random 6-character code.

**Error Responses:**
- `400` - Validation error
- `403` - Free user limit reached (100 URLs)
- `409` - Custom short code already taken


---

### 2. Get My URLs

Retrieve all URLs created by the authenticated user.

**Endpoint:** `GET /url/list` 🔒  
**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "originalUrl": "https://www.example.com/page1",
      "shortCode": "abc123",
      "clicks": 42,
      "status": true,
      "createdAt": "2026-03-10T10:00:00.000Z"
    },
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "originalUrl": "https://www.example.com/page2",
      "shortCode": "xyz789",
      "clicks": 15,
      "status": false,
      "createdAt": "2026-03-11T14:00:00.000Z"
    }
  ]
}
```


---

### 3. Toggle URL Status

Enable or disable a shortened URL (soft delete).

**Endpoint:** `PATCH /url/toggle` 🔒  
**Authentication:** Required

**Request Body:**
```json
{
  "urlId": "65f1a2b3c4d5e6f7g8h9i0j1"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "URL status updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "originalUrl": "https://www.example.com/page1",
    "shortCode": "abc123",
    "status": false,
    "clicks": 42
  }
}
```

**Note:** Toggling status will flip between `true` (active) and `false` (inactive).

**Error Responses:**
- `400` - Invalid URL ID format
- `403` - Not authorized (URL belongs to another user)
- `404` - URL not found


---

### 4. Delete URL

Permanently delete a shortened URL.

**Endpoint:** `DELETE /url/delete` 🔒  
**Authentication:** Required

**Request Body:**
```json
{
  "urlId": "65f1a2b3c4d5e6f7g8h9i0j1"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "URL deleted permanently",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "originalUrl": "https://www.example.com/page1",
    "shortCode": "abc123"
  }
}
```

**Error Responses:**
- `403` - Not authorized
- `404` - URL not found


---

## URL Analytics

### 1. Dashboard Stats

Get summary statistics for dashboard overview.

**Endpoint:** `GET /url/stats` 🔒  
**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUrls": 25,
    "lastUrls": [
      {
        "originalUrl": "https://example.com/page1",
        "shortCode": "abc123",
        "clicks": 42,
        "createdAt": "2026-03-12T10:00:00.000Z"
      }
    ],
    "topUrls": [
      {
        "originalUrl": "https://example.com/popular",
        "shortCode": "xyz789",
        "clicks": 156,
        "createdAt": "2026-03-01T10:00:00.000Z"
      }
    ]
  }
}
```

**Response Fields:**
- `totalUrls`: Total number of URLs created by user
- `lastUrls`: 5 most recently created URLs
- `topUrls`: 5 URLs with highest click counts


---

### 2. Detailed Analytics

Get comprehensive analytics data for visualization.

**Endpoint:** `GET /url/analytics` 🔒  
**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUrls": 25,
    "activeUrls": 23,
    "inactiveUrls": 2,
    "totalClicks": 458,
    "dailyClicks": [
      {"date": "2026-03-05", "count": 12},
      {"date": "2026-03-06", "count": 18},
      {"date": "2026-03-07", "count": 25}
    ],
    "topUrlsByClicks": [
      {
        "shortCode": "xyz789",
        "originalUrl": "https://example.com/popular",
        "clicks": 156,
        "domain": "example.com"
      }
    ],
    "domainBreakdown": [
      {"domain": "example.com", "count": 15},
      {"domain": "github.com", "count": 7},
      {"domain": "google.com", "count": 3}
    ],
    "clicksByDayOfWeek": [
      {"day": "Monday", "clicks": 65},
      {"day": "Tuesday", "clicks": 72},
      {"day": "Wednesday", "clicks": 58}
    ],
    "recentActivity": [
      {
        "shortCode": "abc123",
        "originalUrl": "https://example.com/page",
        "clicks": 42,
        "lastClickedAt": "2026-03-12T09:30:00.000Z"
      }
    ]
  }
}
```

**Response Fields:**
- `totalUrls`: Total URLs created
- `activeUrls`: Currently active URLs
- `inactiveUrls`: Disabled URLs
- `totalClicks`: Sum of all clicks across all URLs
- `dailyClicks`: Click counts grouped by date (last 7 days)
- `topUrlsByClicks`: Top 10 most clicked URLs
- `domainBreakdown`: Click distribution by domain (top 8)
- `clicksByDayOfWeek`: Click patterns by weekday
- `recentActivity`: Recently clicked URLs (last 10)


---

## Redirect Service

### 1. Redirect to Original URL

Redirect user to the original URL and track the click.

**Endpoint:** `GET /redirect/:shortCode`  
**Authentication:** None

**URL Parameters:**
- `shortCode`: The short code of the URL (e.g., `abc123`)

**Response:**
- **Free Users:** Renders HTML page with 7-second countdown, ads, and auto-redirect
- **Pro Users:** Instant redirect (301) to original URL

**Success (Free User):**
Returns HTML page with:
- 7-second countdown timer
- Advertisement placeholder
- Progress bar
- Auto-redirect after countdown
- Skip button (appears after 3 seconds)

**Success (Pro User):**
```
HTTP/1.1 301 Moved Permanently
Location: https://example.com/original-url
```

**Error Responses:**
- `404` - Short code not found
- `410` - URL is inactive

**Browser Examples:**
```
http://localhost:5000/api/redirect/abc123
http://localhost:5000/api/redirect/mycustom
```

**Behavior:**
1. Validates short code exists and is active
2. Increments click counter
3. Records click timestamp
4. Checks user tier (free vs pro)
5. Redirects accordingly

---

## Payment Integration

QuickShort uses **SSLCommerz** payment gateway for Pro subscription upgrades.

### 1. Initiate Payment

Start payment process for Pro subscription upgrade.

**Endpoint:** `POST /payment/initiate` 🔒  
**Authentication:** Required

**Request Body:** None (email taken from JWT token)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "GatewayPageURL": "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=..."
  }
}
```

**Frontend Action:** Redirect user to `GatewayPageURL` for payment.

**Payment Details:**
- Amount: $9.00 USD
- Duration: 30 days
- Features: Unlimited URLs, instant redirects, custom short codes


---

### 2. Payment Success Callback

SSLCommerz redirects here after successful payment.

**Endpoint:** `POST /payment/success`  
**Authentication:** None (called by SSLCommerz)

**Request Body (Form Data):**
```
val_id: SSLCommerz validation ID
tran_id: Transaction ID (format: QS_{userId}_{timestamp})
```

**Response:** Redirects to frontend success page

**Actions Performed:**
1. Validates payment with SSLCommerz API
2. Extracts user ID from transaction ID
3. Upgrades user to Pro status
4. Sets `proExpiresAt` to 30 days from now
5. Redirects to: `{ORIGIN_URL}/payment/success`

---

### 3. Payment Failure Callback

SSLCommerz redirects here if payment fails.

**Endpoint:** `POST /payment/fail`  
**Authentication:** None

**Response:** Redirects to `{ORIGIN_URL}/payment/fail`

---

### 4. Payment Cancel Callback

User cancels payment on payment gateway.

**Endpoint:** `POST /payment/cancel`  
**Authentication:** None

**Response:** Redirects to `{ORIGIN_URL}/payment/fail`

---

### 5. IPN (Instant Payment Notification)

Server-to-server backup notification from SSLCommerz.

**Endpoint:** `POST /payment/ipn`  
**Authentication:** None (verified by SSLCommerz signature)

**Purpose:** Backup verification in case user closes browser before callback.

**Response:**
```json
{
  "success": true,
  "message": "IPN processed successfully"
}
```

---

## Subscription Management

### Pro Subscription Features

| Feature | Free | Pro |
|---------|------|-----|
| Short URLs | 100 max | Unlimited |
| Custom Short Codes | ✗ | ✓ |
| Redirect Speed | 7 sec countdown | Instant |
| Advertisements | Yes | No |
| Analytics | ✓ | ✓ |
| Price | Free | $9/month |

### Auto-Downgrade

Pro subscriptions automatically expire after 30 days. When a Pro user's subscription expires:

1. User logs in or refreshes page
2. Backend checks `proExpiresAt < current date`
3. If expired, sets `status = 'user'` and clears `proExpiresAt`
4. User is downgraded to free tier

**No cron job required** — checked on every `/user/me` call.

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting middleware for production use.

**Recommended Limits:**
- Authentication endpoints: 5 requests/minute
- URL creation: 10 requests/minute
- General API: 100 requests/minute

---

## CORS Policy

Backend accepts requests from configured `ORIGIN_URL` (frontend URL).

**Development:** `http://localhost:5173`  
**Production:** Set via environment variable

---

## Database Schema Reference

### User Document
```typescript
{
  _id: ObjectId
  fullName: string
  email: string (unique, indexed)
  password: string (hashed with bcrypt)
  status: 'user' | 'pro-user' | 'admin' | 'blocked'
  isVerified: boolean
  verificationToken?: string
  verificationTokenExpires?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  proExpiresAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Profile Document
```typescript
{
  _id: ObjectId
  email: string (unique, indexed)
  gender?: 'Male' | 'Female' | 'Other'
  country?: string
  contactNumber?: string
  userPhoto?: string (Cloudinary URL)
  createdAt: Date
  updatedAt: Date
}
```

### URL Document
```typescript
{
  _id: ObjectId
  originalUrl: string
  shortCode: string (unique, indexed)
  email: string (indexed)
  clicks: number
  status: boolean (true = active, false = inactive)
  lastClickedAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

---

## Postman Collection

Import this JSON to test all endpoints in Postman:

**Environment Variables:**
- `base_url`: `http://localhost:5000/api`
- `authToken`: (automatically set after login)

---

## WebSocket Support

Currently not implemented. Future versions may include:
- Real-time click notifications
- Live analytics updates
- Multi-device session management

---

## API Versioning

Current version: **v1** (implicit in base URL)

Future versions will be explicitly versioned:
- `/api/v2/user/create`
- `/api/v2/url/create`

---

## Additional Resources

- **Main Documentation:** [README.md](README.md)
- **GitHub Repository:** Check the source code for implementation details

---

## Support

For issues, questions, or contributions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/quickshort/issues)
- Email: your@email.com

---

**Last Updated:** March 12, 2026  
**API Version:** 1.0
