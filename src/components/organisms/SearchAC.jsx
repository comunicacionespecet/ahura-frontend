import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useFilteredACs } from '../../hooks/useACs';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../../utils/LoadingScreen';
import { useCatalogs } from '../../hooks/useCatalogs';

const SearchAC = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    const [titulo, setTitulo] = useState('');
    const [tipoActivo, setTipoActivo] = useState('');
    const [palabrasClave, setPalabrasClave] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [estatus, setEstatus] = useState('');
    const [formato, setFormato] = useState('');
    //FALTA COLOCAR EL HOWSTORED
    const { catalogs } = useCatalogs();

    const [filters, setFilters] = useState({});

    const { acs, loading } = useFilteredACs(filters);

    const handleSearch = () => {
        const newFilters = {};
        if (titulo) newFilters.title = titulo;
        if (tipoActivo) newFilters.knowledgeType = tipoActivo;
        if (palabrasClave) newFilters.keywords = palabrasClave;
        if (clasificacion) newFilters.classificationLevelLevel = clasificacion;
        if (estatus) newFilters.status = estatus;
        if (formato) newFilters.format = formato;
        setFilters(newFilters);
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
            {/* Panel de búsqueda */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-4xl font-bold mb-4">Buscar activo</h4>

                <FormField label="Título" htmlFor="titulo">
                    <Input
                        name="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Buscar por título"
                    />
                </FormField>

                <FormField label="Clasificacion" htmlFor="clasificacion">
                    <select
                        id="clasificacion"
                        value={clasificacion}
                        onChange={(e) => setClasificacion(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B]"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.classificationLevelLevelEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>
                <FormField label="Formato" htmlFor="formato">
                    <select
                        id="formato"
                        value={formato}
                        onChange={(e) => setFormato(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B]"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.formatEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>
                <FormField label="Tipo de activo" htmlFor="tipoActivo">
                    <select
                        id="tipoActivo"
                        value={tipoActivo}
                        onChange={(e) => setTipoActivo(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B]"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.knowledgeTypeEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Estatus" htmlFor="estatus">
                    <select
                        id="estatus"
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B]"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.assetStatusEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Palabras clave" htmlFor="palabrasClave">
                    <Input
                        name="palabrasClave"
                        value={palabrasClave}
                        onChange={(e) => setPalabrasClave(e.target.value)}
                        placeholder="Ej: innovación, IA..."
                    />
                </FormField>

                <div className="mt-4 flex justify-end">
                    <Button
                        text="Buscar"
                        type="success"
                        onClick={handleSearch}
                    />
                </div>
            </div>

            {/* Panel de resultados */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-4xl font-bold mb-4 text-[#70205B]">
                    Resultados
                </h4>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    acs.map((item) => (
                        <div key={item.id} className="border-b py-3">
                            <p className="font-bold text-[#026937]">
                                {item.title}
                            </p>
                            <p className="text-sm">
                                <span className="text-[#7E7373] font-bold">
                                    Tipo:{' '}
                                </span>
                                <span className="text-black font-bold">
                                    {item.activeKnowledgeType}
                                </span>
                                <span className="text-[#7E7373] font-bold">
                                    {' '}
                                    | Año:{' '}
                                </span>
                                <span className="text-black font-bold">
                                    {new Date(item.publishDate).getFullYear()}
                                </span>
                                <span className="text-[#7E7373] font-bold">
                                    {' '}
                                    | Autor:{' '}
                                </span>
                                <span className="text-black font-bold">
                                    {item.responsibleOwner}
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
