# 🎓 UniFlow – Campus Management Backend (Training Project)

This is a **real industry-style backend project** designed for students to learn how work actually happens in software companies (MNC-style).

Students will learn:

- Node.js + Express backend development
- Clean, modular folder structure
- Git branching and PR workflow
- Working on assigned tasks only (just like in teams)
- Writing and testing APIs
- Basic auth, students, attendance, exams, library, placement, admin dashboard, and chat modules

---

## 🧠 Project Idea

We simulate a campus management backend system called **UniFlow**. Each student is treated like a backend developer in a real project.

- All students use the **same GitHub repository**.
- Each student gets a **unique task** from `tasks.xlsx`.
- Tasks are divided into modules: `Auth`, `Students`, `Attendance`, `Faculty`, `Exams`, `Library`, `Placement`, `Admin`, `Chat`, etc.
- Students work only on their assigned API/feature in a separate Git branch.

---

## 🗂 Folder Structure

```bash
uniflow-campus-backend/
├── package.json
├── .gitignore
├── .env.example
├── README.md
├── tasks.xlsx
└── src/
    ├── server.js
    ├── app.js
    ├── config/
    │   └── env.js
    ├── data/
    │   ├── students.js
    │   ├── faculty.js
    │   ├── attendance.js
    │   ├── exams.js
    │   ├── library.js
    │   └── placements.js
    ├── controllers/
    │   ├── adminController.js
    │   ├── attendanceController.js
    │   ├── authController.js
    │   ├── chatController.js
    │   ├── examController.js
    │   ├── facultyController.js
    │   ├── libraryController.js
    │   ├── placementController.js
    │   └── studentController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorHandler.js
    └── routes/
        ├── adminRoutes.js
        ├── attendanceRoutes.js
        ├── authRoutes.js
        ├── chatRoutes.js
        ├── examRoutes.js
        ├── facultyRoutes.js
        ├── index.js
        ├── libraryRoutes.js
        ├── placementRoutes.js
        └── studentRoutes.js
```

---

## ⚙️ 1. Setup Instructions (Trainer & Students)

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git

### Step 1: Clone the Repository

Trainer will share the GitHub repo URL.

```bash
git clone <REPO_URL>
cd uniflow-campus-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

You can keep the default values for training.

### Step 4: Run the Backend

```bash
npm run dev
```

Server will start on:

```text
http://localhost:5000
```

Test in browser or Postman:

```text
GET http://localhost:5000/
```

You should see a JSON response with app info.

---

## 🌿 2. Git & Branching Workflow (For Students)

> **Very important:** Each student must work only on their own branch and own task.

### Step 1: Configure Git (only once per machine)

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 2: Create Your Branch

Branch name format (example suggestions):

```text
feature/TASK-01-BE001
feature/TASK-12-Roll-45
fix/TASK-33-bug-validation
```

Create and switch to your branch:

```bash
git checkout -b feature/TASK-01-BE001
```

### Step 3: Implement Only Your Task

Open `tasks.xlsx` → find your row:

- **Task ID**
- **Module**
- **API / Feature**
- **Endpoint**
- **Method**
- **Description**
- **Suggested Branch Name**

Go to the correct file based on your module:

- `Auth` → `src/routes/authRoutes.js`, `src/controllers/authController.js`
- `Students` → `src/routes/studentRoutes.js`, `src/controllers/studentController.js`
- `Attendance` → `src/routes/attendanceRoutes.js`, etc.

**Do not** touch other modules unless the task says so.

### Step 4: Run & Test Locally

Use Postman/Thunder Client to test your endpoint.

Examples:

- `GET http://localhost:5000/api/students`
- `POST http://localhost:5000/api/auth/login`
- `GET http://localhost:5000/api/library/books`

### Step 5: Commit Your Changes

```bash
git status
git add .
git commit -m "TASK-01: Implemented student list API"
```

### Step 6: Push Branch to GitHub

```bash
git push origin feature/TASK-01-BE001
```

### Step 7: Create a Pull Request (PR)

1. Go to GitHub → Repository.
2. Click **Compare & pull request**.
3. Set **base branch** = `main`.
4. Set **compare branch** = your feature branch.
5. Use title format: `TASK-01: Student List API`
6. Fill description:
   - What you implemented
   - Files changed
   - How to test
7. Submit PR for review.

Trainer will **review**, add comments, and then **approve/merge**.

---

## 📊 3. Task Sheet – `tasks.xlsx`

The file `tasks.xlsx` contains **80 tasks** spread across modules like:

- Auth
- Students
- Attendance
- Faculty
- Exams
- Library
- Placement
- Admin Dashboard
- Chat
- Notifications / Misc

Each task has columns like:

- `Task ID` (e.g., `TASK-01`)
- `Module`
- `API / Feature`
- `HTTP Method`
- `Endpoint`
- `Description`
- `Suggested Branch Name`
- `Difficulty`
- `Deadline`
- `Status` (with dropdown)
- `Assigned To (Roll No)` (trainer fills later)

`Status` options (dropdown):

- Not Started
- In Progress
- In Review
- Completed
- Blocked

Trainers can filter by module, status, or student to track progress.

---

## 🧪 4. Sample APIs (Already Implemented)

You already have some sample endpoints ready:

- `GET /api/students` – Get mock list of students
- `GET /api/students/:id` – Get single student
- `POST /api/students` – Create mock student
- `POST /api/auth/login` – Mock login
- `GET /api/attendance` – Get attendance records
- `POST /api/attendance` – Mark attendance
- `GET /api/library/books` – Get books
- `GET /api/exams` – Get exams
- `GET /api/placements` – Get placement opportunities
- `GET /api/admin/dashboard` – Get admin stats
- `GET /api/chat/messages` – Get chat messages
- `POST /api/chat/messages` – Send chat message

Students will **extend** and **improve** these based on their assigned tasks.

---

## 🎯 5. Trainer Flow (Step-by-Step)

1. Upload this project to **GitHub** under your account.
2. Share repo URL + this README in class group.
3. Share or project the `tasks.xlsx` file.
4. Assign **Task IDs** to students (roll-number-based mapping).
5. Each student:
   - Clones repo
   - Creates branch using suggested name
   - Implements their assigned task
   - Pushes and creates PR
6. You review PRs:
   - Check code quality
   - Add comments
   - Request changes if needed
   - Approve and merge

This perfectly simulates a **real software team workflow**.

---

## 🚀 Next Ideas

Once basic tasks are done, you can extend the project:

- Add real database (MongoDB / PostgreSQL)
- Add JWT authentication
- Connect with a React/Next.js frontend
- Add Swagger API docs
- Add logging & error tracking

For now, this project is kept **simple and mock-data based** so students can focus on:

> Git, branches, PRs, clean APIs, and teamwork. 🙌

---

Happy building! 💻🔥
