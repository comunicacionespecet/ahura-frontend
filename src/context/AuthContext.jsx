const BASE_URL = import.meta.env.VITE_API_URL || '';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { showError } from '../utils/alerts';

const ROLE_SUPER = import.meta.env.VITE_ROLE_SUPER;
const ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(
        () => localStorage.getItem('token') || null
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                if (decoded.exp < now) {
                    showError(
                        'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
                    );
                    logout();
                }
            } catch (e) {
                logout();
            }
        }
    }, [token]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Auth: '1234',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Credenciales inválidas');

            const data = await response.json();

            setToken(data.access_token);
            setUser(data.user || { email });
            console.log('Token recibido:', data.access_token);

            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
                isAdmin: [ROLE_SUPER, ROLE_ADMIN].includes(user?.role),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
