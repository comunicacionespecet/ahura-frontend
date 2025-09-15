import { useEffect, useState } from 'react';
import {
    getAllACs,
    getACById,
    createAC,
    updateAC,
    deleteAC,
    getAssets,
    incrementViewCount,
    incrementDownloadCount,
} from '../services/acServices';

import { getSignedImageUrl } from '../services/uploadServices';
import { exportAllAssets } from "../services/acServices";


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

export const useFilteredACs = (filters, page, limit) => {
    const [acs, setAcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getAssets(filters, page, limit);
                setAcs(res.items || []);
                setTotal(res.total || 0);
                setTotalPages(Math.ceil((res.total || 0) / limit));
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters, page, limit]);

    return { acs, loading, error, total, totalPages };
};



export function useACById(id) {
    const [ac, setAc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { increment } = useIncrementViewCount();

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        getACById(id)
            .then(async (data) => {
                if (data.image) {
                    try {
                        const signedUrl = await getSignedImageUrl(data.image);
                        data.signedImageUrl = signedUrl;
                    } catch (err) {
                        data.signedImageUrl = null;
                    }
                }

                if (data.fileUri) {
                    try {
                        const signedFileUrl = await getSignedImageUrl(
                            data.fileUri
                        );
                        data.signedFileUrl = signedFileUrl;
                    } catch (err) {
                        data.signedFileUrl = null;
                    }
                }

                try {
                    await increment(id, data.viewCount || 0);
                } catch (err) {
                    console.warn("No se pudo incrementar viewCount", err);
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

export function useExportACs() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const exportAll = async (filters = {}) => {
        setLoading(true);
        try {
            const res = await exportAllAssets(filters);
            setLoading(false);
            return res.items || [];
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { exportAll, loading, error };
}

export function useIncrementViewCount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const increment = async (id, currentCount) => {
        setLoading(true);
        try {
            const updated = await incrementViewCount(id, currentCount);
            setLoading(false);
            return updated;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { increment, loading, error };
}

export function useIncrementDownloadCount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const increment = async (id, currentCount) => {
        setLoading(true);
        try {
            const updated = await incrementDownloadCount(id, currentCount);
            setLoading(false);
            return updated;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { increment, loading, error };
}