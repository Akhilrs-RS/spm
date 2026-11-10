# Supermarket E-Commerce Plan: .NET 8 & MySQL Backend

This document details the architectural design, database schema, REST API specifications, and phased implementation roadmap for building the backend inside the `backend/` directory using **.NET 8 (ASP.NET Core Web API)** and **MySQL** with **Entity Framework Core**.

---

## 1. System Architecture & Tech Stack

- **Framework**: .NET 8.0 LTS (ASP.NET Core Web API with C# 12)
- **Database**: MySQL 9 / 8 (via Homebrew on macOS)
- **ORM**: Entity Framework Core 8 with `Pomelo.EntityFrameworkCore.MySql`
- **Documentation**: Swagger / OpenAPI (`Swashbuckle.AspNetCore`)
- **Port**: `http://localhost:5000` (CORS enabled for Vite frontend at `http://localhost:3000`)

---

## 2. MySQL Database Schema

1. **`Categories`**: `Id`, `Name`, `Icon`, `Badge`, `Color`, `Description`, `ImageUrl`
2. **`Subcategories`**: `Id`, `CategoryId`, `Name`
3. **`Products`**: `Id`, `Name`, `CategoryId`, `SubcategoryName`, `Price`, `OriginalPrice`, `Discount`, `Unit`, `WeightOptionsJson`, `WeightMultipliersJson`, `ImageUrl`, `Rating`, `ReviewsCount`, `IsOrganic`, `Badge`, `IsDeal`, `InStock`, `Description`
4. **`Users`**: `Id`, `Name`, `Email`, `Phone`, `AvatarColor`, `DietaryPreference`, `DeliveryInstruction`, `CreatedAt`
5. **`Addresses`**: `Id`, `UserId`, `Label`, `AddressLine`, `City`, `ZipCode`, `IsDefault`
6. **`Orders`**: `Id`, `UserId`, `CreatedAt`, `Status`, `SlotLabel`, `SlotTime`, `Subtotal`, `DeliveryFee`, `DiscountAmount`, `PromoCode`, `Taxes`, `GrandTotal`, `PaymentMethod`, `DeliveryAddressJson`
7. **`OrderItems`**: `Id`, `OrderId`, `ProductId`, `ProductName`, `Price`, `Quantity`, `WeightOption`, `ImageUrl`
8. **`WishlistItems`**: `Id`, `UserId`, `ProductId`, `CreatedAt`
9. **`Coupons`**: `Code`, `DiscountType`, `DiscountValue`, `MinOrderAmount`, `IsActive`

---

## 3. REST API Endpoints Specification

- `GET /api/categories` — All categories with subcategories
- `GET /api/products` — Filter products by category, subcategory, search query, dietary (organic), deals, price, and sorting
- `GET /api/products/{id}` — Single product details
- `GET /api/products/flash-deals` — Daily flash deals
- `POST /api/orders` — Place order, record line items, and generate delivery tracking ID
- `GET /api/orders` — Order history for user
- `GET /api/orders/{id}` — Live order tracking status
- `GET /api/user/profile` & `PUT /api/user/profile` — User profile management
- `GET /api/user/addresses` & `POST /api/user/addresses` — Saved delivery addresses
- `GET /api/wishlist` & `POST /api/wishlist/toggle` — User wishlist management
- `POST /api/coupons/validate` — Coupon validation (`FRESH20`, `BAKERY15`, `SUPER100`)

---

## 4. Directory Structure

```text
backend/
├── FreshCart.Api/
│   ├── Controllers/
│   │   ├── CategoriesController.cs
│   │   ├── ProductsController.cs
│   │   ├── OrdersController.cs
│   │   ├── UserController.cs
│   │   ├── WishlistController.cs
│   │   └── CouponsController.cs
│   ├── Data/
│   │   ├── AppDbContext.cs
│   │   └── DbInitializer.cs
│   ├── Models/
│   │   ├── Entities/
│   │   └── DTOs/
│   ├── appsettings.json
│   ├── Program.cs
│   └── FreshCart.Api.csproj
├── FreshCart.sln
└── PLAN.md
```

---

## 5. Execution Roadmap

1. **Phase 1: Project Setup**: Scaffold ASP.NET Core Web API with .NET 8, configure solution, and install Pomelo MySQL EF Core packages.
2. **Phase 2: Database Schema & Entity Framework**: Create entities, DTOs, and `AppDbContext` mapping to MySQL tables.
3. **Phase 3: Database Seeding**: Implement `DbInitializer` to auto-seed the 24+ Indian grocery items, categories, and coupons on first startup.
4. **Phase 4: API Controllers**: Implement RESTful controllers with async LINQ queries and status codes.
5. **Phase 5: CORS & Frontend Integration**: Enable CORS for `localhost:3000` and connect the frontend.
6. **Phase 6: Verification & Git Commit**: Run `dotnet build`, test Swagger endpoints, and push to GitHub.

