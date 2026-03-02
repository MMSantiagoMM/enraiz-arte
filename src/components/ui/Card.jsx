export default function Card({ children, className = '', hover = true, glass = false }) {
    const glassStyles = 'backdrop-blur-md bg-white/70 border border-white/20';
    const normalStyles = 'bg-white shadow-xl border border-primary/5';

    const hoverStyles = hover
        ? 'transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10'
        : '';

    return (
        <div
            className={`rounded-[2rem] overflow-hidden ${glass ? glassStyles : normalStyles} ${hoverStyles} ${className}`}
        >
            {children}
        </div>
    );
}
