import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, MapPin } from 'lucide-react';
import { Restaurant } from '@/data/restaurants';
import { CategoryFlag } from './CategoryFlags';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const getCategoryId = (cuisine: string) => {
    const categories: { [key: string]: string } = {
      'Italiana': 'italian',
      'Japonesa': 'japanese',
      'Brasileira': 'brazilian',
      'Mexicana': 'mexican',
      'Indiana': 'indian'
    };
    return categories[cuisine] || '';
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card block">
      <div className="relative h-40 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={imageError ? "https://placehold.co/600x400/e2e8f0/64748b?text=Restaurant+Image" : restaurant.image}
          alt={restaurant.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">Fechado</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
          <Star className="h-4 w-4 text-foodfly-accent mr-1" fill="currentColor" />
          <span>{restaurant.rating}</span>
        </div>
        <div className="absolute top-2 left-2 w-8 h-6 rounded overflow-hidden shadow-lg">
          <CategoryFlag category={getCategoryId(restaurant.cuisine)} className="w-full h-full" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-foodfly-secondary">{restaurant.name}</h3>
        <p className="text-foodfly-gray-medium text-sm mb-2">{restaurant.cuisine}</p>

        <div className="flex items-center text-sm text-foodfly-secondary mb-1">
          <Clock className="h-4 w-4 mr-1" />
          <span>{restaurant.deliveryTime}</span>
          {restaurant.deliveryFee && (
            <>
              <span className="mx-2">•</span>
              <span>R$ {restaurant.deliveryFee.toFixed(2)} delivery</span>
            </>
          )}
        </div>

        {restaurant.address && (
          <div className="flex items-center text-sm text-foodfly-gray-medium">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{restaurant.address}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export { RestaurantCard };
