# Supermarket E-Commerce Platform (SPM)

A modern, responsive, and customer-centric supermarket e-commerce web platform built with **React**, **Vite**, and **Tailwind CSS**.

---

## 📁 Project Structure

```text
spm/
├── frontend/             # React (Vite) + Tailwind CSS application
│   ├── src/
│   │   ├── components/   # Layout, Common, Home, Product, Cart, Checkout
│   │   ├── context/      # Cart & Location Contexts
│   │   ├── data/         # Mock categories, products, and banners
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── PLAN.md           # Detailed frontend architecture and UX plan
├── backend/              # Backend service directory
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Frontend Setup & Development

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start local development server
npm run dev
```

The application runs locally at `http://localhost:3000`.

### Build for Production

```bash
cd frontend
npm run build
```

---

## ✨ Key Features
- **INR Currency & Localization**: Native Indian Rupee (`₹`) pricing with standard metric units (`kg`, `g`, `L`, `ml`).
- **All Categories Showcase & Mega Drawer**: Multi-shelf category view grouping groceries by dedicated aisles with subcategory filtering and a 1-click slide-over category browser.
- **Instant Quantity Adjustment**: Direct `[-] [qty] [+]` controls on product cards.
- **Pack & Weight Selectors**: Dynamic unit pricing and weight variants.
- **Express 15–25m Delivery**: Delivery time-slot picker with quick delivery guarantee.
- **Gamified Basket Building**: Slide-over cart drawer with a dynamic "Free Delivery above ₹499" milestone progress bar.
- **Deals & Seasonal Offers**: Animated flash sales timer and promotional banner carousel with instant coupon redemption (`FRESH20`, `SUPER100`).
- **Indian Payment Stack**: UPI (Google Pay, PhonePe, Paytm), RuPay/Cards, Net Banking, and Cash on Delivery (COD).
- **Celebratory Checkout**: Multi-step checkout with celebratory order confirmation animations.

