# QuickShort - URL Shortener

<div align="center">

**A modern, full-stack URL shortening service with analytics and user management**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

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
- [Deployment Guide](#5-deployment-guide)
- [Additional Documentation](#additional-documentation)
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
- 🚀 **Serverless Deployment**: Backend on Vercel, Frontend on Netlify
- ⚡ **Real-time Updates**: Instant URL creation and click tracking
- 📱 **Responsive Design**: Works seamlessly on all devices

---

## ✨ Features

### User Management
- ✅ User registration with email verification
- ✅ Secure login/logout with JWT tokens
- ✅ Email verification system (24-hour token expiry)
- ✅ Resend verification email functionality
- ✅ Password reset via email
- ✅ Profile management with photo upload
- ✅ Gender, country, and contact information
- ✅ Cloudinary integration for profile photos

### URL Management
- ✅ Create shortened URLs instantly
- ✅ Auto-generated 6-character short codes
- ✅ Custom short codes (Pro users only)
- ✅ View all your URLs in dashboard
- ✅ Toggle URL status (enable/disable)
- ✅ Soft delete URLs (deactivate without permanent deletion)
- ✅ Permanent delete option
- ✅ Click tracking for each URL
- ✅ Last clicked timestamp

### Pro Subscription (SSLCommerz Payment)
- ✅ Free tier: 100 URLs maximum
- ✅ Pro tier: Unlimited URLs
- ✅ Custom short codes (Pro feature)
- ✅ Instant redirects (Pro users)
- ✅ 7-second countdown for free users
- ✅ Advertisement-free experience (Pro)
- ✅ $9/month subscription
- ✅ Auto-renewal reminder system
- ✅ Auto-downgrade after subscription expiry
- ✅ SSLCommerz payment gateway integration

### Analytics & Dashboard
- ✅ Total URLs count
- ✅ Active vs inactive URLs
- ✅ Total clicks across all URLs
- ✅ Individual URL click statistics
- ✅ Recent URLs (last 5 created)
- ✅ Top performing URLs (by clicks)
- ✅ Daily click trends
- ✅ Domain breakdown analytics
- ✅ Day-of-week activity patterns
- ✅ Recent activity timeline

### Security & Validation
- ✅ JWT-based authentication
- ✅ HTTP-only cookies (XSS protection)
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Request validation with Zod
- ✅ Email verification required for login
- ✅ Secure password reset flow

### User Experience
- ✅ Modern UI with Framer Motion animations
- ✅ Dark/Light mode toggle
- ✅ Clean dashboard with shadcn/ui components
- ✅ Responsive design (mobile-first)
- ✅ Toast notifications
- ✅ Loading states and skeletons
- ✅ Form validation with visual feedback
- ✅ Error handling with user-friendly messages
- ✅ Copy-to-clipboard functionality
- ✅ Real-time URL preview

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
| **shadcn/ui** | Accessible component library |
| **Framer Motion** | Animation library |
| **Lucide React** | Icon library |
| **Radix UI** | Headless UI primitives |

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
| **SSLCommerz** | Payment gateway integration |
| **Nodemailer** | Email service (verification & password reset) |
| **cookie-parser** | Cookie handling middleware |
| **CORS** | Cross-origin resource sharing |

### Development Tools
- **ESLint** - Code linting
- **ts-node-dev** - TypeScript development server
- **Git** - Version control

### Services & APIs
- **MongoDB Atlas** - Cloud database hosting
- **Cloudinary** - Image CDN and storage
- **SSLCommerz** - Payment gateway for Bangladesh
- **Email Service** - Transactional emails (Gmail/SMTP)

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

# Email Configuration (for verification & password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=QuickShort <noreply@quickshort.com>

# Payment Gateway (SSLCommerz)
SSL_STORE_ID=your_store_id
SSL_STORE_PASSWD=your_store_password

# URLs
BASE_URL=http://localhost:5000
ORIGIN_URL=http://localhost:5173
REDIRECT_URL=http://localhost:5173
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

<details>
<summary><b>Email Configuration (Gmail)</b></summary>

For email verification and password reset:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Go to Security → 2-Step Verification → App Passwords
4. Generate a new app password
5. Use your email as `EMAIL_USER` and app password as `EMAIL_PASS`

**Note:** For production, consider using SendGrid, AWS SES, or Mailgun.
</details>

<details>
<summary><b>SSLCommerz Setup (Optional - For Pro Subscriptions)</b></summary>

For payment gateway integration:

**Sandbox (Testing):**
1. Go to [developer.sslcommerz.com](https://developer.sslcommerz.com)
2. Register for free sandbox account
3. Get Store ID and Store Password from dashboard
4. Use sandbox credentials for testing

**Live (Production):**
1. Go to [merchant.sslcommerz.com](https://merchant.sslcommerz.com)
2. Register as merchant
3. Complete KYC verification
4. Get live Store ID and Store Password

**Note:** Without SSLCommerz setup, the app works but Pro subscription upgrade won't be available.
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
2. **Register**: Create a new account with your email
3. **Verify Email**: Check your email inbox for verification link
4. **Login**: Sign in with your credentials
5. **Create Short URL**: Enter a long URL to shorten
6. **Test Redirect**: Visit the generated short URL
   - Free users: 7-second countdown with ads
   - Pro users: Instant redirect
7. **Check Analytics**: View your URL statistics in the dashboard
8. **Test Pro Upgrade** (optional): Try payment flow with sandbox credentials

---

## 📂 2. Project Structure

### Root Structure

```
url_shortener/
├── 📁 backend/                   # Express.js + TypeScript backend
├── 📁 frontend/                  # React + Vite frontend
├── 📄 .gitignore                 # Git ignore rules
├── 📄 README.md                  # This file
└── 📄 API_DOCUMENTATION.md       # Complete API reference
```

---

### Frontend Structure

```
📁 frontend/
├── 📁 public/
│   ├── _redirects                    # Netlify routing config
│   └── ads.txt                       # AdSense configuration
├── 📁 src/
│   ├── 📁 assets/                    # Static assets
│   ├── 📁 auth/
│   │   ├── Login.tsx                 # Login page component
│   │   ├── Register.tsx              # Registration page component
│   │   └── VerifyEmail.tsx           # Email verification page
│   ├── 📁 components/
│   │   ├── Navbar.tsx                # Navigation bar component
│   │   ├── theme-provider.tsx        # Dark mode theme provider
│   │   ├── theme-toggle.tsx          # Theme switcher component
│   │   └── ui/                       # shadcn/ui components
│   ├── 📁 config/
│   │   └── index.tsx                 # App configuration (API URL, etc.)
│   ├── 📁 contexts/
│   │   └── AuthProvider.tsx          # Authentication context provider
│   ├── 📁 hooks/
│   │   ├── useAuth.tsx               # Authentication hook
│   │   └── use-toast.ts              # Toast notification hook
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
│   │   ├── Pricing.tsx               # Pricing & upgrade page
│   │   ├── Redirect.tsx              # Countdown redirect page
│   │   ├── PaymentSuccess.tsx        # Payment success page
│   │   └── PaymentFail.tsx           # Payment failed page
│   ├── 📁 routes/
│   │   ├── ErrorRoute.tsx            # 404 error page
│   │   ├── PrivateRoute.tsx          # Protected route wrapper
│   │   ├── PublicRoute.tsx           # Public route wrapper
│   │   └── Routes.tsx                # Main routing configuration
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # App entry point
│   └── index.css                     # Global styles
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML template
├── package.json                      # Dependencies & scripts
├── README.md                         # Frontend documentation
├── tsconfig.json                     # TypeScript config
├── tsconfig.app.json                 # App TypeScript config
├── tsconfig.node.json                # Node TypeScript config
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
│   │   │   ├── 📁 payment/
│   │   │   │   ├── payment.controller.ts # Payment handling
│   │   │   │   ├── payment.route.ts      # Payment routes
│   │   │   │   └── payment.service.ts    # SSLCommerz integration
│   │   │   ├── 📁 profile/
│   │   │   │   ├── profile.controller.ts # Profile CRUD
│   │   │   │   ├── profile.interface.ts  # Profile types
│   │   │   │   ├── profile.model.ts      # Profile schema
│   │   │   │   ├── profile.route.ts      # Profile routes
│   │   │   │   ├── profile.service.ts    # Profile business logic
│   │   │   │   └── profile.validation.ts # Profile validation
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
│   │   │       ├── user.model.ts         # Mongoose schema & hooks
│   │   │       ├── user.route.ts         # User routes
│   │   │       ├── user.service.ts       # Database operations
│   │   │       └── user.validation.ts    # Zod schemas
│   │   ├── 📁 utils/
│   │   │   ├── catchAsync.ts             # Async error wrapper
│   │   │   ├── cloudinary.ts             # Cloudinary integration
│   │   │   ├── emailService.ts           # Email sending service
│   │   │   ├── generateShortCode.ts      # Short URL generator
│   │   │   └── jwt.ts                    # JWT token utilities
│   │   └── routes.ts                     # Main route aggregator
│   ├── app.ts                            # Express app configuration
│   └── server.ts                         # Server entry point (local dev)
├── eslint.config.mjs                     # ESLint configuration
├── example.env                           # Environment template
├── package.json                          # Dependencies & scripts
├── tsconfig.json                         # TypeScript config
└── vercel.json                           # Vercel deployment config
```

**Backend Architecture:**
- **Modular Design**: Feature-based folder structure
- **MVC Pattern**: Separation of concerns (Model, Controller, Service)
- **Middleware Chain**: Request validation, authentication, error handling
- **Type Safety**: Full TypeScript coverage
- **Serverless Ready**: Vercel deployment configuration included

---

## 📡 3. API Documentation

For complete API documentation with detailed endpoint descriptions, request/response formats, and examples, see:

### **[📖 Complete API Documentation →](API_DOCUMENTATION.md)**

The API documentation includes:
- **User Authentication** - Register, Login, Email Verification, Password Reset
- **Profile Management** - Create, Read, Update with photo uploads
- **URL Management** - Create, List, Toggle, Delete, Analytics
- **Redirect Service** - Free vs Pro redirect behavior
- **Payment Integration** - SSLCommerz subscription flow
- **Error Handling** - Status codes and error formats
- **Request Examples** - Sample requests for all endpoints

### Quick Reference

**Base URLs:**
```
Local:      http://localhost:5000/api
Production: https://your-backend.vercel.app/api
```

**Authentication:**
Most endpoints require JWT token in HTTP-only cookie (`authToken`).

**Response Format:**
```json
// Success
{"success": true, "data": {...}}

// Error
{"success": false, "message": "Error", "errorSources": [...]}
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

#### Why Tailwind CSS + shadcn/ui?
- ✅ Rapid UI development with accessible components
- ✅ Consistent design system built on Radix UI primitives
- ✅ Utility-first approach (no CSS files to manage)
- ✅ Full TypeScript support and customizable components
- ✅ Small production bundle size (unused CSS is purged)
- ✅ Copy-paste components instead of npm dependencies

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
  fullName: String (required, min 3, max 50 chars)
  email: String (required, unique, indexed)
  password: String (required, hashed with bcrypt)
  isVerified: Boolean (default: false)
  verificationToken: String (optional, for email verification)
  verificationTokenExpires: Date (optional)
  passwordResetToken: String (optional, for password reset)
  passwordResetTokenExpires: Date (optional)
  status: String (default: "user", enum: admin|user|pro-user|blocked)
  proExpiresAt: Date (optional, Pro subscription expiry)
  timestamps: true (createdAt, updatedAt)
}
```

**Profile Schema:**
```typescript
{
  email: String (required, unique, ref: User)
  gender: String (Male|Female|Other)
  userPhoto: String (Cloudinary URL)
  country: String (optional)
  contactNumber: String (optional)
  bio: String (optional, max 200 chars)
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
- `email` unique indexed in User collection for fast authentication
- `email` unique indexed in Profile collection for user profile lookups
- `shortCode` unique indexed in URL collection for instant redirect lookups
- `unique` constraints on email and shortCode prevent duplicates

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


## 🚀 5. Deployment Guide

### Quick Deployment Overview

**Backend (Vercel):**
```bash
cd backend
vercel --prod
```

**Frontend (Netlify):**
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Detailed Deployment Instructions

**Backend (Vercel):**
- Deploy from GitHub (automatic deployments)
- Configure environment variables in Vercel dashboard
- Vercel automatically detects and deploys the serverless function

**Frontend (Netlify):**
- Build command: `npm run build`
- Publish directory: `dist`
- Configure `VITE_API_URL` environment variable

### Environment Variables

Ensure all environment variables are configured in your deployment platform:

**Vercel (Backend):**
- Go to Project Settings → Environment Variables
- Add all variables from `.env` file
- Deploy from Git (automatic deployments on push)

**Netlify (Frontend):**
- Go to Site Settings → Environment Variables
- Add `VITE_API_URL` with production backend URL
- Build settings: Command `npm run build`, Directory `dist`

### Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend connects to backend
- [ ] Database connection working
- [ ] Cloudinary uploads functional
- [ ] Email service configured
- [ ] Payment gateway tested (sandbox first)
- [ ] CORS configured correctly
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled
- [ ] Error monitoring setup

---

## 📚 Additional Documentation

### [📡 API Documentation](API_DOCUMENTATION.md)
Complete API reference with all endpoints, request/response formats, and examples:
- User Authentication (Register, Login, Email Verification, Password Reset)
- Profile Management (Create, Read, Update with photo uploads)
- URL Management (Create, List, Toggle, Delete, Analytics)
- Redirect Service (Free vs Pro redirect behavior)
- Payment Integration (SSLCommerz subscription flow)
- Error codes and response formats
- Request/response examples for all endpoints

---

## ⚠️ Known Limitations

### Current Limitations

1. **No Real-time Analytics**
   - Analytics refresh on page reload only
   - **Reason**: No WebSocket implementation yet
   - **Impact**: Click counts don't update live
   - **Workaround**: Refresh dashboard to see latest data

2. **Basic Logging**
   - Error logging is minimal
   - **Reason**: Focus on core features first
   - **Impact**: Harder to debug production issues
   - **Workaround**: Can integrate Winston or Pino logging

3. **Limited Testing**
   - No unit/integration tests included
   - **Reason**: Time constraints
   - **Impact**: Less confidence in code changes
   - **Workaround**: Manual testing performed on all endpoints

4. **No QR Code Generation**
   - Short URLs don't have QR codes
   - **Reason**: Scope prioritization
   - **Impact**: Users can't generate QR codes for sharing
   - **Feature**: Easy to add with qrcode library

5. **Basic URL Validation**
   - Simple URL format checking only
   - No check if destination URL is accessible
   - **Reason**: Performance considerations
   - **Impact**: User might create short URLs for broken links

6. **No Bulk Operations**
   - Can't create/delete multiple URLs at once
   - **Reason**: Scope limitation
   - **Impact**: Manual work for large operations
   - **Feature**: Can be added with batch processing

7. **Free Tier URL Limit**
   - 100 URLs maximum for free users
   - **Reason**: Business model (encourage Pro upgrade)
   - **Impact**: Free users need to delete old URLs
   - **Workaround**: Upgrade to Pro for unlimited URLs

8. **Single Payment Method**
   - Only SSLCommerz supported
   - **Reason**: Bangladesh-focused payment gateway
   - **Impact**: International users may face issues
   - **Feature**: Can add Stripe/PayPal for global support

9. **No Rate Limiting**
   - No request rate limiting implemented
   - **Reason**: Not implemented in MVP
   - **Impact**: Potential API abuse
   - **Workaround**: Can add express-rate-limit middleware

10. **Soft Delete Only**
   - URLs are deactivated, not permanently deleted by default
   - **Reason**: Design decision for data retention
   - **Impact**: Database grows over time
   - **Benefit**: Can restore accidentally deleted URLs

### Performance Considerations

- **Database Queries**: All queries are indexed for performance
- **File Uploads**: Handled through Cloudinary CDN
- **Serverless Functions**: 10-second timeout on Vercel free tier
- **MongoDB Atlas**: Free tier has 512MB storage limit
- **No Caching**: Redis/Memcached not implemented yet

---

## 🚀 Future Improvements

### High Priority

1. **Real-time Analytics**
   - WebSocket integration for live click updates
   - Real-time dashboard updates
   - Live visitor count
   - Push notifications for click milestones

2. **Advanced Analytics Dashboard**
   - Geographic location of clicks (IP-based)
   - Device and browser breakdown
   - Referrer source tracking
   - Interactive charts and graphs
   - Export analytics reports (CSV/PDF)
   - Click heatmap by time

3. **Rate Limiting & Security**
   - Express-rate-limit middleware
   - CAPTCHA for URL creation
   - URL safety checking (Google Safe Browsing API)
   - Abuse detection and blocking
   - IP-based rate limiting

4. **QR Code Generation**
   - Auto-generate QR codes for short URLs
   - Customizable QR code styles
   - Download QR codes as PNG/SVG
   - QR code tracking

### Medium Priority

5. **Bulk Operations**
   - Batch URL creation from CSV
   - Bulk delete/toggle status
   - Bulk import/export
   - API for programmatic access

6. **Team Collaboration**
   - Multiple users per account
   - Team folders/workspaces
   - Role-based permissions
   - Activity logs and audit trail

7. **Link Management Features**
   - Link expiration dates
   - Password-protected links
   - Link scheduling (activate at future date)
   - A/B testing with multiple destinations
   - Smart redirects based on device/location

8. **Enhanced Pro Features**
   - Branded domains (custom domain support)
   - Remove QuickShort branding
   - Priority support
   - Advanced analytics
   - API access

### Low Priority

9. **API & Integrations**
   - Public REST API with API keys
   - Zapier integration
   - Browser extensions (Chrome, Firefox)
   - Mobile apps (iOS, Android)
   - WordPress plugin

10. **Social Features**
    - Public profiles
    - Share URL collections
    - URL bookmarking
    - Social media integration

11. **Notifications**
    - Email notifications for milestones
    - Weekly/monthly reports
    - Subscription expiry reminders
    - Webhook support for click events

12. **Payment & Billing**
    - Multiple payment gateways (Stripe, PayPal)
    - Multiple subscription tiers
    - Annual billing discount
    - Invoice generation
    - Coupon codes and discounts

### Testing & Quality

13. **Comprehensive Testing**
    - Unit tests for all modules
    - Integration tests for API endpoints
    - E2E tests with Playwright/Cypress
    - Code coverage reporting

14. **Advanced Logging & Monitoring**
    - Structured logging with Winston or Pino
    - Error tracking with Sentry
    - Performance monitoring (APM)
    - Request/response logging

15. **DevOps & Infrastructure**
    - CI/CD pipeline (GitHub Actions)
    - Redis caching layer
    - CDN for static assets
    - Database replication
    - Automated backups

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

Special thanks to the following services and technologies:

- **[MongoDB Atlas](https://www.mongodb.com/)** - Cloud database hosting
- **[Cloudinary](https://cloudinary.com/)** - Image hosting and management
- **[SSLCommerz](https://www.sslcommerz.com/)** - Payment gateway for Bangladesh
- **[Vercel](https://vercel.com/)** - Backend deployment platform
- **[Netlify](https://www.netlify.com/)** - Frontend deployment platform
- **[React](https://reactjs.org/)** - UI library
- **[Express.js](https://expressjs.com/)** - Web framework  
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

---

## 👨‍💻 Author

**Mahfuz Ibne Syful**

- GitHub: [@mahfuz2411](https://github.com/mahfuz2411)
- Email: mahfuzibnesyful24@gmail.com

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

**Made with ❤️ by Mahfuz Ibne Syful**

</div>
