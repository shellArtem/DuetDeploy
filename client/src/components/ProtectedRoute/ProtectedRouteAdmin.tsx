/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Outlet, Navigate } from 'react-router-dom'
interface IPropsRoute {
  user: string,
  redirectTo: string
}
export default function ProtectedRoute({ user, redirectTo }: IPropsRoute) {
  // if(user !== 'admin' || !user ) {
  //     return <Navigate to={redirectTo} replace/>
  //   } 
    return <Outlet />
}