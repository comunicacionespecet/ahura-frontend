import CommentForm from '../molecules/CommentForm';

export default function CommentsSection() {
    const mockComments = [
        {
            id: 1,
            author: 'Juan Pérez',
            text: 'Muy buen aporte, gracias!',
            createdAt: '2025-08-20T10:30:00Z',
        },
        {
            id: 2,
            author: 'María Gómez',
            text: 'Tengo una duda con la implementación...',
            createdAt: '2025-08-21T15:45:00Z',
        },
    ];

    const handleAddComment = (text) => {
        console.log('Nuevo comentario:', text);
    };

    return (
        <div className="p-4 border rounded-lg space-y-4 bg-white shadow-md">
            <h2 className="font-semibold text-lg">Comentarios</h2>

            <CommentForm onSubmit={handleAddComment} />

            <div className="space-y-3">
                {mockComments.map((c) => (
                    <div
                        key={c.id}
                        className="border p-2 rounded-md bg-gray-50 text-sm"
                    >
                        <p className="font-semibold">{c.author}</p>
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
