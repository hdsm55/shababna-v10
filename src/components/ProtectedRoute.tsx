import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element
}) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setIsAuthenticated(!!data.session)
      setLoading(false)
    }
    checkSession()
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkSession()
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
