import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageUpload from './ImagenUpload';

test('muestra el texto "Subir imagen"', () => {
    render(<ImageUpload onChange={() => {}} />);
    expect(screen.getByText(/subir imagen/i)).toBeInTheDocument();
});

test('dispara onChange al seleccionar un archivo', () => {
    const handleChange = jest.fn();
    render(<ImageUpload onChange={handleChange} />);

    const input = screen.getByLabelText(/subir imagen/i);
    const file = new File(['imagen'], 'zancudo.jpg', { type: 'image/jpeg' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalledTimes(1);
});
