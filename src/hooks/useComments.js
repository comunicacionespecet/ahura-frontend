import { useState, useEffect } from 'react';
import { getCommentsByAsset, createComment, deleteComment } from '../services/commentServices';
import { v4 as uuidv4 } from 'uuid';

export function useComments(assetId) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!assetId) return;

        const fetchComments = async () => {
            setLoading(true);
            try {
                const res = await getCommentsByAsset(assetId);
                setComments(res.data || []);
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

    const addComment = async ({ assetId, authorId, text, userName }) => {
        setLoading(true);
        const commentData = {
            id: uuidv4(),
            assetId,
            authorId,
            text,
            status: 'active',
            userName,
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

export function useDeleteComment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeComment = async (id, authorId) => {
        setLoading(true);
        try {
            await deleteComment(id, authorId);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { removeComment, loading, error };
}
