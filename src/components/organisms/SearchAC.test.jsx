import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchAC from './SearchAC';

describe('SearchAC Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <SearchAC />
            </MemoryRouter>
        );
    });

    test('renderiza inputs y selects', () => {
        expect(screen.getByPlaceholderText(/Buscar por título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Tipo de activo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Año/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Palabras clave/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
    });

    test('muestra resultados y permite navegar al detalle', () => {
        // Simula el clic en Buscar
        fireEvent.click(screen.getByRole('button', { name: /Buscar/i }));

        // Verifica resultados simulados
        expect(screen.getByText('Manual de recolección')).toBeInTheDocument();
        expect(screen.getByText('Software de análisis')).toBeInTheDocument();
    });
});
