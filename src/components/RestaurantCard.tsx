
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, MapPin } from 'lucide-react';
import { Restaurant } from '@/data/mockData';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card block">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image if the restaurant image doesn't load
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Restaurant+Image";
          }}
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
          <Star className="h-4 w-4 text-foodfly-accent mr-1" fill="currentColor" />
          <span>{restaurant.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-foodfly-secondary">{restaurant.name}</h3>
        <p className="text-foodfly-gray-medium text-sm mb-2">{restaurant.cuisine}</p>
        
        <div className="flex items-center text-sm text-foodfly-secondary mb-1">
          <Clock className="h-4 w-4 mr-1" />
          <span>{restaurant.deliveryTime}</span>
          <span className="mx-2">•</span>
          <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
        </div>
        
        <div className="flex items-center text-sm text-foodfly-gray-medium">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{restaurant.address}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
