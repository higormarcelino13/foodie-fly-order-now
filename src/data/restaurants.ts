export interface Restaurant {
  id: string
  name: string
  image: string
  cuisine: string
  rating: number
  deliveryTime: string
  isOpen: boolean
  deliveryFee: number
  address: string
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Express',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Italiana',
    rating: 4.8,
    deliveryTime: '30-45 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Domingos de Morais, 123 - Vila Mariana'
  },
  {
    id: '2',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Japonesa',
    rating: 4.9,
    deliveryTime: '40-55 min',
    isOpen: true,
    deliveryFee: 7.90,
    address: 'Rua Vergueiro, 456 - Liberdade'
  },
  {
    id: '3',
    name: 'Churrascaria Brasil',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Brasileira',
    rating: 4.7,
    deliveryTime: '45-60 min',
    isOpen: true,
    deliveryFee: 6.90,
    address: 'Rua Luís Góis, 789 - Mirandópolis'
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Mexicana',
    rating: 4.6,
    deliveryTime: '25-40 min',
    isOpen: true,
    deliveryFee: 4.90,
    address: 'Rua das Rosas, 321 - Mirandópolis'
  },
  {
    id: '5',
    name: 'Curry House',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Indiana',
    rating: 4.5,
    deliveryTime: '35-50 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Loefgren, 654 - Vila Clementino'
  },
  {
    id: '6',
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Italiana',
    rating: 4.7,
    deliveryTime: '30-45 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Antônio Peçanha, 987 - Jardim São Paulo'
  },
  {
    id: '7',
    name: 'Ramen House',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Japonesa',
    rating: 4.8,
    deliveryTime: '35-50 min',
    isOpen: true,
    deliveryFee: 6.90,
    address: 'Rua Baltazar de Azevedo, 147 - Jardim São Paulo'
  },
  {
    id: '8',
    name: 'Feijoada Express',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Brasileira',
    rating: 4.6,
    deliveryTime: '40-55 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Barbalho Bezerra, 258 - Jardim São Paulo'
  },
  {
    id: '9',
    name: 'Burrito King',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Mexicana',
    rating: 4.4,
    deliveryTime: '25-40 min',
    isOpen: true,
    deliveryFee: 4.90,
    address: 'Rua Barbosa Calheiros, 369 - Jardim São Paulo'
  },
  {
    id: '10',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Indiana',
    rating: 4.7,
    deliveryTime: '35-50 min',
    isOpen: true,
    deliveryFee: 6.90,
    address: 'Rua Barra do Marabá, 741 - Jardim São Paulo'
  },
  {
    id: '11',
    name: 'Pizza Roma',
    image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Italiana',
    rating: 4.5,
    deliveryTime: '30-45 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Heitor Penteado, 852 - Vila Madalena'
  },
  {
    id: '12',
    name: 'Sushi Express',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Japonesa',
    rating: 4.6,
    deliveryTime: '35-50 min',
    isOpen: true,
    deliveryFee: 6.90,
    address: 'Rua Cardoso de Almeida, 963 - Perdizes'
  },
  {
    id: '13',
    name: 'Churrasco Express',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Brasileira',
    rating: 4.8,
    deliveryTime: '40-55 min',
    isOpen: true,
    deliveryFee: 7.90,
    address: 'Rua João Moura, 159 - Pinheiros'
  },
  {
    id: '14',
    name: 'Taco Express',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Mexicana',
    rating: 4.5,
    deliveryTime: '25-40 min',
    isOpen: true,
    deliveryFee: 4.90,
    address: 'Rua Cayowaá, 357 - Perdizes'
  },
  {
    id: '15',
    name: 'Indian Spice',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Indiana',
    rating: 4.7,
    deliveryTime: '35-50 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Harmonia, 753 - Vila Madalena'
  },
  {
    id: '16',
    name: 'Pasta House',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Italiana',
    rating: 4.6,
    deliveryTime: '30-45 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Álvaro de Abreu, 951 - Jardim São Paulo'
  },
  {
    id: '17',
    name: 'Sushi House',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Japonesa',
    rating: 4.8,
    deliveryTime: '35-50 min',
    isOpen: true,
    deliveryFee: 6.90,
    address: 'Rua Capitão Rabelo, 753 - Jardim São Paulo'
  },
  {
    id: '18',
    name: 'Brasil Grill',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Brasileira',
    rating: 4.7,
    deliveryTime: '40-55 min',
    isOpen: true,
    deliveryFee: 7.90,
    address: 'Rua Antônio Clemente, 159 - Jardim São Paulo'
  },
  {
    id: '19',
    name: 'Mexican Grill',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Mexicana',
    rating: 4.5,
    deliveryTime: '25-40 min',
    isOpen: true,
    deliveryFee: 4.90,
    address: 'Rua Conceição da Barra, 357 - Jardim São Paulo'
  },
  {
    id: '20',
    name: 'Tandoori House',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
    cuisine: 'Indiana',
    rating: 4.6,
    deliveryTime: '35-50 min',
    isOpen: true,
    deliveryFee: 5.90,
    address: 'Rua Joaquim Osório de Azevedo, 753 - Jardim São Paulo'
  }
]