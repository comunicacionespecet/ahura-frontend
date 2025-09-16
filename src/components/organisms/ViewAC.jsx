import React, { useState } from 'react';
import CommentsSection from '../organisms/CommentSection';
import { useIncrementDownloadCount } from "../../hooks/useACs";

import Button from '../atoms/Button';

const getFileType = (fileUrl) => {
    if (!fileUrl) return '';
    const ext = fileUrl.split('.').pop().toLowerCase();
    if (
        [
            'pdf',
            'doc',
            'docx',
            'xls',
            'xlsx',
            'jpg',
            'jpeg',
            'png',
            'ppt',
            'pptx',
            'mp4',
            'mp3',
        ].includes(ext)
    ) {
        return ext;
    }
    return '';
};

const ViewAC = ({ ac, user }) => {
    if (!ac) return <div>No se encontró el activo.</div>;

    const signedFileUrl = ac.signedFileUrl;
    const cleanUrl = signedFileUrl?.split('?')[0];
    const fileType = getFileType(cleanUrl);
    const { increment: incrementDownload } = useIncrementDownloadCount();

    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
        signedFileUrl
    )}&embedded=true`;
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        signedFileUrl
    )}`;

    const handleDownload = async () => {
        try {
            await incrementDownload(ac.id, ac.downloadCount || 0);
        } catch (err) {
            console.error("No se pudo incrementar downloadCount", err);
        } finally {
            // abrir el archivo siempre, aunque falle el contador
            if (ac.signedFileUrl) {
                window.open(ac.signedFileUrl, "_blank");
            }
        }
    };

    const tabs = ['Resumen', 'Detalles', 'Archivo'];
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-white p-6 rounded shadow w-[70%] mx-auto min-h-[600px] space-y-6">
            <h2 className="text-2xl font-bold mb-4">
                <span className="text-lg font-semibold">
                    <span className="font-medium mr-2 text-gray-700">
                        Título del activo de conocimiento:
                    </span>
                    <span className="text-gray-900">{ac.title || 'No Aplica'}</span>
                </span>
            </h2>


            <div className="flex mb-8 gap-2 overflow-x-auto flex-nowrap w-full border-b">
                {tabs.map((tab, idx) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-2 rounded-t relative whitespace-nowrap min-w-max ${activeTab === idx
                            ? 'bg-[#8DC63F] text-white'
                            : 'bg-gray-200 text-[#026937]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 0 && (
                <div className="flex flex-col md:flex-row gap-6">
                    {ac.signedImageUrl && (
                        <div className="md:w-1/2 flex justify-center">
                            <img
                                src={ac.signedImageUrl}
                                alt="Imagen del AC"
                                className="max-w-full max-h-96 object-contain rounded"
                            />
                        </div>
                    )}
                    <div className="md:w-1/2 space-y-2">
                        <p className="whitespace-pre-line break-words">
                            <strong>Descripción:</strong>{' '}
                            {ac.description || 'No Aplica'}
                        </p>

                        <p>
                            <strong>Autor / Responsable:</strong>{' '}
                            {ac.responsibleOwner || 'No Aplica'}
                        </p>
                        <p>
                            <strong>Fecha de Publicación:</strong>{' '}
                            {ac.publishDate
                                ? new Date(ac.publishDate).toLocaleDateString('es-CO')
                                : 'No Aplica'}
                        </p>

                        <p>
                            <strong>Visibilidad:</strong>{' '}
                            {ac.confidentiality === true
                                ? 'Público'
                                : ac.confidentiality === false
                                    ? 'Privado'
                                    : 'No Aplica'}
                        </p>

                        <div>
                            <strong>Activos Relacionados:</strong>{' '}
                            {ac.relatedIds && ac.relatedIds.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {ac.relatedIds.map((id) => (
                                        <li key={id}>{id}</li>
                                    ))}
                                </ul>
                            ) : (
                                'No Aplica'
                            )}
                        </div>
                    </div>
                </div>
            )}



            {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                        <strong>Tipo de Activo de conocimiento:</strong>{' '}
                        {ac.knowledgeType || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Categoría del activo de Conocimiento:</strong>{' '}
                        {ac.activeKnowledgeType || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Formato:</strong> {ac.format || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Criticidad del activo de conocimiento:</strong> {ac.criticality || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Palabras Clave:</strong>{' '}
                        {ac.keywords || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Origen:</strong> {ac.origin || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Accesible:</strong>{' '}
                        {ac.availability?.accessibility ? 'Se puede acceder' : 'No se puede acceder'}
                    </p>
                    <p>
                        <strong>Nivel de Clasificación:</strong>{' '}
                        {ac.classificationLevel?.level || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Nivel de Criticidad:</strong>{' '}
                        {ac.criticality || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Estado:</strong> {ac.status || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Copyright:</strong>{' '}
                        {ac.legalRegulations.copyright || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Patentes:</strong> {ac.legalRegulations.patents || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Secretos Comerciales:</strong>{' '}
                        {ac.legalRegulations.tradeSecrets || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Marcas:</strong> {ac.legalRegulations.brands || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Propiedad Intelectual Industrial:</strong>{' '}
                        {ac.legalRegulations.industrialIntellectualProperty || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Propietario del Activo de conocimiento:</strong>{' '}
                        {ac.ownerId || 'No Aplica'}
                    </p>
                </div>
            )}

            {activeTab === 2 && (
                <div>
                    {signedFileUrl && fileType === 'pdf' && (
                        <iframe
                            src={googleViewerUrl}
                            title="Vista previa PDF"
                            width="100%"
                            height="600px"
                            className="mb-4 border"
                        />
                    )}

                    {signedFileUrl &&
                        ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileType) && (
                            <iframe
                                src={officeViewerUrl}
                                title="Vista previa Office"
                                width="100%"
                                height="600px"
                                className="mb-4 border"
                            />
                        )}

                    {signedFileUrl && fileType === 'mp4' && (
                        <video
                            controls
                            width="100%"
                            className="mb-4 rounded border"
                        >
                            <source src={signedFileUrl} type="video/mp4" />
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    )}

                    {signedFileUrl && fileType === 'mp3' && (
                        <audio controls className="mb-4 w-full rounded border">
                            <source src={signedFileUrl} type="audio/mpeg" />
                            Tu navegador no soporta la etiqueta de audio.
                        </audio>
                    )}

                    {signedFileUrl &&
                        ['jpg', 'jpeg', 'png'].includes(fileType) && (
                            <img
                                src={signedFileUrl}
                                alt="Vista previa"
                                className="max-w-full h-auto mb-4"
                            />
                        )}

                    {/* Botón de descarga */}
                    {signedFileUrl && (
                        <div className="mt-4">
                            <Button
                                text="Descargar archivo"
                                type="success"
                                onClick={handleDownload}
                            />
                        </div>
                    )}
                </div>
            )}


            <CommentsSection assetId={ac.id} authorId={user?.id} />
        </div>
    );
};

export default ViewAC;
