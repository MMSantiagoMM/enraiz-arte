import { useState, useEffect } from 'react';
import { Menu, X, User, Globe, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuItems = [
        { name: t.nav.home, href: '/#inicio' },
        { name: t.nav.about, href: '/#nosotros' },
        { name: t.nav.tourism, href: '/#turismo' },
        { name: t.nav.workshops, href: '/#talleres' },
        { name: t.nav.donations, href: '/#donaciones' },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-10'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
                    <Link to="/" className="flex items-center group">
                        <img
                            src="/logo.png"
                            alt="Enraiz-Arte"
                            className={`h-24 md:h-36 w-auto transition-all duration-500 group-hover:scale-110 brightness-200`}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-12">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className={`nav-link text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${scrolled ? 'text-white/80' : 'text-white/90'}`}
                            >
                                {item.name}
                            </a>
                        ))}

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-accent-gold hover:text-accent-gold transition-all duration-300 group"
                        >
                            <Globe size={18} className="text-accent-gold" />
                            <span className="text-xs font-black uppercase tracking-widest text-white">{language === 'es' ? 'ES' : 'EN'}</span>
                        </button>

                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link to="/admin/dashboard" className="p-2.5 rounded-full bg-accent-terra text-white hover:bg-accent-gold transition-all hover:scale-110">
                                    <User size={20} />
                                </Link>
                                <button onClick={logout} className="p-2.5 rounded-full bg-white/10 text-white hover:bg-red-500 transition-all hover:scale-110">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/admin" className="px-6 py-2.5 rounded-full bg-accent-gold text-primary font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-accent-gold/20">
                                {t.nav.admin}
                            </Link>
                        )}
                    </div>

                    {/* Mobile Burger */}
                    <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(true)}>
                        <Menu size={32} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Outside Nav for maximum compatibility */}
            {isOpen && (
                <div
                    className="fixed inset-0 w-full h-[100dvh] bg-primary/98 backdrop-blur-3xl z-[100] flex flex-col lg:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex justify-end p-8 sm:p-12">
                        <button
                            className="text-white/50 hover:text-accent-gold transition-all duration-500 transform hover:rotate-90"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={48} strokeWidth={1} />
                        </button>
                    </div>

                    <div
                        className="flex-1 overflow-y-auto px-8 pb-20 flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center space-y-8 md:space-y-12 mb-16">
                            {menuItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="text-4xl sm:text-6xl font-serif font-black text-white hover:text-accent-gold transition-all duration-500 transform hover:scale-110 opacity-0 animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        <div className="w-full max-w-xs border-t border-white/10 pt-12 flex flex-col items-center gap-10 opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center justify-center gap-4 text-accent-gold font-black text-2xl hover:scale-105 transition-transform"
                            >
                                <Globe size={28} />
                                {language === 'es' ? 'ESPAÑOL' : 'ENGLISH'}
                            </button>

                            {user ? (
                                <div className="flex items-center gap-10">
                                    <Link
                                        to="/admin/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 text-white font-black text-2xl hover:text-accent-gold transition-colors"
                                    >
                                        <User size={32} />
                                        <span>Panel</span>
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="flex items-center gap-4 text-red-400 font-black text-2xl hover:text-red-500 transition-colors"
                                    >
                                        <LogOut size={32} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center px-10 py-5 rounded-full bg-accent-gold text-primary font-black text-xl uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-accent-gold/20"
                                >
                                    {t.nav.admin}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
