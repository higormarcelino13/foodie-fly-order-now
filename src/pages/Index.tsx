import React, { useState } from 'react';
import Header from '@/components/Header';
import { restaurants } from '@/data/mockData';
import RestaurantCard from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';

const cuisineTypes = ["Todos", "Americana", "Italiana", "Japonesa", "Mexicana", "Indiana"];

const Index: React.FC = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("Todos");

  const filteredRestaurants = selectedCuisine === "Todos" 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.cuisine === selectedCuisine);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-foodfly-secondary mb-2">Entrega de Comida</h1>
          <p className="text-foodfly-gray-medium mb-6">Peça dos seus restaurantes favoritos</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {cuisineTypes.map(cuisine => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                className={selectedCuisine === cuisine ? "bg-foodfly-primary" : ""}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-foodfly-gray-medium">Nenhum restaurante encontrado para este tipo de culinária.</p>
              <Button 
                className="mt-4 bg-foodfly-primary hover:bg-foodfly-primary/90" 
                onClick={() => setSelectedCuisine("Todos")}
              >
                Ver Todos os Restaurantes
              </Button>
            </div>
          )}
        </section>
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

export default Index;
