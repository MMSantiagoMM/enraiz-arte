export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const baseStyles = 'px-8 py-3.5 rounded-full font-bold transition-all duration-500 transform hover:-translate-y-1 active:scale-95 tracking-wide uppercase text-sm flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-[#1B2B21] text-white shadow-[#1B2B21]/20 shadow-xl hover:shadow-[#1B2B21]/40 border-2 border-transparent',
        terra: 'bg-accent-terra text-white shadow-accent-terra/20 shadow-xl hover:shadow-accent-terra/40 border-2 border-transparent',
        gold: 'bg-accent-gold text-primary shadow-accent-gold/20 shadow-xl hover:shadow-accent-gold/40 border-2 border-transparent',
        outline: 'border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-primary shadow-lg',
        glass: 'backdrop-blur-md bg-white/20 border-2 border-white/30 text-white hover:bg-white/40 shadow-2xl',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
