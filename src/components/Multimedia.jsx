import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Music, GalleryVertical, ArrowRight, Play, Radio } from 'lucide-react';
import Card from './ui/Card';
import { useLanguage } from '../context/LanguageContext';
import { getMultimediaContent } from '../services/db';

export default function Multimedia() {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const defaultItems = [
        {
            id: 'videos',
            icon: <Play size={32} />,
            title: t.multimedia.items.videos.title,
            description: t.multimedia.items.videos.desc,
            color: 'bg-secondary',
            accent: 'text-secondary',
            bg: 'https://images.unsplash.com/photo-1492691523567-61192a61e3bc?q=80&w=2070',
            route: '/videos'
        },
        {
            id: 'varios',
            icon: <Music size={32} />,
            title: t.multimedia.items.varios.title,
            description: t.multimedia.items.varios.desc,
            color: 'bg-primary',
            accent: 'text-primary',
            bg: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070',
            route: '/varios'
        },
        {
            id: 'gallery',
            icon: <GalleryVertical size={32} />,
            title: t.multimedia.items.gallery.title,
            description: t.multimedia.items.gallery.desc,
            color: 'bg-accent-terra',
            accent: 'text-accent-terra',
            bg: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080',
            route: '/galeria'
        },
    ];

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await getMultimediaContent();
                if (data.length > 0) {
                    setItems(data.map(item => ({
                        ...item,
                        icon: item.id === 'videos' ? <Play size={32} /> :
                            item.id === 'varios' ? <Music size={32} /> :
                                <GalleryVertical size={32} />,
                        bg: item.id === 'videos' ? defaultItems[0].bg :
                            item.id === 'varios' ? defaultItems[1].bg :
                                defaultItems[2].bg,
                        route: item.id === 'videos' ? '/videos' :
                            item.id === 'varios' ? '/varios' :
                                '/galeria'
                    })));
                } else {
                    setItems(defaultItems);
                }
            } catch (err) {
                console.error(err);
                setItems(defaultItems);
            }
        };
        fetchContent();
    }, [t]);

    return (
        <section id="multimedia" className="py-32 px-6 lg:px-12 bg-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-24 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-12 bg-primary opacity-20"></div>
                        <Video className="text-accent-gold" size={32} />
                        <div className="h-[1px] w-12 bg-primary opacity-20"></div>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-serif font-black text-primary mb-8 tracking-tight uppercase leading-none">
                        {t.multimedia.title}
                    </h2>
                    <p className="text-2xl text-text-dark/40 font-serif italic max-w-2xl mx-auto">
                        "{t.multimedia.subtitle}"
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.map((item, index) => (
                        <Card
                            key={index}
                            className="relative group h-[500px] border-white/50 cursor-pointer"
                            hover={true}
                            onClick={() => navigate(item.route)}
                        >
                            <img src={item.bg} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent group-hover:bg-primary/90 transition-colors duration-500"></div>

                            <div className="absolute top-8 right-8 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-white transform group-hover:rotate-12 transition-all duration-700 border border-white/20">
                                {item.icon}
                            </div>

                            <div className="relative h-full flex flex-col justify-end p-10 text-white">
                                <h3 className="text-4xl font-serif font-black mb-4 tracking-tighter uppercase italic">{item.title}</h3>
                                <p className="text-white/60 mb-8 leading-relaxed font-medium line-clamp-2 italic">
                                    {item.description}
                                </p>
                                <button className="flex items-center gap-3 text-accent-gold font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors group/btn">
                                    {language === 'es' ? 'Ver Contenido' : 'View Content'}
                                    <ArrowRight className="group-hover/btn:translate-x-3 transition-transform duration-500" size={18} />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        </section>
    );
}
