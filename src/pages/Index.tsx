import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, Restaurant } from '../lib/supabase'
import Header from '../components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export default function Index() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erro ao buscar restaurantes:', error)
          return
        }

        setRestaurants(data || [])
      } catch (error) {
        console.error('Erro ao buscar restaurantes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Restaurantes Disponíveis
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando restaurantes...</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum restaurante encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{restaurant.name}</CardTitle>
                    <CardDescription>{restaurant.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>Endereço:</strong> {restaurant.address}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {restaurant.phone}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-foodfly-secondary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="font-bold text-xl mb-2">FoodieFly</h2>
              <p className="text-sm text-foodfly-gray-light">Peça comida deliciosa online!</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Links Rápidos</h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-foodfly-primary">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Contato</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-foodfly-primary">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-center">© {new Date().getFullYear()} FoodieFly. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
