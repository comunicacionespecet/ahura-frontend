import React from 'react';
import PropTypes from 'prop-types';

const getFileType = (fileUrl) => {
    if (!fileUrl) return '';
    const ext = fileUrl.split('.').pop().toLowerCase();
    if (
        ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'ppt', 'pptx', 'mp4'].includes(
            ext
        )
    ) {
        return ext;
    }
    return '';
};

const ViewAC = ({ ac }) => {
    if (!ac) return <div>No se encontró el activo.</div>;

    const signedFileUrl = ac.signedFileUrl;
    const cleanUrl = signedFileUrl?.split('?')[0];
    const fileType = getFileType(cleanUrl);

    // URLs para visores
    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(signedFileUrl)}&embedded=true`;
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(signedFileUrl)}`;

    return (
        <div className="bg-white p-6 rounded shadow max-w-8xl w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">{ac.titulo}</h2>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
                {ac.signedImageUrl && (
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src={ac.signedImageUrl}
                            alt="Imagen del AC"
                            className="max-w-full max-h-96 object-contain rounded"
                        />
                    </div>
                )}

                <div className="md:w-1/2">
                    <p>
                        <strong>Descripción:</strong> {ac.description}
                    </p>
                    <p>
                        <strong>ID:</strong> {ac.id}
                    </p>
                    <p>
                        <strong>Autor:</strong> {ac.responsibleOwner}
                    </p>
                    <p>
                        <strong>Fecha:</strong>{' '}
                        {new Date(ac.publishDate).toLocaleDateString('es-CO')}
                    </p>
                    <p>
                        <strong>Tipo de Activo:</strong> {ac.format}
                    </p>
                    <p>
                        <strong>Tipo de Conocimiento:</strong> {ac.activeKnowledgeType}
                    </p>
                    <p>
                        <strong>Formato:</strong> {ac.format}
                    </p>
                    <p>
                        <strong>Palabras Clave:</strong> {ac.keywords}
                    </p>
                    <p>
                        <strong>Origen:</strong> {ac.howIsItStored.pecetKnowledge}
                    </p>
                    <p>
                        <strong>Ubicación:</strong> {ac.howIsItStored.centralicedRepositories}
                    </p>
                    <p>
                        <strong>Accesible:</strong> {ac.availability?.accessibility ? 'Sí' : 'No'}
                    </p>
                    <p>
                        <strong>Clasificación:</strong> {ac.classificationLevel.level}
                    </p>
                    <p>
                        <strong>Propietario:</strong> {ac.responsibleOwner}
                    </p>
                    <p>
                        <strong>Visibilidad:</strong>{' '}
                        {ac.confidentiality ? 'Confidencial' : 'Público'}
                    </p>
                    <p>
                        <strong>Estado:</strong> {ac.status}
                    </p>
                </div>
            </div>

            {/* PDF */}
            {signedFileUrl && fileType === 'pdf' && (
                <iframe
                    src={googleViewerUrl}
                    title="Vista previa PDF"
                    width="100%"
                    height="600px"
                    className="mb-4 border"
                />
            )}

            {/* Word, Excel, PowerPoint */}
            {signedFileUrl && ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileType) && (
                <iframe
                    src={officeViewerUrl}
                    title="Vista previa Office"
                    width="100%"
                    height="600px"
                    className="mb-4 border"
                />
            )}

            {signedFileUrl && fileType === 'mp4' && (
                <video controls width="100%" height="auto" className="mb-4 rounded border">
                    <source src={signedFileUrl} type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                </video>
            )}

            {signedFileUrl && ['jpg', 'jpeg', 'png'].includes(fileType) && (
                <img src={signedFileUrl} alt="Vista previa" className="max-w-full h-auto mb-4" />
            )}
        </div>
    );
};

export default ViewAC;
