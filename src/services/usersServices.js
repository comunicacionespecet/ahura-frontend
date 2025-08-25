/*const BASE_URL = import.meta.env.VITE_API_URL || '';

export const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
};

export const updateUserRole = async (userId, newRole) => {
    const response = await fetch(`${BASE_URL}/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
    });
    if (!response.ok) throw new Error('Error al actualizar el rol');
    return await response.json();
};*/

const usersMock = [
    { id: '1', name: 'Ana Gómez', email: 'ana@ejemplo.com', role: 'user' },
    { id: '2', name: 'Juan Pérez', email: 'juan@ejemplo.com', role: 'admin' },
    { id: '3', name: 'Carlos Ruiz', email: 'carlos@ejemplo.com', role: 'user' },
];

export const getAllUsers = async () => {
    // Simula una petición asíncrona
    return new Promise((resolve) => setTimeout(() => resolve(usersMock), 500));
};

export const updateUserRole = async (userId, newRole) => {
    // Simula actualización (no cambia el mock realmente)
    return new Promise((resolve) => setTimeout(() => resolve({ id: userId, role: newRole }), 300));
};
