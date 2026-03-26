import React, { useState } from "react";
import "../styles/form.scss";
import { Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {

  const { user ,handleLogin, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    await handleLogin(username, password)
      
    
    navigate("/");
  }
  if (loading) {
    return (<main>
      <h1>Loding.....</h1>
    </main>)
    
  }


  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <input
              value={username}
              onInput={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              name="username"
              placeholder="Enter username"
            />

            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              placeholder="Enter password"
            />

            <button className="primary-button button" type="submit">
              Login
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <Link className="toggleAuthForm" to="/register">
              Create One.
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
