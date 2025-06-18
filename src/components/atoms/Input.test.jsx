import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('renderiza el input con el placeholder y valor correctos', () => {
  render(
    <Input
      name="email"
      value="test@example.com"
      onChange={() => {}}
      placeholder="Ingresa tu correo"
    />
  );

  expect(screen.getByPlaceholderText(/ingresa tu correo/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/test@example.com/i)).toBeInTheDocument();
});

test('llama a onChange al escribir en el input', () => {
  const handleChange = jest.fn();

  render(
    <Input
      name="usuario"
      value=""
      onChange={handleChange}
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'mateo' } });

  expect(handleChange).toHaveBeenCalledTimes(1);
});
