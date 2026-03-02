import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    getTourismBookings,
    getWorkshopRegistrations,
    getTourismContent,
    updateTourismRoute,
    addTourismRoute,
    deleteTourismRoute,
    getMultimediaContent,
    updateMultimediaItem
} from '../services/db';
import {
    LayoutDashboard,
    MapPin,
    Music,
    Calendar,
    Mail,
    Phone,
    LogOut,
    Edit3,
    Save,
    Image as ImageIcon,
    PlusCircle,
    Hash,
    Trash2
} from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [tourismContent, setTourismContent] = useState([]);
    const [multimediaContent, setMultimediaContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('tourism-bookings');
    const [editMode, setEditMode] = useState(null);
    const [isAddingRoute, setIsAddingRoute] = useState(false);
    const [newRoutePreview, setNewRoutePreview] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/admin');
            return;
        }

        const fetchData = async () => {
            try {
                const [bookingsData, regsData, tourismData, multiData] = await Promise.all([
                    getTourismBookings(),
                    getWorkshopRegistrations(),
                    getTourismContent(),
                    getMultimediaContent()
                ]);
                setBookings(bookingsData);
                setRegistrations(regsData);
                setTourismContent(tourismData);
                setMultimediaContent(multiData);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    const formatDriveLink = (url) => {
        if (!url) return '';
        // If it's already a direct link we formatted, return it
        if (url.includes('drive.google.com/thumbnail')) return url;

        // Extract ID from standard Drive share links
        const idMatch = url.match(/[-\w]{25,}/);
        const id = idMatch ? idMatch[0] : null;

        if ((url.includes('drive.google.com') || url.includes('docs.google.com')) && id) {
            // High-res thumbnail service is the most reliable for bypassing Drive's hotlink protection
            return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
        }
        return url;
    };

    const handleUpdateRoute = async (id, data) => {
        try {
            const formattedData = {
                ...data,
                image: formatDriveLink(data.image)
            };
            await updateTourismRoute(id, formattedData);
            setTourismContent(prev => prev.map(item => item.id === id ? { ...item, ...formattedData } : item));
            setEditMode(null);
            alert('Contenido actualizado correctamente');
        } catch (err) {
            console.error(err);
            alert('Error al actualizar');
        }
    };

    const handleAddRoute = async (data) => {
        try {
            const formattedData = {
                ...data,
                image: formatDriveLink(data.image)
            };
            const docRef = await addTourismRoute(formattedData);
            setTourismContent(prev => [...prev, { id: docRef.id, ...formattedData }]);
            setIsAddingRoute(false);
            alert('Ruta agregada correctamente');
        } catch (err) {
            console.error(err);
            alert('Error al agregar ruta');
        }
    };

    const handleDeleteRoute = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta ruta?')) return;
        try {
            await deleteTourismRoute(id);
            setTourismContent(prev => prev.filter(item => item.id !== id));
            alert('Ruta eliminada correctamente');
        } catch (err) {
            console.error(err);
            alert('Error al eliminar');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="animate-spin text-primary">
                <LayoutDashboard size={48} />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-cream flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-primary text-white p-6 flex flex-col shadow-2xl z-10">
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
                    <div className="bg-white/10 p-2 rounded-lg">
                        <LayoutDashboard className="text-accent-gold" size={24} />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Admin CMS</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-white/40 px-3 mb-2 tracking-widest">Solicitudes</p>
                    <button
                        onClick={() => setActiveTab('tourism-bookings')}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'tourism-bookings' ? 'bg-accent-gold text-primary shadow-lg shadow-accent-gold/20' : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}
                    >
                        <Calendar size={18} />
                        <span className="font-medium text-sm">Reservas Turismo</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('workshop-regs')}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'workshop-regs' ? 'bg-accent-gold text-primary shadow-lg shadow-accent-gold/20' : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}
                    >
                        <Music size={18} />
                        <span className="font-medium text-sm">Inscripciones Talleres</span>
                    </button>

                    <p className="text-[10px] uppercase font-bold text-white/40 px-3 mt-8 mb-2 tracking-widest">Contenido Web</p>
                    <button
                        onClick={() => setActiveTab('edit-tourism')}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'edit-tourism' ? 'bg-accent-terra text-white shadow-lg shadow-accent-terra/20' : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}
                    >
                        <MapPin size={18} />
                        <span className="font-medium text-sm">Gestionar Turismo</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('edit-multimedia')}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'edit-multimedia' ? 'bg-accent-terra text-white shadow-lg shadow-accent-terra/20' : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}
                    >
                        <ImageIcon size={18} />
                        <span className="font-medium text-sm">Gestionar Multimedia</span>
                    </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <button
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/20 text-red-100 transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="text-sm">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-primary tracking-tight">
                        {activeTab === 'tourism-bookings' && 'Reservas de Turismo'}
                        {activeTab === 'workshop-regs' && 'Inscripciones de Música'}
                        {activeTab === 'edit-tourism' && 'Editor de Turismo Comunitario'}
                        {activeTab === 'edit-multimedia' && 'Editor de Contenido Multimedia'}
                    </h1>
                    <p className="text-text-dark/40 font-medium">Panel de administración Corporación Enraiz-Arte</p>
                </header>

                {activeTab === 'tourism-bookings' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {bookings.length === 0 ? (
                            <div className="col-span-full bg-white p-12 rounded-3xl border-2 border-dashed border-primary/10 text-center">
                                <MapPin className="mx-auto text-primary/20 mb-4" size={48} />
                                <p className="text-text-dark/40 italic">No hay reservas registradas aún.</p>
                            </div>
                        ) : (
                            bookings.map((booking) => (
                                <Card key={booking.id} hover={false} className="p-6 border-l-8 border-accent-terra shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-primary">{booking.name}</h3>
                                            <div className="bg-accent-terra/10 px-2 py-0.5 rounded inline-block">
                                                <p className="text-[10px] text-accent-terra font-black uppercase tracking-widest">{booking.route}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-text-dark/30 font-mono bg-cream px-2 py-1 rounded-full">{new Date(booking.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-text-dark/70">
                                            <Calendar size={14} className="text-accent-gold" />
                                            <span><strong>{booking.date}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-text-dark/70">
                                            <UsersIcon size={14} className="text-accent-gold" />
                                            <span><strong>{booking.people}</strong> Personas</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-text-dark/70 col-span-full">
                                            <Mail size={14} className="text-accent-gold" />
                                            <a href={`mailto:${booking.email}`} className="hover:text-primary transition-colors font-medium border-b border-primary/20">{booking.email}</a>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'workshop-regs' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {registrations.length === 0 ? (
                            <div className="col-span-full bg-white p-12 rounded-3xl border-2 border-dashed border-primary/10 text-center">
                                <Music className="mx-auto text-primary/20 mb-4" size={48} />
                                <p className="text-text-dark/40 italic">No hay inscripciones registradas aún.</p>
                            </div>
                        ) : (
                            registrations.map((reg) => (
                                <Card key={reg.id} hover={false} className="p-6 border-l-8 border-primary shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-primary">{reg.name}</h3>
                                            <div className="bg-primary/10 px-2 py-0.5 rounded inline-block">
                                                <p className="text-[10px] text-primary font-black uppercase tracking-widest">Taller: {reg.instrument}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-text-dark/30 font-mono bg-cream px-2 py-1 rounded-full">{new Date(reg.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <a href={`mailto:${reg.email}`} className="flex items-center gap-2 text-text-dark/70 hover:text-primary transition-colors truncate">
                                                <Mail size={14} className="text-accent-gold" />
                                                <span className="border-b border-primary/20">{reg.email}</span>
                                            </a>
                                            <div className="flex items-center gap-2 text-text-dark/70">
                                                <Phone size={14} className="text-accent-gold" />
                                                <span>{reg.phone}</span>
                                            </div>
                                        </div>
                                        {reg.comments && (
                                            <div className="bg-cream p-4 rounded-2xl border border-primary/5 relative">
                                                <QuoteIcon className="absolute top-2 right-2 text-primary/10" size={32} />
                                                <p className="text-[10px] uppercase font-black text-text-dark/20 mb-1">Comentarios:</p>
                                                <p className="italic text-text-dark/80 text-sm leading-relaxed">"{reg.comments}"</p>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'edit-tourism' && (
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary/5">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-primary flex items-center gap-2">
                                    <MapPin className="text-accent-terra" />
                                    Gestionar Rutas
                                </h3>
                                {!isAddingRoute && (
                                    <Button
                                        onClick={() => setIsAddingRoute(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <PlusCircle size={18} /> Nueva Ruta
                                    </Button>
                                )}
                            </div>

                            {/* Add New Route Form */}
                            {isAddingRoute && (
                                <Card hover={false} className="p-8 border-2 border-dashed border-accent-terra/30 bg-accent-terra/5 mb-8">
                                    <h4 className="text-xl font-bold text-primary mb-6">Agregar Nueva Ruta de Turismo</h4>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-text-dark/40 mb-1 block">Título (ES)</label>
                                                <input
                                                    id="new-title"
                                                    placeholder="Ej: CaminataAncestral"
                                                    className="w-full p-3 bg-white rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-text-dark/40 mb-1 block">Título (EN)</label>
                                                <input
                                                    id="new-title-en"
                                                    placeholder="Ej: AncestralHike"
                                                    className="w-full p-3 bg-white rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-text-dark/40 mb-1 block">URL de Imagen (Link de Drive u otro)</label>
                                            <input
                                                id="new-image"
                                                placeholder="Pega el enlace compartido de Google Drive aquí..."
                                                className="w-full p-3 bg-white rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none"
                                                onChange={(e) => {
                                                    const formatted = formatDriveLink(e.target.value);
                                                    setNewRoutePreview(formatted);
                                                }}
                                            />
                                            <p className="text-[9px] text-text-dark/40 mt-1 italic">Nota: Puedes pegar el enlace de "Compartir" de Drive directamente, el sistema lo convertirá automáticamente.</p>

                                            {newRoutePreview && (
                                                <div className="mt-4 relative w-full h-48 overflow-hidden rounded-xl border border-primary/10 bg-white flex flex-col items-center justify-center p-2">
                                                    <img
                                                        src={newRoutePreview}
                                                        className="w-full h-full object-contain rounded-lg"
                                                        referrerPolicy="no-referrer"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                        onLoad={(e) => {
                                                            e.target.style.display = 'block';
                                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="hidden flex-col items-center gap-2 text-accent-terra text-center p-4">
                                                        <div className="bg-accent-terra/10 p-3 rounded-full">
                                                            <MapPin size={24} />
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">Error de Visualización</span>
                                                        <p className="text-[9px] text-text-dark/60 leading-tight">La imagen no se pudo cargar. Asegúrate de que el archivo en Drive esté configurado como <br /><strong>'Cualquier persona con el enlace'</strong></p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-text-dark/40 mb-1 block">Descripción (ES)</label>
                                            <textarea
                                                id="new-desc"
                                                rows="4"
                                                placeholder="Describe la experiencia de la ruta..."
                                                className="w-full p-3 bg-white rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary outline-none resize-none"
                                            ></textarea>
                                        </div>
                                        <div className="flex gap-4">
                                            <Button
                                                onClick={() => {
                                                    const title = document.getElementById('new-title').value;
                                                    const titleEn = document.getElementById('new-title-en').value;
                                                    const image = document.getElementById('new-image').value;
                                                    const description = document.getElementById('new-desc').value;
                                                    if (!title || !image || !description) return alert('Por favor llena todos los campos obligatorios');
                                                    handleAddRoute({ title, titleEn, image, description });
                                                }}
                                                className="flex-1 py-4"
                                            >
                                                Crear Ruta
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsAddingRoute(false)}
                                                className="px-8"
                                            >
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            <div className="grid grid-cols-1 gap-6">
                                {tourismContent.map((route) => (
                                    <Card key={route.id} hover={false} className="p-0 overflow-hidden border border-cream group">
                                        <div className="md:flex">
                                            <div className="md:w-1/3 relative overflow-hidden">
                                                <img
                                                    src={formatDriveLink(route.image)}
                                                    alt={route.title}
                                                    className="w-full h-full object-cover min-h-[220px] transition-transform duration-700 group-hover:scale-110"
                                                    referrerPolicy="no-referrer"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000'; // Fallback
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                                            </div>
                                            <div className="p-8 md:w-2/3 relative">
                                                {/* Delete Button */}
                                                {!editMode && (
                                                    <button
                                                        onClick={() => handleDeleteRoute(route.id)}
                                                        className="absolute top-4 right-4 p-2 text-text-dark/20 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
                                                        title="Eliminar ruta"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}

                                                {editMode === route.id ? (
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4 text-left">
                                                            <div>
                                                                <label className="text-[10px] font-bold uppercase text-text-dark/40 block mb-1">Título (ES)</label>
                                                                <input
                                                                    defaultValue={route.title}
                                                                    id={`title-${route.id}`}
                                                                    className="w-full p-2 bg-cream rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[10px] font-bold uppercase text-text-dark/40 block mb-1">Título (EN)</label>
                                                                <input
                                                                    defaultValue={route.titleEn}
                                                                    id={`titleEn-${route.id}`}
                                                                    className="w-full p-2 bg-cream rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="text-left">
                                                            <label className="text-[10px] font-bold uppercase text-text-dark/40 block mb-1">URL Imagen (Drive u otro)</label>
                                                            <input
                                                                defaultValue={route.image}
                                                                id={`img-${route.id}`}
                                                                className="w-full p-2 bg-cream rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                                                                onChange={(e) => {
                                                                    const formatted = formatDriveLink(e.target.value);
                                                                    const preview = document.getElementById(`preview-edit-${route.id}`);
                                                                    if (formatted) preview.src = formatted;
                                                                }}
                                                            />
                                                            <div className="mt-2 w-full h-24 overflow-hidden rounded-lg border border-primary/10">
                                                                <img
                                                                    id={`preview-edit-${route.id}`}
                                                                    src={formatDriveLink(route.image)}
                                                                    className="w-full h-full object-cover"
                                                                    referrerPolicy="no-referrer"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="text-left">
                                                            <label className="text-[10px] font-bold uppercase text-text-dark/40 block mb-1">Descripción (ES)</label>
                                                            <textarea
                                                                defaultValue={route.description}
                                                                id={`desc-${route.id}`}
                                                                rows="3"
                                                                className="w-full p-2 bg-cream rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none resize-none"
                                                            ></textarea>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="primary"
                                                                className="flex-1 flex items-center justify-center gap-2"
                                                                onClick={() => handleUpdateRoute(route.id, {
                                                                    title: document.getElementById(`title-${route.id}`).value,
                                                                    titleEn: document.getElementById(`titleEn-${route.id}`).value,
                                                                    image: document.getElementById(`img-${route.id}`).value,
                                                                    description: document.getElementById(`desc-${route.id}`).value,
                                                                })}
                                                            >
                                                                <Save size={18} /> Guardar Cambios
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                className="px-6"
                                                                onClick={() => setEditMode(null)}
                                                            >
                                                                Cancelar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex flex-col items-start text-left">
                                                        <div className="bg-accent-terra/10 px-3 py-1 rounded-full mb-3">
                                                            <span className="text-[10px] font-black text-accent-terra uppercase tracking-widest">Ruta Turística</span>
                                                        </div>
                                                        <div className="flex justify-between items-start w-full mb-2">
                                                            <h4 className="text-2xl font-black text-primary tracking-tight leading-none">{route.title}</h4>
                                                            <button
                                                                onClick={() => setEditMode(route.id)}
                                                                className="p-2.5 bg-cream rounded-xl hover:bg-accent-gold transition-all text-primary shadow-sm"
                                                                title="Editar ruta"
                                                            >
                                                                <Edit3 size={18} />
                                                            </button>
                                                        </div>
                                                        <p className="text-text-dark/70 italic text-sm mb-6 line-clamp-3">"{route.description}"</p>
                                                        <div className="mt-auto pt-4 border-t border-cream flex items-center gap-3 w-full">
                                                            <Hash size={16} className="text-accent-gold" />
                                                            <p className="text-xs font-bold text-text-dark/40 uppercase tracking-widest">{route.titleEn}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function UsersIcon({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function QuoteIcon({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.3601 14 14.017 12.6569 14.017 11V8H20.017V14H22.017V21H14.017ZM3.01697 21V18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697V14H6.01697C4.36012 14 3.01697 12.6569 3.01697 11V8H9.01697V14H11.017V21H3.01697Z" />
        </svg>
    );
}
