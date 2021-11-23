import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
