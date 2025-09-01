import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainFeatures from './MainFeatures';
import RegisterAC from './RegisterAC';
import SearchAC from './SearchAC';

describe('MainFeatures con navegación', () => {
    test('muestra el menú principal al inicio', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<MainFeatures />} />
                </Routes>
            </MemoryRouter>
        );

        expect(
            screen.getByText(/Registrar activos de conocimiento/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Buscar activos de conocimiento/i)
        ).toBeInTheDocument();
    });

    test('redirige y muestra el formulario al hacer clic en "Registrar activos de conocimiento"', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<MainFeatures />} />
                    <Route path="/registrar" element={<RegisterAC />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Registrar activos de conocimiento/i));
        expect(screen.getByText(/Registro de activo/i)).toBeInTheDocument();
    });

    test('redirige y muestra la vista de búsqueda al hacer clic en "Buscar activos de conocimiento"', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<MainFeatures />} />
                    <Route path="/buscar" element={<SearchAC />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Buscar activos de conocimiento/i));
        expect(screen.getByText(/Buscar activo/i)).toBeInTheDocument();
    });
});
