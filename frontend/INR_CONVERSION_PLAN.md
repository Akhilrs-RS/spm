# Supermarket E-Commerce Plan: Dollar ($) to Indian Rupee (INR - ₹) Conversion

This document details the transition from US Dollar (`$`) to Indian Rupee (`₹` / INR), tailoring the supermarket platform for Indian consumers, including realistic grocery pricing, metric units (kg, g, L), Indian delivery economics, and localized payment methods (UPI, GPay, PhonePe, COD).

---

## 1. Objectives & Localization Strategy

1. **Centralized Currency Formatter**:
   - Introduce a reusable `formatINR(amount)` utility utilizing JavaScript's native `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
   - Avoid scattered hardcoded `$` or `₹` signs.
2. **Realistic Indian Supermarket Pricing**:
   - Replace direct raw multiplier math with realistic, familiar Indian supermarket pricing (e.g., Farm fresh apples: ₹189/kg, Amul/Organic Whole Milk: ₹68/L, Sourdough Bread: ₹120, Atta/Rice: ₹249/5kg).
3. **Metric Weights & Pack Units**:
   - Transition from imperial units (`lb`, `fl oz`) to standard Indian grocery units (`kg`, `g`, `L`, `ml`, `Pack`, `Dozen`).
4. **Indian Delivery Economics**:
   - **Free Delivery Threshold:** ₹499 (Standard Indian quick-commerce / grocery standard like Blinkit/Zepto/Instamart).
   - **Standard Delivery Fee:** ₹39 or ₹49 (Waived when order is ₹499+).
   - **Express ETA:** 15–25 minutes.
5. **Localized Payment & Address Stack**:
   - **Payment Methods:** UPI (Google Pay, PhonePe, Paytm, BHIM QR), Credit/Debit Cards (RuPay, Visa, Mastercard), Net Banking, and Cash on Delivery (COD).
   - **Address Fields:** Flat/House No., Building, Street/Area, City (e.g. Bengaluru, Mumbai, Delhi), and 6-digit PIN Code (e.g. 560038).

---

## 2. Price & Metric Unit Mapping Table

| Category | Item Name | Current USD Price & Unit | Target INR Price & Unit Options |
| :--- | :--- | :--- | :--- |
| **Produce** | Organic Honeycrisp Apples | \$3.49 / lb | **₹189** / 1 kg (Options: 500g: ₹99, 1 kg: ₹189, 2 kg: ₹360) |
| **Produce** | Fresh Hass Avocados | \$4.99 / pack (3-count) | **₹199** / 2 pcs (Options: 2 pcs: ₹199, 4 pcs: ₹379) |
| **Produce** | Tender Baby Spinach (Palak) | \$2.89 / 5 oz | **₹39** / 250g bunch (Options: 250g: ₹39, 500g: ₹72) |
| **Produce** | Robusta / Cavendish Bananas | \$1.29 / bunch | **₹49** / 1 kg (~5-6 pcs) |
| **Produce** | Fresh Desi / Hybrid Tomatoes | \$2.49 / lb | **₹45** / 1 kg (Options: 1 kg: ₹45, 2 kg: ₹85) |
| **Produce** | Fresh Lemons | \$1.99 / bag | **₹29** / 4 pcs (Options: 4 pcs: ₹29, 8 pcs: ₹52) |
| **Dairy** | Farm Fresh Whole Milk | \$4.29 / half gallon | **₹68** / 1 Liter (Options: 500 ml: ₹35, 1 L: ₹68, 2 L: ₹130) |
| **Dairy** | Farm Fresh Brown/White Eggs | \$5.49 / dozen | **₹99** / 6-Pack (Options: 6 pcs: ₹99, 12 pcs: ₹189) |
| **Dairy** | Greek Strained Yogurt / Curd | \$4.79 / 32 oz | **₹85** / 400g tub (Options: 400g: ₹85, 1 kg: ₹195) |
| **Dairy** | Pure Salted Butter | \$3.99 / 16 oz | **₹115** / 200g (Options: 200g: ₹115, 500g: ₹275) |
| **Bakery** | Artisan Country Sourdough | \$4.99 / loaf | **₹120** / 400g loaf |
| **Bakery** | French Butter Croissants | \$5.29 / 4-pack | **₹160** / 2-pack (Options: 2 pcs: ₹160, 4 pcs: ₹299) |
| **Pantry** | Cold-Pressed Extra Virgin Olive Oil | \$13.99 / 500 ml | **₹649** / 500 ml (Options: 500 ml: ₹649, 1 L: ₹1,199) |
| **Pantry** | Royal Sharbati Atta / Basmati Rice | \$6.49 / 2 lbs | **₹249** / 5 kg bag |
| **Pantry** | Raw Forest Honey | \$8.99 / 16 oz | **₹299** / 500g jar |
| **Snacks** | Cold-Pressed Fresh Orange Juice | \$4.49 / 32 fl oz | **₹129** / 500 ml bottle |
| **Snacks** | Roasted Almonds (Sea Salt) | \$6.99 / 8 oz | **₹275** / 250g pouch |
| **Meat** | Fresh Chicken Breast (Boneless) | \$8.99 / 1.5 lbs | **₹260** / 500g (Options: 500g: ₹260, 1 kg: ₹499) |

---

## 3. Architecture & File Modification Roadmap

### Phase 1: Centralized Currency Formatter
- Create `src/utils/formatCurrency.js`:
  Provides `formatINR(amount, includeDecimals = false)` utilizing `Intl.NumberFormat('en-IN')`.

### Phase 2: Catalog Data Transformation (`mockProducts.js` & `mockCategories.js`)
- Update all 24+ products to realistic INR figures.
- Transform imperial units (`lb`, `fl oz`) to metric (`kg`, `g`, `L`, `ml`).
- Revise promo banners:
  - Code `FRESH20`: 20% OFF on organic fruits & vegetables.
  - Code `SUPER100`: ₹100 Flat OFF on orders above ₹799.
  - "Free delivery on orders above ₹499".

### Phase 3: Cart & Location Contexts
- **CartContext**:
  - `FREE_DELIVERY_THRESHOLD`: `499.00`
  - `STANDARD_DELIVERY_FEE`: `49.00`
  - Dynamic calculations adapted to INR.
- **LocationContext**:
  - Default addresses updated to Indian locations (e.g. *Indiranagar, Bengaluru 560038*, *Koramangala, Bengaluru 560034*).
  - PIN code validation (6 digits).

### Phase 4: UI Components & Experience Overhaul
- **Navbar & Promo Bar**: Replace `$` with `₹`, display *"Free delivery above ₹499"*, format cart subtotal with `formatINR`.
- **Product Card & Quick View**:
  - Render prices with `formatINR(currentPrice)`.
  - Strikethrough original prices with `formatINR(currentOriginalPrice)`.
  - Savings tag: *"Save ₹X"*.
  - Metric dropdown options (`500g`, `1 kg`, etc.).
- **Product Section Filter**:
  - Update quick filter pill from *"Under \$5"* to *"Under ₹99"*.
- **Cart Drawer**:
  - Progress bar: *"Add ₹120 more to unlock FREE Delivery!"*
  - Item rows and impulse products with INR prices.
  - Receipt summary in INR.
- **Checkout Modal**:
  - Indian payment modes: **UPI** (GPay / PhonePe / Paytm / BHIM), **Credit/Debit Card** (RuPay / Visa / Master), **Net Banking**, and **Cash on Delivery (COD)**.
  - Express Delivery (20–30 mins).
- **Order Success Modal**:
  - Displays total paid in ₹.

### Phase 5: Verification & Git Commit
- Run `npm run build --prefix frontend` to guarantee 0 build or lint errors.
- Test interactive cart, free delivery progress meter, and checkout flow.
- Commit changes and push to `https://github.com/Akhilrs-RS/spm.git`.

