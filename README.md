# 🛒 QuickCart - E-commerce Website

A full‑stack **E‑Commerce Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with **Stripe** integrated for secure payment processing.

🚧 **Note:** This project is **not live / not deployed** and uses **Stripe Test Mode only**. It is intended for learning, development, and portfolio demonstration purposes.

---

## ✨ Features

### 👤 User Features

* User authentication (Register / Login)
* Browse products
* View product details
* Add products to cart
* Secure checkout using **Stripe Payment Gateway**
* Order summary after successful payment

### 🛠️ Admin Features

* Add new products
* Update existing products
* Delete products
* Manage product listings

### 💳 Payments

* Stripe Checkout integration
* Test payments only (No real transactions)

---

## 🧰 Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM
* CSS / Bootstrap / Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)

### Payment Gateway

* Stripe (Test Mode)

---

## 📁 Project Structure

```
mern-ecommerce/
│
├── frontend/            # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/             # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
├── .env
├── README.md
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **backend** directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

⚠️ **Important:** Use Stripe **test keys only**.

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce
```

### 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

The application will run locally at:

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend:** [http://localhost:5000](http://localhost:5000)

---

## 🧪 Stripe Test Card Details

Use the following Stripe test card for payments:

* **Card Number:** 4242 4242 4242 4242
* **Expiry Date:** Any future date
* **CVV:** Any 3 digits
* **ZIP Code:** Any

---


## 🚀 Future Enhancements

* Order history for users
* Admin dashboard
* Pagination
* Improved UI/UX
* Deployment (Vercel / Render / AWS)

---
⭐ If you like this project, consider giving it a star!
