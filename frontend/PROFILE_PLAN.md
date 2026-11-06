# Supermarket E-Commerce Plan: User Profile Management & Details Update

This document outlines the architectural, data model, and UI/UX plan to implement a complete **Customer Profile Management** feature in the FreshCart supermarket platform.

---

## 1. Problem Statement & User Value

### Current Gap:
- In `Navbar.jsx`, the `User` icon button (`title="My Account"`) is a non-interactive placeholder.
- Customers cannot view or update their contact info (name, email, mobile number), manage delivery preferences, or access past orders for grocery re-ordering.

### Value for Grocery Shoppers:
1. **Frictionless Repeat Purchases:** Supermarket shoppers order the same basket of staples (milk, bread, eggs, veggies) weekly. An **Order History with 1-Click Reorder** feature significantly improves user retention.
2. **Accurate Delivery Details:** Seamlessly update delivery phone numbers, doorstep instructions (*"Leave with security"*, *"Ring bell"*), and multiple saved addresses (Home, Work, Parents).
3. **Personalized Grocery Experience:** Dietary preferences (Vegetarian, Vegan, Organic only) customize store browsing.

---

## 2. Information Architecture & Profile Sections

- **👤 Personal Details**: Name, Email, Phone (+91 10 digits), Avatar color/initials.
- **📦 Order History & Reorder**: Past orders, delivery status, 1-click reorder of items to active basket.
- **📍 Saved Addresses**: Home, Work, and other addresses synced with `LocationContext`.
- **⚙️ Preferences & Instructions**: Dietary preference tags and doorstep drop instructions.

---

## 3. Component & State Architecture

### 1. `UserContext.jsx` (`src/context/UserContext.jsx`)
Global state management persisted in `localStorage` (`freshcart_user_profile`):
- **User Profile State**:
  - `name`: string (e.g., *"Akhil R S"*)
  - `email`: string (e.g., *"akhil@example.com"*)
  - `phone`: string (e.g., *"+91 98765 43210"*)
  - `avatar`: string (preset avatar icons or initials)
  - `dietaryPreference`: `'all' | 'veg' | 'vegan' | 'organic'`
  - `deliveryInstruction`: string (e.g., *"Call before delivery and leave at door"*)
- **Order History State**:
  - Array of past orders with timestamps, status (*"Delivered"*, *"Out for Delivery"*), item list, and total amount in ₹.
  - Automatically appends new orders placed via `CheckoutModal`.
- **Actions**:
  - `updateProfile(newDetails)`: Validates and updates user details.
  - `addOrderToHistory(order)`: Records completed orders.
  - `reorderItems(orderId)`: Pushes all items from a past order straight into the active `CartContext` basket.

### 2. `ProfileModal.jsx` (`src/components/profile/ProfileModal.jsx`)
A responsive slide-over drawer / modal featuring:
- **Profile Header:** Avatar with edit badge, customer name, phone number, and loyalty status.
- **Navigation Tabs:**
  1. **Personal Information**: Editable form fields for Name, Email, and 10-digit Phone number with live validation and save indicator.
  2. **My Orders & Quick Reorder**: Clean cards showing previous orders, item count, date, delivery slot, and a prominent **"Reorder All Items"** button.
  3. **Saved Addresses**: Overview of addresses synced with `LocationContext` with Add/Edit/Remove buttons.
  4. **Preferences**: Dietary preferences toggle and delivery notes for riders.

---

## 4. Step-by-Step Implementation Roadmap

### Phase 1: State Management (`UserContext.jsx`)
- Create `src/context/UserContext.jsx` with default user profile and initial past mock orders.
- Implement `updateProfile`, `addOrderToHistory`, and `reorderItems` methods with `localStorage` syncing.

### Phase 2: Profile Modal & Personal Details
- Create `src/components/profile/ProfileModal.jsx` with tab switcher.
- Build editable personal information form with validation and toast notifications.
- Add avatar selector with clean colorful initials badges.

### Phase 3: Order History & 1-Click Reorder
- Display past order cards with item thumbnails, itemized counts, and date.
- Implement **"Reorder in 1-Click"**: automatically adds items from a previous order into the current cart drawer.

### Phase 4: Navbar, Checkout, & Location Integration
- Connect `Navbar.jsx` account button to open `ProfileModal`.
- Display customer name pill on the header (*"Hi, Akhil"*).
- Hook `CheckoutModal.jsx` order confirmation into `UserContext.addOrderToHistory`.

### Phase 5: Verification & Deployment
- Test updating profile details, persistence after refresh, and the 1-click reorder flow.
- Verify production build with `npm run build --prefix frontend`.
- Commit changes and push to GitHub repository.

