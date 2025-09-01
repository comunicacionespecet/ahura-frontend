import { useEffect, useState } from 'react';
import {
    getAllACs,
    getACById,
    createAC,
    updateAC,
    deleteAC,
} from '../services/acServices';
import { getSignedImageUrl } from '../services/uploadServices';

export function useACs() {
    const [acs, setAcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllACs()
            .then((data) => {
                setAcs(data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);
    return { acs, loading, error };
}

export function useACById(id) {
    const [ac, setAc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        getACById(id)
            .then(async (data) => {
                if (data.image) {
                    try {
                        const signedUrl = await getSignedImageUrl(data.image);
                        data.signedImageUrl = signedUrl;
                        console.log('URL firmada obtenida:', data);
                    } catch (err) {
                        console.error('Error al obtener la URL firmada:', err);
                        data.signedImageUrl = null;
                    }
                }

                if (data.fileUri) {
                    try {
                        const signedFileUrl = await getSignedImageUrl(
                            data.fileUri
                        );
                        data.signedFileUrl = signedFileUrl;
                        console.log('URL firmada obtenida:', data);
                    } catch (err) {
                        console.error('Error al obtener la URL firmada:', err);
                        data.signedFileUrl = null;
                    }
                }

                setAc(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    return { ac, loading, error };
}

export function useCreateAC() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (acData) => {
        setLoading(true);
        try {
            const newAC = await createAC(acData);
            setLoading(false);
            return newAC;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { create, loading, error };
}

export function useUpdateAC() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const update = async (id, acData) => {
        setLoading(true);
        try {
            const updated = await updateAC(id, acData);
            setLoading(false);
            return updated;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { update, loading, error };
}

export function useDeleteAC() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const remove = async (id) => {
        setLoading(true);
        try {
            const response = await deleteAC(id);
            setLoading(false);
            return response;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { remove, loading, error };
}
