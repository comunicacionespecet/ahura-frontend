import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useACs } from '../../hooks/useACs';
import { useAuth } from '../../context/AuthContext';

const SearchAC = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [query, setQuery] = useState('');
    const [tipoAC, setTipoAC] = useState('');
    const [year, setYear] = useState('');
    const [advanced, setAdvanced] = useState('');

    const { acs, loading } = useACs();

    const handleSearch = () => {
        console.log({ query, tipoAC, year, advanced });
    };

    const handleView = (id) => {
        if (isAdmin) {
            navigate(`/registrar/${id}`);
        } else {
            navigate(`/ver/${id}`);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FBFBFB] p-4 rounded">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-4xl font-bold mb-4">Buscar activo</h4>

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
                        className="w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B]"
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
                        className="w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B]"
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
                <h4 className="text-4xl font-bold mb-4 text-[#70205B]">Resultados</h4>
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    acs.map((item) => (
                        <div key={item.id} className="border-b py-3">
                            <p className="font-bold text-[#026937]">{item.title}</p>
                            <p className="text-sm">
                                <span className="text-[#7E7373] font-bold">Tipo: </span>
                                <span className="text-black font-bold">{item.knowledgeType}</span>
                                <span className="text-[#7E7373] font-bold"> | Año: </span>
                                <span className="text-black font-bold">
                                    {new Date(item.publishDate).getFullYear()}
                                </span>
                                <span className="text-[#7E7373] font-bold"> | Autor: </span>
                                <span className="text-black font-bold">
                                    {item.responsibleOwner}
                                </span>
                                <span className="text-[#7E7373] font-bold"> | Privacidad: </span>
                                <span>
                                    {item.availability.accessibility ? 'Público' : 'Privado'}
                                </span>
                            </p>
                            <button
                                className="text-[#137598] text-sm underline mt-1"
                                onClick={() => handleView(item.id)}
                            >
                                Ver más
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchAC;
