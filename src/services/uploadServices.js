const BASE_URL = 'http://ec2-3-216-249-17.compute-1.amazonaws.com:3000';

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
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
    const response = await fetch(`${BASE_URL}/upload?key=${encodeURIComponent(fileName)}`);

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
