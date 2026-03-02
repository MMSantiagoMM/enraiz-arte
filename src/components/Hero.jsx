import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section id="inicio" className="relative h-screen flex items-start overflow-hidden pt-[32vh]">
            {/* Background Image with Superior Overlay */}
            <div className="absolute inset-0 z-0 scale-110 animate-subtle-zoom">
                <img
                    src="/hero-enraiz-arte.jpg"
                    alt="Páramo colombiano"
                    className="w-full h-full object-cover"
                />
                {/* Multi-layered gradient for DEPTH */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30"></div>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1.5px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
                <div className="max-w-4xl space-y-8 md:space-y-12">
                    <h1 className="text-6xl md:text-7xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter opacity-0 animate-fade-in [animation-delay:400ms] fill-mode-forwards">
                        {t.hero.title} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-terra to-accent-gold bg-[length:200%_auto] animate-gradient-flow">
                            {t.hero.titleAccent}
                        </span>
                    </h1>

                    <div className="space-y-4 md:space-y-6 opacity-0 animate-fade-in [animation-delay:600ms] fill-mode-forwards">
                        <p className="text-lg md:text-3xl font-serif text-cream italic leading-relaxed max-w-xl border-l-4 border-accent-terra pl-6 md:pl-8 py-2">
                            "{t.hero.mission}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Repositioned Scroll Indicator - Fixed to Bottom Center with more space */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
                <span className="text-[10px] text-white/60 uppercase tracking-[0.4em] font-black">Explorar</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-accent-gold/50 to-transparent"></div>
            </div>

            {/* Decorative Overlay Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        </section>
    );
}
