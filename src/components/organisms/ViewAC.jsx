import React, { useState } from 'react';
import CommentsSection from '../organisms/CommentSection';

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

    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
        signedFileUrl
    )}&embedded=true`;
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        signedFileUrl
    )}`;

    const tabs = ['Resumen', 'Detalles', 'Archivo'];
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-white p-6 rounded shadow w-[70%] mx-auto min-h-[600px] space-y-6">
            <h2 className="text-2xl font-bold mb-4">{ac.title}</h2>

            {/* Tabs Header */}
            <div className="flex mb-8 gap-2 overflow-x-auto flex-nowrap w-full border-b">
                {tabs.map((tab, idx) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-2 rounded-t relative whitespace-nowrap min-w-max ${
                            activeTab === idx
                                ? 'bg-[#8DC63F] text-white'
                                : 'bg-gray-200 text-[#026937]'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tabs Content */}
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
                                ? new Date(ac.publishDate).toLocaleDateString(
                                      'es-CO'
                                  )
                                : 'No Aplica'}
                        </p>
                    </div>
                </div>
            )}

            {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                        <strong>Tipo de Activo:</strong>{' '}
                        {ac.assetType || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Tipo de Conocimiento:</strong>{' '}
                        {ac.knowledgeType || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Formato:</strong> {ac.format || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Palabras Clave:</strong>{' '}
                        {ac.keywords || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Origen:</strong> {ac.origin || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Ubicación (Repositorio):</strong>{' '}
                        {ac.howIsItStored?.centralicedRepositories ||
                            'No Aplica'}
                    </p>
                    <p>
                        <strong>Accesible:</strong>{' '}
                        {ac.availability?.accessibility ? 'Sí' : 'No Aplica'}
                    </p>
                    <p>
                        <strong>Nivel de Clasificación:</strong>{' '}
                        {ac.classificationLevel?.level || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Nivel de Confidencialidad:</strong>{' '}
                        {ac.confidentialityLevel?.level || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Estado:</strong> {ac.status || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Copyright:</strong>{' '}
                        {ac.copyright || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Patentes:</strong> {ac.patents || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Secretos Comerciales:</strong>{' '}
                        {ac.tradeSecrets || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Diseños Industriales:</strong>{' '}
                        {ac.industrialDesigns || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Marcas:</strong> {ac.brands || 'No Aplica'}
                    </p>
                    <p>
                        <strong>Propiedad Intelectual Industrial:</strong>{' '}
                        {ac.industrialIntellectualProperty || 'No Aplica'}
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
                        ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(
                            fileType
                        ) && (
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
                </div>
            )}

            {/* Comentarios siempre visibles */}
            <CommentsSection assetId={ac.id} authorId={user?.id} />
        </div>
    );
};

export default ViewAC;
