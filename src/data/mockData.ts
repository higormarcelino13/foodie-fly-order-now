
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  address: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Burger Palace",
    image: "/images/burger-restaurant.jpg",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    address: "123 Main St, Anytown"
  },
  {
    id: "r2",
    name: "Pizza Heaven",
    image: "/images/pizza-restaurant.jpg",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-40 min",
    deliveryFee: 1.99,
    address: "456 Park Ave, Anytown"
  },
  {
    id: "r3",
    name: "Sushi Delight",
    image: "/images/sushi-restaurant.jpg",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "30-45 min",
    deliveryFee: 3.99,
    address: "789 Ocean Blvd, Anytown"
  },
  {
    id: "r4",
    name: "Taco Town",
    image: "/images/taco-restaurant.jpg",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    address: "321 Spice Lane, Anytown"
  },
  {
    id: "r5",
    name: "Pasta Paradise",
    image: "/images/pasta-restaurant.jpg",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    address: "654 Flour St, Anytown"
  },
  {
    id: "r6",
    name: "Curry House",
    image: "/images/curry-restaurant.jpg",
    cuisine: "Indian",
    rating: 4.4,
    deliveryTime: "30-45 min",
    deliveryFee: 2.99,
    address: "987 Spice Road, Anytown"
  }
];

export const menuItems: MenuItem[] = [
  // Burger Palace Items
  {
    id: "bp1",
    restaurantId: "r1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and our special sauce",
    price: 8.99,
    image: "/images/cheeseburger.jpg",
    category: "Burgers",
    popular: true
  },
  {
    id: "bp2",
    restaurantId: "r1",
    name: "Double Bacon Burger",
    description: "Two beef patties with crispy bacon, cheese, and all the fixings",
    price: 12.99,
    image: "/images/bacon-burger.jpg",
    category: "Burgers",
    popular: true
  },
  {
    id: "bp3",
    restaurantId: "r1",
    name: "Veggie Burger",
    description: "Plant-based patty with fresh veggies and vegan mayo",
    price: 9.99,
    image: "/images/veggie-burger.jpg",
    category: "Burgers",
    popular: false
  },
  {
    id: "bp4",
    restaurantId: "r1",
    name: "French Fries",
    description: "Crispy golden fries seasoned to perfection",
    price: 3.99,
    image: "/images/fries.jpg",
    category: "Sides",
    popular: true
  },
  {
    id: "bp5",
    restaurantId: "r1",
    name: "Chocolate Milkshake",
    description: "Rich and creamy chocolate shake topped with whipped cream",
    price: 4.99,
    image: "/images/milkshake.jpg",
    category: "Drinks",
    popular: false
  },

  // Pizza Heaven Items
  {
    id: "ph1",
    restaurantId: "r2",
    name: "Margherita Pizza",
    description: "Classic tomato sauce, fresh mozzarella, and basil",
    price: 12.99,
    image: "/images/margherita.jpg",
    category: "Pizzas",
    popular: true
  },
  {
    id: "ph2",
    restaurantId: "r2",
    name: "Pepperoni Pizza",
    description: "Tomato sauce, mozzarella, and pepperoni slices",
    price: 14.99,
    image: "/images/pepperoni.jpg",
    category: "Pizzas",
    popular: true
  },
  {
    id: "ph3",
    restaurantId: "r2",
    name: "Vegetarian Pizza",
    description: "Tomato sauce, mozzarella, bell peppers, mushrooms, and olives",
    price: 13.99,
    image: "/images/vegetarian-pizza.jpg",
    category: "Pizzas",
    popular: false
  },
  {
    id: "ph4",
    restaurantId: "r2",
    name: "Garlic Bread",
    description: "Freshly baked bread with garlic butter and herbs",
    price: 4.99,
    image: "/images/garlic-bread.jpg",
    category: "Sides",
    popular: true
  },
  {
    id: "ph5",
    restaurantId: "r2",
    name: "Tiramisu",
    description: "Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone",
    price: 6.99,
    image: "/images/tiramisu.jpg",
    category: "Desserts",
    popular: false
  },

  // Sushi Delight Items
  {
    id: "sd1",
    restaurantId: "r3",
    name: "California Roll",
    description: "Crab, avocado, and cucumber wrapped in seaweed and rice",
    price: 7.99,
    image: "/images/california-roll.jpg",
    category: "Rolls",
    popular: true
  },
  {
    id: "sd2",
    restaurantId: "r3",
    name: "Salmon Nigiri",
    description: "Fresh salmon on hand-pressed rice",
    price: 6.99,
    image: "/images/salmon-nigiri.jpg",
    category: "Nigiri",
    popular: true
  },
  {
    id: "sd3",
    restaurantId: "r3",
    name: "Spicy Tuna Roll",
    description: "Spicy tuna and cucumber wrapped in seaweed and rice",
    price: 8.99,
    image: "/images/spicy-tuna.jpg",
    category: "Rolls",
    popular: true
  },
  {
    id: "sd4",
    restaurantId: "r3",
    name: "Miso Soup",
    description: "Traditional Japanese soup with tofu and seaweed",
    price: 3.99,
    image: "/images/miso-soup.jpg",
    category: "Sides",
    popular: false
  },
  {
    id: "sd5",
    restaurantId: "r3",
    name: "Green Tea Ice Cream",
    description: "Creamy green tea flavored ice cream",
    price: 4.99,
    image: "/images/green-tea-ice-cream.jpg",
    category: "Desserts",
    popular: false
  }
];

// Helper function to get restaurant by ID
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

// Helper function to get menu items by restaurant ID
export const getMenuItemsByRestaurantId = (restaurantId: string): MenuItem[] => {
  return menuItems.filter(item => item.restaurantId === restaurantId);
};

// Helper function to get menu item by ID
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

// Helper function to get popular menu items
export const getPopularMenuItems = (): MenuItem[] => {
  return menuItems.filter(item => item.popular);
};
