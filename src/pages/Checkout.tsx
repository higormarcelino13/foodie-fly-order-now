
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, CreditCard, MapPin, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    notes: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect to home if cart is empty
  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Required fields
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'zipCode', 'cardNumber', 'cardExpiry', 'cardCvc'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Card validation
    const cardNumberRegex = /^\d{16}$/;
    if (formData.cardNumber && !cardNumberRegex.test(formData.cardNumber.replace(/\D/g, ''))) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    const cardExpiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (formData.cardExpiry && !cardExpiryRegex.test(formData.cardExpiry)) {
      errors.cardExpiry = 'Please enter a valid expiry date (MM/YY)';
    }
    
    const cardCvcRegex = /^\d{3,4}$/;
    if (formData.cardCvc && !cardCvcRegex.test(formData.cardCvc)) {
      errors.cardCvc = 'Please enter a valid CVC code';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/tracking');
      setIsSubmitting(false);
    }, 2000);
  };
  
  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const serviceFee = 1.99;
  const total = subtotal + deliveryFee + serviceFee;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/cart" className="flex items-center text-foodfly-primary mb-4">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Back to Cart</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-foodfly-secondary mb-6">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Delivery Information */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-foodfly-primary mr-2" />
                  <h2 className="text-xl font-bold text-foodfly-secondary">Delivery Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={formErrors.fullName ? 'border-red-500' : ''}
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? 'border-red-500' : ''}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={formErrors.phone ? 'border-red-500' : ''}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      Delivery Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={formErrors.address ? 'border-red-500' : ''}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      City
                    </label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={formErrors.city ? 'border-red-500' : ''}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      ZIP Code
                    </label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={formErrors.zipCode ? 'border-red-500' : ''}
                    />
                    {formErrors.zipCode && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.zipCode}
                      </p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      Delivery Notes (optional)
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="E.g., Apartment number, gate code, or delivery instructions"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-5 w-5 text-foodfly-primary mr-2" />
                  <h2 className="text-xl font-bold text-foodfly-secondary">Payment Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      Card Number
                    </label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={formErrors.cardNumber ? 'border-red-500' : ''}
                    />
                    {formErrors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.cardNumber}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      Expiry Date
                    </label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className={formErrors.cardExpiry ? 'border-red-500' : ''}
                    />
                    {formErrors.cardExpiry && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.cardExpiry}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm font-medium text-foodfly-secondary mb-1">
                      CVC
                    </label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className={formErrors.cardCvc ? 'border-red-500' : ''}
                    />
                    {formErrors.cardCvc && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.cardCvc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Delivery Time */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-foodfly-primary mr-2" />
                  <h2 className="text-xl font-bold text-foodfly-secondary">Delivery Time</h2>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 border border-foodfly-primary rounded-lg p-4 text-center bg-foodfly-primary/5">
                    <p className="font-medium">As soon as possible</p>
                    <p className="text-sm text-foodfly-gray-medium">30-45 min</p>
                  </div>
                  
                  <div className="flex-1 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="font-medium">Schedule for later</p>
                    <p className="text-sm text-foodfly-gray-medium">Choose a time</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:hidden mb-6">
                <h2 className="text-xl font-bold text-foodfly-secondary mb-4">Order Summary</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-foodfly-gray-medium">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-foodfly-gray-medium">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-foodfly-gray-medium">Service Fee</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-foodfly-primary hover:bg-foodfly-primary/90 lg:hidden"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3 hidden lg:block">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foodfly-secondary mb-4">Order Summary</h2>
              
              <div className="mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div className="flex items-center">
                      <span className="bg-foodfly-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-2">
                        {item.quantity}
                      </span>
                      <span className="text-foodfly-secondary">{item.name}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-foodfly-gray-medium">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-foodfly-gray-medium">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-foodfly-gray-medium">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-foodfly-primary hover:bg-foodfly-primary/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-foodfly-secondary text-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="font-bold text-xl mb-2">FoodieFly</h2>
              <p className="text-sm text-foodfly-gray-light">Order delicious food online!</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Quick Links</h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-foodfly-primary">About Us</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Contact</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-center">© {new Date().getFullYear()} FoodieFly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
