# QuickShort - URL Shortener

<div align="center">

**A modern, full-stack URL shortening service with analytics and user management**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#1-setup-instructions)
- [Project Structure](#2-project-structure)
- [API Documentation](#3-api-documentation)
- [Design Decisions](#4-design-decisions)
- [Deployment Guide](#5-vercel-deployment-guide)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🎯 Overview

**QuickShort** is a modern URL shortening service that allows users to create, manage, and track shortened URLs. Built with a focus on performance, security, and user experience, it provides a clean dashboard for URL management and analytics.

### What is QuickShort?

QuickShort transforms long, complex URLs into short, shareable links. Perfect for:
- Social media sharing
- Marketing campaigns
- Tracking click analytics
- Managing multiple links in one place

### Key Highlights

- 🔐 **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- 📊 **Analytics Dashboard**: Track clicks and URL performance
- ☁️ **Cloud Storage**: Profile photos stored on Cloudinary
- 🚀 **Serverless Deployment**: Ready for Vercel deployment
- ⚡ **Real-time Updates**: Instant URL creation and click tracking
- 📱 **Responsive Design**: Works seamlessly on all devices

---

## ✨ Features

### User Management
- ✅ User registration with profile photo upload
- ✅ Secure login/logout with JWT tokens
- ✅ Profile management
- ✅ Gender and country information
- ✅ Contact number storage

### URL Management
- ✅ Create shortened URLs instantly
- ✅ Auto-generated short codes
- ✅ View all your URLs in one dashboard
- ✅ Soft delete URLs (deactivate without permanent deletion)
- ✅ Click tracking for each URL
- ✅ URL status management (active/inactive)

### Analytics
- ✅ Total URLs created
- ✅ Active URLs count
- ✅ Total clicks across all URLs
- ✅ Individual URL click statistics
- ✅ Creation date tracking

### Security
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Request validation with Zod

### User Experience
- ✅ Clean, modern UI with Tailwind CSS & DaisyUI
- ✅ Sweet alerts for user feedback
- ✅ Password visibility toggle
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library for building interactive interfaces |
| **TypeScript** | Type safety and better developer experience |
| **Vite** | Fast build tool and development server |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **DaisyUI** | Component library built on Tailwind |
| **SweetAlert2** | Beautiful alert/modal dialogs |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web application framework |
| **TypeScript** | Type-safe backend development |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Secure authentication tokens |
| **bcrypt** | Password hashing |
| **Zod** | Schema validation |
| **Multer** | File upload handling |
| **Cloudinary** | Cloud-based image storage |
| **cookie-parser** | Cookie handling middleware |
| **CORS** | Cross-origin resource sharing |

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **ts-node-dev** - TypeScript development server
- **Git** - Version control

---

## 📦 1. Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18+ | [nodejs.org](https://nodejs.org/) |
| npm | v9+ | (comes with Node.js) |
| MongoDB | v6+ | [mongodb.com](https://www.mongodb.com/) or use MongoDB Atlas |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### Environment Setup

You'll also need accounts for:
- **MongoDB Atlas** (free tier available) - [cloud.mongodb.com](https://cloud.mongodb.com/)
- **Cloudinary** (free tier available) - [cloudinary.com](https://cloudinary.com/)

---

### 🎨 Frontend Setup

#### Step 1: Navigate to frontend directory
```bash
cd frontend
```

#### Step 2: Install dependencies
```bash
npm install
```

If you encounter Rollup module errors, run:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Step 3: Configure environment (Optional)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Or update `frontend/src/config/index.tsx` directly:
```typescript
const config = {
  api_url: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
};
```

#### Step 4: Run development server

```bash
npm run dev
```

✅ Frontend will be available at: **http://localhost:5173**

#### Other Frontend Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

### ⚙️ Backend Setup

#### Step 1: Navigate to backend directory
```bash
cd backend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Configure environment variables

Create a `.env` file in the `backend` directory based on `example.env`:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=mongodb://localhost:27017/url_shortener
# Or use MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/url_shortener

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security
BCRYPT_SALT_ROUNDS=12
JWT_SECRET=your_very_secure_random_secret_key_here
JWT_EXPIRES_IN=7d

# URLs
BASE_URL=http://localhost:5000
ORIGIN_URL=http://localhost:5173
```

**📝 How to get credentials:**

<details>
<summary><b>MongoDB Atlas Setup</b></summary>

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com/)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<username>`, `<password>`, and `<dbname>` with your values
</details>

<details>
<summary><b>Cloudinary Setup</b></summary>

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard
4. Copy **Cloud Name**, **API Key**, and **API Secret**
5. Paste into your `.env` file
</details>

<details>
<summary><b>JWT Secret Generation</b></summary>

Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Or use any random string generator.
</details>

#### Step 4: Run development server

```bash
npm run start:dev
```

✅ Backend will be available at: **http://localhost:5000**

#### Other Backend Commands

```bash
# Build TypeScript to JavaScript
npm run build

# Run production build
npm run start:prod

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run prettier:fix
```

---

### 🧪 Testing the Setup

Once both frontend and backend are running:

1. **Open Frontend**: Navigate to `http://localhost:5173`
2. **Register**: Create a new account with your details
3. **Login**: Sign in with your credentials
4. **Create Short URL**: Enter a long URL to shorten
5. **Test Redirect**: Visit `http://localhost:5000/redirect/{shortCode}`
6. **Check Analytics**: View your URL statistics in the dashboard

---

## 📂 2. Project Structure

### Root Structure

```
url_shortener/
├── 📁 backend/          # Express.js + TypeScript backend
├── 📁 frontend/         # React + Vite frontend
├── 📄 .gitignore        # Git ignore rules
└── 📄 README.md         # This file
```

---

### Frontend Structure

```
📁 frontend/
├── 📁 public/
│   └── _redirects                    # Vercel routing config
├── 📁 src/
│   ├── 📁 assets/                    # Static assets
│   ├── 📁 auth/
│   │   ├── Login.tsx                 # Login page component
│   │   └── Register.tsx              # Registration page component
│   ├── 📁 components/
│   │   └── Navbar.tsx                # Navigation bar component
│   ├── 📁 config/
│   │   └── index.tsx                 # App configuration (API URL, etc.)
│   ├── 📁 contexts/
│   │   └── AuthProvider.tsx          # Authentication context provider
│   ├── 📁 hooks/
│   │   └── useAuth.tsx               # Authentication hook
│   ├── 📁 pages/
│   │   ├── 📁 dashboard/
│   │   │   ├── Analytics.tsx         # URL analytics page
│   │   │   ├── CreateURL.tsx         # Create new short URL
│   │   │   ├── Dashboard.tsx         # Dashboard layout
│   │   │   ├── DHome.tsx             # Dashboard home
│   │   │   ├── List.tsx              # List all URLs
│   │   │   └── Profile.tsx           # User profile page
│   │   ├── About.tsx                 # About page
│   │   ├── Home.tsx                  # Landing page
│   │   └── Pricing.tsx               # Pricing page
│   ├── 📁 routes/
│   │   ├── ErrorRoute.tsx            # 404 error page
│   │   ├── PrivateRoute.tsx          # Protected route wrapper
│   │   ├── PublicRoute.tsx           # Public route wrapper
│   │   └── Routes.tsx                # Main routing configuration
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # App entry point
│   └── index.css                     # Global styles
├── .env                              # Environment variables
├── index.html                        # HTML template
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript config
└── vite.config.ts                    # Vite configuration
```

**Frontend Architecture:**
- **Component-based**: Reusable React components
- **Context API**: Global state management for auth
- **Custom Hooks**: Reusable business logic
- **Route Protection**: Private/Public route guards
- **Type Safety**: Full TypeScript coverage

---

### Backend Structure

```
📁 backend/
├── 📁 api/
│   └── index.ts                      # Vercel serverless entry point
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 config/
│   │   │   └── index.ts              # Environment config loader
│   │   ├── 📁 middlewares/
│   │   │   ├── authenticatedRequest.ts   # JWT auth middleware
│   │   │   ├── globalErrorHandler.ts     # Global error handling
│   │   │   ├── notFound.ts               # 404 handler
│   │   │   ├── upload.ts                 # Multer file upload config
│   │   │   └── validateRequest.ts        # Zod validation middleware
│   │   ├── 📁 modules/
│   │   │   ├── 📁 redirect/
│   │   │   │   ├── redirect.controller.ts
│   │   │   │   ├── redirect.route.ts
│   │   │   │   ├── redirect.service.ts
│   │   │   │   └── redirect.validation.ts
│   │   │   ├── 📁 url/
│   │   │   │   ├── url.controller.ts     # URL business logic
│   │   │   │   ├── url.interface.ts      # TypeScript interfaces
│   │   │   │   ├── url.middleware.ts     # URL-specific middleware
│   │   │   │   ├── url.model.ts          # Mongoose schema
│   │   │   │   ├── url.route.ts          # URL routes
│   │   │   │   ├── url.service.ts        # Database operations
│   │   │   │   └── url.validation.ts     # Zod schemas
│   │   │   └── 📁 user/
│   │   │       ├── user.controller.ts    # User business logic
│   │   │       ├── user.interface.ts     # TypeScript interfaces
│   │   │       ├── user.middleware.ts    # User-specific middleware
│   │   │       ├── user.model.ts         # Mongoose schema
│   │   │       ├── user.route.ts         # User routes
│   │   │       ├── user.service.ts       # Database operations
│   │   │       └── user.validation.ts    # Zod schemas
│   │   ├── 📁 utils/
│   │   │   ├── catchAsync.ts             # Async error wrapper
│   │   │   ├── cloudinary.ts             # Cloudinary integration
│   │   │   ├── generateShortCode.ts      # Short URL generator
│   │   │   └── jwt.ts                    # JWT token utilities
│   │   └── routes.ts                     # Main route aggregator
│   ├── app.ts                            # Express app configuration
│   └── server.ts                         # Server entry point (local dev)
├── .env                                  # Environment variables
├── .vercelignore                         # Vercel deployment exclusions
├── example.env                           # Environment template
├── package.json                          # Dependencies & scripts
├── tsconfig.json                         # TypeScript config
├── vercel.json                           # Vercel deployment config
└── VERCEL_DEPLOYMENT.md                  # Deployment guide
```

**Backend Architecture:**
- **Modular Design**: Feature-based folder structure
- **MVC Pattern**: Separation of concerns (Model, Controller, Service)
- **Middleware Chain**: Request validation, authentication, error handling
- **Type Safety**: Full TypeScript coverage
- **Serverless Ready**: Vercel deployment configuration included

---

## 📡 3. API Documentation

### Base URL

```
Local Development: http://localhost:5000
Production: https://your-backend.vercel.app
```

### Authentication

Most endpoints require JWT authentication. Include the token in cookies or headers:

**Cookie (Automatic):**
```
Cookie: token=<jwt_token>
```

**Header (Manual):**
```
Authorization: Bearer <jwt_token>
```

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errorSources": [ /* detailed errors */ ]
}
```

---

### 👤 User APIs

#### 1. Create User (Register)

Creates a new user account with optional profile photo.

**Endpoint:** `POST /api/user/create`

**Request Type:** `multipart/form-data`

**Authentication:** Not required

**Request Body:**
```javascript
{
  "name": "John Doe",              // Required, string
  "email": "john@example.com",     // Required, valid email
  "password": "password123",       // Required, min 6 chars
  "gender": "Male",                // Required, Male|Female|Other
  "country": "Bangladesh",         // Optional, string
  "contactNumber": "01700000000",  // Optional, string
  "photo": File                    // Optional, image file
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "Male",
    "country": "Bangladesh",
    "contactNumber": "01700000000",
    "userPhoto": "https://cloudinary.com/...",
    "status": "user",
    "createdAt": "2026-02-25T10:00:00.000Z",
    "updatedAt": "2026-02-25T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `409` - Email already exists

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/user/create \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=password123" \
  -F "gender=Male" \
  -F "country=Bangladesh" \
  -F "contactNumber=01700000000" \
  -F "photo=@/path/to/photo.jpg"
```

---

#### 2. Login User

Authenticates a user and returns JWT token.

**Endpoint:** `POST /api/user/login`

**Request Type:** `application/json`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "Male",
    "status": "user",
    "userPhoto": "https://cloudinary.com/..."
  }
}
```

**Note:** JWT token is automatically set as HTTP-only cookie

**Error Responses:**
- `401` - Invalid email or password
- `400` - Validation error

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}' \
  -c cookies.txt
```

---

#### 3. Get Current User

Retrieves the logged-in user's information.

**Endpoint:** `GET /api/user/me`

**Authentication:** Required ✅

**Request Body:** None

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "Male",
    "country": "Bangladesh",
    "contactNumber": "01700000000",
    "userPhoto": "https://cloudinary.com/...",
    "status": "user"
  }
}
```

**Error Responses:**
- `401` - Unauthorized (no token or invalid token)

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/user/me \
  -b cookies.txt
```

---

#### 4. Logout User

Logs out the current user by clearing the JWT cookie.

**Endpoint:** `POST /api/user/logout`

**Authentication:** Not required

**Request Body:** None

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/user/logout \
  -b cookies.txt
```

---

### 🔗 URL APIs

#### 1. Create Short URL

Creates a shortened URL for the provided original URL.

**Endpoint:** `POST /api/url/create`

**Request Type:** `application/json`

**Authentication:** Required ✅

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/path"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "URL created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "originalUrl": "https://www.example.com/very/long/url/path",
    "shortCode": "abc123",
    "email": "john@example.com",
    "clicks": 0,
    "status": true,
    "createdAt": "2026-02-25T10:00:00.000Z",
    "updatedAt": "2026-02-25T10:00:00.000Z"
  }
}
```

**Short URL:** `http://localhost:5000/redirect/abc123`

**Error Responses:**
- `400` - Invalid URL format
- `401` - Unauthorized

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/url/create \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"originalUrl":"https://www.example.com/very/long/url"}'
```

---

#### 2. Get All URLs

Retrieves all URLs created by the authenticated user.

**Endpoint:** `GET /api/url/list`

**Authentication:** Required ✅

**Request Body:** None

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
      "createdAt": "2026-02-25T10:00:00.000Z"
    },
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "originalUrl": "https://www.google.com",
      "shortCode": "xyz789",
      "clicks": 15,
      "status": true,
      "createdAt": "2026-02-24T08:30:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/url/list \
  -b cookies.txt
```

---

#### 3. Get URL Statistics

Retrieves analytics for all user's URLs.

**Endpoint:** `GET /api/url/stats`

**Authentication:** Required ✅

**Request Body:** None

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUrls": 25,
    "activeUrls": 23,
    "inactiveUrls": 2,
    "totalClicks": 1547
  }
}
```

**Error Responses:**
- `401` - Unauthorized

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/url/stats \
  -b cookies.txt
```

---

#### 4. Soft Delete URL

Deactivates a URL without permanently deleting it (sets status to false).

**Endpoint:** `DELETE /api/url/softdelete`

**Request Type:** `application/json`

**Authentication:** Required ✅

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
  "message": "URL deleted successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "status": false
  }
}
```

**Error Responses:**
- `400` - Invalid URL ID
- `401` - Unauthorized
- `403` - Not authorized to delete this URL
- `404` - URL not found

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/url/softdelete \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"urlId":"65f1a2b3c4d5e6f7g8h9i0j1"}'
```

---

### 🔄 Redirect API

#### Redirect to Original URL

Redirects to the original URL and increments click counter.

**Endpoint:** `GET /redirect/:shortCode`

**Authentication:** Not required

**Parameters:**
- `shortCode` - The unique short code (e.g., `abc123`)

**Success Response (302):**
Redirects to the original URL automatically.

**Error Response (404):**
```json
{
  "success": false,
  "message": "Short URL not found or inactive"
}
```

**Example:**
```
Visit: http://localhost:5000/redirect/abc123
Result: Redirects to https://www.example.com/very/long/url
```

**cURL Example:**
```bash
curl -L http://localhost:5000/redirect/abc123
```

---

### 🚨 Error Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Success |
| `201` | Created successfully |
| `400` | Bad request / Validation error |
| `401` | Unauthorized / Invalid credentials |
| `403` | Forbidden / No permission |
| `404` | Resource not found |
| `409` | Conflict (e.g., duplicate email) |
| `500` | Internal server error |

---

### 📝 Validation Errors

When validation fails, the response includes detailed error information:

```json
{
  "success": false,
  "message": "Validation Error",
  "errorSources": [
    {
      "path": "email",
      "message": "Invalid email format"
    },
    {
      "path": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

---

## 🎨 4. Design Decisions

### Architecture Patterns

#### Backend Architecture

**1. Modular Structure**
- Each feature (user, URL, redirect) is a self-contained module
- Easy to scale and maintain
- Clear separation of concerns

**2. MVC-Inspired Pattern**
```
Request → Route → Middleware → Controller → Service → Model → Database
                                    ↓
                                Response
```

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and database operations
- **Models**: Data structure and validation
- **Middlewares**: Cross-cutting concerns (auth, validation, errors)

**3. Middleware Chain**
```javascript
validateRequest → authenticatedRequest → controller → globalErrorHandler
```

**4. Error Handling Strategy**
- Centralized error handling with `globalErrorHandler`
- Custom error classes for different error types
- Async error wrapper (`catchAsync`) to eliminate try-catch blocks
- Detailed error messages in development, generic in production

**5. Security Measures**
- JWT tokens stored in HTTP-only cookies (prevents XSS)
- Bcrypt password hashing with configurable salt rounds
- CORS configuration for specific origins
- Request validation with Zod schemas
- MongoDB injection prevention through Mongoose

#### Frontend Architecture

**1. Component Hierarchy**
```
App
├── Routes
│   ├── Public Routes (Home, About, Pricing)
│   ├── Auth Routes (Login, Register)
│   └── Private Routes (Dashboard)
│       ├── DHome
│       ├── CreateURL
│       ├── List
│       ├── Analytics
│       └── Profile
```

**2. State Management**
- Context API for global authentication state
- Local state for component-specific data
- No additional state management library needed (keeps it simple)

**3. Code Organization**
- Feature-based folder structure
- Reusable hooks for business logic
- Centralized routing configuration
- Separation of public and protected routes

### Technology Choices

#### Why TypeScript?
- ✅ Type safety prevents runtime errors
- ✅ Better IDE support and autocomplete
- ✅ Easier refactoring
- ✅ Self-documenting code
- ✅ Catches bugs during development

#### Why MongoDB?
- ✅ Flexible schema for evolving requirements
- ✅ Easy to scale horizontally
- ✅ JSON-like documents (natural fit for JavaScript/TypeScript)
- ✅ Powerful query capabilities
- ✅ Free tier on MongoDB Atlas

#### Why Zod over other validators?
- ✅ TypeScript-first validation
- ✅ Type inference (no need to write types separately)
- ✅ Schema composition and transformation
- ✅ Better error messages
- ✅ Smaller bundle size than alternatives

#### Why JWT over sessions?
- ✅ Stateless authentication (no server-side session storage)
- ✅ Works well with serverless functions
- ✅ Easier to scale horizontally
- ✅ Can be used across multiple domains
- ✅ Contains user information (no database lookup needed)

#### Why Cloudinary?
- ✅ Free tier available
- ✅ Automatic image optimization
- ✅ CDN delivery
- ✅ No need to manage file storage
- ✅ Easy integration with Multer

#### Why Tailwind CSS + DaisyUI?
- ✅ Rapid UI development
- ✅ Consistent design system
- ✅ Utility-first approach (no CSS files to manage)
- ✅ DaisyUI provides ready-made components
- ✅ Small production bundle size (unused CSS is purged)

#### Why Vite over Create React App?
- ✅ Lightning-fast HMR (Hot Module Replacement)
- ✅ Faster build times
- ✅ Better tree-shaking
- ✅ Native ES modules support
- ✅ Built-in TypeScript support

### Database Schema Design

**User Schema:**
```typescript
{
  name: String (required)
  email: String (required, unique, indexed)
  password: String (required, hashed)
  gender: String (required)
  country: String (optional)
  contactNumber: String (optional)
  userPhoto: String (optional, Cloudinary URL)
  status: String (default: "user")
  timestamps: true (createdAt, updatedAt)
}
```

**URL Schema:**
```typescript
{
  originalUrl: String (required, trimmed)
  shortCode: String (required, unique, indexed)
  clicks: Number (default: 0)
  email: String (required, indexed for user queries)
  status: Boolean (default: true, for soft delete)
  timestamps: true (createdAt, updatedAt)
}
```

**Index Strategy:**
- `email` indexed in both collections for fast user-based queries
- `shortCode` indexed for instant redirect lookups
- `unique` constraint on email and shortCode prevents duplicates

### API Design Principles

1. **RESTful Conventions**
   - GET for retrieving data
   - POST for creating resources
   - DELETE for removing resources
   - Proper HTTP status codes

2. **Consistent Response Format**
   - All responses include `success` boolean
   - `data` field for successful responses
   - `message` field for error messages
   - `errorSources` array for validation errors

3. **Endpoint Naming**
   - `/api/user/*` - User-related operations
   - `/api/url/*` - URL management
   - `/redirect/:code` - Public redirect endpoint

4. **Authentication Strategy**
   - Token sent via HTTP-only cookies (secure)
   - Middleware checks for token in requests
   - User email stored in decoded token payload

---

---

## ⚠️ Known Limitations

### Current Limitations

1. **Email Verification Not Implemented**
   - Users can register without email verification
   - **Reason**: Requires additional infrastructure (Redis, job queue, email service)
   - **Impact**: Potential fake accounts
   - **Workaround**: Can be added in future iterations

2. **Basic Logging**
   - Error logging is minimal
   - **Reason**: Time constraints and scope prioritization
   - **Impact**: Harder to debug production issues
   - **Workaround**: Can integrate Winston or similar logging libraries

3. **Limited Testing**
   - No unit/integration tests included
   - **Reason**: Time constraints
   - **Impact**: Less confidence in code changes
   - **Workaround**: Manual testing performed on all endpoints

4. **No ShadCN UI**
   - Using DaisyUI instead
   - **Reason**: ShadCN setup complexity and debugging time
   - **Impact**: Less modern component design
   - **Benefit**: Faster development with DaisyUI

5. **Basic URL Validation**
   - Simple URL format checking only
   - **Reason**: Complex validation would require third-party services
   - **Impact**: Malicious URLs might be shortened
   - **Workaround**: Can add URL safety checking APIs later

6. **No Rate Limiting**
   - Users can create unlimited URLs
   - **Reason**: Not implemented in MVP
   - **Impact**: Potential abuse
   - **Workaround**: Can add express-rate-limit middleware

7. **No Custom Short Codes**
   - Auto-generated short codes only
   - **Reason**: Scope limitation
   - **Impact**: Users can't choose their own codes
   - **Feature**: Can be added as premium feature

8. **Soft Delete Only**
   - URLs are deactivated, not permanently deleted
   - **Reason**: Design decision for data retention
   - **Impact**: Database grows over time
   - **Benefit**: Can restore accidentally deleted URLs

### Performance Considerations

- **Database Queries**: All queries are indexed for performance
- **File Uploads**: Handled through Cloudinary CDN
- **Serverless Functions**: 10-second timeout on Vercel free tier
- **MongoDB Atlas**: Free tier has 512MB storage limit

---

## 🚀 Future Improvements

### High Priority

1. **Email Verification System**
   - Send verification emails on registration
   - Confirm email before allowing URL creation
   - Password reset functionality

2. **Advanced Analytics**
   - Geographic location of clicks
   - Device/browser information
   - Click timestamps and graphs
   - Referrer tracking

3. **Custom Short Codes**
   - Allow users to choose custom short codes
   - Check availability before creation
   - Premium feature consideration

4. **Rate Limiting**
   - Limit API requests per user
   - Prevent abuse and spam
   - Different limits for free/premium users

### Medium Priority

5. **Role-Based Access Control**
   - Admin role with management dashboard
   - Pro-user role with additional features
   - Moderation capabilities

6. **URL Safety Checking**
   - Integrate with Google Safe Browsing API
   - Warn users before redirecting to unsafe sites
   - Block known malicious URLs

7. **Payment Integration**
   - Stripe/PayPal integration
   - Premium subscription plans
   - Feature-based pricing

8. **QR Code Generation**
   - Generate QR codes for short URLs
   - Download as PNG/SVG
   - Customizable QR codes

### Low Priority

9. **URL Expiration**
   - Set expiration dates for URLs
   - Auto-deactivate after expiry
   - Renewal options

10. **Team/Organization Support**
    - Share URLs within teams
    - Organization-level analytics
    - Role management within orgs

11. **API Keys**
    - Allow third-party integrations
    - API documentation for developers
    - Usage tracking and limits

12. **Browser Extension**
    - Chrome/Firefox extension
    - Quick URL shortening from browser
    - Copy to clipboard functionality

### Testing & Quality

13. **Comprehensive Testing**
    - Unit tests for all modules
    - Integration tests for API endpoints
    - E2E tests with Playwright/Cypress
    - Code coverage reporting

14. **Advanced Logging**
    - Structured logging with Winston
    - Error tracking with Sentry
    - Performance monitoring
    - Request/response logging

15. **Code Quality**
    - Increase TypeScript strictness
    - Add Husky for pre-commit hooks
    - Implement CI/CD pipeline
    - Automated dependency updates

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**
   - Open an issue with detailed description
   - Include steps to reproduce
   - Provide error messages/screenshots

2. **Suggest Features**
   - Open an issue with feature description
   - Explain use case and benefits
   - Discuss implementation approach



## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2026 Mahfuz Ibne Syful

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 📞 Support

If you have any questions or need help:

- **Email**: Contact the author
- **Issues**: [GitHub Issues](https://github.com/your-username/url-shortener/issues)
- **Documentation**: Check this README

---

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [Vercel](https://vercel.com/) - Deployment platform
- [React](https://reactjs.org/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [DaisyUI](https://daisyui.com/) - UI components

---

## 👨‍💻 Author

**Mahfuz Ibne Syful**

- GitHub: [@mahfuz2411](https://github.com/mahfuz2411)
- Email: mahfuz2411@example.com

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

**Made with ❤️ by Mahfuz Ibne Syful**

</div>
