import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryFlag } from './CategoryFlags';

interface Category {
  id: string;
  name: string;
  description: string;
  cuisine: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Italiana',
    description: 'Massas, pizzas e pratos tradicionais',
    cuisine: 'italian'
  },
  {
    id: '2',
    name: 'Japonesa',
    description: 'Sushi, sashimi e pratos orientais',
    cuisine: 'japanese'
  },
  {
    id: '3',
    name: 'Brasileira',
    description: 'Feijoada, churrasco e pratos típicos',
    cuisine: 'brazilian'
  },
  {
    id: '4',
    name: 'Mexicana',
    description: 'Tacos, burritos e pratos picantes',
    cuisine: 'mexican'
  },
  {
    id: '5',
    name: 'Indiana',
    description: 'Curry, tandoori e pratos apimentados',
    cuisine: 'indian'
  }
];

export const CategorySection: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="section-title">Categorias</h2>
        <p className="section-subtitle">Explore diferentes tipos de culinária</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="card hover:shadow-md transition-all duration-300"
          >
            <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
              <div className="w-24 h-16">
                <CategoryFlag category={category.cuisine} className="w-full h-full" />
              </div>
            </div>
            <h3 className="font-display font-semibold">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};