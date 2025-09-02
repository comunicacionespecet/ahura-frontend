import CommentForm from '../molecules/CommentForm';
import { useComments, useAddComment } from '../../hooks/useComments';
import { useAuth } from '../../context/AuthContext';

export default function CommentsSection({ assetId, authorId }) {
    const { comments, setComments, loading: loadingComments, error: errorComments } = useComments(assetId);
    const { addComment, loading: addingComment, error: errorAdd } = useAddComment();
    const { isAuthenticated, logout, user } = useAuth();

    const handleAddComment = async (text) => {
        try {
            const newComment = await addComment({ assetId, authorId: user?.id, text });
            setComments((prev) => [newComment, ...prev]);
        } catch (err) {
            console.error('Error al agregar comentario:', err);
        }
    };

    if (loadingComments) return <p>Cargando comentarios...</p>;

    return (
        <div className="p-4 border rounded-lg space-y-4 bg-white shadow-md">
            <h2 className="font-semibold text-lg">Comentarios</h2>

            <CommentForm onSubmit={handleAddComment} loading={addingComment} />

            {(errorComments || errorAdd) && (
                <p className="text-red-500">
                    {errorComments?.message || errorAdd?.message || 'Error en los comentarios'}
                </p>
            )}

            <div className="space-y-3">
                {comments.map((c) => (
                    <div key={c.id} className="border p-2 rounded-md bg-gray-50 text-sm">
                        <p className="font-semibold">{c.authorId}</p>
                        <p>{c.text}</p>
                        <span className="text-xs text-gray-400">
                            {new Date(c.createdAt).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}



