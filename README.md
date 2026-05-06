🚀 FlowTrack – Full Stack Team Task Manager

FlowTrack is a modern full-stack team collaboration and task management platform built to help teams organize projects, assign tasks, and track work progress efficiently using role-based access control.

The application provides separate dashboards and permissions for Admins and Members, allowing secure and structured team management.

🌐 Live :-https://teamtaskmanagerweb.netlify.app/

🔗 Frontend

https://app.netlify.com/projects/teamtaskmanagerweb/overview

🔗 Backend API

https://flowtrack-production-8558.up.railway.app

📌 Features
🔐 Authentication & Authorization
User Registration
User Login
JWT-based authentication
Protected API routes
Persistent login sessions
Secure role-based access control
👥 Role-Based Access System
👨‍💼 Admin Features

Admins can:

Create projects
Assign tasks to members
View all created tasks
Monitor task progress
Manage task statuses
Track dashboard analytics
👨‍💻 Member Features

Members can:

View assigned tasks only
Update task status
Access project details
Track personal task progress
📁 Project Management

Admins can:

Create projects
Add project descriptions
Organize tasks under projects

Each task is connected with a project and displays:

Project name
Project description

inside the task card.

✅ Task Management System
Task Features
Create tasks
Assign tasks to specific users
Set task descriptions
Connect tasks to projects
Track task progress
Task Status Workflow

Tasks move through different states:

Todo
In Progress
Completed

Members can update task statuses directly from:

Dashboard
Tasks page
📊 Dashboard Features

The dashboard provides real-time task insights including:

Total tasks
In-progress tasks
Completed tasks
Task filtering system
Dynamic task cards
Project-linked task display
🎨 Modern Responsive UI

FlowTrack includes a modern dashboard interface with:

Dark premium theme
Glassmorphism-inspired UI
Responsive sidebar
Mobile navigation support
Responsive task cards
Professional dropdown menus
Adaptive layouts for all screen sizes
📱 Fully Responsive Design

The application is optimized for:

Mobile phones
Tablets
Laptops
Desktop screens

Responsive features include:

Collapsible sidebar
Mobile hamburger navigation
Responsive grid system
Adaptive cards
Optimized spacing and typography
🛠️ Tech Stack
Frontend
React.js
Vite
Axios
React Router
Custom CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Deployment
Frontend → Netlify
Backend → Railway
📂 Project Structure
flowtrack/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── assets/
│   └── index.html
│
└── README.md
⚙️ Installation & Local Setup
1️⃣ Clone Repository
git clone https://github.com/saimabano072021-byte/flowtrack.git
cd flowtrack
🔧 Backend Setup
Navigate to backend folder
cd backend
Install dependencies
npm install
Create .env file

Inside the backend folder create:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start backend server
npm start

Backend will run on:

http://localhost:5000
💻 Frontend Setup
Navigate to frontend folder
cd frontend
Install dependencies
npm install
Start frontend server
npm run dev

Frontend will run on:

http://localhost:5173
🔒 API Security
JWT token verification
Protected routes middleware
Role-based authorization
Secure task access filtering
📈 Future Improvements

Potential future enhancements include:

Real-time notifications
WebSocket integration
Drag & Drop Kanban board
File attachments
Team chat system
Email notifications
Activity logs
Search & filtering improvements
🚀 Deployment Workflow
Backend Deployment
Railway used for backend hosting
Environment variables configured securely
Frontend Deployment
Netlify used for frontend hosting
GitHub auto-deployment enabled
👨‍💻 Author
Saima Bano

GitHub:
https://github.com/saimabano072021-byte/flowtrack

⭐ Conclusion

FlowTrack demonstrates:

Full-stack web development
REST API architecture
Authentication & Authorization
Role-based access control
Responsive dashboard UI
Real-world project structure
Deployment workflow

This project was developed as part of a technical assignment to showcase practical full-stack development skills.
