import { useState } from 'react';
import { Music, Clock, Mail, Phone, Heart, Star, Quote } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { addWorkshopRegistration } from '../services/db';
import { useLanguage } from '../context/LanguageContext';

export default function Workshops() {
    const { t } = useLanguage();
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        instrument: '',
        comments: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await addWorkshopRegistration(formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', instrument: '', comments: '' });
            alert(t.workshops.form.success);
        } catch (error) {
            console.error("Error saving workshop registration:", error);
            setStatus('error');
            alert('Error');
        }
    };

    return (
        <section id="talleres" className="py-32 px-6 lg:px-12 bg-[#FDFCF9] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-terra/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="max-w-3xl mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <Star className="text-accent-gold" size={24} />
                        <span className="text-accent-terra font-black text-xs uppercase tracking-[0.4em]">Propuesta Educativa</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black text-primary mb-8 leading-tight">
                        {t.workshops.title}
                    </h2>
                    <p className="text-2xl text-text-dark/60 italic font-serif border-l-4 border-accent-gold pl-6">
                        {t.workshops.subtitle}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Information Part */}
                    <div className="space-y-12">
                        <section className="grid grid-cols-1 gap-8">
                            {[
                                { icon: <Music />, ...t.workshops.item1 },
                                { icon: <Clock />, ...t.workshops.item2 },
                                { icon: <Heart />, ...t.workshops.item3 },
                            ].map((item, i) => (
                                <div key={i} className="group flex gap-8 p-8 rounded-[2rem] bg-white shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98]">
                                    <div className="bg-primary/5 p-5 rounded-2xl group-hover:bg-accent-gold/20 transition-colors duration-500 h-fit">
                                        <div className="text-primary group-hover:text-primary-light transform group-hover:rotate-12 transition-transform duration-500">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-serif font-bold text-primary mb-2">{item.title}</h4>
                                        <p className="text-text-dark/50 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <div className="relative p-12 rounded-[3rem] bg-primary text-white overflow-hidden group">
                            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 transform -rotate-12" />
                            <h3 className="text-3xl font-serif font-bold mb-6 text-accent-gold">{t.workshops.promoTitle}</h3>
                            <p className="text-xl opacity-90 leading-relaxed font-serif italic relative z-10">
                                "{t.workshops.promoDesc}"
                            </p>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-accent-terra to-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="sticky top-32">
                        <Card glass={true} className="p-12 shadow-2xl shadow-primary/10 border-white">
                            <div className="text-center mb-10">
                                <h3 className="text-4xl font-serif font-black text-primary mb-2">
                                    {t.workshops.form.title}
                                </h3>
                                <p className="text-text-dark/40 font-bold text-xs uppercase tracking-widest">Inicia tu viaje musical</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text-dark/30 uppercase tracking-[0.2em] ml-2">
                                        {t.workshops.form.name}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej: Gabriel García"
                                        className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-accent-gold focus:bg-white focus:outline-none transition-all duration-300 font-medium placeholder:text-text-dark/20"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-text-dark/30 uppercase tracking-[0.2em] ml-2">
                                            {t.workshops.form.email}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="correo@ejemplo.com"
                                            className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-accent-gold focus:bg-white focus:outline-none transition-all duration-300 font-medium placeholder:text-text-dark/20"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-text-dark/30 uppercase tracking-[0.2em] ml-2">
                                            {t.workshops.form.phone}
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+57 300..."
                                            className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-accent-gold focus:bg-white focus:outline-none transition-all duration-300 font-medium placeholder:text-text-dark/20"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text-dark/30 uppercase tracking-[0.2em] ml-2">
                                        {t.workshops.form.instrument}
                                    </label>
                                    <select
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-accent-gold focus:bg-white focus:outline-none transition-all duration-300 font-medium appearance-none cursor-pointer"
                                        value={formData.instrument}
                                        onChange={(e) => setFormData({ ...formData, instrument: e.target.value })}
                                    >
                                        <option value="">{t.workshops.form.select}</option>
                                        <option value="quena">Quena</option>
                                        <option value="zampona">Zampoña</option>
                                        <option value="charango">Charango</option>
                                        <option value="guitarra">Guitarra</option>
                                        <option value="vientos">Vientos Tradicionales</option>
                                        <option value="percusion">Percusión</option>
                                        <option value="bombo">Bombo</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text-dark/30 uppercase tracking-[0.2em] ml-2">
                                        {t.workshops.form.comments}
                                    </label>
                                    <textarea
                                        className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-accent-gold focus:bg-white focus:outline-none transition-all duration-300 font-medium placeholder:text-text-dark/20"
                                        rows="4"
                                        placeholder={t.workshops.form.placeholder}
                                        value={formData.comments}
                                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                    ></textarea>
                                </div>

                                <Button type="submit" variant="terra" className="w-full py-6 text-lg pulse-hover shadow-2xl shadow-accent-terra/30" disabled={status === 'loading'}>
                                    {status === 'loading' ? t.workshops.form.processing : t.workshops.form.submit}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
