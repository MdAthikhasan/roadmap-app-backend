# 🔧 Roadmap App - Backend

This is the backend for the Roadmap app, built with **Node.js**, **Express**, and **MongoDB**. It exposes APIs for user authentication, roadmap items, and comment management.

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
- cors

## 🌐 API Base URL

`https://roadmap-app-backend.onrender.com`

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MdAthikhasan/roadmap-app-backend
cd roadmap-backend
```

2. Install dependencies
   npm install

3. Configure environment variables
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=https://roadmapapp-front-end.vercel.app
4. Start the server
   npm start
