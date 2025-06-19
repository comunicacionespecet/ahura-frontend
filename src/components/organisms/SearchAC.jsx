import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';

const SearchAC = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [tipoAC, setTipoAC] = useState('');
    const [year, setYear] = useState('');
    const [advanced, setAdvanced] = useState('');

    //Resultados quemados, deben ser los de la API
    const results = [
        {
            id: 'AC001',
            titulo: 'Manual de recolección',
            tipo: 'Manual',
            año: '2023',
            autor: 'Ana López',
            visibilidad: 'Público',
        },
        {
            id: 'AC002',
            titulo: 'Software de análisis',
            tipo: 'Software',
            año: '2022',
            autor: 'Carlos Pérez',
            visibilidad: 'Privado',
        },
    ];

    const handleSearch = () => {
        // Implementar lógica real de búsqueda
        console.log({ query, tipoAC, year, advanced });
    };

    const handleView = (id) => {
        navigate(`/ver/${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FBFBFB] p-4 rounded">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-4">Buscar activo</h4>

                <FormField label="Buscar por título" htmlFor="query">
                    <Input
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar por título"
                    />
                </FormField>

                <FormField label="Tipo de activo" htmlFor="tipoAC">
                    <select
                        id="tipoAC"
                        value={tipoAC}
                        onChange={(e) => setTipoAC(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Seleccione...</option>
                        <option value="Manual">Manual</option>
                        <option value="Software">Software</option>
                        <option value="Artículo">Artículo</option>
                    </select>
                </FormField>

                <FormField label="Año" htmlFor="year">
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Seleccione...</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </FormField>

                <div className="mt-4 flex justify-end">
                    <Button text="Buscar" type="success" onClick={handleSearch} />
                </div>

                <FormField label="Búsqueda avanzada" htmlFor="advanced">
                    <Input
                        name="advanced"
                        value={advanced}
                        onChange={(e) => setAdvanced(e.target.value)}
                        placeholder="Palabras clave"
                    />
                </FormField>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-4">Resultados</h4>
                {results.map((item) => (
                    <div key={item.id} className="border-b py-3">
                        <p className="font-medium">{item.titulo}</p>
                        <p className="text-sm text-gray-600">
                            Tipo: {item.tipo} | Año: {item.año} | Autor: {item.autor} |{' '}
                            {item.visibilidad}
                        </p>
                        <button
                            className="text-blue-600 text-sm underline mt-1"
                            onClick={() => handleView(item.id)}
                        >
                            Ver más
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchAC;
