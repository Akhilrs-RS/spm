# FreshCart Supermarket Web API (.NET 8 & MySQL)

ASP.NET Core 8 Web API backend for FreshCart Supermarket E-commerce, using Entity Framework Core with MySQL (`Pomelo.EntityFrameworkCore.MySql`).

---

## 1. Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [MySQL 8.0 or 9.0+](https://dev.mysql.com/downloads/) (running locally on port `3306`)

---

## 2. Configuration (`appsettings.json`)

Configure your MySQL connection string in `backend/FreshCart.Api/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=freshcart_db;user=root;password=your_password;TreatTinyAsBoolean=true;AllowUserVariables=true;"
  }
}
```

*Note: On first boot, `DbInitializer` will automatically invoke `context.Database.EnsureCreated()` and seed the 6 categories, subcategories, 24+ Indian grocery products, demo user, address, sample orders, and coupons (`FRESH20`, `BAKERY15`, `SUPER100`).*

---

## 3. Running the API

From the repository root or `backend/FreshCart.Api`:

```bash
cd backend/FreshCart.Api
dotnet run
```

The API will start at:
- **Swagger Documentation**: [http://localhost:5000/](http://localhost:5000/)
- **API Base URL**: `http://localhost:5000/api`

---

## 4. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/categories` | List all grocery aisles & subcategories |
| `GET` | `/api/categories/{id}` | Category details with products |
| `GET` | `/api/products` | Filter & search products by category, subcategory, search, dietary, deals & price |
| `GET` | `/api/products/flash-deals` | Daily flash sale discounted items |
| `GET` | `/api/products/{id}` | Single product details with weight options & multipliers |
| `POST` | `/api/orders` | Place new order with line items & delivery address |
| `GET` | `/api/orders` | Order history for user |
| `GET` | `/api/orders/{id}` | Single order tracking |
| `GET` | `/api/user/profile` | Customer profile information |
| `PUT` | `/api/user/profile` | Update profile (name, phone, dietary preferences) |
| `GET` | `/api/user/addresses` | Saved delivery addresses |
| `POST` | `/api/user/addresses` | Add new delivery address |
| `GET` | `/api/wishlist` | Saved wishlist items |
| `POST` | `/api/wishlist/toggle` | Add/remove product from wishlist |
| `POST` | `/api/coupons/validate` | Validate promo code (`FRESH20`, `BAKERY15`, `SUPER100`) |

---

## 5. Testing with REST Client

Use the included [FreshCart.Api.http](FreshCart.Api/FreshCart.Api.http) in VS Code or Visual Studio to test all endpoints interactively.

