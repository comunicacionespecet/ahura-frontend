import { useState } from 'react';
import { uploadFile } from '../services/uploadServices';

export function useUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const upload = async (file) => {
        setLoading(true);
        try {
            const result = await uploadFile(file);
            setLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { upload, loading, error };
}
