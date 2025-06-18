# 🌟 Product Ratings & Reviews App

A full-stack web application that allows users to submit star-based ratings and text reviews for listed products. Users can view the average rating and all submitted reviews for each product.

---

## 🚀 Live Demo

> _Coming soon – deploy your app using Render, Vercel, or Netlify for frontend and backend hosting._

---


## 🛠️ Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | React.js, Bootstrap, React Icons |
| Backend     | Node.js, Express.js              |
| Database    | MongoDB (local or Atlas)         |
| API         | RESTful API                      |

---

## 🔑 Features

- 📦 Product listing (dummy data)
- ⭐ Interactive 5-star rating system
- 📝 Review submission with form validation
- 📊 Dynamic average rating calculation
- 👀 Toggle to show/hide user reviews
- 📱 Fully responsive UI with Bootstrap

---

## 📁 Project Structure

product-review-app/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── ProductCard.js
│ │ └── App.js
│ └── public/
│
└── README.md

### 🔧 Prerequisites

Make sure you have installed:
- Node.js v14+
- npm (Node package manager)
- MySQL

---

### ⚙️ Installation

#### Step 1. Clone the Repository
```bash
git clone https://github.com/your-username/product-review-app.git
cd product-review-app
```
#### Step 2: Setup Backend
```bash
cd backend
npm install
npm start
```
Server runs at http://localhost:5000

#### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
npm start
```
App will be available at http://localhost:3000

## ✨ Features
⭐ Interactive 5-Star Rating System

✍️ Review Submission Form with Validation

📊 Dynamic Average Rating Calculation

👁️ Toggle to Show/Hide User Reviews

📱 Fully Responsive UI (Mobile-friendly)

🧪 Clean Code Structure with React Components

## 🧪 Testing the App
Open browser at http://localhost:3000

Choose any product displayed

Select a star rating and/or write a review

Submit the form

Click “View Reviews” to see all reviews for the product

