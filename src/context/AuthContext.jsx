import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

// Solamente este usuario podrá ingresar como administrador
const ADMIN_EMAIL = 'corporacionenraizarte@gmail.com';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === ADMIN_EMAIL) {
                setUser(user);
            } else {
                if (user) signOut(auth); // Desconectar si no es el admin
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        if (email !== ADMIN_EMAIL) {
            throw new Error('No tienes permisos de administrador.');
        }
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
