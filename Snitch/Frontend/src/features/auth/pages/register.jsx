import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hook/useAuth";

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
                        <h1 className="text-5xl sm:text-6xl font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#e7c446] via-[#ffe58f] to-[#e7c446] drop-shadow-[0_0_20px_rgba(231,196,70,0.3)] mb-8 inline-block">
                            SNITCH
                        </h1>

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

                            {/* Minimal Google Button */}
                            <a href="/api/auth/google" className="text-[10px] tracking-[0.2em] text-[#e7c446]/60 hover:text-[#e7c446] uppercase transition-colors flex items-center gap-3 group">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="group-hover:scale-110 transition-transform">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
                                </svg>
                                Google Access
                            </a>
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