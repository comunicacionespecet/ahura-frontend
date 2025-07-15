const BASE_URL = import.meta.env.PROD ? 'http://ec2-54-156-15-66.compute-1.amazonaws.com:3000' : '';

export const uploadImage = async (file) => {
    const formaData = new FormData();
    formaData.append('file', file);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formaData,
    });

    if (!response.ok) {
        throw new Error('Error al subir la imagen');
    }

    return file.name;
};

export const getSignedImageUrl = async (fileName) => {
    const response = await fetch(`${BASE_URL}/upload?key=${fileName}`);

    if (!response.ok) {
        throw new Error('No se pudo obtener la URL firmada');
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        return result.url;
    }

    return await response.text();
};
