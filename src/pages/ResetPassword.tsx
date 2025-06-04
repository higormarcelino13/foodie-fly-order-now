import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from 'sonner'
import { updatePasswordSchema, type UpdatePasswordInput } from '../lib/validations/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { updatePassword } = useAuth()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const onSubmit = async (data: UpdatePasswordInput) => {
    if (!token || !email) {
      toast.error('Link inválido ou expirado')
      return
    }

    setIsLoading(true)

    try {
      await updatePassword(token, data.password)
      toast.success('Senha atualizada com sucesso!')
      navigate('/login')
    } catch (error: any) {
      console.error('Erro ao atualizar senha:', error)
      const errorMessage = error.message || 'Erro ao atualizar senha. Tente novamente.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foodfly-light p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Link Inválido</CardTitle>
            <CardDescription>
              O link de recuperação de senha é inválido ou expirou
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Por favor, solicite um novo link de recuperação de senha.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              className="w-full"
              onClick={() => navigate('/forgot-password')}
            >
              Solicitar novo link
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
          <CardTitle>Redefinir Senha</CardTitle>
          <CardDescription>
            Digite sua nova senha
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova senha"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua nova senha"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Atualizando...' : 'Atualizar Senha'}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Lembrou sua senha?{' '}
              <Button
                type="button"
                variant="link"
                className="text-foodfly-primary hover:underline p-0"
                onClick={() => navigate('/login')}
              >
                Voltar para o login
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}