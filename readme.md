# Habit Randomizer v1

Habit Randomizer is a full-stack web application for managing and randomizing daily and weekly habits. Users can securely register, log in, add habits, view a randomized daily habit, and delete habits.

The project uses React for the frontend, Node.js/Express for the backend, and MongoDB for storage. It is fully deployed and accessible online.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete habits
- Random daily habit display
- Input sanitization for security
- Responsive design for mobile and desktop

## Demo

- **Frontend**: [https://habit-randomizer.netlify.app](https://habit-randomizer.netlify.app)

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Netlify (frontend), Render (backend)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB instance (local or Atlas)

### Installation

````bash
# Clone repository
git clone https://github.com/yourusername/habit-randomizer.git
cd habit-randomizer

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

Environment Variables
Create a .env file in server/:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Create a .env file in client/:
VITE_API_URL=your_api_url

Running the App
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev

API Endpoints
User

POST /api/users/register – Register a new user
POST /api/users/login – Log in a user
GET /api/users/me – Get the authenticated user

Habits

POST /api/habits – Create a habit
GET /api/habits – Get all user habits
PUT /api/habits/:habitId – Update a habit
DELETE /api/habits/:habitId – Delete a habit

All habit endpoints require a JWT token in the Authorization header.
License
MIT License```

##Known bugs
-Netlify Production Fetch Issue
On mobile devices, requests to the backend fail with 404 or network error when using the production frontend (https://habit-randomizer.netlify.app).
Likely causes: environment variables not properly injected on Netlify, or routing issues in React/Vite build.
-Undefined Base URL in Fetch Requests
Some fetch requests resolve to /undefined/api/habits, indicating VITE_API_URL or REACT_APP_API_URL is missing or not correctly loaded in production.
-CORS Issues on Mobile / External Devices
-Backend may block requests from devices outside localhost if CORS isn’t correctly configured. Currently using app.use(cors()), but stricter policies may affect mobile access.
-Daily Habit Display Timing
Randomized habit may not update at midnight; it currently selects a random habit on page load rather than per day.
-Error Handling Messages
Some fetch errors show raw HTML (404 pages) instead of JSON error messages, which can break UI parsing.
-JWT Expiration / Token Refresh
Tokens are valid for 1 hour. There’s no refresh mechanism, so users may be logged out unexpectedly without a clear message.
-Mobile Styling
-Minor CSS/layout issues on smaller screens in production.
-Input Validation
-Frontend sanitization exists, but some edge cases (like empty strings or overly long inputs) may not be fully handled.
````
