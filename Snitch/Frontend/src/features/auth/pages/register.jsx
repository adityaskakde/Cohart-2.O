import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import ContinueWithGoogle from "../components/ContinueWithGoogle.jsx";  

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        email: "",
        password: "",
        isSeller: false
    });
    const [isLoading, setIsLoading] = useState(false);

    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await handleRegister({
                contactNumber: formData.contactNumber,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                isSeller: formData.isSeller
            });
            navigate("/");
        } catch (error) {
            console.error("Register failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#030303] flex items-center justify-center font-['Manrope'] text-[#e0e0e0] overflow-x-hidden relative selection:bg-[#e7c446] selection:text-black">
            
            {/* MASSIVE BACKGROUND TYPOGRAPHY WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] overflow-hidden mix-blend-screen">
                <h1 className="text-[28vw] font-black tracking-tighter whitespace-nowrap text-white">SNITCH</h1>
            </div>

            <div className="w-full max-w-[1400px] px-6 sm:px-12 min-h-screen lg:h-screen lg:max-h-[900px] flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12 relative z-10 py-12 lg:py-0">
                
                {/* ARCHITECTURAL IMAGE (INVERTED ARCH) */}
                <div className="w-full lg:w-[40%] h-[35vh] lg:h-[85%] relative flex flex-col items-center justify-start mt-4 lg:mt-0">
                    <div className="w-full h-full rounded-b-[500px] lg:rounded-b-[1000px] rounded-t-3xl lg:rounded-t-xl overflow-hidden relative border border-[#e7c446]/20 shadow-[0_0_50px_rgba(231,196,70,0.05)] group">
                        <div 
                            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
                            style={{ backgroundImage: "url(https://i.pinimg.com/736x/90/c3/87/90c38782a49880f778e80618b4dec0c1.jpg)" }}



                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/40 to-transparent opacity-90 lg:opacity-80" />
                        
                        {/* Minimalist Image Detail */}
                        <div className="absolute top-8 lg:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        </div>
                    </div>
                </div>

                {/* THE FORM (AVANT-GARDE EDITORIAL) */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center pb-12 lg:pb-0">
                    
                    <div className="mb-10 lg:mb-12 text-center lg:text-left">
                        {/* Attractive Brand Name */}
                        {/* Attractive Brand Name & Unique Icon */}
                        <div className="flex items-center justify-center lg:justify-start mb-8 group cursor-pointer w-max mx-auto lg:mx-0">
                            {/* Avant-Garde Spark Logo */}
                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mr-4 sm:mr-6 transition-transform duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:rotate-[360deg]">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" className="absolute inset-0">
                                    {/* The Sharp Spark */}
                                    <path d="M50 0L53 40L100 50L53 60L50 100L47 60L0 50L47 40L50 0Z" fill="url(#goldGrad1)" className="drop-shadow-[0_0_15px_rgba(231,196,70,0.6)]" />
                                    {/* Double Orbit Rings */}
                                    <circle cx="50" cy="50" r="48" stroke="url(#goldGrad1)" strokeWidth="1" strokeDasharray="4 12" className="animate-[spin_15s_linear_infinite]" />
                                    <circle cx="50" cy="50" r="38" stroke="url(#goldGrad1)" strokeWidth="0.5" strokeDasharray="2 6" style={{ animation: 'spin 10s linear infinite reverse' }} />
                                    
                                    <defs>
                                        <linearGradient id="goldGrad1" x1="0" y1="0" x2="100" y2="100">
                                            <stop offset="0%" stopColor="#e7c446" />
                                            <stop offset="50%" stopColor="#ffe58f" />
                                            <stop offset="100%" stopColor="#b8982c" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                {/* Core Void */}
                                <div className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-[#030303] rounded-full z-10 shadow-[0_0_10px_#e7c446_inset]" />
                            </div>

                            {/* The Text */}
                            <h1 className="text-5xl sm:text-6xl font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#e7c446] via-[#ffe58f] to-[#e7c446] drop-shadow-[0_0_20px_rgba(231,196,70,0.3)]">
                                SNITCH
                            </h1>
                        </div>

                        <h2 className="text-[10px] tracking-[0.5em] text-[#e7c446]/60 uppercase mb-4 flex items-center justify-center lg:justify-start gap-4">
                            Registration
                            <span className="w-8 h-px bg-[#e7c446]/40"></span>
                        </h2>
                        <h1 className="text-5xl sm:text-6xl font-light tracking-tighter text-white">
                            Forge your<br/>
                            <span className="font-bold italic lg:pr-4">Identity.</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">
                        
                        {/* Split Inputs: Name & Phone */}
                        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                            <div className="relative group w-full">
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="FULL NAME" 
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-transparent border-b border-white/20 pb-2.5 lg:pb-3 text-lg lg:text-xl font-light text-white placeholder-white/20 focus:border-[#e7c446] focus:outline-none transition-all duration-500 rounded-none disabled:opacity-50 text-center lg:text-left"
                                />
                                <div className="absolute left-0 bottom-0 w-0 h-px bg-[#e7c446] transition-all duration-500 group-focus-within:w-full shadow-[0_0_10px_rgba(231,196,70,0.5)]"></div>
                            </div>
                            <div className="relative group w-full">
                                <input 
                                    type="tel" 
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    placeholder="PHONE" 
                                    disabled={isLoading}
                                    className="w-full bg-transparent border-b border-white/20 pb-2.5 lg:pb-3 text-lg lg:text-xl font-light text-white placeholder-white/20 focus:border-[#e7c446] focus:outline-none transition-all duration-500 rounded-none disabled:opacity-50 text-center lg:text-left"
                                />
                                <div className="absolute left-0 bottom-0 w-0 h-px bg-[#e7c446] transition-all duration-500 group-focus-within:w-full shadow-[0_0_10px_rgba(231,196,70,0.5)]"></div>
                            </div>
                        </div>

                        {/* Massive Input - Email */}
                        <div className="relative group">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-MAIL ADDRESS" 
                                required
                                disabled={isLoading}
                                className="w-full bg-transparent border-b border-white/20 pb-2.5 lg:pb-3 text-lg lg:text-2xl font-light text-white placeholder-white/20 focus:border-[#e7c446] focus:outline-none transition-all duration-500 rounded-none disabled:opacity-50 text-center lg:text-left"
                            />
                            <div className="absolute left-0 bottom-0 w-0 h-px bg-[#e7c446] transition-all duration-500 group-focus-within:w-full shadow-[0_0_10px_rgba(231,196,70,0.5)]"></div>
                        </div>

                        {/* Massive Input - Password */}
                        <div className="relative group">
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="PASSWORD" 
                                required
                                disabled={isLoading}
                                className="w-full bg-transparent border-b border-white/20 pb-2.5 lg:pb-3 text-lg lg:text-2xl font-light text-white placeholder-white/20 focus:border-[#e7c446] focus:outline-none transition-all duration-500 rounded-none disabled:opacity-50 text-center lg:text-left"
                            />
                            <div className="absolute left-0 bottom-0 w-0 h-px bg-[#e7c446] transition-all duration-500 group-focus-within:w-full shadow-[0_0_10px_rgba(231,196,70,0.5)]"></div>
                        </div>

                        {/* Extra Actions: Vendor Toggle & Google */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-2">
                            
                            {/* Custom Brutalist Checkbox */}
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <div className="w-5 h-5 border border-[#e7c446]/40 rounded-full flex items-center justify-center relative overflow-hidden transition-colors group-hover:border-[#e7c446]">
                                    <input 
                                        type="checkbox" 
                                        name="isSeller"
                                        checked={formData.isSeller}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        className="appearance-none peer w-full h-full absolute cursor-pointer"
                                    />
                                    <div className="w-2.5 h-2.5 bg-[#e7c446] rounded-full opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-300"></div>
                                </div>
                                <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase group-hover:text-white transition-colors">Vendor Protocol</span>
                            </label>

                           <ContinueWithGoogle />
                        </div>

                        {/* Brutalist Button Area */}
                        <div className="mt-2 lg:mt-4 flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-6 sm:gap-10">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full sm:w-auto px-12 py-4 sm:py-5 bg-gradient-to-r from-[#e7c446] to-[#b8982c] text-black text-[11px] font-black tracking-[0.3em] uppercase overflow-hidden disabled:opacity-50 rounded-sm shadow-[0_0_30px_rgba(231,196,70,0.15)]"
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-500">{isLoading ? "Processing" : "Initialize"}</span>
                                <div className="absolute inset-0 bg-[#030303] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                            </button>

                            <Link to="/login" className="text-[11px] tracking-[0.2em] text-[#e7c446]/80 hover:text-[#e7c446] uppercase transition-colors relative group w-max mx-auto sm:mx-0">
                                Return to Login
                                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#e7c446] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;