# SK Car Shop - Modern Full-Stack Platform

A full-stack vehicle marketplace upgraded from legacy static HTML/CSS/JS to **Next.js (React 19)**, **Tailwind CSS**, **Framer Motion animations**, **Node.js + Express.js**, and **MySQL (XAMPP)**.

---

## 🚀 Architecture Overview

```
Car-Project/
├── backend/                  # Node.js + Express REST API
│   ├── server.js             # Express routes for cars (search, filter, add)
│   ├── db.js                 # MySQL pool connection with resilient fallback
│   ├── schema.sql            # SQL schema & seed data for XAMPP MySQL
│   ├── .env                  # Port and MySQL credentials
│   └── package.json
│
├── frontend/                 # Next.js 16 (App Router) + Tailwind CSS + Framer Motion
│   ├── public/images/        # Original car images, logos, and brand icons
│   └── src/
│       ├── app/              # Next.js pages, globals.css, and layouts
│       ├── components/       # Hero, 3D Aero Spotlight, Filters, Modals, Cards
│       └── types/            # TypeScript interfaces for car data
│
├── images/                   # Preserved original assets
├── index.html                # Preserved original HTML
└── style.css                 # Preserved original CSS
```

---

## 🛠️ Step 1: Set Up MySQL in XAMPP

1. Start **XAMPP Control Panel**.
2. Click **Start** on **Apache** and **MySQL**.
3. Open your browser and go to `http://localhost/phpmyadmin`.
4. Click **Import** or **SQL** tab and run the script located at:
   ```
   backend/schema.sql
   ```
   *(This creates the `car_shop` database and populates initial inventory).*

> **Note**: If XAMPP is not running, the Express backend automatically runs in **Resilient Mode** with memory storage so the app remains fully functional!

---

## ⚡ Step 2: Start the Backend (Express.js)

Open a terminal in the project directory:

```bash
cd backend
npm run dev
```

The API will start at `http://localhost:5000`.

### Available API Endpoints:
- `GET /api/health` - Check API and MySQL connectivity
- `GET /api/cars` - List cars (supports `?type=`, `?brand=`, `?model=`, `?minYear=`, `?maxPrice=`, `?search=`)
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Add a new vehicle to the MySQL database

---

## 🎨 Step 3: Start the Frontend (Next.js)

In a separate terminal window:

```bash
cd frontend
npm run dev
```

Open your browser at **`http://localhost:3000`**.

---

## ✨ Features Added

1. **Modern Aero Car Animations**:
   - Floating levitation vehicle stage in the Hero section.
   - Interactive 3D / 360° spin showcase with headlights toggle beam.
   - Hover cards with glowing neon gradients.

2. **Dynamic Search & Multi-Filter**:
   - Filter instantly by **Type** (Used/New), **Make**, **Min Year**, **Max Budget**, or **Keyword**.

3. **Database Integration**:
   - Live status indicator in the top navbar (`MySQL Live (XAMPP)` vs `Standby / Demo Mode`).
   - "List Vehicle" modal to add new car records directly to the MySQL database.
   - "Buy Now" celebratory confetti feedback with modal specs inspection.
