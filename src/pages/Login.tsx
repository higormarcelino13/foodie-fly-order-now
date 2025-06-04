import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function Login() {
  const navigate = useNavigate()
  const { signIn, user, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/', { replace: true })
    }
  }, [user, authLoading, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(formData.email, formData.password)
      // O redirecionamento será feito pelo useEffect quando o user for atualizado
    } catch (error: any) {
      console.error('Error signing in:', error)
      if (error.message.includes('Email not confirmed')) {
        toast.error('Por favor, verifique seu email para confirmar sua conta antes de fazer login.')
      } else if (error.message.includes('Invalid login credentials')) {
        toast.error('Email ou senha inválidos. Por favor, tente novamente.')
      } else {
        toast.error('Erro ao fazer login. Tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Mostrar loading enquanto verifica o estado de autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foodfly-light p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foodfly-primary"></div>
          <p className="text-foodfly-secondary">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-foodfly-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-foodfly-secondary">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Sua senha"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </Button>

            <p className="text-center text-sm text-foodfly-gray-medium">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-foodfly-primary hover:underline">
                Criar conta
              </Link>
            </p>

            <p className="text-center text-sm text-foodfly-gray-medium">
              <Link to="/forgot-password" className="text-foodfly-primary hover:underline">
                Esqueceu sua senha?
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
