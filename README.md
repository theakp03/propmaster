# 🏠 Propmaster – Full Stack Property Management System

Propmaster is a full-stack Property Management System designed to help landlords and tenants manage properties, leases, payments, and maintenance requests efficiently.

This project follows a modern full-stack architecture with a React + Vite + Tailwind frontend and a structured backend API.

---

## 📌 Project Structure

```
propmaster/
│
├── backend/                # Backend API server
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── api/            # Axios API handlers
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # App & Auth context
│   │   ├── guards/         # Route protection
│   │   ├── hooks/          # Custom hooks
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Role-based pages
│   │   └── utils/          # Helper functions
│   │
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Tech Stack

### 🎨 Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Context API
- Protected Routes

### ⚙ Backend
- Node.js / Express *(update if different)*
- REST API Architecture
- JWT Authentication *(if implemented)*
- Database (MongoDB / PostgreSQL — update accordingly)*

---

## 🌟 Features

### 🔐 Authentication
- Login & Register
- Role-based access (Landlord / Tenant)
- Protected routes

### 🏢 Property Management
- Add / Edit / Delete properties
- View property details
- Manage units

### 📄 Lease Management
- Create lease agreements
- Assign tenants
- Track lease duration

### 🛠 Maintenance System
- Tenant maintenance requests
- Kanban board tracking
- Status updates

### 💰 Payments System
- Record payments
- View payment history
- Track income

### 📊 Dashboard Widgets
- Occupancy rate
- Total income
- Recent payments
- Maintenance summary

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/theakp03/propmaster.git
cd propmaster
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
npm start
```

OR if using Python:

```bash
pip install -r requirements.txt
python app.py
```

Make sure you create a `.env` file in backend:

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend usually runs on:

```
http://localhost:5173
```

Backend usually runs on:

```
http://localhost:5000
```

---

## 🔌 API Structure

Example endpoints:

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user |
| GET    | /properties    | Get properties |
| POST   | /properties    | Add property |
| GET    | /leases        | Get leases |
| POST   | /maintenance   | Create request |
| GET    | /payments      | View payments |

---

## 🧠 Architecture Overview

Frontend communicates with backend via Axios API layer.

- `api/` handles all HTTP requests
- `context/` manages global state
- `guards/` protect routes based on role
- `layouts/` handle dashboard structure
- `widgets/` provide real-time summaries

---




## 🧪 Future Improvements

- Email notifications
- Payment gateway integration
- Advanced analytics
- Multi-property reports
- Admin panel
- Mobile responsive optimization

---

## 👨‍💻 Author

Akash Pandey  
GitHub: https://github.com/theakp03  

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ If You Like This Project

Give it a ⭐ on GitHub!

