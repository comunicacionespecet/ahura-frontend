const BASE_URL = import.meta.env.VITE_API_URL || '';

export const getAllACs = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/assets`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los ACs');
    }
    return await response.json();
};

export const getACById = async (id) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/assets/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error al obtener el AC con ID: ${id}`);
    }

    return await response.json();
};

export const createAC = async (acData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/assets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(acData),
    });
    if (!response.ok) {
        throw new Error('Error al crear el AC');
    }
    return await response.json();
};

export const updateAC = async (id, acData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/assets/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(acData),
    });
    if (!response.ok) {
        throw new Error(`Error al actualizar el AC con ID: ${id}`);
    }
    return await response.json();
};

export const deleteAC = async (id) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/assets/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar el AC con ID: ${id}`);
    }

    return null;
};
