const BASE_URL = import.meta.env.VITE_API_URL || '';

export const getCatalogs = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/catalogs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Error al obtener los catálogos');
    }
    return await response.json();
};

export const updateCatalog = async (id, data) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/catalogs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error actualizando catálogo');
    return res.json();
};

export const deleteCatalogItem = async (slug, listName, key) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/catalogs/${slug}/${listName}/${key}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Error eliminando item del catálogo');

    try {
        return await res.json();
    } catch {
        return null;
    }
};

export const postCatalogItem = async (slug, listName, data) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/catalogs/${slug}/${listName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Error creando item en el catálogo');
    return res.json();
};
