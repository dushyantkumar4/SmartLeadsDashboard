# Lead Management Dashboard

## Backend Url => https://smartleadsdashboard.onrender.com

## Frontend Url => https://smart-leads-dashboard-nu-eosin.vercel.app

A full-stack Lead Management Dashboard built using the MERN Stack.

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- React Router DOM
- React Hot Toast

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role Based Access

## Lead Management

- Create Lead
- Update Lead
- Delete Lead
- View Single Lead
- View All Leads

## Advanced Features

- Search Leads
- Filter by Status
- Filter by Source
- Sort by Latest / Oldest
- Pagination
- Responsive UI
- Dark Mode

---

# Roles

## Admin

- Can view all leads
- Can manage all leads

## Sales User

- Can create leads
- Can only manage own leads

# Repository => https://github.com/dushyantkumar4/SmartLeadsDashboard

- after clone the repo cd to the folder & run command npm install , to start the projcet run the command as npm run dev for both frontend , backend

## auth endpoints

### Signup
- POST- baseUrl/api/register

### Login
- POST - baseUrl/api/login

### Create Lead
- POST - baseUrl/api

### Get all leads with pagination , search 
-GET - baseUrl/api?page=1

### Update Lead
- PATCH - baseUrl/api/:id

### Delete Lead 
- DELETE - baseUrl/api/:id

### Get single Lead in details 
- GET - baseUrl/api/:id