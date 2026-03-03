 Job Tracker 

A Job Tracker web application built using **React, Node.js, Express, PostgreSQL, and Prisma ORM**.

This application helps users track their job applications, monitor application status, filter/search jobs, and view statistics — all with secure authentication.

---

## 📌 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT-based Authentication
* Secure password hashing using bcrypt
* Protected routes (Frontend + Backend)

### 💼 Job Management

* Add new job application
* Update job status (APPLIED / INTERVIEW / OFFER / REJECTED)
* Delete job
* View all jobs

### 🔍 Advanced Backend Features

* Pagination
* Filter by status
* Search by company or role
* Job statistics API (status count)
* Request validation using Zod

### 🎨 Frontend Features

* Responsive UI
* Protected Dashboard
* Clean navigation
* Axios API integration
* LocalStorage-based session handling

---

# 🧱 Tech Stack

## Frontend

* React (Vite)
* React Router DOM
* Axios
* Custom CSS (Responsive UI)

## Backend

* Node.js
* Express.js
* JWT (jsonwebtoken)
* bcryptjs
* Zod (Validation)

## Database

* PostgreSQL
* Prisma ORM

## Dev Tools

* Nodemon
* Git & GitHub

---

# 📂 Project Structure

```
job-tracker/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
│
├── server/                # Express Backend
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── validators/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Job_tracker.git
cd Job_tracker
```

---

## 2️⃣ Backend Setup

```bash
cd server
npm install
```

### Create `.env` file inside `server/`

```
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/job_tracker"
JWT_SECRET=your_secret_key
```

### Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

### Start Backend

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## 🔐 Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

---

## 💼 Job Routes (Protected)

| Method | Endpoint        | Description                             |
| ------ | --------------- | --------------------------------------- |
| POST   | /api/jobs       | Create job                              |
| GET    | /api/jobs       | Get all jobs (pagination/filter/search) |
| GET    | /api/jobs/stats | Get job statistics                      |
| PUT    | /api/jobs/:id   | Update job                              |
| DELETE | /api/jobs/:id   | Delete job                              |

---

# 📊 Example Features

### Pagination

```
GET /api/jobs?page=1&limit=10
```

### Filter by Status

```
GET /api/jobs?status=APPLIED
```

### Search

```
GET /api/jobs?search=google
```

### Statistics

```
GET /api/jobs/stats
```

---

# 🔒 Security

* Passwords hashed using bcrypt
* JWT authentication
* Protected backend routes
* Input validation using Zod
* Environment variables for sensitive data

---

# 💡 What I Learned

* Building a full-stack PERN application
* Implementing secure authentication
* Using Prisma ORM with PostgreSQL
* Designing RESTful APIs
* Implementing pagination & filtering
* Connecting frontend with backend
* Structuring scalable backend architecture

---

# 🚀 Future Improvements

* Swagger API documentation
* Deployment (Render / Railway / Vercel)
* Role-based authentication
* UI enhancement with Tailwind or Material UI
* Email verification

---

# 📷 Screenshots

<img width="1856" height="934" alt="Screenshot (558)" src="https://github.com/user-attachments/assets/281e7ccf-265f-43bb-be74-8253673ae5de" />
<img width="1878" height="958" alt="Screenshot (559)" src="https://github.com/user-attachments/assets/eadf3a47-e140-4bb5-a304-a858df8051a1" />
<img width="1884" height="927" alt="Screenshot (560)" src="https://github.com/user-attachments/assets/fa86540e-04f9-4f81-a44b-b58a84810fc3" />


---

# 🎥 Demo Video

https://www.loom.com/share/1e7fe77936054decaf0190f8ceaff62c

---

# 👩‍💻 Author

**Laxmi**

GitHub: https://github.com/Laxmi-kjmp525

---

If you found this project helpful, feel free to ⭐ the repository!
