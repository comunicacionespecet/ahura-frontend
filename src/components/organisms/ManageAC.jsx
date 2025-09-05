import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';
import ImageUpload from '../molecules/ImagenUpload';
import FileUpload from '../molecules/FileUpload';
import { useAuth } from '../../context/AuthContext';
import { useCreateAC, useUpdateAC, useACById, useDeleteAC, useACs, useFilteredACs } from '../../hooks/useACs';
import { useUpload } from '../../hooks/useUpload';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';
import { useCatalogs } from '../../hooks/useCatalogs';


const accesibilidad = ['Se puede acceder', 'No se puede acceder'];
const visibilidad = ['Público', 'Privado'];

const ManageAC = () => {
    const { id } = useParams();
    const { isAdmin } = useAuth();
    const { create } = useCreateAC();
    const { update } = useUpdateAC();
    const { catalogs } = useCatalogs();
    const { ac } = useACById(id);
    const { acs, loading, error } = useACs();
    const { remove } = useDeleteAC();
    const { upload } = useUpload();
    const navigate = useNavigate();

    const [imagen, setImagen] = useState(null);
    const [keywordError, setKeywordError] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [tabErrors, setTabErrors] = useState([false, false, false, false]);
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        fecha: '',
        tipoActivo: '',
        tipoConocimiento: '',
        formato: '',
        palabrasClave: '',
        origen: '',
        ubicacion: '',
        accesible: '',
        clasificacion: '',
        autor: '',
        visibilidad: '',
        propietarioAC: '',
        estadoAC: '',
        fileUri: '',
        relatedIds: [],
        pecetKnowledge: '',
        centralicedRepositories: '',
        copyright: '',
        patents: '',
        tradeSecrets: '',
        industrialDesigns: '',
        brands: '',
        industrialIntellectualProperty: '',
        ownerId: '',
        criticality: '',
        viewCount: 0,
        downloadCount: 0,
        commentCount: 0,
    });

    useEffect(() => {
        if (ac && isAdmin) {
            setFormData({
                id: ac.id,
                titulo: ac.title,
                descripcion: ac.description,
                fecha: ac.publishDate ? ac.publishDate.split('T')[0] : '',
                tipoConocimiento: ac.knowledgeType,
                tipoActivo: ac.activeKnowledgeType,
                formato: ac.format,
                palabrasClave: ac.keywords?.join(', '),
                origen: ac.origin,
                ubicacion: ac.availability?.location,
                accesible: ac.availability?.accessibility
                    ? 'Se puede acceder'
                    : 'No se puede acceder',
                clasificacion: ac.classificationLevel?.level,
                autor: ac.responsibleOwner || '',
                visibilidad: ac.confidentiality ? 'Privado' : 'Público',
                propietarioAC: ac.responsibleOwner,
                estadoAC: ac.status,
                fileUri: ac.fileUri,
                relatedIds: ac.relatedIds?.join(', '),
                pecetKnowledge: ac.howIsItStored?.pecetKnowledge,
                centralicedRepositories:
                    ac.howIsItStored?.centralicedRepositories,
                copyright: ac.legalRegulations?.copyright,
                patents: ac.legalRegulations?.patents,
                tradeSecrets: ac.legalRegulations?.tradeSecrets,
                industrialDesigns: ac.legalRegulations?.industrialDesigns,
                brands: ac.legalRegulations?.brands,
                industrialIntellectualProperty:
                    ac.legalRegulations?.industrialIntellectualProperty,
                ownerId: ac.ownerId,
                criticality: ac.criticality,
                viewCount: ac.viewCount || 0,
                downloadCount: ac.downloadCount || 0,
                commentCount: ac.commentCount || 0,
            });
            setPreviewUrl(ac.image);
        }
    }, [ac, isAdmin]);


    //INTENTO
    const [searchTerm, setSearchTerm] = useState("");

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = acs.filter((a) => {
        const txt = `${a.id} ${a.title} ${a.id}`;
        return txt.toLowerCase().includes(search.toLowerCase());
    });

    const filteredAssets = acs.filter(
        (asset) =>
            asset.facetado?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleAddRelated = (asset) => {
        if (!formData.relatedIds.includes(asset.id)) {
            setFormData((prev) => ({
                ...prev,
                relatedIds: [...prev.relatedIds, asset.id], // solo IDs 👈
            }));
        }
    };

    const handleRemoveRelated = (id) => {
        setFormData((prev) => ({
            ...prev,
            relatedIds: prev.relatedIds.filter((a) => a !== id),
        }));
    };
    //FIN INTENTO


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleKeywordsChange = (e) => {
        const value = e.target.value;
        if (
            /\s{2,}/.test(value) ||
            /\s+[A-Za-z]/.test(value.replace(/.*,\s*/, ''))
        ) {
            setKeywordError('Debes separar las palabras con comas (,)');
        } else {
            setKeywordError('');
        }
        setFormData({ ...formData, palabrasClave: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
    };

    const normalize = (str = '') =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

    const validateTabs = () => {
        const errors = [false, false, false, false, false];

        if (
            !formData.id ||
            !formData.titulo ||
            !formData.autor ||
            !formData.relatedIds ||
            !formData.clasificacion ||
            !formData.criticality
        )
            errors[0] = true;

        if (
            !formData.tipoActivo ||
            !formData.estadoAC ||
            !formData.tipoConocimiento ||
            !formData.formato ||
            !formData.origen ||
            !formData.visibilidad
        ) {
            errors[1] = true;
        }

        //if (!formData.criticality) errors[2] = true;

        if (!formData.descripcion) errors[4] = true;

        setTabErrors(errors);
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateTabs();
        const hasErrors = errors.some((e) => e);

        if (hasErrors) {
            const firstErrorTab = errors.findIndex((e) => e);
            setActiveTab(firstErrorTab);
            return;
        }

        let uploadImageName = imagen ? await upload(imagen) : '';
        let uploadFileName = archivo ? await upload(archivo) : '';

        const acData = {
            id: formData.id,
            title: formData.titulo,
            publishDate: formData.fecha
                ? new Date(formData.fecha).toISOString()
                : null,
            knowledgeType: formData.tipoConocimiento,
            description: formData.descripcion,
            image: uploadImageName || formData.image,
            activeKnowledgeType: formData.tipoActivo,
            format: formData.formato,
            fileUri: uploadFileName || formData.fileUri,
            relatedIds: formData.relatedIds
                ? formData.relatedIds.split(',').map((i) => i.trim())
                : [],
            keywords: formData.palabrasClave
                ? formData.palabrasClave
                    .split(',')
                    .map((k) => k.trim())
                    .filter((k) => k.length > 0)
                : [],
            availability: {
                accessibility: formData.accesible === 'Se puede acceder',
                location: formData.ubicacion || ' ',
            },
            classificationLevel: { level: formData.clasificacion || '' },
            howIsItStored: {
                pecetKnowledge: formData.pecetKnowledge || '',
                centralicedRepositories: formData.centralicedRepositories || '',
            },
            legalRegulations: {
                copyright: formData.copyright || '',
                patents: formData.patents || '',
                tradeSecrets: formData.tradeSecrets || '',
                industrialDesigns: formData.industrialDesigns || '',
                brands: formData.brands || '',
                industrialIntellectualProperty:
                    formData.industrialIntellectualProperty || '',
            },
            ownerId: formData.ownerId || 'Prueba',
            responsibleOwner: formData.autor || formData.propietarioAC || '',
            confidentiality: formData.visibilidad === 'Privado',
            criticality: formData.criticality || '',
            status: formData.estadoAC || '',
            origin: formData.origen || '',
            viewCount: ac?.viewCount || 0,
            downloadCount: ac?.downloadCount || 0,
            commentCount: ac?.commentCount || 0,
        };

        try {
            if (id && isAdmin) {
                await update(id, acData);
                showSuccess('Activo actualizado correctamente');
                navigate('/buscar');
            } else {
                await create(acData);
                showSuccess('Activo creado correctamente');
                navigate('/');
            }
        } catch (error) {
            if (error.message.includes('E11000'))
                showError('El facetado ya existe en otro activo');
            else showError('Hubo un error al guardar el activo');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = await showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer'
        );
        if (!confirmDelete) return;
        try {
            await remove(id);
            showSuccess('Activo eliminado correctamente');
            navigate('/buscar');
        } catch (error) {
            alert('Ocurrió un error al intentar eliminar el activo');
        }
    };

    const tabs = [
        'Información básica',
        'Tipificación',
        'Regulaciones legales',
        'Activos relacionados',
        'Contenido del activo',
    ];

    return (
        <div className="bg-[#FBFBFB] min-h-screen p-10">
            <div className="bg-white px-6 rounded shadow w-[95%] max-w-screen mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#70205B] mb-4 text-center py-8">
                    {id && isAdmin
                        ? 'Editar activo de conocimiento'
                        : 'Registro de activo'}
                </h2>

                <div className="flex justify-center mb-8 gap-2">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(idx)}
                            className={`px-4 py-2 rounded-t relative ${activeTab === idx ? 'bg-[#8DC63F] text-white' : 'bg-gray-200 text-[#026937]'}`}
                        >
                            {tab}
                            {tabErrors[idx] && (
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6"
                >
                    {activeTab === 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Facetado *" htmlFor="id">
                                <Input
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: FAC-2025-01"
                                />
                            </FormField>

                            <FormField label="Título/Nombre*" htmlFor="titulo">
                                <Input
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: Manual de Gestión de Calidad"
                                />
                            </FormField>

                            <FormField
                                label="Fecha de publicación"
                                htmlFor="fecha"
                            >
                                <Input
                                    name="fecha"
                                    type="date"
                                    value={formData.fecha}
                                    required
                                    onChange={handleChange}
                                    title="Ej: 2025-08-31"
                                />
                                <small className="text-gray-500">
                                    Fecha en la que Manual de Gestión de Calidad
                                    fue publicado
                                </small>
                            </FormField>

                            <FormField label="Autores*" htmlFor="autor">
                                <Input
                                    name="autor"
                                    value={formData.autor}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: Santiago Martínez, Valetina Gómez, Juan Camilo, otros"
                                />
                            </FormField>



                            <FormField
                                label="Nivel de clasificación*"
                                htmlFor="clasificacion"
                            >
                                <select
                                    id="clasificacion"
                                    name="clasificacion"
                                    value={formData.clasificacion}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: Importancia del activo para el PECET
                                    </option>
                                    {catalogs?.classificationLevelLevelEnum?.map(
                                        (item) => (
                                            <option
                                                key={item.key}
                                                value={item.key}
                                            >
                                                {item.key}
                                            </option>
                                        )
                                    )}
                                </select>
                            </FormField>

                            <FormField
                                label="Nivel de Criticidad*"
                                htmlFor="criticality"
                            >
                                <select
                                    id="criticality"
                                    name="criticality"
                                    value={formData.criticality}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: Confidencialidad del activo para la
                                        organización
                                    </option>
                                    {catalogs?.criticalityEnum?.map((item) => (
                                        <option key={item.key} value={item.key}>
                                            {item.key}
                                        </option>
                                    ))}
                                </select>
                            </FormField>
                        </div>
                    )}

                    {activeTab === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                label="Tipo de conocimiento*"
                                htmlFor="tipoActivo"
                            >
                                <select
                                    id="tipoActivo"
                                    name="tipoActivo"
                                    value={formData.tipoActivo}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: Protocolos, Tablas, Manuales
                                    </option>
                                    {catalogs?.activeKnowledgeTypeEnum?.map(
                                        (item) => (
                                            <option
                                                key={item.key}
                                                value={item.key}
                                                title={item.descripcion}
                                            >
                                                {item.key}
                                            </option>
                                        )
                                    )}
                                </select>
                            </FormField>

                            <FormField
                                label="Tipo de activo*"
                                htmlFor="tipoConocimiento"
                            >
                                <select
                                    id="tipoConocimiento"
                                    name="tipoConocimiento"
                                    value={formData.tipoConocimiento}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: Documento, Video, Imagen
                                    </option>
                                    <option value="Ninguno">Ninguno</option>
                                    {catalogs?.knowledgeTypeEnum?.map(
                                        (item) => (
                                            <option
                                                key={item.key}
                                                value={item.key}
                                                title={item.descripcion}
                                            >
                                                {item.key}
                                            </option>
                                        )
                                    )}
                                </select>
                            </FormField>

                            {normalize(formData.tipoConocimiento).includes(
                                'fisico'
                            ) && (
                                    <FormField
                                        label="Asequibilidad*"
                                        htmlFor="accesible"
                                    >
                                        <select
                                            id="accesible"
                                            name="accesible"
                                            value={formData.accesible}
                                            onChange={handleChange}
                                            className="border border-[#8DC63F] p-2 rounded w-full"
                                        >
                                            <option value="" disabled>
                                                Ej: Se puede acceder o no se puede
                                                acceder físicamente al activo
                                            </option>
                                            {accesibilidad.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>
                                )}

                            <FormField
                                label="Visibilidad*"
                                htmlFor="visibilidad"
                            >
                                <select
                                    id="visibilidad"
                                    name="visibilidad"
                                    value={formData.visibilidad}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: Público o Privado
                                    </option>
                                    {visibilidad.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </FormField>

                            <FormField
                                label="Estado del activo*"
                                htmlFor="estadoAC"
                            >
                                <select
                                    id="estadoAC"
                                    name="estadoAC"
                                    value={formData.estadoAC}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: En curso, Suspendido, otros
                                    </option>
                                    {catalogs?.assetStatusEnum?.map((item) => (
                                        <option key={item.key} value={item.key}>
                                            {item.key}
                                        </option>
                                    ))}
                                </select>
                            </FormField>

                            <FormField label="Origen*" htmlFor="origen">
                                <select
                                    id="origen"
                                    name="origen"
                                    value={formData.origen}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: Interno, Externo
                                    </option>
                                    {catalogs?.originEnum?.map((item) => (
                                        <option key={item.key} value={item.key}>
                                            {item.key}
                                        </option>
                                    ))}
                                </select>
                            </FormField>

                            <FormField label="Formato *" htmlFor="formato">
                                <select
                                    id="formato"
                                    name="formato"
                                    value={formData.formato}
                                    onChange={handleChange}
                                    required
                                    className="border border-[#8DC63F] p-2 rounded w-full"
                                >
                                    <option value="" disabled>
                                        Ej: PDF, Word, Excel
                                    </option>
                                    {catalogs?.formatEnum?.map((item) => (
                                        <option key={item.key} value={item.key}>
                                            {item.key}
                                        </option>
                                    ))}
                                </select>
                            </FormField>

                            <FormField
                                label="Palabras clave"
                                htmlFor="palabrasClave"
                            >
                                <Input
                                    name="palabrasClave"
                                    value={formData.palabrasClave}
                                    onChange={handleKeywordsChange}
                                    placeholder="Ej: calidad, procedimientos, control, enfermedad"
                                />
                                {keywordError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {keywordError}
                                    </p>
                                )}
                            </FormField>

                            {normalize(formData.tipoConocimiento).includes(
                                'fisico'
                            ) && (
                                    <FormField
                                        label="Ubicación Física del activo*"
                                        htmlFor="ubicacion"
                                    >
                                        <Input
                                            name="ubicacion"
                                            value={formData.ubicacion}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ej: Archivo central, Piso 3, Estante B"
                                        />
                                    </FormField>
                                )}
                        </div>
                    )}

                    {activeTab === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                label="Propietario del Activo de conocimiento"
                                htmlFor="propietarioAC"
                            >
                                <Input
                                    name="propietarioAC"
                                    value={formData.propietarioAC}
                                    onChange={handleChange}
                                    placeholder="Ej: Universidad de Antioquia"
                                />
                            </FormField>

                            <FormField
                                label="Repositorio"
                                htmlFor="pecetKnowledge"
                            >
                                <Input
                                    name="pecetKnowledge"
                                    value={formData.pecetKnowledge}
                                    onChange={handleChange}
                                    placeholder="Ej: OneDrive PECET"
                                />
                            </FormField>

                            <FormField label="Copyright" htmlFor="copyright">
                                <Input
                                    name="copyright"
                                    value={formData.copyright}
                                    onChange={handleChange}
                                    placeholder="Ej: © 2024 Universidad de Antioquia"
                                />
                            </FormField>

                            <FormField
                                label="Patentes del activo de conocimiento"
                                htmlFor="patents"
                            >
                                <Input
                                    name="patents"
                                    value={formData.patents}
                                    onChange={handleChange}
                                    placeholder="Ej: Patente N° 123456 - Invima"
                                />
                            </FormField>

                            <FormField
                                label="Secretos comerciales"
                                htmlFor="tradeSecrets"
                            >
                                <Input
                                    name="tradeSecrets"
                                    value={formData.tradeSecrets}
                                    onChange={handleChange}
                                    placeholder="Ej: Fórmula de compuesto activo"
                                />
                            </FormField>

                            <FormField
                                label="Marca registrada"
                                htmlFor="brands"
                            >
                                <Input
                                    name="brands"
                                    value={formData.brands}
                                    onChange={handleChange}
                                    placeholder="Ej: PECET®"
                                />
                            </FormField>

                            <FormField
                                label="Propiedad intelectual"
                                htmlFor="industrialIntellectualProperty"
                            >
                                <Input
                                    name="industrialIntellectualProperty"
                                    value={
                                        formData.industrialIntellectualProperty
                                    }
                                    onChange={handleChange}
                                    placeholder="Ej: Registro ISBN 978-958-5555-00-1"
                                />
                            </FormField>
                        </div>
                    )}

                    {activeTab === 4 && (
                        <div className="grid grid-cols-12 gap-6 items-start">
                            <div className="col-span-12 md:col-span-3">
                                <FormField
                                    label="Imagen del activo"
                                    htmlFor="imagen"
                                >
                                    {previewUrl ? (
                                        <div className="flex flex-col items-start">
                                            <img
                                                src={previewUrl}
                                                alt="Vista previa"
                                                className="mb-2 w-32 h-32 object-cover rounded border"
                                            />
                                            <Button
                                                type="Primary"
                                                text="Cambiar imagen"
                                                onClick={() => {
                                                    setPreviewUrl(null);
                                                    setImagen(null);
                                                }}
                                                className="text-sm text-blue-600 underline hover:text-blue-800"
                                            />
                                        </div>
                                    ) : (
                                        <ImageUpload
                                            onChange={handleImageChange}
                                        />
                                    )}
                                    <small className="text-gray-500">
                                        Ej: Diagrama_Proceso.jpg
                                    </small>
                                </FormField>
                            </div>

                            <div className="col-span-12 md:col-span-3">
                                <FormField
                                    label="Archivo del activo"
                                    htmlFor="archivo"
                                >
                                    {archivo ? (
                                        <div className="flex flex-col items-start">
                                            <div className="mb-2 w-32 h-32 flex items-center justify-center border rounded p-2 overflow-hidden">
                                                <span className="text-gray-700 text-sm break-words text-center">
                                                    {archivo.name}
                                                </span>
                                            </div>
                                            <Button
                                                type="Primary"
                                                text="Cambiar archivo"
                                                onClick={() => setArchivo(null)}
                                                className="text-sm text-blue-600 underline hover:text-blue-800"
                                            />
                                        </div>
                                    ) : (
                                        <FileUpload
                                            name="archivo"
                                            onChange={handleArchivoChange}
                                        />
                                    )}
                                    <small className="text-gray-500">
                                        Ej: Procedimientos_2025.pdf
                                    </small>
                                </FormField>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <FormField
                                    label="Descripción *"
                                    htmlFor="descripcion"
                                >
                                    <TextArea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        required
                                        rows={8}
                                        placeholder="Ej: Procedimientos internos del departamento de ventas"
                                    />
                                </FormField>
                            </div>
                        </div>
                    )}

                    {activeTab === 3 && (
                        <div className="grid grid-cols-12 gap-6 items-start">
                            <div className="col-span-12 md:col-span-6">
                                <FormField label="Relacionar otros activos" htmlFor="relatedIds">
                                    <div className="relative">
                                        <Input
                                            name="relatedIds"
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                setOpen(true);
                                            }}
                                            onFocus={() => setOpen(true)}
                                            placeholder="Escribe para buscar..."
                                        />

                                        {open && (
                                            <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-56 overflow-auto">
                                                {filtered.length > 0 ? (
                                                    filtered.map((a) => (
                                                        <li
                                                            key={a.id}
                                                            onClick={() => {
                                                                onSelect(a);
                                                                setSearch(`${a.facetado} - ${a.title ?? a.titulo ?? a.id}`);
                                                                setOpen(false);
                                                            }}
                                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                        >
                                                            {a.id} - {a.title}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="px-3 py-2 text-gray-500">No hay resultados</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </FormField>

                            </div>

                            {/* Lista de seleccionados */}
                            <div className="col-span-12 md:col-span-6">
                                <FormField label="Activos seleccionados" htmlFor="selectedAssets">
                                    {loading ? (
                                        <LoadingScreen />
                                    ) : (
                                        acs.map((item) => (
                                            <div key={item.id} className="border-b py-3">
                                                <p className="font-bold text-[#026937]">
                                                    {item.id} - {item.title}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </FormField>
                            </div>
                        </div>
                    )}

                    <div className="md:col-span-2 flex justify-center py-10 gap-4">
                        {id && isAdmin ? (
                            <>
                                <Button
                                    text="Guardar cambios"
                                    type="primary"
                                    htmlType="submit"
                                />
                                <Button
                                    text="Eliminar"
                                    type="secondary"
                                    htmlType="button"
                                    onClick={handleDelete}
                                />
                                <Button
                                    text="Vista previa"
                                    type="admin"
                                    htmlType="button"
                                    onClick={() => navigate(`/ver/${id}`)}
                                />
                            </>
                        ) : (
                            <Button
                                className="text-2xl"
                                text="Registrar"
                                type="primary"
                                htmlType="submit"
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageAC;
