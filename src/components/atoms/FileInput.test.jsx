import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileInput from './FileInput';

test('renderiza el input tipo file', () => {
    render(<FileInput name="imagen" onChange={() => {}} />);
    const input = screen.getByTestId('file-input');
    expect(input).toBeInTheDocument();
});

test('llama a onChange cuando se selecciona un archivo', () => {
    const handleChange = jest.fn();
    render(<FileInput name="archivo" onChange={handleChange} />);
    const input = screen.getByTestId('file-input');

    const file = new File(['contenido'], 'foto.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalledTimes(1);
});
