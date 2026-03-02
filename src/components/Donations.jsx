import { Landmark, CreditCard, User, FileText, Heart, Globe, Zap, HandHeart } from 'lucide-react';
import Card from './ui/Card';
import { useLanguage } from '../context/LanguageContext';

export default function Donations() {
    const { t } = useLanguage();

    return (
        <section id="donaciones" className="py-32 px-6 lg:px-12 bg-primary relative overflow-hidden">
            {/* Background Texture & Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent-terra/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-24 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-12 bg-accent-gold opacity-30"></div>
                        <HandHeart className="text-accent-gold" size={32} />
                        <div className="h-[1px] w-12 bg-accent-gold opacity-30"></div>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-serif font-black text-white mb-8 tracking-tight uppercase italic leading-none">
                        {t.donations.title}
                    </h2>
                    <p className="text-2xl text-accent-gold/60 font-serif italic max-w-2xl mx-auto">
                        "{t.donations.subtitle}"
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                    {/* Bank Info with Glassmorphism */}
                    <Card glass={true} className="p-12 border-accent-gold/10 bg-white/5 backdrop-blur-3xl group">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-3xl font-serif font-bold text-white flex items-center gap-4">
                                <span className="p-3 bg-accent-gold/20 rounded-2xl">
                                    <Landmark className="text-accent-gold" size={28} />
                                </span>
                                {t.donations.bankTitle}
                            </h3>
                            <Zap className="text-accent-gold/30 animate-pulse" />
                        </div>

                        <div className="space-y-8">
                            <footer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: t.donations.bank, value: 'Bancolombia', icon: <Globe size={20} /> },
                                    { label: t.donations.type, value: 'Ahorros', icon: <FileText size={20} /> },
                                    { label: t.donations.holder, value: 'Corporación Enraiz-Arte', icon: <User size={20} />, full: true },
                                ].map((item, i) => (
                                    <div key={i} className={`p-6 rounded-[2rem] bg-white/10 border border-white/20 hover:bg-white/20 transition-all ${item.full ? 'col-span-full' : ''}`}>
                                        <div className="flex items-center gap-3 mb-3 text-accent-gold">
                                            {item.icon}
                                            <p className="text-[10px] uppercase font-black tracking-[0.2em]">{item.label}</p>
                                        </div>
                                        <p className="text-xl font-bold text-white tracking-wide uppercase">{item.value}</p>
                                    </div>
                                ))}
                            </footer>

                            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-accent-gold/30 via-white/10 to-transparent border border-accent-gold/30 relative overflow-hidden group/acc">
                                <CreditCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-white/5 transform -rotate-12 group-hover/acc:scale-110 transition-transform duration-1000" />
                                <p className="text-[10px] uppercase font-black text-accent-gold tracking-[0.3em] mb-4 text-center">{t.donations.account}</p>
                                <p className="text-5xl md:text-6xl font-black text-white text-center tracking-[0.1em] font-serif relative z-10">
                                    342 000 000 90
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Fiscal Info & High Impact Message */}
                    <div className="flex flex-col gap-12 h-full">
                        <section className="p-12 rounded-[2.5rem] bg-accent-terra relative overflow-hidden group/nit h-1/2 flex flex-col justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-serif font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tighter italic">
                                    <HandHeart className="text-accent-gold" />
                                    {t.donations.fiscalTitle}
                                </h3>
                                <div className="p-8 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 transform group-hover/nit:scale-105 transition-transform duration-700">
                                    <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.3em] mb-2">{t.donations.nit}</p>
                                    <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-accent-gold font-serif">902025520-9</p>
                                </div>
                            </div>
                        </section>

                        <section className="p-12 rounded-[2.5rem] border-2 border-dashed border-accent-gold/30 flex flex-col items-center text-center justify-center flex-1 space-y-8 bg-white/5 hover:bg-white/10 transition-colors duration-500">
                            <div className="w-24 h-24 bg-accent-gold/20 rounded-full flex items-center justify-center relative">
                                <Heart className="text-accent-gold fill-accent-gold animate-pulse" size={48} />
                                <div className="absolute inset-0 border border-accent-gold/40 rounded-full animate-ping"></div>
                            </div>
                            <div className="space-y-4 max-w-sm">
                                <h4 className="text-3xl font-serif font-black text-white uppercase italic tracking-tighter leading-none">{t.donations.thanksTitle}</h4>
                                <p className="text-white/60 leading-relaxed font-serif italic text-lg">
                                    "{t.donations.thanksDesc}"
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
