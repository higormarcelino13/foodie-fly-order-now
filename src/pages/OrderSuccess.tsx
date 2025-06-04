import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export function OrderSuccess() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-foodfly-secondary mb-4">
          Pedido Realizado com Sucesso!
        </h1>

        <p className="text-foodfly-gray-dark mb-8">
          Seu pedido foi confirmado e está sendo preparado. Você pode acompanhar o status do seu pedido em tempo real.
        </p>

        <div className="space-y-4">
          <Link to="/order/tracking/123">
            <Button className="w-full">
              Acompanhar Pedido
            </Button>
          </Link>

          <Link to="/">
            <Button variant="outline" className="w-full">
              Voltar para a Página Inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}