import { useEffect, useState } from 'react';
import { getAllACs, getACById, createAC } from '../services/acServices';

// Hook para obtener todos los ACs
export function useACs() {
    const [acs, setAcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllACs()
            .then((data) => {
                setAcs(data);
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getACById(id)
            .then((data) => {
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