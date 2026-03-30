import React,{useState }from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import {Link} from "react-router"
import { useAuth } from '../hooks/use.auth'
import { useNavigate } from 'react-router'

const Login = () => {

   const{loading, handleLogin} = useAuth()

   const navigate = useNavigate()
   
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const handleSubmit = async (e) => {
    e.preventDefault()

    await handleLogin({ email, password })
    navigate("/")
   }

  return (
    <main className='login-page'>
        <div className="form-Container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>

                <FormGroup 
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                label={"Email"} placeholder={"Enter your email"}/>

                <FormGroup
                 value = {password}
                 onChange={(e) => setPassword(e.target.value)}

                 label={"Password"} placeholder={"Enter your password"}/>
                <button className='button' type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login