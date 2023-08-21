import { Outlet, Navigate } from 'react-router-dom'
interface IPropsRoute {
  user: string,
  redirectTo: string
}
export default function ProtectedRoute({ user, redirectTo }: IPropsRoute) {
  console.log('authUser', user)
  if(!user) {
    return <Navigate to={redirectTo} replace/>
  }
  return <Outlet />
}