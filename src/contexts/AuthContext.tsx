import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, User as DatabaseUser } from '@/lib/supabase'
import { Session, User as SupabaseAuthUser } from '@supabase/supabase-js'
import { authService } from '../lib/services/auth'
import type { SignUpInput, SignInInput, UpdateProfileInput } from '../lib/validations/auth'
import { toast } from 'sonner'

interface AuthContextType {
  user: DatabaseUser | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DatabaseUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Clear session on mount in production
  useEffect(() => {
    const isProduction = import.meta.env.PROD
    if (isProduction) {
      const clearSession = async () => {
        try {
          await supabase.auth.signOut()
          setUser(null)
          setSession(null)
          setIsLoading(false)
        } catch (error) {
          console.error('Error clearing session:', error)
          setIsLoading(false)
        }
      }
      clearSession()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session)
        if (session?.user) {
          // Fetch user profile
          supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data: profile, error }) => {
              if (error) {
                console.error('Error fetching user profile:', error)
                setUser(null)
              } else if (profile) {
                setUser(profile as DatabaseUser)
              }
              setIsLoading(false)
            })
            .catch(() => {
              setUser(null)
              setIsLoading(false)
            })
        } else {
          setUser(null)
          setIsLoading(false)
        }
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setSession(session)
        if (session?.user) {
          try {
            // Fetch user profile
            const { data: profile, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (error) {
              console.error('Error fetching user profile:', error)
              setUser(null)
            } else if (profile) {
              setUser(profile as DatabaseUser)
            }
          } catch (error) {
            console.error('Error in auth state change:', error)
            setUser(null)
          }
        } else {
          setUser(null)
        }
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Por favor, verifique seu email para confirmar sua conta antes de fazer login.')
        }
        throw error
      }

      if (!data.user?.email_confirmed_at) {
        throw new Error('Por favor, verifique seu email para confirmar sua conta antes de fazer login.')
      }

      // Fetch user profile after successful login
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        console.error('Error fetching user profile:', profileError)
        setUser(null)
      } else if (profile) {
        setUser(profile as DatabaseUser)
      }

      toast.success('Login realizado com sucesso!')
    } catch (error: any) {
      console.error('Error signing in:', error)
      toast.error(error.message || 'Erro ao fazer login. Verifique suas credenciais.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (data: { name: string; email: string; password: string; phone?: string }) => {
    try {
      setIsLoading(true)
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
          }
        }
      })

      if (signUpError) throw signUpError

      // Create profile
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: (await supabase.auth.getUser()).data.user?.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      ])

      if (profileError) {
        console.error('Error creating profile:', profileError)
        throw new Error('Erro ao criar perfil do usuário.')
      }
    } catch (error: any) {
      console.error('Error signing up:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      setSession(null)
      toast.success('Logout realizado com sucesso!')
    } catch (error: any) {
      console.error('Error signing out:', error)
      toast.error('Erro ao fazer logout.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    isLoading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
