const BASE_URL = 'http://ec2-3-216-249-17.compute-1.amazonaws.com:3000';

export const getAllACs = async () => {
    const response = await fetch(`${BASE_URL}/assets`);
    if (!response.ok) {
        throw new Error('Error al obtener los ACs');
    }
    return await response.json();
};

export const getACById = async (id) => {
    const response = await fetch(`${BASE_URL}/assets/${id}`);
    if (!response.ok) {
        throw new Error(`Error al obtener el AC con ID: ${id}`);
    }
    return await response.json();
};

export const createAC = async (acData) => {
    const response = await fetch(`${BASE_URL}/assets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(acData),
    });
    if (!response.ok) {
        throw new Error('Error al crear el AC');
    }
    return await response.json();
};

export const updateAC = async (id, acData) => {
    const response = await fetch(`${BASE_URL}/assets/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(acData),
    });
    if (!response.ok) {
        throw new Error(`Error al actualizar el AC con ID: ${id}`);
    }
    return await response.json();
};

export const deleteAC = async (id) => {
    const response = await fetch(`${BASE_URL}/assets/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Error al eliminar el AC con ID: ${id}`);
    }
    return null;
};
