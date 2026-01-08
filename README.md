# Project Name: QuickShort


## Overview
This is a full-stack web application built with:

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: MongoDB (Mongoose)

The project follows a modular and scalable architecture.
This README provides setup instructions, project structure, and an API documentation outline.

---

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- React Router
- Tailwind CSS
- DaisyUI
- SweetAlert2
- React Icons

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Zod (Validation)
- Multer + Cloudinary (File Upload)
- bcrypt (Password Hashing)

---

## 1. Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- npm / yarn
- Git

---

### Frontend Setup

```bash
cd frontend
npm install
```

#### Frontend Dependencies
```json
{
  "@tailwindcss/vite": "^4.1.18",
  "daisyui": "^5.5.14",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.11.0",
  "react-router-dom": "^7.11.0",
  "sweetalert2": "^11.26.17",
  "tailwindcss": "^4.1.18"
}
```

#### Run Frontend

``` bash
npm run dev
```

Frontend runs at:
http://localhost:5173

---

### Backend Setup

```bash
cd backend
npm install
```

#### Backend Dependencies
```json
{
  "bcrypt": "^6.0.0",
  "cloudinary": "^2.8.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.6.1",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^8.9.3",
  "multer": "^2.0.2",
  "zod": "^4.3.5"
}
```

#### Environment Variables
Create a .env file in the backend root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Run Backend
```bash
npm run dev
```

Backend runs at:
http://localhost:5000

---

## 2. Project Structure

### Frontend Structure

```
└── 📁frontend
    └── 📁public
        ├── vite.svg
    └── 📁src
        └── 📁assets
            ├── react.svg
        └── 📁auth
            ├── Login.tsx
            ├── Register.tsx
        └── 📁components
            ├── Navbar.tsx
        └── 📁config
            ├── index.tsx
        └── 📁constants
        └── 📁contexts
            ├── AuthProvider.tsx
        └── 📁hooks
            ├── useAuth.tsx
        └── 📁pages
            └── 📁dashboard
                ├── Analytics.tsx
                ├── CreateURL.tsx
                ├── Dashboard.tsx
                ├── DHome.tsx
                ├── List.tsx
                ├── Profile.tsx
            ├── About.tsx
            ├── Home.tsx
            ├── Pricing.tsx
        └── 📁routes
            ├── ErrorRoute.tsx
            ├── PrivateRoute.tsx
            ├── PublicRoute.tsx
            ├── Routes.tsx
        ├── App.tsx
        ├── index.css
        ├── main.tsx
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---

### Backend Structure

```
└── 📁backend
    └── 📁src
        └── 📁app
            └── 📁config
                ├── index.ts
            └── 📁middlewares
                ├── authenticatedRequest.ts
                ├── globalErrorHandler.ts
                ├── notFound.ts
                ├── upload.ts
                ├── validateRequest.ts
            └── 📁modules
                └── 📁redirect
                    ├── redirect.controller.ts
                    ├── redirect.route.ts
                    ├── redirect.service.ts
                    ├── redirect.validation.ts
                └── 📁url
                    ├── url.controller.ts
                    ├── url.interface.ts
                    ├── url.middleware.ts
                    ├── url.model.ts
                    ├── url.route.ts
                    ├── url.service.ts
                    ├── url.validation.ts
                └── 📁user
                    ├── user.controller.ts
                    ├── user.interface.ts
                    ├── user.middleware.ts
                    ├── user.model.ts
                    ├── user.route.ts
                    ├── user.service.ts
                    ├── user.validation.ts
            └── 📁utils
                ├── catchAsync.ts
                ├── cloudinary.ts
                ├── generateShortCode.ts
                ├── jwt.ts
            ├── routes.ts
        ├── app.ts
        ├── server.ts
    ├── .env
    ├── .gitignore
    ├── .prettierrc.json
    ├── eslint.config.mjs
    ├── example.env
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```

---

## 3. API Documentation

### Base URL
http://localhost:5000/api

### Authentication
JWT based authentication  
Protected routes require Authorization header:

Authorization: Bearer <token>

---

## User APIs

### Create User
```POST /api/user/create  ```

Multipart form-data (userPhoto optional)

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "Male",
  "country": "Bangladesh",
  "contactNumber": "01700000000"
}
```

Response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "user_id",
    "email": "john@example.com",

    //rests
    "status": "user"
  }
}
```

Possible Errors:
- Email already exists
- Validation error

---

### Login User
```POST /api/user/login```

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

Error Response:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Logout User
```POST /api/user/logout```

Response:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Get Logged-in User
```GET /api/user/me  ```

Protected Route

Response:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "Male",
    "status": "user"
  }
}
```

---

## URL APIs

### Create Short URL
```POST /api/url/create  ```

Protected Route

Request Body:
```json
{
  "originalUrl": "https://example.com"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "url_id",
    "originalUrl": "https://example.com",
    "shortCode": "abc123",
    "shortUrl": "http://localhost:5000/redirect/abc123",
    "clicks": 0,
    "status": true
  }
}
```

---

### Get My URL List
```GET /api/url/list  ```

Protected Route

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "url_id_1",
      "originalUrl": "https://example.com",
      "shortCode": "abc123",
      "clicks": 12,
      "status": true,
      "createdAt": "2024-01-01T10:00:00Z"
    },
    {
      "id": "url_id_2",
      "originalUrl": "https://google.com",
      "shortCode": "xyz789",
      "clicks": 4,
      "status": true,
      "createdAt": "2024-01-02T12:30:00Z"
    }
  ]
}
```

---

### Soft Delete URL
```DELETE /api/url/softdelete  ```

Protected Route

Request Body:
```json
{
  "urlId": "url_id_1"
}
```

Response:
```json
{
  "success": true,
  "message": "URL deleted successfully"
}
```

---

### User Dashboard Stats
```GET /api/url/stats  ```

Protected Route

Response:
```json
{
  "success": true,
  "data": {
    "totalUrls": 5,
    "activeUrls": 4,
    "totalClicks": 120
  }
}
```

---

## Redirect API

### Redirect Short URL
```GET /redirect/:shortCode```


Example:
GET /redirect/abc123

Behavior:
- Finds URL by shortCode
- Increments clicks count
- Redirects to originalUrl

Error Response:
```json
{
  "success": false,
  "message": "Short URL not found or inactive"
}
```

---

## Validation Errors

Response:
```json
{
  "success": false,
  "message": "Validation error message",
  "errors": {
    "body": {
      "email": {
        "_errors": [
          "Invalid email format."
        ]
      }
    }
  }
}
```

---

## Global Error Response

Response:
```json
{
  "success": false,
  "message": "Something went wrong"
}
```

Duplicate Key Error Example:
```json
{
  "success": false,
  "message": "email already exists"
}
```



---

## 4. Design Decisions

- TypeScript used across frontend and backend for type safety
- MVC-inspired architecture in backend
- Zod used for request validation
- JWT authentication for secure API access
- Cloudinary used for image and file uploads
- Tailwind CSS with DaisyUI for fast UI development

---

## Known Limitations

- An email-based authentication or verification system was not implemented.  
  Implementing such a system would require additional infrastructure like Redis or a job queue, which could increase system complexity, execution time, and the likelihood of runtime errors. Due to time constraints and scope considerations, this feature was intentionally excluded.

- Error logging is implemented at a basic level.  
  To prioritize core API structure and functionality within a limited timeframe, advanced logging and monitoring mechanisms were not fully developed.

- Although all APIs were tested individually, comprehensive end-to-end testing and exhaustive test coverage were not performed.

- The frontend does not use ShadCN UI components.  
  While ShadCN could improve UI consistency, it occasionally introduces complex issues that require significant debugging time. To ensure timely delivery, it was not included in this project.

- Only basic URL verification is implemented, which may not cover all edge cases or malicious URLs.

---

## Future Improvements

- The primary improvement will be to address and implement the features listed under Known Limitations.

- Role-based access control can be extended further by introducing additional roles such as admin and pro-user.

- A payment system can be integrated to support premium or subscription-based features.

- An advanced URL verification and validation system can be implemented to enhance security and reliability.


---

## Author
Mahfuz Ibne Syful
