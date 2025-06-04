import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { restaurants } from '@/data/mockData';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foodfly-secondary mb-4">
          Bem-vindo ao FoodieFly
        </h1>
        <p className="text-lg text-foodfly-gray-medium mb-8">
          Encontre os melhores restaurantes e peça sua comida favorita online.
        </p>

        {/* Barra de Pesquisa */}
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Pesquisar restaurantes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foodfly-gray-medium h-4 w-4" />
        </div>

        {/* Lista de Restaurantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Restaurant";
                  }}
                />
                {!restaurant.isOpen && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold">Fechado</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-foodfly-secondary mb-2">
                  {restaurant.name}
                </h2>
                <p className="text-foodfly-gray-medium mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{restaurant.rating}</span>
                  </div>
                  <span className="text-foodfly-gray-medium">
                    {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}