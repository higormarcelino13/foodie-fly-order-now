import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-foodfly-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
      <p className="text-gray-600 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button onClick={() => navigate('/')}>
        Voltar para a página inicial
      </Button>
    </div>
  )
}
