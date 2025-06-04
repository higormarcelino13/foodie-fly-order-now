import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function Register() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 6
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      errors: {
        minLength: !hasMinLength,
        upperCase: !hasUpperCase,
        lowerCase: !hasLowerCase,
        number: !hasNumber,
        specialChar: !hasSpecialChar,
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const passwordValidation = validatePassword(formData.password)

      if (!passwordValidation.isValid) {
        const errorMessages = []
        if (passwordValidation.errors.minLength) errorMessages.push('A senha deve ter pelo menos 6 caracteres')
        if (passwordValidation.errors.upperCase) errorMessages.push('A senha deve conter pelo menos uma letra maiúscula')
        if (passwordValidation.errors.lowerCase) errorMessages.push('A senha deve conter pelo menos uma letra minúscula')
        if (passwordValidation.errors.number) errorMessages.push('A senha deve conter pelo menos um número')
        if (passwordValidation.errors.specialChar) errorMessages.push('A senha deve conter pelo menos um caractere especial')

        toast.error(errorMessages.join('\n'))
        return
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('As senhas não coincidem')
        return
      }

      await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: '', // Optional field
      })

      toast.success('Conta criada com sucesso! Por favor, verifique seu email para confirmar sua conta.')
      navigate('/login')
    } catch (error: any) {
      console.error('Erro ao criar conta:', error)
      if (error.message.includes('email')) {
        toast.error('Este email já está em uso. Por favor, tente outro email ou faça login.')
      } else {
        toast.error('Erro ao criar conta. Tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-foodfly-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-foodfly-secondary">
            Criar Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
              />
            </div>

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
              />
              <p className="text-sm text-foodfly-gray-medium">
                A senha deve conter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirme sua senha"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </Button>

            <p className="text-center text-sm text-foodfly-gray-medium">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-foodfly-primary hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}