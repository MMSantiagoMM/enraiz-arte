import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white py-32 px-6 lg:px-12 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-24 mb-24 pb-20 border-b border-white/5">
                    {/* Brand Section */}
                    <div className="space-y-12">
                        <h2 className="font-serif text-5xl font-black tracking-tighter text-white uppercase italic">
                            Corporación <br />
                            <span className="text-accent-gold">Enraiz-Arte</span>
                        </h2>
                        <p className="text-xl text-white/50 leading-relaxed font-serif italic border-l-2 border-accent-gold/20 pl-8">
                            "Enraizados en nuestra cultura ancestral, sembrando semillas de consciencia para los que vienen."
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-10">
                        <h3 className="text-sm font-black text-accent-gold uppercase tracking-[0.4em]">{t.footer.contact}</h3>
                        <div className="space-y-6">
                            <a href="mailto:corporacionenraizarte@gmail.com" className="group flex items-center gap-4 text-white/70 hover:text-white transition-all text-lg font-medium">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-accent-gold group-hover:text-primary transition-all duration-500">
                                    <Mail size={20} />
                                </div>
                                <span className="border-b border-white/10 group-hover:border-white transition-all">corporacionenraizarte@gmail.com</span>
                            </a>
                            <div className="group flex items-center gap-4 text-white/70 text-lg font-medium">
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    <Phone size={20} className="text-accent-terra" />
                                </div>
                                <span>+57 3195879805</span>
                            </div>
                            <div className="group flex items-center gap-4 text-white/70 text-lg font-medium">
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    <MapPin size={20} className="text-secondary" />
                                </div>
                                <span>Medellín, Colombia</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-10">
                        <h3 className="text-sm font-black text-accent-gold uppercase tracking-[0.4em]">{t.footer.follow}</h3>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { icon: <Instagram size={28} />, label: 'Instagram', color: 'hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
                                { icon: <Facebook size={28} />, label: 'Facebook', color: 'hover:bg-blue-600' },
                                { icon: <Youtube size={28} />, label: 'Youtube', color: 'hover:bg-red-600' },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className={`p-5 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 transition-all duration-700 hover:scale-110 hover:-rotate-6 ${social.color} hover:text-white`}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-white/20 font-black tracking-[0.4em] uppercase">
                    <p>&copy; {new Date().getFullYear()} Corporación Enraiz-Arte. {t.footer.rights}</p>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-accent-gold transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-accent-gold transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
