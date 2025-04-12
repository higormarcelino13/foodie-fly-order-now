
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/mockData';

interface FoodCardProps {
  item: MenuItem;
  restaurantName: string;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, restaurantName }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      restaurantId: item.restaurantId,
      restaurantName,
      quantity
    });
    
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  return (
    <div className="food-card bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-32 md:h-auto">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback image if the food image doesn't load
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Food+Item";
            }}
          />
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-foodfly-secondary">{item.name}</h3>
          <p className="text-foodfly-gray-medium text-sm mb-2 flex-grow">{item.description}</p>
          
          <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-foodfly-secondary">${item.price.toFixed(2)}</p>
            
            <div className="flex items-center">
              <div className="flex items-center border rounded-l-lg mr-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-l-lg"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="w-8 text-center">{quantity}</span>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-r-lg"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="bg-foodfly-primary hover:bg-foodfly-primary/90 text-white"
                size="sm"
                onClick={handleAddToCart}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
