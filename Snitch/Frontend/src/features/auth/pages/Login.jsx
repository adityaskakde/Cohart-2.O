import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin({
                email: formData.email,
                password: formData.password
            });
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#030303] flex items-center justify-center font-['Manrope'] text-[#e0e0e0] overflow-x-hidden relative selection:bg-[#e7c446] selection:text-black">
            
            {/* MASSIVE BACKGROUND TYPOGRAPHY WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] overflow-hidden mix-blend-screen">
                <h1 className="text-[28vw] font-black tracking-tighter whitespace-nowrap text-white">SNITCH</h1>
            </div>

            <div className="w-full max-w-[1400px] px-6 sm:px-12 min-h-screen lg:h-screen lg:max-h-[900px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10 py-12 lg:py-0">
                
                {/* ARCHITECTURAL IMAGE (THE ARCH) */}
                <div className="w-full lg:w-[40%] h-[35vh] lg:h-[85%] relative flex flex-col items-center justify-end mt-4 lg:mt-0">
                    <div className="w-full h-full rounded-t-[500px] lg:rounded-t-[1000px] rounded-b-3xl lg:rounded-b-xl overflow-hidden relative border border-[#e7c446]/20 shadow-[0_0_50px_rgba(231,196,70,0.05)] group">
                        <div 
                            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
                            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop)" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90 lg:opacity-80" />
                        
                        {/* Minimalist Image Detail */}
                        <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        </div>
                    </div>
                </div>

                {/* THE FORM (AVANT-GARDE EDITORIAL) */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center pb-12 lg:pb-0">
                    
                    <div className="mb-10 lg:mb-16 text-center lg:text-left">
                        {/* Attractive Brand Name */}
                        <h1 className="text-5xl sm:text-6xl font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#e7c446] via-[#ffe58f] to-[#e7c446] drop-shadow-[0_0_20px_rgba(231,196,70,0.3)] mb-8 inline-block">
                            SNITCH
                        </h1>

                        <h2 className="text-[10px] tracking-[0.5em] text-[#e7c446]/60 uppercase mb-4 flex items-center justify-center lg:justify-start gap-4">
                            <span className="w-8 h-px bg-[#e7c446]/40"></span>
                            Authentication
                        </h2>
                        <h1 className="text-5xl sm:text-7xl font-light tracking-tighter text-white">
                            Enter the<br/>
                            <span className="font-bold italic lg:pr-4">Society.</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:gap-10">
                        
                        {/* Massive Input - Email */}
                        <div className="relative group">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-MAIL ADDRESS" 
                                required
                                className="w-full bg-transparent border-b border-white/20 pb-3 lg:pb-4 text-xl sm:text-3xl font-light text-white placeholder-white/20 focus:border-[#e7c446] focus:outline-none transition-all duration-500 rounded-none text-center lg:text-left"
                            />
                            <div className="absolute left-0 bottom-0 w-0 h-px bg-[#e7c446] transition-all duration-500 group-focus-within:w-full shadow-[0_0_10px_rgba(231,196,70,0.5)]"></div>
                        </div>

                        {/* Massive Input - Password */}
                        <div className="relative group">
                            <div className="absolute right-0 top-0 hidden lg:flex items-center h-full pb-3 lg:pb-4">
                                <Link to="/forgot-password" className="text-[9px] tracking-[0.2em] text-[#e7c446]/60 hover:text-[#e7c446] uppercase transition-colors">Recover</Link>
                            </div>
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="PASSWORD" 
                                required
                                className="w-full bg-transparent border-b border-white/20 pb-3 lg:pb-4 text-xl sm:text-3xl font-light text-white placeholder-white/20 focus:border-[#e7c446] focus:outline-none transition-all duration-500 rounded-none text-center lg:text-left"
                            />
                            <div className="absolute left-0 bottom-0 w-0 h-px bg-[#e7c446] transition-all duration-500 group-focus-within:w-full shadow-[0_0_10px_rgba(231,196,70,0.5)]"></div>
                            <div className="lg:hidden mt-2 text-center">
                                <Link to="/forgot-password" className="text-[9px] tracking-[0.2em] text-[#e7c446]/60 hover:text-[#e7c446] uppercase transition-colors">Recover Password</Link>
                            </div>
                        </div>

                        {/* Brutalist Interactions */}
                        <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-6 sm:gap-10">
                            {/* Colored Submit Button */}
                            <button 
                                type="submit"
                                className="group relative w-full sm:w-auto px-12 py-4 sm:py-5 bg-gradient-to-r from-[#e7c446] to-[#b8982c] text-black text-[11px] font-black tracking-[0.3em] uppercase overflow-hidden rounded-sm shadow-[0_0_30px_rgba(231,196,70,0.15)]"
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Sign In</span>
                                <div className="absolute inset-0 bg-[#030303] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                            </button>

                            <Link to="/register" className="text-[11px] tracking-[0.2em] text-[#e7c446]/80 hover:text-[#e7c446] uppercase transition-colors relative group w-max mx-auto sm:mx-0">
                                Create Account
                                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#e7c446] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
