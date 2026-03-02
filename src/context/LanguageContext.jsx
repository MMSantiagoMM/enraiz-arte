import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    es: {
        nav: {
            home: 'Inicio',
            about: 'Nosotros',
            tourism: 'Turismo',
            workshops: 'Talleres',
            donations: 'Donaciones',
            admin: 'Acceso Admin',
            logout: 'Salir'
        },
        hero: {
            title: 'Corporación',
            titleAccent: 'Enraiz-Arte',
            mission: 'Nuestra misión es fortalecer el tejido social y cultural de la mano de las comunidades',
            description: 'A través del turismo comunitario, la formación popular en diferentes expresiones artísticas y el rescate de nuestras tradiciones, construimos un presente más consciente y conectado con nuestras raíces.',
            ctaRutes: 'Explorar Rutas',
            ctaWorkshops: 'Ver Talleres',
            badge: 'Raíces Ancestrales'
        },
        about: {
            title: 'Nuestra Esencia',
            subtitle: 'Conectando tradiciones, transformando territorios',
            mission: 'Misión',
            missionText: 'Impulsar procesos de enraizamiento cultural y territorial a través del arte, los oficios y la integración de saberes tradicionales y contemporáneos, generando experiencias y laboratorios creativos que fortalezcan la identidad, el bienestar y la conexión comunitaria en contextos urbanos y rurales.',
            vision: 'Visión',
            visionText: 'Ser una corporación referente en Colombia y Latinoamérica en la creación de ecosistemas culturales donde el arte, el territorio y la innovación dialoguen de manera armónica, inspirando modelos de desarrollo comunitario, económico y espiritual sostenibles y replicables.',
            who: 'Quiénes Somos',
            whoText: 'Somos una corporación cultural que entiende el arte como raíz, puente y semilla.',
            whoParagraphs: [
                'En Enraiz-arte concebimos el territorio como un sujeto vivo y a las personas como creadoras en potencia. Promovemos el retorno consciente a los oficios manuales, la música, el cuerpo y la memoria colectiva como caminos para despertar la sensibilidad y fortalecer el tejido social.',
                'Diseñamos talleres y experiencias que integran tradición e innovación —desde el tejido y la alfarería hasta la alfabetización en inteligencia artificial— demostrando que los saberes ancestrales y las herramientas contemporáneas no son opuestos, sino fuerzas complementarias para el crecimiento humano y comunitario.',
                'Creamos laboratorios culturales, recorridos comunitarios, conciertos y bazares populares que dinamizan la economía local, visibilizan el talento del territorio y generan vínculos auténticos entre personas, empresas y comunidades.',
                'Enraiz-arte es un movimiento que expande sus raíces hacia adentro (bienestar individual) y hacia afuera (transformación colectiva).'
            ]
        },
        multimedia: {
            title: 'Multimedia',
            subtitle: 'Sumérgete en nuestra colección de contenido cultural y comunitario',
            items: {
                videos: { title: 'Videos', desc: 'Descubre nuestras historias y experiencias' },
                varios: { title: 'Varios', desc: 'Contenido diverso de nuestra cultura' },
                gallery: { title: 'Galería', desc: 'Explora momentos capturados' }
            }
        },
        tourism: {
            title: 'Turismo Comunitario',
            subtitle: 'Vive experiencias auténticas conectando con nuestra tierra y cultura',
            book: 'Reservar',
            selected: 'Seleccionado',
            formTitle: 'Reserva para:',
            close: 'Cerrar X',
            form: {
                name: 'Nombre Completo',
                email: 'Correo Electrónico',
                date: 'Fecha Deseada',
                people: 'Número de Personas',
                route: 'Ruta a Reservar',
                submit: 'Enviar Solicitud de Reserva',
                processing: 'Procesando...',
                success: '¡Gracias! Tu reserva ha sido guardada. Nos pondremos en contacto contigo pronto.'
            }
        },
        workshops: {
            title: 'Talleres de Música',
            subtitle: 'Aprende y conecta con nuestras tradiciones musicales ancestrales',
            cardTitle: 'Nuestras Clases',
            item1: { title: 'Instrumentos Andinos', desc: 'Quena, zampoña, charango y más instrumentos tradicionales' },
            item2: { title: 'Horarios Flexibles', desc: 'Clases individuales y grupales adaptadas a tu disponibilidad' },
            item3: { title: 'Todos los Niveles', desc: 'Desde principiantes hasta músicos avanzados' },
            promoTitle: 'Más que Música',
            promoDesc: 'Nuestros talleres son espacios de encuentro donde no solo aprendes a tocar un instrumento, sino que te conectas con la historia, la cultura y el espíritu de nuestra comunidad.',
            form: {
                title: 'Inscríbete Ahora',
                name: 'Nombre Completo',
                email: 'Correo Electrónico',
                phone: 'Teléfono',
                instrument: 'Instrumento de Interés',
                select: 'Selecciona un instrumento',
                comments: 'Comentarios o Dudas',
                placeholder: '¿Tienes alguna experiencia previa o duda?',
                submit: 'Agendar Clase',
                processing: 'Procesando...',
                success: '¡Gracias por tu interés! Tu inscripción ha sido guardada. Te contactaremos pronto para coordinar tu clase.'
            }
        },
        donations: {
            title: 'Apoya Nuestra Misión',
            subtitle: 'Tu contribución nos ayuda a fortalecer nuestra comunidad y seguir creciendo juntos',
            infoTitle: 'Información para Donaciones',
            bankTitle: 'Datos Bancarios',
            bank: 'Banco',
            type: 'Tipo de Cuenta',
            account: 'Número de Cuenta',
            holder: 'Titular',
            fiscalTitle: 'Información Fiscal',
            nit: 'NIT',
            thanksTitle: '¡Gracias por tu Apoyo!',
            thanksDesc: 'Cada contribución nos acerca más a nuestro objetivo de fortalecer el tejido cultural y social de nuestra comunidad. Tu generosidad hace posible que sigamos creciendo juntos.'
        },
        footer: {
            contact: 'Contacto',
            follow: 'Síguenos',
            rights: 'Todos los derechos reservados.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            tourism: 'Tourism',
            workshops: 'Workshops',
            donations: 'Donations',
            admin: 'Admin Access',
            logout: 'Logout'
        },
        hero: {
            title: 'Corporation',
            titleAccent: 'Enraiz-Arte',
            mission: 'Our mission is to strengthen the social and cultural fabric alongside communities',
            description: 'Through community tourism, popular training in different artistic expressions, and the rescue of our traditions, we build a present more conscious and connected with our roots.',
            ctaRutes: 'Explore Routes',
            ctaWorkshops: 'See Workshops',
            badge: 'Ancestral Roots'
        },
        about: {
            title: 'Our Essence',
            subtitle: 'Connecting traditions, transforming territories',
            mission: 'Mission',
            missionText: 'To promote cultural and territorial rooting processes through art, crafts, and the integration of traditional and contemporary knowledge, generating creative experiences and laboratories that strengthen identity, well-being, and community connection in urban and rural contexts.',
            vision: 'Vision',
            visionText: 'To be a reference corporation in Colombia and Latin America in the creation of cultural ecosystems where art, territory, and innovation dialogue harmoniously, inspiring sustainable and replicable models of community, economic, and spiritual development.',
            who: 'Who We Are',
            whoText: 'We are a cultural corporation that understands art as a root, bridge, and seed.',
            whoParagraphs: [
                'At Enraiz-arte, we conceive the territory as a living subject and people as potential creators. We promote a conscious return to manual crafts, music, the body, and collective memory as paths to awaken sensitivity and strengthen the social fabric.',
                'We design workshops and experiences that integrate tradition and innovation —from weaving and pottery to literacy in artificial intelligence— demonstrating that ancestral knowledge and contemporary tools are not opposites, but complementary forces for human and community growth.',
                'We create cultural laboratories, community tours, concerts, and popular bazaars that dynamize the local economy, make the territory\'s talent visible, and generate authentic links between people, companies, and communities.',
                'Enraiz-arte is a movement that expands its roots inward (individual well-being) and outward (collective transformation).'
            ]
        },
        multimedia: {
            title: 'Multimedia',
            subtitle: 'Immerse yourself in our collection of cultural and community content',
            items: {
                videos: { title: 'Videos', desc: 'Discover our stories and experiences' },
                varios: { title: 'Various', desc: 'Diverse content from our culture' },
                gallery: { title: 'Gallery', desc: 'Explore captured moments' }
            }
        },
        tourism: {
            title: 'Community Tourism',
            subtitle: 'Live authentic experiences connecting with our land and culture',
            book: 'Book Now',
            selected: 'Selected',
            formTitle: 'Booking for:',
            close: 'Close X',
            form: {
                name: 'Full Name',
                email: 'Email Address',
                date: 'Desired Date',
                people: 'Number of People',
                route: 'Route to Book',
                submit: 'Send Booking Request',
                processing: 'Processing...',
                success: 'Thank you! Your booking has been saved. We will contact you soon.'
            }
        },
        workshops: {
            title: 'Music Workshops',
            subtitle: 'Learn and connect with our ancestral musical traditions',
            cardTitle: 'Our Classes',
            item1: { title: 'Andean Instruments', desc: 'Quena, panpipes, charango and more traditional instruments' },
            item2: { title: 'Flexible Schedules', desc: 'Individual and group classes adapted to your availability' },
            item3: { title: 'All Levels', desc: 'From beginners to advanced musicians' },
            promoTitle: 'More than Music',
            promoDesc: 'Our workshops are meeting spaces where you not only learn to play an instrument, but you connect with the history, culture, and spirit of our community.',
            form: {
                title: 'Sign Up Now',
                name: 'Full Name',
                email: 'Email Address',
                phone: 'Phone Number',
                instrument: 'Instrument of Interest',
                select: 'Select an instrument',
                comments: 'Comments or Questions',
                placeholder: 'Do you have any previous experience or questions?',
                submit: 'Schedule Class',
                processing: 'Processing...',
                success: 'Thank you for your interest! Your registration has been saved. We will contact you soon to coordinate your class.'
            }
        },
        donations: {
            title: 'Support Our Mission',
            subtitle: 'Your contribution helps us strengthen our community and keep growing together',
            infoTitle: 'Donation Information',
            bankTitle: 'Bank Details',
            bank: 'Bank',
            type: 'Account Type',
            account: 'Account Number',
            holder: 'Account Holder',
            fiscalTitle: 'Tax Information',
            nit: 'Tax ID (NIT)',
            thanksTitle: 'Thank You for Your Support!',
            thanksDesc: 'Every contribution brings us closer to our goal of strengthening the cultural and social fabric of our community. Your generosity makes it possible for us to continue growing together.'
        },
        footer: {
            contact: 'Contact',
            follow: 'Follow Us',
            rights: 'All rights reserved.'
        }
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('es');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
