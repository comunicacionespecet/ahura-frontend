import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from './FormField';

test('muestra el label y el campo hijo correctamente', () => {
    render(
        <FormField label="Nombre completo" htmlFor="nombre">
            <input id="nombre" name="nombre" />
        </FormField>
    );

    // Verifica que el label esté presente
    const label = screen.getByText(/nombre completo/i);
    expect(label).toBeInTheDocument();

    // Verifica que esté asociado correctamente con el input
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'nombre');
});
