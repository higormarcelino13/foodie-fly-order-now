import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from 'sonner'
import { resetPasswordSchema, type ResetPasswordInput } from '../lib/validations/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const navigate = useNavigate()
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true)

    try {
      await resetPassword(data.email)
      setIsEmailSent(true)
      toast.success('Email de recuperação enviado com sucesso!')
    } catch (error: any) {
      console.error('Erro ao enviar email de recuperação:', error)
      const errorMessage = error.message || 'Erro ao enviar email de recuperação. Tente novamente.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foodfly-light p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Email Enviado</CardTitle>
            <CardDescription>
              Verifique sua caixa de entrada para redefinir sua senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Enviamos um email com instruções para redefinir sua senha.
              Por favor, verifique sua caixa de entrada e siga as instruções.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Voltar para o login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-foodfly-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperar Senha</CardTitle>
          <CardDescription>
            Digite seu email para receber as instruções de recuperação
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar instruções'}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Lembrou sua senha?{' '}
              <Link to="/login" className="text-foodfly-primary hover:underline">
                Voltar para o login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}