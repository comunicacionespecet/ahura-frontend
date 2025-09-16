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
    console.log(token)

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

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al crear el AC');
    }

    return data;
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

export const getAssets = async (filters = {}, page = 1, limit = 20) => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    params.append('page', page);
    params.append('limit', limit);

    const response = await fetch(`${BASE_URL}/assets?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los activos');
    }

    return await response.json();
};

export const exportAllAssets = async (filters = {}) => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    const response = await fetch(`${BASE_URL}/assets?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al exportar todos los activos');
    }

    return await response.json();
};

export const incrementViewCount = async (id, currentCount) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/assets/${id}/user-stats`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ viewCount: currentCount + 1 }),
    });

    if (!response.ok) {
        throw new Error(`Error al incrementar viewCount para el AC con ID: ${id}`);
    }

    return await response.json();
};

export const incrementDownloadCount = async (id, currentCount) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/assets/${id}/user-stats`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ downloadCount: currentCount + 1 }),
    });

    if (!response.ok) {
        throw new Error(`Error al incrementar downloadCount para el AC con ID: ${id}`);
    }

    return await response.json();
};

