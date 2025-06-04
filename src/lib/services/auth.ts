import { supabase } from '../supabase'
import type { SignUpInput, SignInInput, UpdateProfileInput } from '../validations/auth'

export const authService = {
  async signUp({ name, email, password, phone }: SignUpInput) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (authData.user) {
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          name,
          email,
          phone,
        },
      ])

      if (profileError) throw profileError
    }

    return authData
  },

  async signIn({ email, password, rememberMe }: SignInInput) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  },

  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) throw error
  },

  async updateProfile({ name, phone, email }: UpdateProfileInput) {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError

    if (!user) throw new Error('Usuário não encontrado')

    // Update auth email if changed
    if (email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email,
      })
      if (emailError) throw emailError
    }

    // Update profile
    const { error: profileError } = await supabase
      .from('users')
      .update({
        name,
        phone,
        email,
      })
      .eq('id', user.id)

    if (profileError) throw profileError
  },

  async verifyEmail(token: string) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    })

    if (error) throw error
  },

  async verifyPhone(phone: string) {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    })

    if (error) throw error
  },

  async verifyPhoneOTP(phone: string, token: string) {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })

    if (error) throw error
  },

  async updateNotificationPreferences(preferences: {
    email: boolean
    push: boolean
    sms: boolean
  }) {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError

    if (!user) throw new Error('Usuário não encontrado')

    const { error: profileError } = await supabase
      .from('users')
      .update({
        notification_preferences: preferences,
      })
      .eq('id', user.id)

    if (profileError) throw profileError
  },
}