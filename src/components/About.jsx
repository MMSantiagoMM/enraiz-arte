import { Target, Eye, Users, Sparkles, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Card from './ui/Card';

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="nosotros" className="py-32 px-6 lg:px-12 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-terra/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-28 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-accent-gold"></div>
                        <Sparkles className="text-accent-gold" size={24} />
                        <div className="h-[1px] w-12 bg-accent-gold"></div>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-serif font-black text-primary mb-8 tracking-tighter uppercase italic leading-none">
                        {t.about.title}
                    </h2>
                    <p className="text-2xl text-text-dark/40 font-serif italic">
                        "{t.about.subtitle}"
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                    {/* Mission */}
                    <Card hover={true} className="p-12 bg-cream text-primary border border-primary/10 relative overflow-hidden group">
                        <Target className="absolute -bottom-8 -right-8 w-48 h-48 text-primary/5 transform group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-accent-gold/20 rounded-2xl flex items-center justify-center mb-8">
                                <Target className="text-accent-gold" size={32} />
                            </div>
                            <h3 className="text-4xl font-serif font-black mb-6 uppercase tracking-tight italic">{t.about.mission}</h3>
                            <p className="text-xl text-primary/80 leading-relaxed font-medium">
                                {t.about.missionText}
                            </p>
                        </div>
                    </Card>

                    {/* Vision */}
                    <Card hover={true} className="p-12 bg-accent-terra/10 text-primary border border-accent-terra/20 relative overflow-hidden group">
                        <Eye className="absolute -bottom-8 -right-8 w-48 h-48 text-accent-terra/5 transform group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-accent-terra/20 rounded-2xl flex items-center justify-center mb-8">
                                <Eye className="text-accent-terra" size={32} />
                            </div>
                            <h3 className="text-4xl font-serif font-black mb-6 uppercase tracking-tight italic">{t.about.vision}</h3>
                            <p className="text-xl text-primary/90 leading-relaxed font-medium">
                                {t.about.visionText}
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Who We Are Section */}
                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 hidden lg:block sticky top-32">
                            <div className="relative rounded-[3rem] overflow-hidden group">
                                <img
                                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070"
                                    alt="Comunidad"
                                    className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="flex items-center gap-4 text-accent-gold mb-4">
                                        <Leaf />
                                        <span className="font-black uppercase tracking-[0.4em] text-xs">Esencia Vital</span>
                                    </div>
                                    <p className="text-white text-2xl font-serif italic">
                                        "El arte como raíz, el territorio como sujeto vivo."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-12">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 text-primary mb-4">
                                <Users size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">{t.about.who}</span>
                            </div>

                            <h3 className="text-5xl md:text-6xl font-serif font-black text-primary leading-tight">
                                {t.about.whoText}
                            </h3>

                            <div className="grid grid-cols-1 gap-12">
                                {t.about.whoParagraphs.map((paragraph, idx) => (
                                    <div key={idx} className="group flex gap-8">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-accent-gold/30 flex items-center justify-center text-accent-gold font-serif italic text-xl group-hover:bg-accent-gold group-hover:text-white transition-all duration-500">
                                            0{idx + 1}
                                        </div>
                                        <p className="text-xl text-text-dark/70 leading-relaxed font-medium pt-1">
                                            {paragraph}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-12 border-t border-primary/10">
                                <div className="flex flex-wrap gap-8 items-center opacity-40">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent-gold"></div>
                                        <span className="text-xs font-black uppercase tracking-widest">Tradición</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent-terra"></div>
                                        <span className="text-xs font-black uppercase tracking-widest">Arte</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        <span className="text-xs font-black uppercase tracking-widest">Comunidad</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
