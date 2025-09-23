import { v4 as uuidv4 } from 'uuid';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const getToken = () => {
    return localStorage.getItem('token') || 'guest-token';
};

export const getAllUsers = async () => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Error al obtener los usuarios');
    return await res.json();
};

export const getUserById = async (id) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error(`Error al obtener el usuario con ID: ${id}`);
    return await res.json();
};

export const createUser = async (userData) => {
    const token = getToken();
    const payload = {
        ...userData,
        role: 'usuario',
        id: userData.id || uuidv4(),
    };
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
        },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al crear el usuario');
    return data;
};

export const updateUser = async (id, userData) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });
    if (!res.ok)
        throw new Error(`Error al actualizar el usuario con ID: ${id}`);
    return await res.json();
};

export const deleteUser = async (id) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error(`Error al eliminar el usuario con ID: ${id}`);
    return null;
};

export const requestPasswordReset = async (email) => {
    const res = await fetch(`${BASE_URL}/auth/password-reset/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok)
        throw new Error(data.message || 'Error al solicitar recuperación');
    return data;
};

export const confirmPasswordReset = async (email, code, newPassword) => {
    const res = await fetch(`${BASE_URL}/auth/password-reset/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
    });
    const data = await res.json();
    if (!res.ok)
        throw new Error(data.message || 'Error al restablecer contraseña');
    return data;
};
