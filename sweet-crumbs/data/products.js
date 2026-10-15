/**
 * Sweet Crumbs - Bakery Products Data Source
 * Contains all 8 bakery items required for Task 1: Online Bakery Website.
 * Each item contains:
 *  - id: Unique numeric identifier
 *  - name: Product name
 *  - description: Detailed, appetizing product description
 *  - price: Numeric price in INR
 *  - currency: Currency code ("INR")
 *  - category: Food category for filtering or tagging
 *  - image: Primary image URL (high-resolution photo)
 *  - fallbackImage: Local reliable asset if external network is unavailable
 */

const products = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "Decadent multi-layered Belgian chocolate sponge infused with rich fudge ganache and cocoa nibs.",
    price: 550,
    currency: "INR",
    category: "Cakes",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/chocolate-cake.svg"
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    description: "Vibrant crimson velvet sponge layered with silky smooth cream cheese frosting and subtle vanilla notes.",
    price: 650,
    currency: "INR",
    category: "Cakes",
    badge: "Chef's Special",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/red-velvet-cake.svg"
  },
  {
    id: 3,
    name: "Butter Croissant",
    description: "Authentic golden French puff pastry laminated with 100% pure churned butter for maximum flakiness.",
    price: 120,
    currency: "INR",
    category: "Pastries",
    badge: "Fresh Baked",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/butter-croissant.svg"
  },
  {
    id: 4,
    name: "Blueberry Muffin",
    description: "Moist bakery-style muffin bursting with plump wild blueberries and crowned with golden sugar crystals.",
    price: 90,
    currency: "INR",
    category: "Muffins",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/blueberry-muffin.svg"
  },
  {
    id: 5,
    name: "Chocolate Cupcake",
    description: "Fluffy Dutch cocoa cupcake topped with an artisanal swirl of dark chocolate buttercream and sprinkles.",
    price: 80,
    currency: "INR",
    category: "Cupcakes",
    badge: "Kid's Favorite",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/chocolate-cupcake.svg"
  },
  {
    id: 6,
    name: "Strawberry Cheesecake",
    description: "Velvety New York style baked cheesecake on buttery graham crust with sweet organic strawberry compote.",
    price: 180,
    currency: "INR",
    category: "Cheesecakes",
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/strawberry-cheesecake.svg"
  },
  {
    id: 7,
    name: "Cinnamon Roll",
    description: "Warm, pillowy dough swirled with aromatic Korintje cinnamon, brown sugar, and dripping cream cheese glaze.",
    price: 110,
    currency: "INR",
    category: "Pastries",
    badge: "Morning Favorite",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/cinnamon-roll.svg"
  },
  {
    id: 8,
    name: "Chocolate Chip Cookies",
    description: "Crispy golden perimeter with a tender chewy heart, loaded with generous melted Belgian chocolate chips.",
    price: 150,
    currency: "INR",
    category: "Cookies",
    badge: "Must Try",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "/assets/chocolate-chip-cookies.svg"
  }
];

module.exports = products;

