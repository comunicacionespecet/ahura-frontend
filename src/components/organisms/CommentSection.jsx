import { MoreVertical } from "lucide-react"; // icono de 3 punticos
import { useDeleteComment, useComments, useAddComment } from "../../hooks/useComments";
import { useAuth } from "../../context/AuthContext";
import CommentForm from "../molecules/CommentForm";
import { useState } from "react";

export default function CommentsSection({ assetId, authorId }) {
    const { comments, setComments, loading: loadingComments, error: errorComments } =
        useComments(assetId);

    const { addComment, loading: addingComment, error: errorAdd } = useAddComment();
    const { removeComment } = useDeleteComment();
    const { user, isAdmin, isSuperAdmin } = useAuth();
    const [openMenuId, setOpenMenuId] = useState(null);
    const handleAddComment = async (text) => {
        try {
            const newComment = await addComment({
                assetId,
                authorId: user?.id,
                text,
                userName: user?.name || "Usuario Anónimo",
            });
            setComments((prev) => [newComment, ...prev]);
        } catch (err) {
            console.error("Error al agregar comentario:", err);
        }
    };

    const handleDelete = async (commentId, commentAuthorId) => {
        try {
            await removeComment(commentId, commentAuthorId);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
            setOpenMenuId(null); // cierra menú al eliminar
        } catch (err) {
            console.error("Error al eliminar comentario:", err);
        }
    };

    if (loadingComments) return <p>Cargando comentarios...</p>;

    return (
        <div className="p-4 border rounded-lg space-y-4 bg-white shadow-md">
            <h2 className="font-semibold text-lg">Comentarios</h2>

            <CommentForm onSubmit={handleAddComment} loading={addingComment} />

            {(errorComments || errorAdd) && (
                <p className="text-red-500">
                    {errorComments?.message ||
                        errorAdd?.message ||
                        "Error en los comentarios"}
                </p>
            )}

            <div className="space-y-3">
                {comments.map((c) => {
                    const canDelete = isAdmin || isSuperAdmin || user?.id === c.authorId;

                    return (
                        <div
                            key={c.id}
                            className="border p-2 rounded-md bg-gray-50 text-sm relative"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{c.userName}</p>
                                    <p>{c.text}</p>
                                    <span className="text-xs text-gray-400">
                                        {new Date(c.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {canDelete && (
                                    <div className="relative">
                                        <button
                                            className="p-1 hover:bg-gray-200 rounded"
                                            onClick={() =>
                                                setOpenMenuId(
                                                    openMenuId === c.id ? null : c.id
                                                )
                                            }
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>

                                        {openMenuId === c.id && (
                                            <div className="absolute right-0 mt-1 bg-white border rounded shadow-lg z-10">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(c.id, c.authorId)
                                                    }
                                                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
