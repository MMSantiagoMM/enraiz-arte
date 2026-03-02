import { useState, useEffect } from 'react';
import { Calendar, Users, Compass, Mountain, TreePine } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { addTourismBooking, getTourismContent } from '../services/db';
import { useLanguage } from '../context/LanguageContext';

export default function Tourism() {
    const { t, language } = useLanguage();
    const [status, setStatus] = useState('idle');
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        people: '',
    });

    const defaultRoutes = [
        {
            id: 'cafe',
            title: 'Ruta del Café',
            titleEn: 'Coffee Route',
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061',
            description: 'Descubre el proceso del café desde la semilla hasta la taza',
            descriptionEn: 'Discover the coffee process from seed to cup'
        },
        {
            id: 'ancestral',
            title: 'Sendero Ancestral',
            titleEn: 'Ancestral Trail',
            image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070',
            description: 'Camina por los senderos de nuestros antepasados',
            descriptionEn: 'Walk through the paths of our ancestors'
        },
        {
            id: 'artesanal',
            title: 'Experiencia Artesanal',
            titleEn: 'Artisan Experience',
            image: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=2074',
            description: 'Aprende técnicas tradicionales de artesanía local',
            descriptionEn: 'Learn traditional local craft techniques'
        },
    ];

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await getTourismContent();
                setRoutes(data.length > 0 ? data : defaultRoutes);
            } catch (err) {
                console.error(err);
                setRoutes(defaultRoutes);
            }
        };
        fetchContent();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedRoute) {
            alert(language === 'es' ? 'Por favor selecciona una ruta primero' : 'Please select a route first');
            return;
        }
        setStatus('loading');
        try {
            await addTourismBooking({
                ...formData,
                route: language === 'es' ? selectedRoute.title : (selectedRoute.titleEn || selectedRoute.title)
            });
            setStatus('success');
            setFormData({ name: '', email: '', date: '', people: '' });
            setSelectedRoute(null);
            alert(t.tourism.form.success);
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert('Error');
        }
    };

    return (
        <section id="turismo" className="py-32 px-6 lg:px-12 bg-white relative">
            {/* Texture Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-24 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-[2px] w-12 bg-accent-terra opacity-20"></div>
                        <Mountain className="text-accent-terra" size={32} />
                        <div className="h-[2px] w-12 bg-accent-terra opacity-20"></div>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-serif font-black text-primary mb-8 leading-none italic">
                        {t.tourism.title}
                    </h2>
                    <p className="text-2xl text-text-dark/40 font-serif italic max-w-2xl mx-auto">
                        "{t.tourism.subtitle}"
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {routes.map((route, idx) => (
                        <div key={route.id} className="group relative">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border border-primary/5 rounded-[3rem] -z-10 transition-all duration-700 group-hover:scale-105 group-hover:border-accent-gold/40"></div>

                            <Card className={`relative h-[600px] flex flex-col transition-all duration-1000 ${selectedRoute?.id === route.id ? 'ring-4 ring-accent-gold shadow-accent-gold/20' : ''}`} hover={true}>
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={route.image}
                                        alt={language === 'es' ? route.title : route.titleEn}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Gradients for text contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>

                                <div className="relative mt-auto p-10 flex flex-col h-full justify-end text-white">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="h-[1px] w-8 bg-accent-gold"></div>
                                        <span className="text-accent-gold font-bold text-xs uppercase tracking-[0.4em]">Experiencia {idx + 1}</span>
                                    </div>
                                    <h3 className="text-4xl font-serif font-black mb-6 leading-tight tracking-tight uppercase">
                                        {language === 'es' ? route.title : route.titleEn}
                                    </h3>
                                    <p className="text-white/70 font-medium mb-10 leading-relaxed max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-1000 opacity-0 group-hover:opacity-100">
                                        {language === 'es' ? route.description : (route.descriptionEn || route.description)}
                                    </p>

                                    <Button
                                        variant={selectedRoute?.id === route.id ? 'gold' : 'glass'}
                                        className="w-full group/btn"
                                        onClick={() => {
                                            setSelectedRoute(route);
                                            setTimeout(() => {
                                                document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }, 100);
                                        }}
                                    >
                                        <Compass size={20} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                                        {selectedRoute?.id === route.id ? t.tourism.selected : t.tourism.book}
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Persistent Reservation Section */}
                <div id="reservar" className="mt-32 pt-32 border-t border-primary/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Information Side */}
                        <div className="space-y-8 animate-fade-up">
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-accent-gold"></div>
                                <span className="text-accent-gold font-black uppercase tracking-[0.4em] text-xs">
                                    {selectedRoute ? t.tourism.formTitle : 'Planifica tu Experiencia'}
                                </span>
                            </div>

                            {selectedRoute ? (
                                <>
                                    <h3 className="text-6xl md:text-7xl font-serif font-black text-primary leading-[0.9] uppercase italic tracking-tighter">
                                        {language === 'es' ? selectedRoute.title : selectedRoute.titleEn}
                                    </h3>
                                    <p className="text-xl md:text-2xl text-text-dark/40 font-serif italic max-w-lg leading-relaxed border-l-2 border-accent-terra/30 pl-8 py-4">
                                        "{language === 'es' ? selectedRoute.description : (selectedRoute.descriptionEn || selectedRoute.description)}"
                                    </p>
                                    <div className="flex gap-12 pt-8">
                                        <div className="space-y-2">
                                            <TreePine className="text-accent-gold" />
                                            <p className="text-[10px] uppercase font-black text-text-dark/20 tracking-widest">Atrapante</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Mountain className="text-accent-gold" />
                                            <p className="text-[10px] uppercase font-black text-text-dark/20 tracking-widest">Natural</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-6xl md:text-7xl font-serif font-black text-primary leading-[0.9] uppercase italic tracking-tighter">
                                        Reserva tu Ruta
                                    </h3>
                                    <p className="text-xl md:text-2xl text-text-dark/40 font-serif italic max-w-lg leading-relaxed">
                                        Selecciona una de nuestras rutas comunitarias para comenzar tu viaje por nuestras raíces.
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Form Side */}
                        <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl border border-primary/5">
                            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                                <div className="space-y-2 lg:space-y-4">
                                    <label className="text-[10px] lg:text-xs font-black text-text-dark/30 uppercase tracking-[0.3em] ml-2">
                                        {t.tourism.form.route}
                                    </label>
                                    <select
                                        required
                                        className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-[2rem] bg-cream/40 border-2 border-transparent focus:border-accent-gold focus:outline-none transition-all font-serif text-lg lg:text-xl appearance-none cursor-pointer"
                                        value={selectedRoute?.id || ''}
                                        onChange={(e) => {
                                            const route = routes.find(r => r.id === e.target.value);
                                            setSelectedRoute(route);
                                        }}
                                    >
                                        <option value="" disabled>{language === 'es' ? 'Selecciona una ruta' : 'Select a route'}</option>
                                        {routes.map(r => (
                                            <option key={r.id} value={r.id}>
                                                {language === 'es' ? r.title : (r.titleEn || r.title)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 lg:space-y-4">
                                    <label className="text-[10px] lg:text-xs font-black text-text-dark/30 uppercase tracking-[0.3em] ml-2">
                                        {t.tourism.form.name}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-[2rem] bg-cream/40 border-2 border-transparent focus:border-accent-gold focus:outline-none transition-all font-serif text-lg lg:text-xl placeholder:text-text-dark/10"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 lg:space-y-4">
                                        <label className="text-[10px] lg:text-xs font-black text-text-dark/30 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                            <Calendar size={14} className="text-accent-gold" />
                                            {t.tourism.form.date}
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-[2rem] bg-cream/40 border-2 border-transparent focus:border-accent-gold focus:outline-none transition-all font-medium"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 lg:space-y-4">
                                        <label className="text-[10px] lg:text-xs font-black text-text-dark/30 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                            <Users size={14} className="text-accent-gold" />
                                            {t.tourism.form.people}
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-[2rem] bg-cream/40 border-2 border-transparent focus:border-accent-gold focus:outline-none transition-all font-medium"
                                            value={formData.people}
                                            onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 lg:space-y-4">
                                    <label className="text-[10px] lg:text-xs font-black text-text-dark/30 uppercase tracking-[0.3em] ml-2">
                                        {t.tourism.form.email}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-2xl lg:rounded-[2rem] bg-cream/40 border-2 border-transparent focus:border-accent-gold focus:outline-none transition-all font-medium"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <Button type="submit" variant="terra" className="w-full py-5 lg:py-6 text-lg lg:text-xl shadow-accent-terra/20" disabled={status === 'loading'}>
                                    {status === 'loading' ? t.tourism.form.processing : t.tourism.form.submit}
                                </Button>

                                <p className="text-center text-[10px] uppercase font-bold text-text-dark/20 tracking-widest pt-4">
                                    Garantizamos la seguridad de tus datos
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
