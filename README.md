# 📚 Student CRUD Application

This project is a simple **CRUD (Create, Read, Update, Delete)** application built for students at **Scoop Labs** to practice **full-stack development** concepts, including **GitHub version control, CI/CD pipelines, and deployment**.

---

## 🚀 Features

- ➕ **Add new students**
- 📋 **View student list**
- ✏️ **Edit student details**
- ❌ **Delete student records**
- 🗄️ **Data stored in MongoDB**
- 🌐 **Frontend (React) + Backend (Node.js/Express)**
- ⚡ **Deployment with GitHub Actions (CI/CD)**

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Version Control:** Git & GitHub
- **CI/CD & Deployment:** GitHub Actions + AWS

---

## 🖥️ Getting Started

### 1️⃣ Clone the Repository

```bash or command prompt
git clone https://github.com/Scoop-Labs/student_crud_mern.git
cd student_crud_mern
code .
```

### 2️⃣ Install Dependencies

## Frontend

cd client
npm install

## Backend

cd ../server
npm install

### 3️⃣ Setup Environment Variables

Inside the server/ folder, create a .env file and add the following
PORT=3000
HOST=localhost
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.<id>.mongodb.net/<dbname>

### 4️⃣ Run the Project (Single Command 🚀)

npm run dev
This will:

- Start backend with **nodemon** on [http://localhost:3000]
- Start frontend on [http://localhost:5173]
- Connect to **MongoDB database** automatically using the `.env` configuration
- ✅ Both frontend & backend run together automatically using **concurrently**

### 🎯 Learning Goals for Students

Understand client-server architecture

Learn how to connect frontend with backend

Practice CRUD operations with MongoDB

Build React components & manage state

Use Git & GitHub for collaboration

Learn deployment of full-stack apps

Explore CI/CD pipelines with GitHub Actions
