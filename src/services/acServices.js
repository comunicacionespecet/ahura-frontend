export const getAllACs = async () => {
    const response = await fetch('/assets');
    if (!response.ok) {
        throw new Error('Error al obtener los ACs');
    }
    return await response.json();
};

export const getACById = async (id) => {
    const response = await fetch(`/assets/${id}`);
    if (!response.ok) {
        throw new Error(`Error al obtener el AC con ID: ${id}`);
    }
    return await response.json();
};

export const createAC = async (acData) => {
    const response = await fetch('/assets', {
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
}
