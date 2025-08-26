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
