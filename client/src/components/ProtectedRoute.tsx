import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useContext(UserContext)

    if(isLoading) return 'Cargndo...'

    if(user) {
        return children
    } else {
        return <Navigate to="/auth/login" />
    }
}