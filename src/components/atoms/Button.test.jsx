import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renderiza el texto del botón', () => {
    render(<Button text="Click aquí" />);
    expect(screen.getByText(/click aquí/i)).toBeInTheDocument();
});
