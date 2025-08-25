const BASE_URL = import.meta.env.VITE_API_URL || '';

export const uploadFile = async (file) => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        headers: {
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir el archivo');
    }

    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
        const result = await response.json();
        return result.key || result.fileName || result.name || result.url || result.id || file.name;
    }

    const text = await response.text();
    return text || file.name;
};

export const getSignedImageUrl = async (fileName) => {
    if (!fileName) return null;

    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/upload/preview?key=${encodeURIComponent(fileName)}`, {
        headers: {
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudo obtener la URL firmada');
    }

    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
        const result = await response.json();
        return result.url || result.signedUrl || result.presignedUrl || null;
    }

    return await response.text();
};
