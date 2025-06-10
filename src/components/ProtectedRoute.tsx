import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface ProtectedRouteProps {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {
    data: { session },
  } = supabase.auth.getSession()
  return session ? children : <Navigate to="/login" replace />
}
