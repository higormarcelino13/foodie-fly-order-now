import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Home, ChefHat, Bike, Check, CheckCircle } from 'lucide-react';

type OrderStatus = 'confirmed' | 'preparing' | 'delivering' | 'delivered';

const steps = [
  { id: 'confirmed', label: 'Pedido Confirmado', icon: CheckCircle, time: '12:30' },
  { id: 'preparing', label: 'Preparando', icon: ChefHat, time: '12:40' },
  { id: 'delivering', label: 'A Caminho', icon: Bike, time: '13:05' },
  { id: 'delivered', label: 'Entregue', icon: Check, time: '13:25' }
];

const OrderTracking: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('confirmed');
  const [progress, setProgress] = useState(25);
  const [estimatedTime, setEstimatedTime] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });

      if (estimatedTime <= 35 && currentStatus === 'confirmed') {
        setCurrentStatus('preparing');
        setProgress(50);
      } else if (estimatedTime <= 20 && currentStatus === 'preparing') {
        setCurrentStatus('delivering');
        setProgress(75);
      } else if (estimatedTime <= 5 && currentStatus === 'delivering') {
        setCurrentStatus('delivered');
        setProgress(100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStatus, estimatedTime]);

  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

  const formatTime = (minutes: number): string => {
    if (minutes < 1) return 'Menos de um minuto';
    if (minutes === 1) return '1 minuto';
    return `${minutes} minutos`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foodfly-secondary mb-6">Rastreamento do Pedido</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-foodfly-secondary">Pedido #FD38291</h2>
            <span className="px-3 py-1 bg-foodfly-primary/10 text-foodfly-primary rounded-full text-sm font-medium">
              {currentStatus === 'delivered' ? 'Entregue' : 'Em Andamento'}
            </span>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-foodfly-gray-medium">Progresso</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {currentStatus !== 'delivered' && (
            <div className="p-4 bg-foodfly-primary/10 rounded-lg mb-8">
              <h3 className="font-medium text-foodfly-secondary mb-1">Tempo Estimado de Entrega</h3>
              <p className="text-foodfly-primary text-2xl font-bold">{formatTime(estimatedTime)}</p>
            </div>
          )}

          <div className="space-y-8">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex items-start">
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                    isCompleted ? 'bg-foodfly-primary text-white' : 'bg-foodfly-gray-light text-foodfly-gray-medium'
                  }`}>
                    <step.icon className="h-6 w-6" />

                    {/* Linha conectora */}
                    {index < steps.length - 1 && (
                      <div className={`absolute top-12 left-1/2 w-0.5 h-16 -translate-x-1/2 ${
                        index < currentStepIndex ? 'bg-foodfly-primary' : 'bg-foodfly-gray-light'
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

                    {isCurrent && currentStatus !== 'delivered' && (
                      <p className="text-sm text-foodfly-primary mt-1">
                        {currentStatus === 'confirmed' && 'O restaurante está confirmando seu pedido'}
                        {currentStatus === 'preparing' && 'O chef está preparando sua refeição deliciosa'}
                        {currentStatus === 'delivering' && 'O entregador está a caminho da sua localização'}
                      </p>
                    )}

                    {currentStatus === 'delivered' && index === steps.length - 1 && (
                      <p className="text-sm text-green-600 mt-1">
                        Seu pedido foi entregue. Bom apetite!
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {currentStatus === 'delivered' && (
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
      </main>

      <footer className="bg-foodfly-secondary text-white py-6 mt-auto">
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

export default OrderTracking;
