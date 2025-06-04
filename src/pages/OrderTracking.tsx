import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Home, ChefHat, Bike, Check, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered';

const steps = [
  { id: 'pending', label: 'Pedido Recebido', icon: CheckCircle, time: '12:30' },
  { id: 'preparing', label: 'Em Preparação', icon: ChefHat, time: '12:40' },
  { id: 'ready', label: 'Pronto para Entrega', icon: Bike, time: '13:05' },
  { id: 'delivering', label: 'A Caminho', icon: Bike, time: '13:15' },
  { id: 'delivered', label: 'Entregue', icon: Check, time: '13:25' }
];

interface Order {
  id: string;
  status: OrderStatus;
  created_at: string;
  restaurant: {
    name: string;
    image: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  delivery_address: string;
  estimated_delivery_time: string;
}

const statusLabels = {
  pending: 'Pedido Recebido',
  preparing: 'Em Preparação',
  ready: 'Pronto para Entrega',
  delivering: 'Saiu para Entrega',
  delivered: 'Entregue',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-purple-100 text-purple-800',
  delivering: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
};

export function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            restaurant:restaurants(name, image),
            items:order_items(
              name,
              quantity,
              price
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        setOrder(data as Order);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Erro ao carregar informações do pedido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foodfly-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-foodfly-secondary mb-4">
          Pedido não encontrado
        </h2>
        <p className="text-foodfly-gray-dark mb-4">
          Não foi possível encontrar as informações deste pedido.
        </p>
        <Button onClick={() => window.history.back()}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foodfly-secondary mb-6">Rastreamento do Pedido</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-foodfly-secondary">Pedido #{order.id}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
            {statusLabels[order.status]}
          </span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-foodfly-gray-medium">Progresso</span>
            <span className="text-sm font-medium">{order.status === 'delivered' ? '100%' : 'Em Andamento'}</span>
          </div>
          <Progress value={order.status === 'delivered' ? 100 : 50} className="h-2" />
        </div>

        {order.status !== 'delivered' && (
          <div className="p-4 bg-foodfly-primary/10 rounded-lg mb-8">
            <h3 className="font-medium text-foodfly-secondary mb-1">Tempo Estimado de Entrega</h3>
            <p className="text-foodfly-primary text-2xl font-bold">{order.estimated_delivery_time}</p>
          </div>
        )}

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = index <= steps.findIndex(s => s.id === order.status);
            const isCurrent = index === steps.findIndex(s => s.id === order.status);

            return (
              <div key={step.id} className="flex items-start">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                  isCompleted ? 'bg-foodfly-primary text-white' : 'bg-foodfly-gray-light text-foodfly-gray-medium'
                }`}>
                  <step.icon className="h-6 w-6" />

                  {/* Linha conectora */}
                  {index < steps.length - 1 && (
                    <div className={`absolute top-12 left-1/2 w-0.5 h-16 -translate-x-1/2 ${
                      index < steps.findIndex(s => s.id === order.status) ? 'bg-foodfly-primary' : 'bg-foodfly-gray-light'
                    }`} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-bold ${
                      isCompleted ? 'text-foodfly-secondary' : 'text-foodfly-gray-medium'
                    }`}>
                      {step.label}
                    </h3>

                    <span className={`text-sm ${
                      isCompleted ? 'text-foodfly-secondary' : 'text-foodfly-gray-medium'
                    }`}>
                      {isCompleted ? step.time : ''}
                    </span>
                  </div>

                  {isCurrent && order.status !== 'delivered' && (
                    <p className="text-sm text-foodfly-primary mt-1">
                      {order.status === 'pending' && 'O restaurante está confirmando seu pedido'}
                      {order.status === 'preparing' && 'O chef está preparando sua refeição deliciosa'}
                      {order.status === 'ready' && 'Seu pedido está pronto para entrega'}
                      {order.status === 'delivering' && 'O entregador está a caminho da sua localização'}
                    </p>
                  )}

                  {order.status === 'delivered' && index === steps.length - 1 && (
                    <p className="text-sm text-green-600 mt-1">
                      Seu pedido foi entregue. Bom apetite!
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {order.status === 'delivered' && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-foodfly-secondary mb-4">Como foi seu pedido?</h3>
            <div className="flex gap-2">
              <Button className="bg-foodfly-primary hover:bg-foodfly-primary/90">Avaliar Pedido</Button>
              <Button variant="outline">Precisa de Ajuda?</Button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <Link to="/">
          <Button variant="outline" className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            <span>Voltar para a Página Inicial</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
