import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Star, MapPin, ChevronLeft } from 'lucide-react';
import { getRestaurantById, getMenuItemsByRestaurantId, MenuItem } from '@/data/mockData';
import { FoodCard } from '@/components/FoodCard';

export function RestaurantMenu() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState(id ? getRestaurantById(id) : undefined);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const restaurantData = getRestaurantById(id);
      setRestaurant(restaurantData);

      const items = getMenuItemsByRestaurantId(id);
      setMenuItems(items);

      if (items.length > 0) {
        const categories = [...new Set(items.map(item => item.category))];
        setSelectedCategory(categories[0]);
      }
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurante não encontrado</h2>
          <Link to="/">
            <Button>Voltar para a Página Inicial</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categories = [...new Set(menuItems.map(item => item.category))];

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="flex items-center text-foodfly-primary mb-4">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Voltar</span>
        </Link>

        {/* Informações do Restaurante */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Restaurant+Image";
                }}
              />
            </div>

            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-foodfly-secondary mb-2">{restaurant.name}</h1>
              <p className="text-foodfly-gray-medium mb-4">{restaurant.cuisine}</p>

              <div className="flex items-center text-foodfly-secondary mb-2">
                <Star className="h-5 w-5 mr-1" fill="currentColor" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="mx-2">•</span>
                <Clock className="h-5 w-5 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>

              <div className="flex items-center text-foodfly-gray-medium">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Barra lateral de categorias */}
          <div className="md:w-1/4">
            <h2 className="text-xl font-bold mb-4 text-foodfly-secondary">Cardápio</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              {categories.map(category => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`w-full justify-start mb-2 ${selectedCategory === category ? 'bg-foodfly-primary/10 text-foodfly-primary font-medium' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Itens do cardápio */}
          <div className="md:w-3/4">
            <h2 className="text-xl font-bold mb-4 text-foodfly-secondary">
              {selectedCategory}
            </h2>

            <div className="space-y-4">
              {filteredItems.map(item => (
                <FoodCard
                  key={item.id}
                  item={item}
                  restaurantName={restaurant.name}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-foodfly-gray-medium">Nenhum item encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
