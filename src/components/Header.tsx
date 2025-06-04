import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Search, Home, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const cart = useCart();
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/');
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-foodfly-primary">FoodieFly</span>
          </Link>

          {/* Navegação Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="text"
                placeholder="Pesquisar restaurantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foodfly-gray-medium h-4 w-4" />
            </form>

            <Link to="/" className="text-foodfly-secondary hover:text-foodfly-primary transition-colors">
              <Home className="h-5 w-5" />
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-foodfly-secondary hover:text-foodfly-primary transition-colors" />
              {cart.getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-foodfly-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.getCartCount()}
                </span>
              )}
            </Link>

            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-foodfly-primary"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Meus Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button>Criar Conta</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Botão do Menu Mobile */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foodfly-secondary">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Pesquisar restaurantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foodfly-gray-medium h-4 w-4" />
            </form>

            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center text-foodfly-secondary py-2 px-4 rounded hover:bg-foodfly-gray-light"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-2" />
                <span>Início</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center text-foodfly-secondary py-2 px-4 rounded hover:bg-foodfly-gray-light"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Carrinho</span>
                {cart.getCartCount() > 0 && (
                  <span className="ml-2 bg-foodfly-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.getCartCount()}
                  </span>
                )}
              </Link>

              {isLoading ? (
                <div className="flex items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-foodfly-primary"></div>
                </div>
              ) : user ? (
                <>
                  <div className="flex items-center text-foodfly-secondary py-2 px-4">
                    <User className="h-5 w-5 mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <button
                    className="flex items-center text-destructive py-2 px-4 rounded hover:bg-foodfly-gray-light text-left"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center text-foodfly-secondary py-2 px-4 rounded hover:bg-foodfly-gray-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span>Entrar</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center text-foodfly-secondary py-2 px-4 rounded hover:bg-foodfly-gray-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Criar Conta</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
