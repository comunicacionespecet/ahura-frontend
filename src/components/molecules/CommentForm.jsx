import { useState } from 'react';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';

export default function CommentForm({ onSubmit }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') return;
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
            <Button text="Enviar" htmlType="submit" type="primary" />
        </form>
    );
}
