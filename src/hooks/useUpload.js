import { useState } from 'react';
import { uploadImage } from '../services/uploadServices';

export function useUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadFile = async (file) => {
        setLoading(true);
        try {
            const result = await uploadImage(file);
            setLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { uploadFile, loading, error };
}
