import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleAuth = () => setIsAdmin((prev) => !prev);

    return <AuthContext.Provider value={{ isAdmin, toggleAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
