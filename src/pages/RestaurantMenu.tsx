import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import FoodCard from '@/components/FoodCard';
import { getRestaurantById, getMenuItemsByRestaurantId, MenuItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Clock, Star, MapPin, ChevronLeft } from 'lucide-react';

const RestaurantMenu: React.FC = () => {
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
        <Header />
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/" className="flex items-center text-foodfly-primary mb-4">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Voltar para restaurantes</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-48 md:h-64">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Imagem+Restaurante";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                <p className="mb-2">{restaurant.cuisine}</p>

                <div className="flex items-center text-sm">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 text-foodfly-accent mr-1" fill="currentColor" />
                    <span>{restaurant.rating}</span>
                  </div>

                  <div className="flex items-center mr-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
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
      </main>

      <footer className="bg-foodfly-secondary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="font-bold text-xl mb-2">FoodieFly</h2>
              <p className="text-sm text-foodfly-gray-light">Peça comida deliciosa online!</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Links Rápidos</h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-foodfly-primary">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Contato</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-center">© {new Date().getFullYear()} FoodieFly. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantMenu;
