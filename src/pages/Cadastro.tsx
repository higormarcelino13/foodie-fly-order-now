
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Facebook, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from 'sonner';
import Header from '@/components/Header';

const cadastroSchema = z.object({
  name: z.string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string()
    .min(1, { message: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z.string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirmação de senha é obrigatória" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const Cadastro = () => {
  const { register, loginWithSocial, loading } = useAuth();
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);

  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof cadastroSchema>) => {
    setRegistering(true);
    try {
      const success = await register(values.name, values.email, values.password);
      if (success) {
        toast.success("Cadastro realizado com sucesso!");
        navigate('/');
      } else {
        toast.error("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao fazer cadastro. Tente novamente.");
    } finally {
      setRegistering(false);
    }
  };

  const handleSocialLogin = async (provider: 'facebook' | 'google') => {
    setRegistering(true);
    try {
      const success = await loginWithSocial(provider);
      if (success) {
        toast.success(`Cadastro com ${provider === 'facebook' ? 'Facebook' : 'Google'} realizado com sucesso!`);
        navigate('/');
      } else {
        toast.error(`Erro ao cadastrar com ${provider === 'facebook' ? 'Facebook' : 'Google'}`);
      }
    } catch (error) {
      toast.error("Erro ao fazer cadastro social. Tente novamente.");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-foodfly-secondary">
              Criar nova conta
            </h2>
            <p className="mt-2 text-sm text-foodfly-gray-medium">
              Ou{' '}
              <Link to="/login" className="font-medium text-foodfly-primary hover:text-foodfly-primary/80">
                entrar na sua conta existente
              </Link>
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu e-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Sua senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirme sua senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={registering || loading}
                >
                  {registering ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
            </Form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-foodfly-gray-medium">
                  Ou cadastre-se com
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('facebook')}
                disabled={registering || loading}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('google')}
                disabled={registering || loading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
