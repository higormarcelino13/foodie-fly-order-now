import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function Profile() {
  const { user, signOut } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // TODO: Implement profile update
      toast.success('Perfil atualizado com sucesso!')
      setIsEditing(false)
    } catch (error) {
      toast.error('Erro ao atualizar perfil.')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Logout realizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao fazer logout.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-foodfly-secondary">
            Meu Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Salvar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Nome</Label>
                <p className="text-foodfly-gray-dark">{user?.name}</p>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-foodfly-gray-dark">{user?.email}</p>
              </div>

              {user?.phone && (
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <p className="text-foodfly-gray-dark">{user.phone}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex-1"
                >
                  Editar Perfil
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}