# 🚀 Team Task Manager (Full-Stack)

A full-stack web application to manage team projects, assign tasks, and track progress with role-based access (Admin & Member).

---

## 🌐 Live Demo

🔗 [Your Live App URL Here]

---

## 📦 GitHub Repository

🔗 [Your GitHub Repo Link Here]

---

## 🎥 Demo Video (2–5 min)

🔗 [Your Demo Video Link Here]

---

## 📌 Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Secure API access

### 👥 Role-Based Access

* **Admin**

  * Create projects
  * Assign tasks to members
  * View all created tasks
* **Member**

  * View assigned tasks only
  * Update task status

### 📁 Project Management

* Create projects (Admin only)
* Associate tasks with projects

### ✅ Task Management

* Create tasks with:

  * Title
  * Description
  * Project
  * Assigned user
  * Due date
* Track task status:

  * Todo
  * In Progress
  * Completed

### 📊 Dashboard

* Total tasks
* In-progress tasks
* Completed tasks
* Real-time updates (auto refresh)

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* CSS (Custom Design System)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Authentication

* JWT (JSON Web Token)

### Deployment

* Railway (Backend + Database)
* Vercel / Netlify (Frontend)

---

## ⚙️ API Overview

### Auth Routes

* `POST /api/auth/register`
* `POST /api/auth/login`

### Project Routes

* `POST /api/projects`
* `GET /api/projects`

### Task Routes

* `POST /api/tasks`
* `GET /api/tasks`
* `PUT /api/tasks/:id`

---

## 🧠 Architecture

* RESTful API design
* Role-based filtering handled in backend
* Clean separation of frontend and backend
* Reusable components and structured folders

---

## 🔒 Role Logic

* Admin sees tasks created by them
* Member sees tasks assigned to them
* Task filtering handled securely on backend

---

## 📱 Responsive Design

* Fully responsive UI
* Works on:

  * Desktop
  * Tablet
  * Mobile

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables

Create `.env` file in backend:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

## 📈 Future Improvements

* Real-time updates using WebSockets
* Task comments & attachments
* Email notifications
* Kanban board view

---

## 👨‍💻 Author

**Aditya Yadav**

---

## ⭐ Notes

This project was built as part of a technical assessment to demonstrate full-stack development skills, clean architecture, and role-based system design.

---
