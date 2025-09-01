import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterAC from './RegisterAC';

beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
});

describe('RegisterAC', () => {
    test('renderiza campos obligatorios', () => {
        render(<RegisterAC />);

        expect(screen.getByLabelText(/Título \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Descripción \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/ID \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Autor \*/i)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/Tipo de conocimiento \*/i)
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/Formato \*/i)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/Estado del Activo de conocimiento \*/i)
        ).toBeInTheDocument();
    });

    test('permite llenar campos e imprimir los datos enviados', async () => {
        render(<RegisterAC />);

        fireEvent.change(screen.getByLabelText(/Título \*/i), {
            target: { value: 'Nuevo activo' },
        });
        fireEvent.change(screen.getByLabelText(/ID \*/i), {
            target: { value: 'AC001' },
        });
        fireEvent.change(screen.getByLabelText(/Autor \*/i), {
            target: { value: 'Juan Pérez' },
        });
        fireEvent.change(screen.getByLabelText(/Descripción \*/i), {
            target: { value: 'Una descripción de prueba' },
        });
        fireEvent.change(screen.getByLabelText(/Tipo de conocimiento \*/i), {
            target: { value: 'Proyectos' },
        });
        fireEvent.change(screen.getByLabelText(/Formato \*/i), {
            target: { value: 'PDF' },
        });
        fireEvent.change(
            screen.getByLabelText(/Estado del Activo de conocimiento \*/i),
            {
                target: { value: 'Finalizado' },
            }
        );

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        fireEvent.click(screen.getByText(/Registrar/i));

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith(
                'Datos enviados:',
                expect.objectContaining({
                    id: 'AC001',
                    titulo: 'Nuevo activo',
                    descripcion: 'Una descripción de prueba',
                    autor: 'Juan Pérez',
                    tipoConocimiento: 'Proyectos',
                    formato: 'PDF',
                    estadoAC: 'Finalizado',
                })
            );
        });

        logSpy.mockRestore();
    });

    test('cambia y limpia la imagen cargada', () => {
        render(<RegisterAC />);

        const file = new File(['contenido'], 'imagen.jpg', {
            type: 'image/jpeg',
        });
        const input = screen.getByLabelText(/imagen del activo/i);

        fireEvent.change(input, { target: { files: [file] } });

        expect(screen.getByAltText(/Vista previa/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/Cambiar imagen/i));
        expect(screen.queryByAltText(/Vista previa/i)).not.toBeInTheDocument();
    });
});
