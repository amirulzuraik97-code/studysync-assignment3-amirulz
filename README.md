# StudySync MERN Task Manager

## Project Overview

StudySync is a full-stack MERN Task Management application that allows users to:

* Register and login securely
* Create and manage personal tasks
* Mark tasks as completed
* Edit and delete tasks
* Filter tasks by status
* Store data in MongoDB Atlas
* Access protected routes using JWT authentication

This project was built as a university assignment to demonstrate full-stack web development skills using the MERN stack.

---

# Features

## Authentication

* User registration
* User login
* JWT authentication
* Protected dashboard routes
* Logout functionality

## Task Management

* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Filter tasks by status

## User Features

* Each user has their own tasks
* Secure token-based authorization
* Responsive dashboard interface

---

# Technologies Used

## Frontend

* React.js
* Vite
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

# Project Structure

```bash
studysync/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

# Installation Guide

## Clone Repository

```bash
https://github.com/amirulzuraik97-code/studysync-assignment3-amirulz.git
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside backend:

```env
MONGO_URI=mongodb+srv://amirulzuraik97_db_user:ErikFinn2026@cluster0.jpxgnra.mongodb.net/studysync?appName=Cluster0
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

## Tasks

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | /api/tasks          | Get all tasks      |
| POST   | /api/tasks          | Create task        |
| PUT    | /api/tasks/:id      | Update task status |
| PUT    | /api/tasks/edit/:id | Edit task          |
| DELETE | /api/tasks/:id      | Delete task        |

---

# Screenshots

## Login Page

(Add screenshot here)

## Dashboard Page

(Add screenshot here)

## Task Management

(Add screenshot here)

---

# Future Improvements

* Due dates for tasks
* Task priority labels
* Better responsive design
* Drag and drop tasks
* Search functionality
* User profile page

---

# Author

Developed by Amirul ZuzU

---

# License

This project is for educational purposes.

# backend deploy
https://studysync-assignment3-amirulz.onrender.com

# frontend deploy
