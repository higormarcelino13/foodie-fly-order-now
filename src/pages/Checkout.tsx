import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, CreditCard, MapPin, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type PaymentMethod = 'credit' | 'debit' | 'pix';

export function Checkout() {
  const cart = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  React.useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/');
    }
  }, [cart.items, navigate]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      const formattedValue = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
      setCardExpiry(formattedValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful payment
      toast.success('Pedido realizado com sucesso!');
      cart.clearCart();
      navigate('/order-success');
    } catch (error) {
      toast.error('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cart.getCartTotal();
  const deliveryFee = 2.99;
  const serviceFee = 1.99;
  const total = subtotal + deliveryFee + serviceFee;

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
        <Button onClick={() => navigate('/')}>Voltar para a página inicial</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/cart" className="flex items-center text-foodfly-primary mb-4">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Voltar para o Carrinho</span>
        </Link>

        <h1 className="text-3xl font-bold text-foodfly-secondary mb-6">Finalizar Pedido</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulário de Pagamento */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informações de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit">Cartão de Crédito</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="debit" id="debit" />
                        <Label htmlFor="debit">Cartão de Débito</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix">PIX</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod !== 'pix' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Nome como está no cartão"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            value={cardExpiry}
                            onChange={handleCardExpiryChange}
                            placeholder="MM/AA"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCVC">CVC</Label>
                          <Input
                            id="cardCVC"
                            value={cardCVC}
                            onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="deliveryAddress">Endereço de Entrega</Label>
                      <Input
                        id="deliveryAddress"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Rua, número, complemento, bairro"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="deliveryInstructions">Instruções para Entrega</Label>
                      <Input
                        id="deliveryInstructions"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        placeholder="Ex: Apartamento 123, tocar a campainha"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-foodfly-gray-medium">
                          {item.quantity}x R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Entrega</span>
                      <span>R$ {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
}
