import { useState, useEffect } from 'react';
import { getCommentsByAsset, createComment } from '../services/commentServices';

export function useComments(assetId) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!assetId) return;

        const fetchComments = async () => {
            setLoading(true);
            try {
                const data = await getCommentsByAsset(assetId);
                setComments(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [assetId]);

    return { comments, setComments, loading, error };
}

export function useAddComment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addComment = async ({ assetId, authorId, text }) => {
        setLoading(true);
        const commentData = {
            id: crypto.randomUUID(),
            assetId,
            authorId,
            text,
            status: 'active',
            createdAt: new Date().toISOString(),
        };
        try {
            const newComment = await createComment(commentData);
            setLoading(false);
            return newComment;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { addComment, loading, error };
}
