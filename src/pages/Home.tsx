import React from 'react';
import { Link } from 'react-router-dom';
import { RestaurantCard } from '../components/RestaurantCard';
import { CategorySection } from '../components/CategorySection';
import { restaurants } from '../data/restaurants';

export const Home: React.FC = () => {
  const featuredRestaurants = restaurants.slice(0, 4);
  const popularRestaurants = restaurants.slice(4, 8);
  const newRestaurants = restaurants.slice(8, 12);
  const topRatedRestaurants = restaurants.slice(12, 16);
  const nearbyRestaurants = restaurants.slice(16, 20);

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-white py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foodfly-secondary animate-fade-in">
                FoodieFly
              </h1>
              <p className="text-xl md:text-2xl font-light text-foodfly-gray-medium max-w-xl mx-auto animate-fade-in-delay">
                Sabores que voam até você
              </p>
            </div>
            <p className="text-base text-foodfly-gray-medium max-w-lg mx-auto animate-fade-in-delay-2">
              Descubra os melhores restaurantes da sua região e receba suas refeições favoritas em casa com apenas alguns cliques.
            </p>
            <div className="flex justify-center gap-6 pt-6 animate-fade-in-delay-2">
              <button className="px-8 py-3 bg-foodfly-primary text-white rounded-full hover:bg-foodfly-accent transition-colors duration-300">
                Começar Agora
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Categories Section */}
      <CategorySection />

      {/* Featured Restaurants */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="section-title">Destaques</h2>
          <p className="section-subtitle">Restaurantes em destaque da semana</p>
        </div>
        <div className="restaurant-grid">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="section-title">Mais Populares</h2>
          <p className="section-subtitle">Os restaurantes mais pedidos</p>
        </div>
        <div className="restaurant-grid">
          {popularRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* New Restaurants */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="section-title">Novidades</h2>
          <p className="section-subtitle">Restaurantes recém-chegados</p>
        </div>
        <div className="restaurant-grid">
          {newRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Top Rated Restaurants */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="section-title">Melhor Avaliados</h2>
          <p className="section-subtitle">Restaurantes com as melhores avaliações</p>
        </div>
        <div className="restaurant-grid">
          {topRatedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Nearby Restaurants */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="section-title">Perto de Você</h2>
          <p className="section-subtitle">Restaurantes próximos à sua localização</p>
        </div>
        <div className="restaurant-grid">
          {nearbyRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Download App Section */}
      <section className="bg-primary/5 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-display font-semibold">Baixe nosso App</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Peça comida ainda mais rápido com nosso aplicativo. Disponível para iOS e Android.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary">
            App Store
          </button>
          <button className="btn-secondary">
            Google Play
          </button>
        </div>
      </section>
    </div>
  );
};