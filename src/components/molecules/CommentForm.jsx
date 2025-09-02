import { useState } from 'react';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';

export default function CommentForm({ onSubmit, loading }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '' || loading) return;

        onSubmit(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <TextArea
                name="comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe un comentario..."
            />
            <Button
                text={loading ? 'Enviando...' : 'Enviar'}
                htmlType="submit"
                type="primary"
                disabled={loading}
            />
        </form>
    );
}

