# Supermarket E-Commerce Plan: Fully Functional Wishlist System

This plan outlines the architecture, data management, and UI/UX design to make the **Wishlist & Saved Groceries** feature fully functional across the FreshCart platform.

---

## 1. Problem Statement & Current State

### Current Limitations:
1. **Unwired Navbar Heart Icon:** In `Navbar.jsx`, clicking the Heart button does nothing and shows a hardcoded static orange dot rather than real saved item counts.
2. **Local Component State Only:** In `ProductCard.jsx`, clicking the heart button only toggles an isolated `isLiked` local state that resets when changing categories, searching, or refreshing the page.
3. **No Central Wishlist View:** Customers have no drawer, page, or modal to view their saved grocery list or transfer saved items to their basket.

---

## 2. Component & State Architecture

### 1. `WishlistContext.jsx` (`src/context/WishlistContext.jsx`)
Global state management persisted in `localStorage` (`freshcart_wishlist`):
- **State**:
  - `wishlistItems`: Array of saved product objects `{ id, name, price, originalPrice, image, category, weightOptions, inStock, badge }`.
  - `wishlistCount`: Number of saved items (`wishlistItems.length`).
  - `isWishlistOpen`: Boolean controlling the slide-over drawer visibility.
- **Actions**:
  - `toggleWishlist(product)`: Adds if missing, removes if present; triggers animated feedback toast (*"Saved to Wishlist"* / *"Removed from Wishlist"*).
  - `isInWishlist(productId)`: Helper returning boolean.
  - `removeFromWishlist(productId)`: Removes specific product.
  - `clearWishlist()`: Empties the list.
  - `moveAllToCart()`: Adds all wishlisted items directly into `CartContext` in one tap.

### 2. `WishlistDrawer.jsx` (`src/components/wishlist/WishlistDrawer.jsx`)
A modern, customer-friendly slide-over drawer:
- **Drawer Header:** Heart icon, "Saved Groceries & Wishlist", count badge, and close button.
- **Empty State:** Soft heart illustration, helpful prompt (*"Your wishlist is empty — save daily essentials to purchase later"*), and *"Start Browsing"* button.
- **Item Rows:**
  - Product thumbnail and name.
  - Weight/pack indicator.
  - Price in INR (`formatINR(item.price)`) and discount tags.
  - **"+ Add to Cart"** button: Moves item into cart.
  - **Remove button**: Trash/Heart toggle with confirmation.
- **Drawer Footer (When items exist):**
  - **"Move All to Basket"** primary CTA button: Seamlessly adds all saved items into the active cart drawer and opens it for checkout.
  - **"Clear All"** secondary link.

### 3. Updates to Existing Components:
- **`Navbar.jsx`**:
  - Clicking the Heart button opens `WishlistDrawer`.
  - Dynamic count badge replaces the hardcoded dot: shows active count with smooth pulse when an item is added.
- **`ProductCard.jsx`**:
  - Replaces isolated local `useState(false)` with `useWishlist()`.
  - Heart icon is filled with rose/red when in wishlist, outline when not.
  - Preserves liked state across category switches and page reloads.
- **`ProductQuickViewModal.jsx`**:
  - Add a synchronized "Save to Wishlist" button in the modal.
- **`App.jsx`**:
  - Wraps the app in `WishlistProvider`.
  - Mounts `WishlistDrawer`.

---

## 3. Step-by-Step Implementation Roadmap

### Phase 1: State Management (`WishlistContext.jsx`)
- Create `src/context/WishlistContext.jsx` with `localStorage` persistence.
- Implement `toggleWishlist`, `isInWishlist`, `removeFromWishlist`, `clearWishlist`, and `moveAllToCart`.

### Phase 2: Wishlist Slide-Over Drawer (`WishlistDrawer.jsx`)
- Create `src/components/wishlist/WishlistDrawer.jsx` with animated slide-over.
- Render saved items list, individual cart add buttons, and bulk "Move All to Basket" button.

### Phase 3: Synchronize Product Card & Quick View
- Update `ProductCard.jsx` to use `isInWishlist` and `toggleWishlist`.
- Update `ProductQuickViewModal.jsx` to include an interactive wishlist heart button.

### Phase 4: Navbar Integration & Global Mounting
- Connect Navbar heart icon to `setIsWishlistOpen(true)`.
- Render dynamic count badge on the Navbar heart icon.
- Wrap application with `WishlistProvider` in `App.jsx`.

### Phase 5: Verification & Deployment
- Test adding/removing items, persistence across refresh, 1-click move to cart, and count updates.
- Verify production build with `npm run build --prefix frontend`.
- Commit changes and push to GitHub repository (`https://github.com/Akhilrs-RS/spm.git`).

