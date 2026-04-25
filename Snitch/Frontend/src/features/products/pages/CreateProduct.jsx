import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import { useProduct } from '../hooks/useProduct';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;

// Fashion model images woven into the editorial layout
const EDITORIAL_IMGS = [
    'https://i.pinimg.com/1200x/a7/e5/44/a7e5448f9f25dd194b39836475f87684.jpg',
    'https://i.pinimg.com/736x/90/c3/87/90c38782a49880f778e80618b4dec0c1.jpg',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
];

const SparkLogo = () => (
    <div className="relative w-10 h-10 flex-shrink-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" className="animate-[spin_20s_linear_infinite]">
            <path d="M50 0L53 40L100 50L53 60L50 100L47 60L0 50L47 40L50 0Z" fill="url(#sg)" />
            <circle cx="50" cy="50" r="48" stroke="url(#sg)" strokeWidth="1" strokeDasharray="4 12" />
            <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#e7c446" />
                    <stop offset="100%" stopColor="#b8982c" />
                </linearGradient>
            </defs>
        </svg>
        <div className="absolute inset-0 m-auto w-2 h-2 bg-[#030303] rounded-full" />
    </div>
);

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', description: '', priceAmount: '', priceCurrency: 'INR' });
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

    const addFiles = (files) => {
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;
        setImages(p => [...p, ...Array.from(files).slice(0, remaining).map(f => ({ file: f, preview: URL.createObjectURL(f) }))]);
    };

    const handleFileChange = (e) => { addFiles(e.target.files); e.target.value = ''; };
    const handleDrop = useCallback((e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); }, [images]);
    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const removeImage = (i) => setImages(p => { const u = [...p]; URL.revokeObjectURL(u[i].preview); u.splice(i, 1); return u; });

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append("title",formData.title);
            data.append("description",formData.description);
            data.append("priceAmount",formData.priceAmount);
            data.append("priceCurrency",formData.priceCurrency);
            images.forEach(img => data.append('images', img.file));
            await handleCreateProduct(data);
            navigate('/');
        } catch (err) { console.error(err); } 
        finally { setIsSubmitting(false); }
    };

    return (
        <div className="w-full bg-[#080808] font-['Manrope'] text-white selection:bg-[#e7c446] selection:text-black [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

            {/* ═══════════════════════════════════════════════
                TOP MASTHEAD BAR
            ═══════════════════════════════════════════════ */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-[#080808]/95 backdrop-blur-md border-b border-white/5">
                <Link to="/" className="text-[10px] tracking-[0.3em] text-white/40 hover:text-[#e7c446] transition-colors uppercase">← Archive</Link>
                <div className="flex items-center gap-3">
                    <SparkLogo />
                    <span className="text-lg font-black tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#e7c446] to-[#ffe58f]">SNITCH</span>
                </div>
                <span className="text-[10px] tracking-widest text-white/30 uppercase hidden sm:block">New Drop</span>
            </header>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

                {/* ═══════════════════════════════════════════════
                    SECTION 1: THE COVER — 3-panel hero with TITLE
                ═══════════════════════════════════════════════ */}
                <section className="relative w-full h-[90vh] flex overflow-hidden">
                    {/* Left tall model strip */}
                    <div className="w-[28%] h-full relative hidden md:block">
                        <img src={EDITORIAL_IMGS[0]} alt="model" className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080808]" />
                    </div>

                    {/* Center hero area */}
                    <div className="flex-1 relative flex flex-col items-center justify-center px-6 md:px-12 bg-[#080808]">
                        {/* Faint watermark */}
                        <span className="absolute text-[20vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">SNITCH</span>

                        <div className="relative z-10 w-full max-w-xl text-center">
                            <p className="text-[10px] tracking-[0.5em] text-[#e7c446]/60 uppercase mb-6">Collection Drop — 2026</p>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="NAME THE DROP"
                                required
                                disabled={isSubmitting}
                                autoComplete="off"
                                className="w-full bg-transparent text-center text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white placeholder-white/10 focus:outline-none focus:placeholder-white/5 transition-all duration-500 leading-tight border-b border-white/10 pb-4 focus:border-[#e7c446]/50"
                            />
                            <p className="mt-4 text-[10px] tracking-widest text-white/20 uppercase">↑ Type the product title above</p>
                        </div>

                        {/* Floating editorial badge */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 border border-[#e7c446]/20 bg-[#e7c446]/5 backdrop-blur-sm">
                            <span className="text-[9px] tracking-[0.4em] text-[#e7c446]/70 uppercase">Scroll to complete the drop</span>
                        </div>
                    </div>

                    {/* Right stacked duo */}
                    <div className="w-[28%] h-full flex flex-col hidden md:flex">
                        <div className="h-1/2 overflow-hidden">
                            <img src={EDITORIAL_IMGS[2]} alt="fashion" className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="h-1/2 overflow-hidden border-t border-[#080808]/80">
                            <img src={EDITORIAL_IMGS[3]} alt="fashion" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 2: THE STORY — full bleed bg + description + price
                ═══════════════════════════════════════════════ */}
                <section className="relative w-full min-h-[80vh] flex items-center">
                    {/* Background fashion photo */}
                    <div className="absolute inset-0">
                        <img src={EDITORIAL_IMGS[1]} alt="editorial" className="w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-[#080808]/88" />
                    </div>

                    {/* Vertical label */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] tracking-[0.5em] text-[#e7c446]/40 uppercase hidden lg:block">
                        The Narrative
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-5 gap-0">
                        
                        {/* Description — 3 cols */}
                        <div className="lg:col-span-3 border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10 pr-0 lg:pr-16 py-16">
                            <p className="text-[10px] tracking-[0.5em] text-[#e7c446] uppercase mb-8">The Story</p>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detail the fabric, the silhouette, the inspiration behind this drop..."
                                rows={8}
                                required
                                disabled={isSubmitting}
                                className="w-full bg-transparent text-lg md:text-xl font-light leading-loose text-white/80 placeholder-white/15 focus:outline-none focus:text-white transition-colors resize-none"
                            />
                        </div>

                        {/* Pricing — 2 cols */}
                        <div className="lg:col-span-2 pl-0 lg:pl-16 py-16 flex flex-col justify-center gap-10">
                            <p className="text-[10px] tracking-[0.5em] text-[#e7c446] uppercase">Price Point</p>

                            <div className="group">
                                <input
                                    type="number"
                                    name="priceAmount"
                                    value={formData.priceAmount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    min="0" step="0.01"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent text-5xl md:text-7xl font-thin text-white placeholder-white/10 focus:outline-none focus:text-[#e7c446] transition-colors duration-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <div className="h-px w-0 bg-[#e7c446] transition-all duration-700 group-focus-within:w-full mt-2" />
                            </div>

                            <div>
                                <p className="text-[10px] tracking-widest text-white/30 uppercase mb-3">Currency</p>
                                <div className="flex gap-3 flex-wrap">
                                    {CURRENCIES.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, priceCurrency: c }))}
                                            disabled={isSubmitting}
                                            className={`px-5 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${formData.priceCurrency === c ? 'border-[#e7c446] bg-[#e7c446] text-black font-bold' : 'border-white/20 text-white/50 hover:border-white/50'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 3: THE FILM ROLL — Image Upload
                ═══════════════════════════════════════════════ */}
                <section className="w-full py-20 px-6 md:px-16 bg-[#060606] border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <p className="text-[10px] tracking-[0.5em] text-[#e7c446]/60 uppercase mb-2">Visual Archive</p>
                                <h2 className="text-3xl font-light text-white">Upload Imagery</h2>
                            </div>
                            <span className="text-2xl font-mono text-white/20">{images.length}/{MAX_IMAGES}</span>
                        </div>

                        {/* Drop zone */}
                        <div
                            onClick={() => !isSubmitting && images.length < MAX_IMAGES && fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative w-full h-40 mb-8 border-2 border-dashed flex items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${isDragging ? 'border-[#e7c446] bg-[#e7c446]/5' : 'border-white/10 hover:border-white/30'} ${images.length >= MAX_IMAGES ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <p className="text-[11px] tracking-[0.3em] uppercase text-white/30">
                                {images.length >= MAX_IMAGES ? 'Archive full' : 'Drop or click to upload'}
                            </p>
                            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} disabled={isSubmitting || images.length >= MAX_IMAGES} />
                        </div>

                        {/* Film strip slots */}
                        <div className="flex gap-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {Array.from({ length: MAX_IMAGES }).map((_, i) => {
                                const img = images[i];
                                return (
                                    <div key={i} className="flex-shrink-0 w-32 md:w-40 aspect-[3/4] relative group/slot border border-white/5 bg-[#0e0e0e] overflow-hidden">
                                        {/* Film perforation top */}
                                        <div className="absolute top-0 left-0 right-0 flex justify-around px-2 py-1 z-10 pointer-events-none">
                                            {[...Array(4)].map((_, j) => <div key={j} className="w-2 h-2 rounded-full bg-[#080808] border border-white/10" />)}
                                        </div>
                                        {img ? (
                                            <>
                                                <img src={img.preview} alt={`upload ${i}`} className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => removeImage(i)}
                                                    className="absolute inset-0 bg-black/70 opacity-0 group-hover/slot:opacity-100 transition-opacity flex items-center justify-center text-white hover:text-[#e7c446]">
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/10 hover:text-white/30 transition-colors">
                                                <span className="text-2xl font-light">+</span>
                                            </div>
                                        )}
                                        {/* Film perforation bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 flex justify-around px-2 py-1 z-10 pointer-events-none">
                                            {[...Array(4)].map((_, j) => <div key={j} className="w-2 h-2 rounded-full bg-[#080808] border border-white/10" />)}
                                        </div>
                                        {/* Slot number */}
                                        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-white/20 font-mono z-10">0{i+1}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 4: PUBLISH
                ═══════════════════════════════════════════════ */}
                <section className="relative w-full overflow-hidden">
                    {/* Full-bleed editorial photo behind */}
                    <img src={EDITORIAL_IMGS[0]} alt="publish bg" className="absolute inset-0 w-full h-full object-cover object-top opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/90" />

                    <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6 text-center gap-10">
                        <div className="flex items-center gap-4">
                            <SparkLogo />
                            <span className="text-4xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#e7c446] to-[#ffe58f]">SNITCH</span>
                        </div>

                        <p className="text-white/40 text-sm tracking-widest uppercase">Ready to publish this drop?</p>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full max-w-lg h-20 overflow-hidden bg-gradient-to-r from-[#e7c446] to-[#b8982c] text-black font-black text-sm tracking-[0.4em] uppercase disabled:opacity-50 shadow-[0_0_60px_rgba(231,196,70,0.2)] hover:shadow-[0_0_80px_rgba(231,196,70,0.4)] transition-shadow"
                        >
                            {/* Shimmer sweep */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1.2s] ease-in-out" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                                {isSubmitting ? 'Publishing…' : 'Publish Drop'}
                            </span>
                        </button>

                        <div className="flex items-center gap-6 text-[10px] tracking-widest text-white/20 uppercase">
                            <span>SNITCH © 2026</span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Atelier Protocol</span>
                        </div>
                    </div>
                </section>

            </form>
        </div>
    );
};

export default CreateProduct;