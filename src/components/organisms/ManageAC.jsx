import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormField from '../molecules/FormField';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';
import ImageUpload from '../molecules/ImagenUpload';
import FileUpload from '../molecules/FileUpload';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateAC, useUpdateAC, useACById, useDeleteAC } from '../../hooks/useACs';
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
    const { catalogs, loading, error } = useCatalogs();
    const { ac } = useACById(id);
    const { remove } = useDeleteAC();
    const { upload } = useUpload();
    const navigate = useNavigate();
    const [imagen, setImagen] = useState(null);
    const [archivo, setArchivo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
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
        relatedIds: '',
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
                id: ac.id || '',
                titulo: ac.title || '',
                descripcion: ac.description || '',
                fecha: ac.publishDate ? ac.publishDate.split('T')[0] : '',
                tipoConocimiento: ac.knowledgeType || '',
                tipoActivo: ac.activeKnowledgeType || '',
                formato: ac.format || '',
                palabrasClave: ac.keywords?.join(', ') || '',
                origen: ac.origin || '',
                ubicacion: ac.availability?.location || '',
                accesible: ac.availability?.accessibility
                    ? 'Se puede acceder'
                    : 'No se puede acceder',
                clasificacion: ac.classificationLevel?.level || '',
                autor: ac.responsibleOwner || '',
                visibilidad: ac.confidentiality ? 'Privado' : 'Público',
                propietarioAC: ac.responsibleOwner || '',
                estadoAC: ac.status || '',
                fileUri: ac.fileUri || '',
                relatedIds: ac.relatedIds?.join(', ') || '',
                pecetKnowledge: ac.howIsItStored?.pecetKnowledge || '',
                centralicedRepositories: ac.howIsItStored?.centralicedRepositories || '',
                copyright: ac.legalRegulations?.copyright || '',
                patents: ac.legalRegulations?.patents || '',
                tradeSecrets: ac.legalRegulations?.tradeSecrets || '',
                industrialDesigns: ac.legalRegulations?.industrialDesigns || '',
                brands: ac.legalRegulations?.brands || '',
                industrialIntellectualProperty:
                    ac.legalRegulations?.industrialIntellectualProperty || '',
                ownerId: ac.ownerId || '',
                criticality: ac.criticality || '',
                viewCount: ac.viewCount || 0,
                downloadCount: ac.downloadCount || 0,
                commentCount: ac.commentCount || 0,
            });
            setPreviewUrl(ac.image || null);
        }
    }, [ac, isAdmin]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadImageName = '';

        if (imagen) {
            uploadImageName = await upload(imagen);
        }

        let uploadFileName = '';
        if (archivo) {
            uploadFileName = await upload(archivo);
        }

        const acData = {
            id: formData.id,
            title: formData.titulo,
            publishDate: formData.fecha ? new Date(formData.fecha).toISOString() : null,
            knowledgeType: formData.tipoConocimiento,
            description: formData.descripcion,
            image: uploadImageName || '',
            activeKnowledgeType: formData.tipoActivo,
            format: formData.formato,
            fileUri: uploadFileName || formData.fileUri,
            relatedIds: formData.relatedIds
                ? formData.relatedIds.split(',').map((id) => id.trim())
                : [],
            keywords: formData.palabrasClave
                ? formData.palabrasClave.split(',').map((k) => k.trim())
                : [],
            availability: {
                accessibility: formData.accesible === 'Se puede acceder',
                location: formData.ubicacion || ' ', //quitar que sea obligatorio, sólo es obligatorio sí tipo es físico
            },
            classificationLevel: {
                level: formData.clasificacion || '',
            },
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
                industrialIntellectualProperty: formData.industrialIntellectualProperty || '',
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
            } else {
                await create(acData);
                showSuccess('Activo creado correctamente');
            }
        } catch (error) {
            showError('Hubo un error al guardar el activo');
            console.error(error);
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
            console.error('Error al eliminar el activo:', error);
            alert('Ocurrió un error al intentar eliminar el activo');
        }
    };

    const normalize = (str = "") =>
        str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();


    return (
        <div className="bg-white px-6 py-20 rounded shadow">
            <h2 className="text-4xl font-bold text-[#70205B] mb-4 text-center py-8">
                {id && isAdmin ? 'Editar activo de conocimiento' : 'Registro de activo'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Imagen del activo" htmlFor="imagen">
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
                        <ImageUpload id="imagen" onChange={handleImageChange} />
                    )}
                </FormField>

                <FormField label="Archivo del activo" htmlFor="archivo">
                    {archivo ? (
                        <div className="flex flex-col items-start">
                            <span className="mb-2 text-gray-700">
                                Archivo cargado: <strong>{archivo.name}</strong>
                            </span>
                            <Button
                                type="Primary"
                                text="Cambiar archivo"
                                onClick={() => setArchivo(null)}
                                className="text-sm text-blue-600 underline hover:text-blue-800"
                            />
                        </div>
                    ) : (
                        <FileUpload onChange={handleArchivoChange} />
                    )}
                </FormField>

                <FormField label="Descripción *" htmlFor="descripcion">
                    <TextArea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField label="Facetado *" htmlFor="id">
                    <Input
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField label="Título *" htmlFor="titulo">
                    <Input
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField label="Fecha de publicación" htmlFor="fecha">
                    <Input
                        name="fecha"
                        type="date"
                        value={formData.fecha}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Autor *" htmlFor="autor">
                    <Input
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField label="Activos de conocimiento relacionados*" htmlFor="relatedIds">
                    <Input
                        name="relatedIds"
                        value={formData.relatedIds}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField label="Identificación del autor *" htmlFor="ownerId">
                    <Input
                        name="ownerId"
                        value={formData.ownerId}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField label="Tipo de conocimiento*" htmlFor="tipoActivo">
                    <select
                        id="tipoActivo"
                        name="tipoActivo"
                        value={formData.tipoActivo}
                        onChange={handleChange}
                        required
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.activeKnowledgeTypeEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Estado del activo*" htmlFor="estadoAC">
                    <select
                        id="estadoAC"
                        name="estadoAC"
                        value={formData.estadoAC}
                        onChange={handleChange}
                        required
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.assetStatusEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Tipo de activo*" htmlFor="tipoConocimiento">
                    <select
                        id="tipoConocimiento"
                        name="tipoConocimiento"
                        value={formData.tipoConocimiento}
                        onChange={handleChange}
                        required
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.knowledgeTypeEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Accesibilidad" htmlFor="accesible">
                    <select
                        id="accesible"
                        name="accesible"
                        value={formData.accesible}
                        onChange={handleChange}
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {accesibilidad.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </FormField>

                {normalize(formData.tipoConocimiento).includes("fisico") && (
                    <FormField label="Ubicación Física del activo" htmlFor="ubicacion">
                        <Input
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleChange}
                        />
                    </FormField>
                )}

                <FormField label="Formato *" htmlFor="formato">
                    <select
                        id="formato"
                        name="formato"
                        value={formData.formato}
                        onChange={handleChange}
                        required
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.formatEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Palabras clave" htmlFor="palabrasClave">
                    <Input
                        name="palabrasClave"
                        value={formData.palabrasClave}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Origen" htmlFor="origen">
                    <select
                        id="origen"
                        name="origen"
                        value={formData.origen}
                        onChange={handleChange}
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.originEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Propietario del Activo de conocimiento" htmlFor="propietarioAC">
                    <Input
                        name="propietarioAC"
                        value={formData.propietarioAC}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Repositorio virtual del PECET" htmlFor="pecetKnowledge">
                    <Input
                        name="pecetKnowledge"
                        value={formData.pecetKnowledge}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Repositorios Especializados" htmlFor="centralicedRepositories">
                    <Input
                        name="centralicedRepositories"
                        value={formData.centralicedRepositories}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Criticidad" htmlFor="criticality">
                    <select
                        id="criticality"
                        name="criticality"
                        value={formData.criticality}
                        onChange={handleChange}
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.criticalityEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Visibilidad" htmlFor="visibilidad">
                    <select
                        id="visibilidad"
                        name="visibilidad"
                        value={formData.visibilidad}
                        onChange={handleChange}
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {visibilidad.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Nivel de clasificación" htmlFor="clasificacion">
                    <select
                        id="clasificacion"
                        name="clasificacion"
                        value={formData.clasificacion}
                        onChange={handleChange}
                        className="border border-[#8DC63F] p-2 rounded w-full"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.classificationLevelLevelEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Copyright" htmlFor="copyright">
                    <Input
                        name="copyright"
                        value={formData.copyright}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Patentes del activo de conocimiento" htmlFor="patents">
                    <Input
                        name="patents"
                        value={formData.patents}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Secretos comerciales" htmlFor="tradeSecrets">
                    <Input
                        name="tradeSecrets"
                        value={formData.tradeSecrets}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Marca registrada" htmlFor="brands">
                    <Input
                        name="brands"
                        value={formData.brands}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Propiedad intelectual" htmlFor="industrialIntellectualProperty">
                    <Input
                        name="industrialIntellectualProperty"
                        value={formData.industrialIntellectualProperty}
                        onChange={handleChange}
                    />
                </FormField>

                <div className="md:col-span-2 flex justify-center py-10 gap-4">
                    {id && isAdmin ? (
                        <>
                            <Button text="Guardar cambios" type="primary" htmlType="submit" />
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
    );
};

export default ManageAC;
