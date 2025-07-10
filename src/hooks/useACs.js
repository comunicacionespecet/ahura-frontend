import { useEffect, useState } from 'react';
import { getAllACs, getACById } from '../services/acServices';

// Hook para obtener todos los ACs
export function useACs() {
    const [acs, setAcs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllACs().then((data) => {
            setAcs(data);
            setLoading(false);
        });
    }, []);

    return { acs, loading };
}

export function useAC(id) {
    const [ac, setAc] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getACById(id).then((data) => {
            setAc(data);
            setLoading(false);
        });
    }, [id]);

    return { ac, loading };
}
