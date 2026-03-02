import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Camera, Music, Video, ExternalLink } from 'lucide-react';
import { getMultimediaItems } from '../services/db';
import { useLanguage } from '../context/LanguageContext';
import Card from './ui/Card';

export default function MultimediaView({ type }) {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const config = {
        videos: {
            title: t.multimedia.items.videos.title,
            icon: <Play size={48} />,
            color: 'bg-secondary',
            iconColor: 'text-secondary'
        },
        gallery: {
            title: t.multimedia.items.gallery.title,
            icon: <Camera size={48} />,
            color: 'bg-accent-terra',
            iconColor: 'text-accent-terra'
        },
        varios: {
            title: t.multimedia.items.varios.title,
            icon: <Music size={48} />,
            color: 'bg-primary',
            iconColor: 'text-primary'
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const data = await getMultimediaItems(type);
                setItems(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchItems();
    }, [type]);

    return (
        <div className="min-h-screen bg-cream selection:bg-accent-gold/30">
            {/* Header */}
            <header className={`${config[type].color} text-white py-24 px-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all group mb-12 uppercase font-black text-[10px] tracking-[0.3em] border border-white/20 shadow-xl"
                    >
                        <ArrowLeft className="group-hover:-translate-x-2 transition-transform" size={18} />
                        {language === 'es' ? 'Volver al Menú Principal' : 'Back to Home'}
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="p-8 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20">
                            {config[type].icon}
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter italic">
                            {config[type].title}
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-24">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="w-16 h-16 border-4 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin"></div>
                        <p className="font-serif italic text-xl text-primary/40">Cargando experiencias...</p>
                    </div>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {items.map((item, index) => (
                            <Card key={index} className="overflow-hidden group flex flex-col h-full" hover={true}>
                                {type === 'videos' ? (
                                    <div className="aspect-video relative overflow-hidden bg-black">
                                        {item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
                                            <iframe
                                                src={item.url.replace('watch?v=', 'embed/')}
                                                className="w-full h-full"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <video src={item.url} controls className="w-full h-full object-cover"></video>
                                        )}
                                    </div>
                                ) : (
                                    <div className="aspect-square relative overflow-hidden">
                                        <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all"></div>
                                    </div>
                                )}

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl font-serif font-bold text-primary mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-text-dark/60 font-medium leading-relaxed italic mb-6 flex-1">
                                        {item.description}
                                    </p>

                                    {item.externalUrl && (
                                        <a
                                            href={item.externalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-accent-terra font-black text-[10px] uppercase tracking-widest hover:text-primary transition-colors mt-auto"
                                        >
                                            Ver más <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 space-y-12 animate-fade-up">
                        <div className="w-32 h-32 bg-primary/5 mx-auto rounded-full flex items-center justify-center relative">
                            <Video className="text-primary/10" size={64} />
                            <div className="absolute inset-0 border-2 border-dashed border-primary/10 rounded-full animate-spin-slow"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-serif font-black text-primary uppercase italic tracking-tighter">
                                    {language === 'es' ? 'No hay contenido aún' : 'No content yet'}
                                </h2>
                                <p className="text-primary/40 text-xl font-serif italic">
                                    {language === 'es' ? 'Pronto compartiremos más de nuestra cultura contigo.' : 'Soon we will share more of our culture with you.'}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-accent-terra transition-all shadow-2xl shadow-primary/20 group"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                                {language === 'es' ? 'Ir al Menú Principal' : 'Back to Main Menu'}
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
