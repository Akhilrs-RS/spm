using System.Text.Json;
using FreshCart.Api.Models.Entities;

namespace FreshCart.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Categories.Any())
            {
                return; // Database has already been seeded
            }

            // 1. Seed Categories & Subcategories
            var categories = new List<Category>
            {
                new Category
                {
                    Id = "fruits-vegetables",
                    Name = "Fruits & Vegetables",
                    Icon = "Apple",
                    Badge = "Farm Fresh",
                    Color = "green",
                    Description = "Crisp organic fruits, leafy greens, and farm-fresh daily vegetables",
                    ImageUrl = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { CategoryId = "fruits-vegetables", Name = "Fresh Fruits" },
                        new Subcategory { CategoryId = "fruits-vegetables", Name = "Daily Vegetables" },
                        new Subcategory { CategoryId = "fruits-vegetables", Name = "Leafy Greens" },
                        new Subcategory { CategoryId = "fruits-vegetables", Name = "Citrus & Exotic" }
                    }
                },
                new Category
                {
                    Id = "dairy-eggs",
                    Name = "Dairy & Eggs",
                    Icon = "Milk",
                    Badge = "Daily Staples",
                    Color = "amber",
                    Description = "Pure A2 farm milk, free-range eggs, slow-churned butter & dahi",
                    ImageUrl = "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { CategoryId = "dairy-eggs", Name = "A2 & Whole Milk" },
                        new Subcategory { CategoryId = "dairy-eggs", Name = "Country Eggs" },
                        new Subcategory { CategoryId = "dairy-eggs", Name = "Dahi & Curd" },
                        new Subcategory { CategoryId = "dairy-eggs", Name = "Butter & Cheese" }
                    }
                },
                new Category
                {
                    Id = "bakery",
                    Name = "Bakery & Bread",
                    Icon = "Croissant",
                    Badge = "Oven Fresh",
                    Color = "yellow",
                    Description = "Slow-fermented sourdough, flaky croissants, and whole grain breads",
                    ImageUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { CategoryId = "bakery", Name = "Artisan Sourdough" },
                        new Subcategory { CategoryId = "bakery", Name = "Croissants & Bakes" },
                        new Subcategory { CategoryId = "bakery", Name = "Whole Wheat Breads" }
                    }
                },
                new Category
                {
                    Id = "pantry",
                    Name = "Pantry & Grains",
                    Icon = "Wheat",
                    Badge = "Organic",
                    Color = "amber",
                    Description = "Cold-pressed extra virgin oils, aged basmati rice, raw honey & pastas",
                    ImageUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { CategoryId = "pantry", Name = "Cold-Pressed Oils" },
                        new Subcategory { CategoryId = "pantry", Name = "Aged Basmati & Atta" },
                        new Subcategory { CategoryId = "pantry", Name = "Raw Honey" },
                        new Subcategory { CategoryId = "pantry", Name = "Pastas & Grains" }
                    }
                },
                new Category
                {
                    Id = "snacks-beverages",
                    Name = "Snacks & Drinks",
                    Icon = "Coffee",
                    Badge = "Best Value",
                    Color = "orange",
                    Description = "Pure cold-pressed juices, roasted nuts, kettle chips & sparkling water",
                    ImageUrl = "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { CategoryId = "snacks-beverages", Name = "Cold-Pressed Juices" },
                        new Subcategory { CategoryId = "snacks-beverages", Name = "Kettle Chips" },
                        new Subcategory { CategoryId = "snacks-beverages", Name = "Roasted Nuts" },
                        new Subcategory { CategoryId = "snacks-beverages", Name = "Sparkling Drinks" }
                    }
                },
                new Category
                {
                    Id = "meat-seafood",
                    Name = "Meat & Seafood",
                    Icon = "Fish",
                    Badge = "Fresh Cut",
                    Color = "rose",
                    Description = "Antibiotic-free tender chicken fillets, wild Atlantic salmon & mutton cuts",
                    ImageUrl = "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { CategoryId = "meat-seafood", Name = "Fresh Chicken" },
                        new Subcategory { CategoryId = "meat-seafood", Name = "Wild Salmon & Fish" },
                        new Subcategory { CategoryId = "meat-seafood", Name = "Mutton Cuts" }
                    }
                }
            };

            context.Categories.AddRange(categories);
            context.SaveChanges();

            // 2. Seed Products
            var products = new List<Product>
            {
new Product {
    Id = "prod-1",
    Name = "Organic Shimla / Kinnaur Apples",
    CategoryId = "fruits-vegetables",
    SubcategoryName = "Fresh Fruits",
    Price = 189m,
    OriginalPrice = 240m,
    Discount = 21,
    Unit = "kg",
    WeightOptionsJson = "[\"500g (~2-3 apples)\",\"1 kg (~5-6 apples)\",\"2 kg Family Pack\"]",
    WeightMultipliersJson = "[0.55,1,1.9]",
    ImageUrl = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
    Rating = 4.8m,
    ReviewsCount = 142,
    IsOrganic = true,
    Badge = "Farm Fresh",
    IsDeal = true,
    InStock = true,
    Description = "Crisp, sweet, and aromatic Himalayan apples freshly picked from certified organic orchards."
},
new Product {
    Id = "prod-2",
    Name = "Fresh Hass Avocados",
    CategoryId = "fruits-vegetables",
    SubcategoryName = "Citrus & Exotic",
    Price = 199m,
    OriginalPrice = 260m,
    Discount = 23,
    Unit = "pack",
    WeightOptionsJson = "[\"2 Pcs Pack\",\"4 Pcs Value Pack\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 218,
    IsOrganic = true,
    Badge = "Bestseller",
    IsDeal = true,
    InStock = true,
    Description = "Creamy Haas avocados at optimum ripeness, rich in healthy heart-friendly monounsaturated fats."
},
new Product {
    Id = "prod-3",
    Name = "Hydroponic Tender Baby Spinach (Palak)",
    CategoryId = "fruits-vegetables",
    SubcategoryName = "Leafy Greens",
    Price = 39m,
    OriginalPrice = 55m,
    Discount = 29,
    Unit = "bunch",
    WeightOptionsJson = "[\"250g Bunch\",\"500g Value Pack\"]",
    WeightMultipliersJson = "[1,1.8]",
    ImageUrl = "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
    Rating = 4.7m,
    ReviewsCount = 95,
    IsOrganic = true,
    Badge = "Pesticide Free",
    IsDeal = false,
    InStock = true,
    Description = "Hydroponically grown tender baby spinach leaves, triple-washed and packed with natural iron."
},
new Product {
    Id = "prod-4",
    Name = "Robusta Golden Bananas (Kela)",
    CategoryId = "fruits-vegetables",
    SubcategoryName = "Fresh Fruits",
    Price = 49m,
    OriginalPrice = 65m,
    Discount = 24,
    Unit = "kg",
    WeightOptionsJson = "[\"1 kg (~5-6 pcs)\",\"2 kg Pack\"]",
    WeightMultipliersJson = "[1,1.9]",
    ImageUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
    Rating = 4.6m,
    ReviewsCount = 310,
    IsOrganic = false,
    Badge = "Daily Essential",
    IsDeal = false,
    InStock = true,
    Description = "Naturally ripened, sweet golden Robusta bananas rich in potassium and instant energy."
},
new Product {
    Id = "prod-5",
    Name = "Fresh Hybrid / Desi Tomatoes (Tamatar)",
    CategoryId = "fruits-vegetables",
    SubcategoryName = "Daily Vegetables",
    Price = 45m,
    OriginalPrice = 60m,
    Discount = 25,
    Unit = "kg",
    WeightOptionsJson = "[\"1 kg\",\"2 kg Bag\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
    Rating = 4.5m,
    ReviewsCount = 84,
    IsOrganic = true,
    Badge = "Farm Fresh",
    IsDeal = true,
    InStock = true,
    Description = "Plump, firm, and juicy tomatoes direct from local Mandi farmers, perfect for curries and fresh salads."
},
new Product {
    Id = "prod-6",
    Name = "Fresh Seedless Lemons (Nimbu)",
    CategoryId = "fruits-vegetables",
    SubcategoryName = "Citrus & Exotic",
    Price = 29m,
    OriginalPrice = 40m,
    Discount = 27,
    Unit = "pack",
    WeightOptionsJson = "[\"4 Pcs Pack\",\"8 Pcs Value Pack\"]",
    WeightMultipliersJson = "[1,1.8]",
    ImageUrl = "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=500&q=80",
    Rating = 4.8m,
    ReviewsCount = 130,
    IsOrganic = true,
    Badge = "High Vitamin C",
    IsDeal = false,
    InStock = true,
    Description = "Thin-skinned, extremely juicy lemons ideal for morning warm water, lemonade, and seasoning."
},
new Product {
    Id = "prod-7",
    Name = "Farm Fresh A2 Desi Cow Milk",
    CategoryId = "dairy-eggs",
    SubcategoryName = "A2 & Whole Milk",
    Price = 78m,
    OriginalPrice = 95m,
    Discount = 17,
    Unit = "L",
    WeightOptionsJson = "[\"500 ml Pouch\",\"1 Liter Bottle\",\"2 Liters Family Pack\"]",
    WeightMultipliersJson = "[0.55,1,1.95]",
    ImageUrl = "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 180,
    IsOrganic = true,
    Badge = "100% Pure A2",
    IsDeal = false,
    InStock = true,
    Description = "Pure, unadulterated A2 Gir cow whole milk pasteurized and cold-chained within 4 hours of milking."
},
new Product {
    Id = "prod-8",
    Name = "Free-Range Brown Country Eggs",
    CategoryId = "dairy-eggs",
    SubcategoryName = "Country Eggs",
    Price = 99m,
    OriginalPrice = 125m,
    Discount = 20,
    Unit = "pack",
    WeightOptionsJson = "[\"6 Eggs Pack\",\"12 Eggs Family Carton\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 340,
    IsOrganic = true,
    Badge = "Bestseller",
    IsDeal = true,
    InStock = true,
    Description = "Nutrient-rich golden-amber yolk eggs from free-range hens raised on natural vegetarian feed."
},
new Product {
    Id = "prod-9",
    Name = "Artisan Greek Strained Curd / Yogurt",
    CategoryId = "dairy-eggs",
    SubcategoryName = "Dahi & Curd",
    Price = 85m,
    OriginalPrice = 105m,
    Discount = 19,
    Unit = "tub",
    WeightOptionsJson = "[\"400g Tub (Classic)\",\"800g Tub (Family Pack)\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80",
    Rating = 4.8m,
    ReviewsCount = 112,
    IsOrganic = true,
    Badge = "High Protein",
    IsDeal = false,
    InStock = true,
    Description = "Thick, creamy traditional strained dahi packed with natural live probiotic gut-friendly cultures."
},
new Product {
    Id = "prod-10",
    Name = "Pure Desi Salted Table Butter",
    CategoryId = "dairy-eggs",
    SubcategoryName = "Butter & Cheese",
    Price = 115m,
    OriginalPrice = 135m,
    Discount = 14,
    Unit = "pack",
    WeightOptionsJson = "[\"200g Pack\",\"500g Tub\"]",
    WeightMultipliersJson = "[1,2.35]",
    ImageUrl = "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80",
    Rating = 4.7m,
    ReviewsCount = 78,
    IsOrganic = false,
    Badge = "82% Milk Fat",
    IsDeal = false,
    InStock = true,
    Description = "Slow-churned pure dairy salted butter, ideal for hot parathas, toast, and baking."
},
new Product {
    Id = "prod-11",
    Name = "Artisan Sourdough Country Loaf",
    CategoryId = "bakery",
    SubcategoryName = "Artisan Sourdough",
    Price = 120m,
    OriginalPrice = 160m,
    Discount = 25,
    Unit = "loaf",
    WeightOptionsJson = "[\"400g Whole Loaf\",\"Pre-Sliced Loaf\"]",
    WeightMultipliersJson = "[1,1]",
    ImageUrl = "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 265,
    IsOrganic = true,
    Badge = "Oven Fresh 6 AM",
    IsDeal = true,
    InStock = true,
    Description = "Naturally fermented for 36 hours with wild sourdough starter, crunchy crust, and soft airy crumb."
},
new Product {
    Id = "prod-12",
    Name = "French Butter Croissants (2-Pack)",
    CategoryId = "bakery",
    SubcategoryName = "Croissants & Bakes",
    Price = 149m,
    OriginalPrice = 185m,
    Discount = 19,
    Unit = "box",
    WeightOptionsJson = "[\"2-Pack Box\",\"4-Pack Box\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80",
    Rating = 4.8m,
    ReviewsCount = 154,
    IsOrganic = false,
    Badge = "Flaky & Golden",
    IsDeal = false,
    InStock = true,
    Description = "Authentic 27-layer flaky French butter croissants with golden crust and melt-in-the-mouth center."
},
new Product {
    Id = "prod-13",
    Name = "100% Whole Wheat Multigrain Bread",
    CategoryId = "bakery",
    SubcategoryName = "Whole Wheat Breads",
    Price = 65m,
    OriginalPrice = 80m,
    Discount = 18,
    Unit = "loaf",
    WeightOptionsJson = "[\"400g Loaf\"]",
    WeightMultipliersJson = "[1]",
    ImageUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
    Rating = 4.6m,
    ReviewsCount = 89,
    IsOrganic = true,
    Badge = "Zero Maida",
    IsDeal = false,
    InStock = true,
    Description = "Zero refined flour (maida) brown bread loaded with flaxseeds, oats, sunflower seeds, and dietary fiber."
},
new Product {
    Id = "prod-14",
    Name = "Cold-Pressed Extra Virgin Olive Oil",
    CategoryId = "pantry",
    SubcategoryName = "Cold-Pressed Oils",
    Price = 649m,
    OriginalPrice = 850m,
    Discount = 23,
    Unit = "bottle",
    WeightOptionsJson = "[\"500 ml Glass Bottle\",\"1 Liter Tin\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 410,
    IsOrganic = true,
    Badge = "First Cold Press",
    IsDeal = true,
    InStock = true,
    Description = "Extra virgin olive oil cold extracted at under 27°C, rich in natural polyphenols and heart-healthy fats."
},
new Product {
    Id = "prod-15",
    Name = "Royal Aged Basmati Rice (Daawat)",
    CategoryId = "pantry",
    SubcategoryName = "Aged Basmati & Atta",
    Price = 249m,
    OriginalPrice = 320m,
    Discount = 22,
    Unit = "bag",
    WeightOptionsJson = "[\"1 kg Pouch\",\"5 kg Bag\"]",
    WeightMultipliersJson = "[0.25,1]",
    ImageUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
    Rating = 4.7m,
    ReviewsCount = 132,
    IsOrganic = true,
    Badge = "Aged 2 Years",
    IsDeal = false,
    InStock = true,
    Description = "Extra long grain aged Himalayan basmati rice with royal aroma and non-sticky pearls upon cooking."
},
new Product {
    Id = "prod-16",
    Name = "Raw Unprocessed Forest Wildflower Honey",
    CategoryId = "pantry",
    SubcategoryName = "Raw Honey",
    Price = 299m,
    OriginalPrice = 380m,
    Discount = 21,
    Unit = "jar",
    WeightOptionsJson = "[\"500g Glass Jar\",\"1 kg Family Jar\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 280,
    IsOrganic = true,
    Badge = "100% Pure Raw",
    IsDeal = false,
    InStock = true,
    Description = "Pure unfiltered forest honey straight from bee-boxes, packed with natural bee pollen and enzymes."
},
new Product {
    Id = "prod-17",
    Name = "Durum Wheat Italian Penne Rigate Pasta",
    CategoryId = "pantry",
    SubcategoryName = "Pastas & Grains",
    Price = 135m,
    OriginalPrice = 175m,
    Discount = 22,
    Unit = "pack",
    WeightOptionsJson = "[\"500g Pack\",\"1 kg Value Pack\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=500&q=80",
    Rating = 4.8m,
    ReviewsCount = 198,
    IsOrganic = false,
    Badge = "Product of Italy",
    IsDeal = true,
    InStock = true,
    Description = "Made from 100% durum semolina with grooved bronze ridges that hold sauce and cheese beautifully."
},
new Product {
    Id = "prod-18",
    Name = "Cold-Pressed Valencia Orange Juice",
    CategoryId = "snacks-beverages",
    SubcategoryName = "Cold-Pressed Juices",
    Price = 129m,
    OriginalPrice = 160m,
    Discount = 19,
    Unit = "bottle",
    WeightOptionsJson = "[\"500 ml Bottle\",\"1 Liter Bottle\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 320,
    IsOrganic = true,
    Badge = "No Added Sugar",
    IsDeal = true,
    InStock = true,
    Description = "100% pure squeezed sweet Valencia oranges with natural juicy pulp, zero preservatives or additives."
},
new Product {
    Id = "prod-19",
    Name = "Kettle Cooked Himalayan Rock Salt Chips",
    CategoryId = "snacks-beverages",
    SubcategoryName = "Kettle Chips",
    Price = 85m,
    OriginalPrice = 110m,
    Discount = 22,
    Unit = "bag",
    WeightOptionsJson = "[\"130g Bag\",\"250g Party Pack\"]",
    WeightMultipliersJson = "[1,1.75]",
    ImageUrl = "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80",
    Rating = 4.7m,
    ReviewsCount = 175,
    IsOrganic = false,
    Badge = "Gluten-Free",
    IsDeal = false,
    InStock = true,
    Description = "Crisp batch-cooked potato crisps prepared in groundnut oil and sprinkled with pink Himalayan rock salt."
},
new Product {
    Id = "prod-20",
    Name = "Dark Chocolate Roasted California Almonds",
    CategoryId = "snacks-beverages",
    SubcategoryName = "Roasted Nuts",
    Price = 275m,
    OriginalPrice = 350m,
    Discount = 21,
    Unit = "pouch",
    WeightOptionsJson = "[\"250g Resealable Pouch\",\"500g Tub\"]",
    WeightMultipliersJson = "[1,1.85]",
    ImageUrl = "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=500&q=80",
    Rating = 4.8m,
    ReviewsCount = 215,
    IsOrganic = true,
    Badge = "70% Dark Cocoa",
    IsDeal = false,
    InStock = true,
    Description = "Crunchy slow-roasted almonds generously coated in silky 70% single-origin dark chocolate."
},
new Product {
    Id = "prod-21",
    Name = "Natural Sparkling Water (Pack of 6)",
    CategoryId = "snacks-beverages",
    SubcategoryName = "Sparkling Drinks",
    Price = 199m,
    OriginalPrice = 250m,
    Discount = 20,
    Unit = "pack",
    WeightOptionsJson = "[\"6 x 330 ml Cans (Lemon & Mint)\",\"6 x 330 ml Cans (Peach)\"]",
    WeightMultipliersJson = "[1,1]",
    ImageUrl = "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=500&q=80",
    Rating = 4.7m,
    ReviewsCount = 140,
    IsOrganic = false,
    Badge = "0 Calories",
    IsDeal = true,
    InStock = true,
    Description = "Fizzy Himalayan mineral water infused with natural fruit extracts and zero artificial sweeteners."
},
new Product {
    Id = "prod-22",
    Name = "Fresh Boneless Chicken Breast Fillet",
    CategoryId = "meat-seafood",
    SubcategoryName = "Fresh Chicken",
    Price = 260m,
    OriginalPrice = 320m,
    Discount = 18,
    Unit = "pack",
    WeightOptionsJson = "[\"500g Tray\",\"1 kg Value Pack\"]",
    WeightMultipliersJson = "[1,1.9]",
    ImageUrl = "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    Rating = 4.8m,
    ReviewsCount = 190,
    IsOrganic = true,
    Badge = "Antibiotic Free",
    IsDeal = true,
    InStock = true,
    Description = "Farm-fresh tender boneless chicken breast fillets with zero antibiotics or chemical preservatives."
},
new Product {
    Id = "prod-23",
    Name = "Fresh Atlantic Salmon Fillet (Skin-On)",
    CategoryId = "meat-seafood",
    SubcategoryName = "Wild Salmon & Fish",
    Price = 699m,
    OriginalPrice = 850m,
    Discount = 17,
    Unit = "fillet",
    WeightOptionsJson = "[\"250g Fresh Cut\",\"500g Fresh Cut\"]",
    WeightMultipliersJson = "[1,1.9]",
    ImageUrl = "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
    Rating = 4.9m,
    ReviewsCount = 240,
    IsOrganic = false,
    Badge = "Sustainably Sourced",
    IsDeal = false,
    InStock = true,
    Description = "Premium ruby-red Atlantic salmon portion cuts high in Omega-3 DHA, air-flown chilled daily."
},
new Product {
    Id = "prod-24",
    Name = "Fresh Premium Mutton Curry Cut",
    CategoryId = "meat-seafood",
    SubcategoryName = "Mutton Cuts",
    Price = 490m,
    OriginalPrice = 580m,
    Discount = 15,
    Unit = "pack",
    WeightOptionsJson = "[\"500g Pack\",\"1 kg Family Pack\"]",
    WeightMultipliersJson = "[1,1.9]",
    ImageUrl = "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=500&q=80",
    Rating = 4.7m,
    ReviewsCount = 165,
    IsOrganic = true,
    Badge = "Tender & Fresh",
    IsDeal = true,
    InStock = true,
    Description = "Tender, bone-in goat meat cuts with prime bone-to-meat ratio for rich Mughlai and regional curries."
}
            };

            context.Products.AddRange(products);

            // 3. Seed Demo User & Addresses
            var user = new User
            {
                Id = "user-1",
                Name = "Akhil R S",
                Email = "akhilrajanshiners@gmail.com",
                Phone = "9876543210",
                AvatarColor = "bg-emerald-600",
                DietaryPreference = "all",
                DeliveryInstruction = "Call upon arrival and leave at door",
                CreatedAt = DateTime.UtcNow,
                Addresses = new List<Address>
                {
                    new Address
                    {
                        Id = "addr-1",
                        UserId = "user-1",
                        Label = "Home",
                        AddressLine = "Flat 402, Green Glen Layout, Bellandur",
                        City = "Bengaluru",
                        ZipCode = "560103",
                        IsDefault = true,
                        EstimatedMinutes = "15-25"
                    },
                    new Address
                    {
                        Id = "addr-2",
                        UserId = "user-1",
                        Label = "Work",
                        AddressLine = "Tech Park, Building 4, Outer Ring Road",
                        City = "Bengaluru",
                        ZipCode = "560103",
                        IsDefault = false,
                        EstimatedMinutes = "20-30"
                    }
                }
            };
            context.Users.Add(user);

            // 4. Seed Coupons
            var coupons = new List<Coupon>
            {
                new Coupon
                {
                    Code = "FRESH20",
                    DiscountType = "percentage",
                    DiscountValue = 20m,
                    MinOrderAmount = 300m,
                    IsActive = true,
                    Description = "20% OFF on Farm Fresh Produce & Organic items"
                },
                new Coupon
                {
                    Code = "BAKERY15",
                    DiscountType = "percentage",
                    DiscountValue = 15m,
                    MinOrderAmount = 250m,
                    IsActive = true,
                    Description = "15% OFF on Artisan Breads & Oven Fresh Bakes"
                },
                new Coupon
                {
                    Code = "SUPER100",
                    DiscountType = "flat",
                    DiscountValue = 100m,
                    MinOrderAmount = 499m,
                    IsActive = true,
                    Description = "Flat ₹100 OFF on orders above ₹499"
                }
            };
            context.Coupons.AddRange(coupons);

            // 5. Seed Initial Order
            var sampleOrder = new Order
            {
                Id = "FC-IN-842910",
                UserId = "user-1",
                CreatedAt = DateTime.UtcNow.AddDays(-2),
                Status = "Delivered",
                SlotLabel = "⚡ Express Delivery",
                SlotTime = "15–25 mins",
                Subtotal = 375m,
                DeliveryFee = 0m,
                DiscountAmount = 0m,
                PromoCode = null,
                Taxes = 0m,
                GrandTotal = 375m,
                PaymentMethod = "upi",
                DeliveryAddressJson = JsonSerializer.Serialize(new
                {
                    label = "Home",
                    address = "Flat 402, Green Glen Layout, Bellandur",
                    city = "Bengaluru"
                }),
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        OrderId = "FC-IN-842910",
                        ProductId = "prod-7",
                        ProductName = "Farm Fresh A2 Desi Cow Milk",
                        Price = 78m,
                        Quantity = 2,
                        WeightOption = "1 Liter Bottle",
                        ImageUrl = "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80"
                    },
                    new OrderItem
                    {
                        OrderId = "FC-IN-842910",
                        ProductId = "prod-11",
                        ProductName = "Artisan Sourdough Country Loaf",
                        Price = 120m,
                        Quantity = 1,
                        WeightOption = "400g Whole Loaf",
                        ImageUrl = "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=500&q=80"
                    },
                    new OrderItem
                    {
                        OrderId = "FC-IN-842910",
                        ProductId = "prod-8",
                        ProductName = "Free-Range Brown Country Eggs",
                        Price = 99m,
                        Quantity = 1,
                        WeightOption = "6 Eggs Pack",
                        ImageUrl = "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=500&q=80"
                    }
                }
            };
            context.Orders.Add(sampleOrder);

            context.SaveChanges();
        }
    }
}
