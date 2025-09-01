import { useState, useEffect } from 'react';
import {
    getCatalogs,
    updateCatalog,
    deleteCatalogItem,
    postCatalogItem,
} from '../services/catalogServices';

export function useCatalogs() {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const data = await getCatalogs();
                const {
                    _id,
                    slug,
                    updatedAt,
                    commentStatusEnum,
                    loggerActionEnum,
                    ...safeCatalogs
                } = data[0];
                setCatalogs(safeCatalogs);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCatalogs();
    }, []);

    return { catalogs, setCatalogs, loading, error };
}

export function usePostCatalogItem() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postItem = async (slug, listName, newItem, setCatalogs) => {
        setLoading(true);
        try {
            const result = await postCatalogItem(slug, listName, newItem);
            if (setCatalogs) {
                setCatalogs((prev) => ({
                    ...prev,
                    [listName]: [...(prev[listName] || []), result],
                }));
            }
            setLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { postItem, loading, error };
}

export function useUpdateCatalog() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateItem = async (id, updatedData) => {
        setLoading(true);
        try {
            const result = await updateCatalog(id, updatedData);
            setLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { updateItem, loading, error };
}

export function useDeleteCatalogItem() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (slug, listName, key, setCatalogs) => {
        setLoading(true);
        try {
            const result = await deleteCatalogItem(slug, listName, key);
            if (setCatalogs) {
                setCatalogs((prev) => ({
                    ...prev,
                    [listName]: (prev[listName] || []).filter(
                        (item) => (item.key ?? item.title) !== key
                    ),
                }));
            }
            setLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { deleteItem, loading, error };
}
