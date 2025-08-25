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
                const { _id, slug, updatedAt, ...safeCatalogs } = data[0];
                setCatalogs(safeCatalogs);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCatalogs();
    }, []);

    //
    // Crear un nuevo ítem en un catálogo
    //
    const handlePostCatalogItem = async (slug, listName, newItem) => {
        try {
            const result = await postCatalogItem(slug, listName, newItem);
            // actualizar estado local
            setCatalogs((prev) => ({
                ...prev,
                [listName]: [...(prev[listName] || []), result],
            }));
            return result;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    //
    // Actualizar un catálogo
    //
    const handleUpdateCatalog = async (id, updatedData) => {
        try {
            const result = await updateCatalog(id, updatedData);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    //
    // Eliminar un ítem de un catálogo
    //
    const handleDeleteCatalogItem = async (slug, listName, key) => {
        try {
            const result = await deleteCatalogItem(slug, listName, key);
            // actualizar estado local
            setCatalogs((prev) => ({
                ...prev,
                [listName]: (prev[listName] || []).filter(
                    (item) => (item.key ?? item.title) !== key
                ),
            }));
            return result;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return {
        catalogs,
        loading,
        error,
        setCatalogs,
        handlePostCatalogItem,
        handleUpdateCatalog,
        handleDeleteCatalogItem,
    };
}
