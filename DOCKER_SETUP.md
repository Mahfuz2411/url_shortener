# Docker Setup Guide

This guide will help you run the URL Shortener application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env` file in the root directory (same level as docker-compose.yml):

```bash
cp .env.docker .env
```

Then edit `.env` and set your MongoDB credentials:

```env
MONGO_USERNAME=your_username
MONGO_PASSWORD=your_secure_password
```

**⚠️ IMPORTANT:** 
- Use strong passwords in production
- Never commit the `.env` file to git (it's already in .gitignore)

### 2. Configure Backend Environment

Make sure your `backend/.env` file is properly configured. See `backend/example.env` for reference.

Key variables to set:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=  # This will be overridden by docker-compose
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
# ... other variables
```

### 3. Build and Run

Start all services:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

### 4. Check Status

```bash
docker-compose ps
```

### 5. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### 6. Stop Services

```bash
docker-compose down
```

To remove volumes as well (⚠️ this will delete database data):

```bash
docker-compose down -v
```

## Accessing the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **MongoDB:** localhost:27017

## Troubleshooting

### Port Already in Use

If ports 3000, 5000, or 27017 are already in use, you can change them in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Change frontend port to 8080
```

### MongoDB Connection Issues

Make sure the credentials in `.env` match what you're using in `backend/.env` DATABASE_URL.

### Rebuild After Code Changes

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

## Production Deployment

For production:

1. ✅ Use strong, unique passwords
2. ✅ Set `NODE_ENV=production`
3. ✅ Use environment-specific URLs
4. ✅ Enable SSL/TLS
5. ✅ Configure proper backup for MongoDB
6. ✅ Use Docker secrets for sensitive data (Docker Swarm)
7. ✅ Implement proper logging and monitoring

## Security Notes

- The `.env` file is git-ignored and should never be committed
- Default credentials in `.env.docker` are for development only
- Always use strong passwords in production
- Consider using Docker secrets for production deployments
