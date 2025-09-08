const BASE_URL = import.meta.env.VITE_API_URL || '';

export const getCommentsByAsset = async (assetId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/comments?assetId=${assetId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error('Error al obtener comentarios');
    return res.json();
};

export const createComment = async ({
    id,
    assetId,
    authorId,
    text,
    status,
    createdAt,
    userName,
}) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Auth: '1234',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            id,
            assetId,
            authorId,
            text,
            status,
            createdAt,
            userName,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al crear comentario');
    }

    return data;
};
