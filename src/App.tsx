import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { Header } from '@/components/Header'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { ForgotPassword } from '@/pages/ForgotPassword'
import { ResetPassword } from '@/pages/ResetPassword'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { RestaurantMenu } from '@/pages/RestaurantMenu'
import { NotFound } from '@/pages/NotFound'
import { Checkout } from '@/pages/Checkout'
import { OrderSuccess } from '@/pages/OrderSuccess'
import { Cart } from '@/pages/Cart'
import { OrderTracking } from '@/pages/OrderTracking'
import { Profile } from '@/pages/Profile'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-foodfly-light">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/restaurant/:id" element={<RestaurantMenu />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route path="/order/tracking/:id" element={<OrderTracking />} />

                {/* Rotas protegidas */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Rota 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: '#fff',
                  color: '#333',
                  border: '1px solid #e5e7eb',
                },
                className: 'toast-notification',
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
