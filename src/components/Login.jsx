import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail, AlertTriangle, ArrowLeft } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
            <div className="max-w-md w-full animate-fade-in">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-primary hover:text-accent-terra mb-6 transition-colors font-medium"
                >
                    <ArrowLeft size={18} />
                    <span>Volver al Inicio</span>
                </button>

                <Card hover={false} className="p-8">
                    <div className="text-center mb-8">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <KeyRound className="text-primary" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-primary">Acceso Admin</h2>
                        <p className="text-text-dark/60 mt-2">Ingresa tus credenciales para administrar el sitio</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start gap-3">
                            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                            <p className="text-red-700 text-sm leading-tight">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-text-dark font-medium mb-1.5 text-sm">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dark/40">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-cream focus:border-primary focus:outline-none transition-all placeholder:text-text-dark/30"
                                    placeholder="admin@enraizarte.org"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-text-dark font-medium mb-1.5 text-sm">
                                Contraseña
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dark/40">
                                    <KeyRound size={18} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-cream focus:border-primary focus:outline-none transition-all placeholder:text-text-dark/30"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3 mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Iniciando sesión...' : 'Ingresar'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
