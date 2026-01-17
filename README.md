Here is a **clean, beginner-friendly, copy-paste ready README** for your project.
It is written like a human, simple, and interviewer-friendly, with **examples included**.

---

# BookMyYatra – Full Stack Hotel Booking Platform

BookMyYatra is a full-stack hotel booking platform built using **Next.js (App Router)** for the frontend, **Node.js + Express** for the backend, and **Prisma ORM with PostgreSQL** for the database.

This project is structured in a way that works **both locally and in production** without changing the code.

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Fetch API
* JWT Authentication (LocalStorage)

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT

---

## Project Structure (High Level)

```
bookmyyatra/
├── app/                # Next.js frontend (App Router)
├── backend/            # Express + Prisma backend
├── public/             # Static assets
├── package.json
└── README.md
```

---

## Detailed Folder Structure

### Frontend (`app/`)

```
app/
├── admin/              # Admin panel pages
│   ├── dashboard/
│   ├── hotels/
│   │   ├── add/
│   │   ├── [id]/edit/
│   └── layout.jsx
│
├── auth/               # Authentication pages
│   ├── login/
│   └── signup/
│
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   ├── TopHotels.jsx
│   ├── AllRooms.jsx
│   └── ProtectedRoute.jsx
│
├── hotels/             # Public hotel listing
├── RoomDetails/        # Hotel details page
├── Payment/            # Payment page
├── ReviewYourBooking/  # Booking review
│
├── lib/                # Shared frontend logic
│   ├── config.js       # Backend URL resolver
│   ├── auth.js         # Auth API helpers
│   └── AuthContext.js  # Global auth state
│
├── layout.jsx
└── page.jsx
```

---

### Backend (`backend/`)

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── hotelController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── routes/
│   │   └── routes.js
│   │
│   └── utils/
│       └── generateToken.js
│
├── index.js
└── package.json
```

---

## Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_BACKEND_LOCAL_URL=http://localhost:5001
NEXT_PUBLIC_BACKEND_PROD_URL=https://bookmyyatra-backend.onrender.com
```

### Backend (`.env`)

```env
DATABASE_URL=postgresql://username:password@host:5432/dbname
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5001
FRONTEND_LOCAL_URL=http://localhost:3000
FRONTEND_DEPLOYED_URL=https://akash-jewellers-one.vercel.app/
```

---

## Backend URL Handling (Very Important)

All frontend API calls use **one single config file**.

### `app/lib/config.js`

```js
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD_URL
    : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;
```

This ensures:

* Local development uses localhost
* Production automatically uses Render URL
* No hardcoded URLs anywhere

---

## Authentication Flow (JWT + LocalStorage)

### On Login / Signup

* Backend returns a JWT
* Token is stored in `localStorage`

### Example: Store token

```js
localStorage.setItem("token", data.token);
```

### Sending token in API requests

```js
fetch(`${BACKEND_URL}/api/me`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

---

## Backend Auth Middleware Example

```js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;
  next();
};

module.exports = authMiddleware;
```

---

## Role Based Access (Admin)

Users have a `role` field in Prisma.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  role  String @default("USER")
}
```

### Admin Middleware

```js
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
```

---

## Admin Panel Features

Admins can:

* View dashboard
* Add hotels
* Edit hotels
* Delete hotels
* Manage listings

Admin pages are automatically shown in the navbar **only if the user role is ADMIN**.

---

## Running the Project Locally

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5001
```

---

### 2. Start Frontend

```bash
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Deployment

### Backend

* Hosted on Render
* Uses PostgreSQL (Neon)
* URL:

```
https://bookmyyatra-backend.onrender.com
```

### Frontend

* Hosted on Vercel
* Automatically uses production backend URL

---

## Common Issues Explained

### 401 Unauthorized

* Token missing or expired
* Authorization header not sent
* User not logged in

### Failed to fetch

* Backend URL incorrect
* Backend server not running
* CORS misconfiguration

### chrome-extension errors

Errors like:

```
chrome-extension://... ERR_FILE_NOT_FOUND
```

are caused by browser extensions and can be safely ignored.

---

## Future Enhancements

* Booking system
* Payment gateway
* Reviews and ratings
* Email notifications
* Admin analytics dashboard

