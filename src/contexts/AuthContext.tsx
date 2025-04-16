
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithSocial: (provider: 'facebook' | 'google') => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('foodiefly_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'teste@exemplo.com' && password === 'senha123') {
        const loggedUser = {
          id: '1',
          name: 'Usuário Teste',
          email: email
        };
        setUser(loggedUser);
        localStorage.setItem('foodiefly_user', JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithSocial = async (provider: 'facebook' | 'google'): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const providerName = provider === 'facebook' ? 'Facebook' : 'Google';

      const loggedUser = {
        id: provider === 'facebook' ? 'fb123' : 'g456',
        name: `Usuário ${providerName}`,
        email: `usuario.${provider}@exemplo.com`,
        photoUrl: 'https://placehold.co/100x100'
      };

      setUser(loggedUser);
      localStorage.setItem('foodiefly_user', JSON.stringify(loggedUser));
      return true;
    } catch (error) {
      console.error(`Erro ao fazer login com ${provider}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now().toString(),
        name,
        email
      };

      setUser(newUser);
      localStorage.setItem('foodiefly_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodiefly_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithSocial,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
