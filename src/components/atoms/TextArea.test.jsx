import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from './TextArea';

test('renderiza correctamente el placeholder', () => {
    render(
        <TextArea
            name="comentario"
            value=""
            onChange={() => {}}
            placeholder="Escribe algo aquí"
        />
    );

    expect(
        screen.getByPlaceholderText(/escribe algo aquí/i)
    ).toBeInTheDocument();
});

test('llama a onChange al escribir en el textarea', () => {
    const handleChange = jest.fn();

    render(
        <TextArea
            name="mensaje"
            value=""
            onChange={handleChange}
            placeholder="Tu mensaje"
        />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Esto es un comentario' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
});
