// import React from "react";
import { Link, useNavigate } from "react-router";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const { loading, handleRegister} = useAuth()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister(username,email,password)
    

    navigate("/")
  }

  if (loading) 
    {
     return (<main>
      <h1>Loading.....</h1>
     </main>) 
    
  }

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              onInput={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              name="username"
              placeholder="Enter username"
            />

            <input
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              name="Email"
              placeholder="Enter email"
            />

            <input
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              placeholder="Enter password"
            />
             <button className="primary-button button" type="submit">
            Register
          </button>
          </form>
         
          <p>
            Alreday have an account ?{" "}
            <Link className="toggleAuthForm" to="/login">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
