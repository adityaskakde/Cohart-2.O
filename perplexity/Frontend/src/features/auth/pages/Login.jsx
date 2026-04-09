import React, { useState } from 'react'
import {useNavigate, Link } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  
  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()
    const payload = { email, password }
    await handleLogin(payload)
    navigate('/')
  }

  if (!loading && user) {
     return <Navigate to="/" replace />    
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,148,114,0.12),_transparent_26%),linear-gradient(135deg,#0d0709_0%,#261218_45%,#4f151d_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-2xl bg-slate-900/70 border border-rose-900/30 rounded-3xl shadow-[0_30px_90px_-30px_rgba(160,50,68,0.85)] p-10 transition-all duration-500 hover:shadow-[0_35px_115px_-25px_rgba(220,100,110,0.55)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-amber-100 mb-2 tracking-tight transition-all duration-300">
              Welcome Back
            </h2>
            <p className="text-amber-200/90 transition-all duration-300">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitForm} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-200 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-amber-900/30 rounded-2xl text-amber-50 placeholder-amber-200/70 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 hover:bg-slate-900/90"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-amber-900/30 rounded-2xl text-amber-50 placeholder-amber-200/70 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 hover:bg-slate-900/90"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 shadow-xl shadow-amber-900/20"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-amber-200/80 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-amber-200 hover:text-amber-100 transition-colors duration-300">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
