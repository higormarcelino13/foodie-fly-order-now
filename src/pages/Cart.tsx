import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const itemsByRestaurant = cartItems.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = {
        restaurantName: item.restaurantName,
        items: []
      };
    }
    acc[item.restaurantId].items.push(item);
    return acc;
  }, {} as Record<string, { restaurantName: string; items: typeof cartItems }>);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const serviceFee = subtotal > 0 ? 1.99 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/" className="flex items-center text-foodfly-primary mb-4">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Continuar Comprando</span>
        </Link>

        <h1 className="text-3xl font-bold text-foodfly-secondary mb-6">Seu Carrinho</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-foodfly-gray-medium" />
            <h2 className="text-2xl font-bold text-foodfly-secondary mb-2">Seu carrinho está vazio</h2>
            <p className="text-foodfly-gray-medium mb-6">Adicione algumas comidas deliciosas para começar!</p>
            <Link to="/">
              <Button className="bg-foodfly-primary hover:bg-foodfly-primary/90">
                Explorar Restaurantes
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Itens do Carrinho */}
            <div className="lg:w-2/3">
              {Object.values(itemsByRestaurant).map(({ restaurantName, items }) => (
                <div key={restaurantName} className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold text-foodfly-secondary mb-4">
                    {restaurantName}
                  </h2>

                  <div className="divide-y">
                    {items.map(item => (
                      <div key={item.id} className="py-4 flex flex-col sm:flex-row">
                        <div className="sm:w-24 sm:h-24 h-32 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Item+Comida";
                            }}
                          />
                        </div>

                        <div className="sm:ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-foodfly-secondary">{item.name}</h3>
                            <p className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                          </div>

                          <p className="text-sm text-foodfly-gray-medium mb-4">{item.description}</p>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-l-lg"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>

                              <span className="w-8 text-center">{item.quantity}</span>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-r-lg"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span>Remover</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-right mb-6">
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={clearCart}
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foodfly-secondary mb-4">Resumo do Pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-foodfly-gray-medium">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-foodfly-gray-medium">Taxa de Entrega</span>
                    <span>R$ {deliveryFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-foodfly-gray-medium">Taxa de Serviço</span>
                    <span>R$ {serviceFee.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-foodfly-primary hover:bg-foodfly-primary/90"
                  onClick={handleCheckout}
                >
                  Finalizar Pedido
                </Button>
              </div>
            </div>
          </div>
        )}
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

export default Cart;
