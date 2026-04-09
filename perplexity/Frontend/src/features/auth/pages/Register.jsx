import React, { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Handle registration logic here
    console.log('Registration data:', formData)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,148,114,0.12),_transparent_26%),linear-gradient(135deg,#0d0709_0%,#261218_45%,#4f151d_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-2xl bg-slate-900/70 border border-rose-900/30 rounded-3xl shadow-[0_30px_90px_-30px_rgba(160,50,68,0.85)] p-10 transition-all duration-500 hover:shadow-[0_35px_115px_-25px_rgba(220,100,110,0.55)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-amber-100 mb-2 tracking-tight transition-all duration-300">
              Create Account
            </h2>
            <p className="text-amber-200/90 transition-all duration-300">
              Join us today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-amber-200 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-rose-900/30 rounded-2xl text-amber-50 placeholder-rose-200/70 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 hover:bg-slate-900/90"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-200 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-amber-900/30 rounded-2xl text-amber-50 placeholder-amber-200/70 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 hover:bg-slate-900/90"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 shadow-xl shadow-amber-900/20"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-amber-200/80 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-amber-200 hover:text-amber-100 transition-colors duration-300">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register