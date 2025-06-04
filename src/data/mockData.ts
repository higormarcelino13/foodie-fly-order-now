export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  image: string;
  categories: string[];
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurantId: string;
  preparationTime: number;
  isAvailable: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger House',
    cuisine: 'Hambúrguer',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 5.90,
    minOrder: 20,
    address: 'Rua das Flores, 123 - Centro',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop',
    categories: ['Hambúrguer', 'Batata Frita', 'Milk Shake'],
    isOpen: true,
  },
  {
    id: '2',
    name: 'Pizza Express',
    cuisine: 'Pizza',
    rating: 4.6,
    deliveryTime: '40-55 min',
    deliveryFee: 7.90,
    minOrder: 30,
    address: 'Av. Paulista, 1000 - Bela Vista',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
    categories: ['Pizza', 'Pasta', 'Salada'],
    isOpen: true,
  },
  {
    id: '3',
    name: 'Sushi Master',
    cuisine: 'Japonesa',
    rating: 4.9,
    deliveryTime: '35-50 min',
    deliveryFee: 8.90,
    minOrder: 40,
    address: 'Rua Augusta, 500 - Consolação',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
    categories: ['Sushi', 'Temaki', 'Hot Roll'],
    isOpen: true,
  },
  {
    id: '4',
    name: 'Churrasco do Chef',
    cuisine: 'Brasileira',
    rating: 4.7,
    deliveryTime: '45-60 min',
    deliveryFee: 6.90,
    minOrder: 35,
    address: 'Rua Oscar Freire, 200 - Jardins',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop',
    categories: ['Churrasco', 'Acompanhamentos', 'Sobremesa'],
    isOpen: true,
  },
  {
    id: '5',
    name: 'Pasta & Co',
    cuisine: 'Italiana',
    rating: 4.5,
    deliveryTime: '30-45 min',
    deliveryFee: 5.90,
    minOrder: 25,
    address: 'Rua Haddock Lobo, 300 - Cerqueira César',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop',
    categories: ['Pasta', 'Risoto', 'Salada'],
    isOpen: true,
  },
];

export const menuItems: MenuItem[] = [
  // Burger House Items
  {
    id: '101',
    name: 'Classic Burger',
    description: 'Hambúrguer artesanal, queijo, alface, tomate, cebola e molho especial',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
    category: 'Hambúrguer',
    restaurantId: '1',
    preparationTime: 15,
    isAvailable: true,
  },
  {
    id: '102',
    name: 'Double Cheese Burger',
    description: 'Dois hambúrgueres artesanais, queijo cheddar, bacon, alface, tomate e molho especial',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop',
    category: 'Hambúrguer',
    restaurantId: '1',
    preparationTime: 20,
    isAvailable: true,
  },
  {
    id: '103',
    name: 'Batata Frita',
    description: 'Porção de batata frita crocante com sal e orégano',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop',
    category: 'Batata Frita',
    restaurantId: '1',
    preparationTime: 10,
    isAvailable: true,
  },
  {
    id: '104',
    name: 'Milk Shake Chocolate',
    description: 'Milk shake cremoso de chocolate com chantilly e calda',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&auto=format&fit=crop',
    category: 'Milk Shake',
    restaurantId: '1',
    preparationTime: 8,
    isAvailable: true,
  },

  // Pizza Express Items
  {
    id: '201',
    name: 'Margherita',
    description: 'Molho de tomate, mussarela, tomate e manjericão',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop',
    category: 'Pizza',
    restaurantId: '2',
    preparationTime: 25,
    isAvailable: true,
  },
  {
    id: '202',
    name: 'Pepperoni',
    description: 'Molho de tomate, mussarela e pepperoni',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop',
    category: 'Pizza',
    restaurantId: '2',
    preparationTime: 25,
    isAvailable: true,
  },
  {
    id: '203',
    name: 'Fettuccine Alfredo',
    description: 'Massa fettuccine com molho cremoso de queijo parmesão',
    price: 38.90,
    image: 'https://images.unsplash.com/photo-1645112411346-1c6ad0b5f3c3?w=800&auto=format&fit=crop',
    category: 'Pasta',
    restaurantId: '2',
    preparationTime: 20,
    isAvailable: true,
  },

  // Sushi Master Items
  {
    id: '301',
    name: 'Combo Sushi',
    description: '12 peças de sushi variado (salmão, atum, camarão)',
    price: 65.90,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
    category: 'Sushi',
    restaurantId: '3',
    preparationTime: 20,
    isAvailable: true,
  },
  {
    id: '302',
    name: 'Temaki Salmão',
    description: 'Temaki de salmão com cream cheese e cebolinha',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=800&auto=format&fit=crop',
    category: 'Temaki',
    restaurantId: '3',
    preparationTime: 15,
    isAvailable: true,
  },
  {
    id: '303',
    name: 'Hot Roll',
    description: '8 peças de hot roll com salmão e cream cheese',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=800&auto=format&fit=crop',
    category: 'Hot Roll',
    restaurantId: '3',
    preparationTime: 15,
    isAvailable: true,
  },

  // Churrasco do Chef Items
  {
    id: '401',
    name: 'Picanha Grelhada',
    description: 'Picanha grelhada com arroz, feijão, farofa e vinagrete',
    price: 58.90,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop',
    category: 'Churrasco',
    restaurantId: '4',
    preparationTime: 30,
    isAvailable: true,
  },
  {
    id: '402',
    name: 'Costela no Bafo',
    description: 'Costela assada lentamente com temperos especiais',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop',
    category: 'Churrasco',
    restaurantId: '4',
    preparationTime: 35,
    isAvailable: true,
  },
  {
    id: '403',
    name: 'Pudim de Leite',
    description: 'Pudim de leite condensado com calda de caramelo',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop',
    category: 'Sobremesa',
    restaurantId: '4',
    preparationTime: 5,
    isAvailable: true,
  },

  // Pasta & Co Items
  {
    id: '501',
    name: 'Spaghetti Carbonara',
    description: 'Massa com molho cremoso, bacon, queijo parmesão e ovo',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop',
    category: 'Pasta',
    restaurantId: '5',
    preparationTime: 20,
    isAvailable: true,
  },
  {
    id: '502',
    name: 'Risoto de Cogumelos',
    description: 'Risoto cremoso com mix de cogumelos e queijo parmesão',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop',
    category: 'Risoto',
    restaurantId: '5',
    preparationTime: 25,
    isAvailable: true,
  },
  {
    id: '503',
    name: 'Salada Caprese',
    description: 'Tomate, mussarela de búfala, manjericão e azeite',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop',
    category: 'Salada',
    restaurantId: '5',
    preparationTime: 10,
    isAvailable: true,
  },
];

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find(restaurant => restaurant.id === id);
}

export function getMenuItemsByRestaurantId(restaurantId: string): MenuItem[] {
  return menuItems.filter(item => item.restaurantId === restaurantId);
}

export function getRestaurantsByCategory(category: string): Restaurant[] {
  return restaurants.filter(restaurant =>
    restaurant.categories.includes(category)
  );
}

export function searchRestaurants(query: string): Restaurant[] {
  const searchTerm = query.toLowerCase();
  return restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm)
  );
}

export function searchMenuItems(query: string): MenuItem[] {
  const searchTerm = query.toLowerCase();
  return menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );
}
