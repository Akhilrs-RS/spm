export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Departments',
    icon: 'Store',
    badge: 'Popular',
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    icon: 'Apple',
    badge: 'Farm Fresh',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'dairy-eggs',
    name: 'Dairy & Eggs',
    icon: 'Milk',
    badge: 'Daily Staples',
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bakery',
    name: 'Bakery & Bread',
    icon: 'Croissant',
    badge: 'Oven Fresh',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pantry',
    name: 'Pantry & Grains',
    icon: 'Wheat',
    badge: 'Organic',
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'snacks-beverages',
    name: 'Snacks & Drinks',
    icon: 'Coffee',
    badge: 'Best Value',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'meat-seafood',
    name: 'Meat & Seafood',
    icon: 'Fish',
    badge: 'Fresh Cut',
    color: 'rose',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80'
  }
];

export const PROMO_BANNERS = [
  {
    id: 1,
    title: 'Farm Fresh Organic Harvest',
    subtitle: 'Direct from regional organic farms to your doorstep in 15–25 minutes',
    code: 'FRESH20',
    discount: '20% OFF',
    cta: 'Shop Fresh Produce',
    categoryId: 'fruits-vegetables',
    bgGradient: 'from-emerald-700 via-emerald-600 to-teal-700',
    accentColor: 'text-amber-300',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Artisan Bakery & Daily Morning Dairy',
    subtitle: 'Oven-fresh sourdough, flaky croissants, farm milk & desi butter',
    code: 'BAKERY15',
    discount: '15% OFF',
    cta: 'Explore Bakery',
    categoryId: 'bakery',
    bgGradient: 'from-amber-700 via-amber-600 to-yellow-600',
    accentColor: 'text-emerald-200',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Monthly Pantry Restock Mega Sale',
    subtitle: 'Flat ₹100 OFF on premium cold-pressed oils, basmati rice, atta, and honey',
    code: 'SUPER100',
    discount: 'FLAT ₹100 OFF',
    cta: 'Stock Up Now',
    categoryId: 'pantry',
    bgGradient: 'from-slate-800 via-slate-700 to-emerald-900',
    accentColor: 'text-amber-400',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
  }
];
