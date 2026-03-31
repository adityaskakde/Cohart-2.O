import{login, register, getMe, logout} from "../services/auth.api"
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";




export function useAuth() {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ email, password, username }) {
        setLoading(true)    
        try {
            const data = await register({ email, password, username })
            setUser(data.user)
        } catch (error) {
            console.error("Registration failed:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ email, password, username }) {         
        setLoading(true)

        try {
            const data = await login({ email, password, username })
            setUser(data.user)
        }
        catch (error) {
            console.error("Login failed:", error)
        }   
        finally {
            setLoading(false)

        }
    }

    async function handleGetMe() {
        setLoading(true)    
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            console.error("Fetch current user failed:", error)
        } finally {
            setLoading(false)
        }  
     
    }
    async function handleLogout() {
        setLoading(true)
        try {
            const data= await logout()
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error)
        } finally {
            setLoading(false)
        }   
    
    }

    useEffect(() => {
     handleGetMe()
    }, [])


return ({
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout
  })
}

    