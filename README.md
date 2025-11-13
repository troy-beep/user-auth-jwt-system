# User Authentication System with JWT

Complete user authentication system with registration, login, JWT tokens, and protected endpoints.

## Features

- ✅ User registration with email/password
- ✅ Password hashing with bcrypt
- ✅ User login with credential verification
- ✅ JWT token generation on successful login
- ✅ Protected routes with JWT middleware
- ✅ Token expiration handling
- ✅ Input validation
- ✅ Error handling

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT implementation
- **dotenv** - Environment variables

## Installation

```bash
# Clone repository
git clone https://github.com/troy-beep/user-auth-jwt-system.git
cd user-auth-jwt-system

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and set your JWT_SECRET
# JWT_SECRET=your_super_secret_jwt_key_here

# Start server
npm start

# Or use nodemon for development
npm run dev
```

## API Endpoints

### Public Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "createdAt": "2025-11-13T08:40:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Protected Endpoints

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### 3. Get User Profile
```http
GET /api/protected/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "createdAt": "2025-11-13T08:40:00.000Z"
  }
}
```

#### 4. Get Dashboard
```http
GET /api/protected/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to your dashboard!",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com"
    },
    "stats": {
      "loginCount": 1,
      "lastLogin": "2025-11-13T08:40:00.000Z"
    }
  }
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Access Protected Route
```bash
curl -X GET http://localhost:3000/api/protected/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Project Structure

```
user-auth-jwt-system/
├── config/
│   └── db.js              # In-memory database
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── routes/
│   ├── auth.js            # Registration & login routes
│   └── protected.js       # Protected routes
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── server.js              # Main server file
└── README.md
```

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication with 24h expiration
- **Input Validation**: Email format and password strength validation
- **Error Handling**: Proper error messages without exposing sensitive info
- **Token Verification**: Middleware checks token validity on protected routes

## Environment Variables

```env
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
PORT=3000
```

⚠️ **Important**: Change `JWT_SECRET` to a strong random string in production!

## Production Considerations

This is a basic implementation. For production:

1. **Replace in-memory DB** with PostgreSQL/MongoDB
2. **Add rate limiting** to prevent brute force attacks
3. **Implement refresh tokens** for better security
4. **Add HTTPS** for secure communication
5. **Use helmet.js** for security headers
6. **Add CORS** configuration
7. **Implement password reset** functionality
8. **Add email verification**
9. **Use environment-specific configs**
10. **Add logging** (Winston/Morgan)

## License

MIT
