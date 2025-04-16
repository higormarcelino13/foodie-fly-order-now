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
    name: "Palácio do Hambúrguer",
    image: "/images/burger-restaurant.jpg",
    cuisine: "Americana",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    address: "Rua Principal, 123"
  },
  {
    id: "r2",
    name: "Paraíso da Pizza",
    image: "/images/pizza-restaurant.jpg",
    cuisine: "Italiana",
    rating: 4.5,
    deliveryTime: "25-40 min",
    deliveryFee: 1.99,
    address: "Avenida do Parque, 456"
  },
  {
    id: "r3",
    name: "Delícias do Sushi",
    image: "/images/sushi-restaurant.jpg",
    cuisine: "Japonesa",
    rating: 4.8,
    deliveryTime: "30-45 min",
    deliveryFee: 3.99,
    address: "Avenida do Oceano, 789"
  },
  {
    id: "r4",
    name: "Cidade do Taco",
    image: "/images/taco-restaurant.jpg",
    cuisine: "Mexicana",
    rating: 4.3,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    address: "Rua das Especiarias, 321"
  },
  {
    id: "r5",
    name: "Paraíso da Massa",
    image: "/images/pasta-restaurant.jpg",
    cuisine: "Italiana",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    address: "Rua da Farinha, 654"
  },
  {
    id: "r6",
    name: "Casa do Curry",
    image: "/images/curry-restaurant.jpg",
    cuisine: "Indiana",
    rating: 4.4,
    deliveryTime: "30-45 min",
    deliveryFee: 2.99,
    address: "Rua das Especiarias, 987"
  }
];

export const menuItems: MenuItem[] = [
  {
    id: "bp1",
    restaurantId: "r1",
    name: "Cheeseburger Clássico",
    description: "Hambúrguer suculento com queijo, alface, tomate e nosso molho especial",
    price: 8.99,
    image: "/images/cheeseburger.jpg",
    category: "Hambúrgueres",
    popular: true
  },
  {
    id: "bp2",
    restaurantId: "r1",
    name: "Hambúrguer Duplo com Bacon",
    description: "Dois hambúrgueres com bacon crocante, queijo e todos os acompanhamentos",
    price: 12.99,
    image: "/images/bacon-burger.jpg",
    category: "Hambúrgueres",
    popular: true
  },
  {
    id: "bp3",
    restaurantId: "r1",
    name: "Hambúrguer Vegetariano",
    description: "Hambúrguer à base de plantas com legumes frescos e maionese vegana",
    price: 9.99,
    image: "/images/veggie-burger.jpg",
    category: "Hambúrgueres",
    popular: false
  },
  {
    id: "bp4",
    restaurantId: "r1",
    name: "Batatas Fritas",
    description: "Batatas fritas douradas e crocantes temperadas na medida certa",
    price: 3.99,
    image: "/images/fries.jpg",
    category: "Acompanhamentos",
    popular: true
  },
  {
    id: "bp5",
    restaurantId: "r1",
    name: "Milkshake de Chocolate",
    description: "Milkshake cremoso de chocolate coberto com chantilly",
    price: 4.99,
    image: "/images/milkshake.jpg",
    category: "Bebidas",
    popular: false
  },

  {
    id: "ph1",
    restaurantId: "r2",
    name: "Pizza Margherita",
    description: "Molho de tomate clássico, mussarela fresca e manjericão",
    price: 12.99,
    image: "/images/margherita.jpg",
    category: "Pizzas",
    popular: true
  },
  {
    id: "ph2",
    restaurantId: "r2",
    name: "Pizza de Pepperoni",
    description: "Molho de tomate, mussarela e fatias de pepperoni",
    price: 14.99,
    image: "/images/pepperoni.jpg",
    category: "Pizzas",
    popular: true
  },
  {
    id: "ph3",
    restaurantId: "r2",
    name: "Pizza Vegetariana",
    description: "Molho de tomate, mussarela, pimentões, cogumelos e azeitonas",
    price: 13.99,
    image: "/images/vegetarian-pizza.jpg",
    category: "Pizzas",
    popular: false
  },
  {
    id: "ph4",
    restaurantId: "r2",
    name: "Pão de Alho",
    description: "Pão recém-assado com manteiga de alho e ervas",
    price: 4.99,
    image: "/images/garlic-bread.jpg",
    category: "Acompanhamentos",
    popular: true
  },
  {
    id: "ph5",
    restaurantId: "r2",
    name: "Tiramisu",
    description: "Sobremesa italiana tradicional com biscoitos embebidos em café e mascarpone",
    price: 6.99,
    image: "/images/tiramisu.jpg",
    category: "Sobremesas",
    popular: false
  },

  {
    id: "sd1",
    restaurantId: "r3",
    name: "California Roll",
    description: "Caranguejo, abacate e pepino enrolados em alga e arroz",
    price: 7.99,
    image: "/images/california-roll.jpg",
    category: "Rolls",
    popular: true
  },
  {
    id: "sd2",
    restaurantId: "r3",
    name: "Nigiri de Salmão",
    description: "Salmão fresco sobre arroz prensado à mão",
    price: 6.99,
    image: "/images/salmon-nigiri.jpg",
    category: "Nigiri",
    popular: true
  },
  {
    id: "sd3",
    restaurantId: "r3",
    name: "Roll de Atum Picante",
    description: "Atum picante e pepino enrolados em alga e arroz",
    price: 8.99,
    image: "/images/spicy-tuna.jpg",
    category: "Rolls",
    popular: true
  },
  {
    id: "sd4",
    restaurantId: "r3",
    name: "Sopa Missô",
    description: "Sopa japonesa tradicional com tofu e algas",
    price: 3.99,
    image: "/images/miso-soup.jpg",
    category: "Acompanhamentos",
    popular: false
  },
  {
    id: "sd5",
    restaurantId: "r3",
    name: "Sorvete de Chá Verde",
    description: "Sorvete cremoso com sabor de chá verde",
    price: 4.99,
    image: "/images/green-tea-ice-cream.jpg",
    category: "Sobremesas",
    popular: false
  }
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getMenuItemsByRestaurantId = (restaurantId: string): MenuItem[] => {
  return menuItems.filter(item => item.restaurantId === restaurantId);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const getPopularMenuItems = (): MenuItem[] => {
  return menuItems.filter(item => item.popular);
};
