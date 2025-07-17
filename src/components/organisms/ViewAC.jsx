import React from 'react';
import PropTypes from 'prop-types';

const getFileType = (fileUrl) => {
    if (!fileUrl) return '';
    const ext = fileUrl.split('.').pop().toLowerCase();
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'ppt', 'pptx', 'mp4'].includes(ext)) {

        return ext;
    }
    return '';
};

const ViewAC = ({ ac }) => {
    if (!ac) return <div>No se encontró el activo.</div>;


    const signedFileUrl = ac.signedFileUrl;
    const cleanUrl = signedFileUrl?.split('?')[0];
    const fileType = getFileType(cleanUrl);
    const fileUrl = signedFileUrl;
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(ac.signedFileUrl)}&embedded=true`; //Debemo eleiminar esto configurando en el s3 el contentTYpe: inline


    return (
        <div className="bg-white p-6 rounded shadow max-w-4xl w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">{ac.titulo}</h2>

            {ac.signedImageUrl && (
                <img
                    src={ac.signedImageUrl}
                    alt="Imagen del AC"
                    className="mb-4 max-w-full max-h-96 object-contain rounded mx-auto"
                />
            )}

            {fileUrl && fileType === 'pdf' && (
                <iframe
                    src={viewerUrl}
                    title="Vista previa PDF"
                    width="100%"
                    height="600px"
                    className="mb-4 border"
                />
            )}

            {fileUrl && fileType === 'mp4' && (
                <video
                    controls
                    width="100%"
                    height="auto"
                    className="mb-4 rounded border"
                >
                    <source src={fileUrl} type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                </video>
            )}


            {fileUrl && ['jpg', 'jpeg', 'png'].includes(fileType) && (
                <img src={fileUrl} alt="Vista previa" className="max-w-full h-auto mb-4" />
            )}

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
                <strong>Fecha:</strong> {new Date(ac.publishDate).toLocaleDateString('es-CO')}
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
                <strong>Visibilidad:</strong> {ac.confidentiality ? 'Confidencial' : 'Público'}
            </p>
            <p>
                <strong>Estado:</strong> {ac.status}
            </p>
        </div>
    );
};

ViewAC.propTypes = {
    ac: PropTypes.shape({
        id: PropTypes.string,
        titulo: PropTypes.string,
        descripcion: PropTypes.string,
        fecha: PropTypes.string,
        tipoActivo: PropTypes.string,
        tipoConocimiento: PropTypes.string,
        formato: PropTypes.string,
        palabrasClave: PropTypes.string,
        origen: PropTypes.string,
        ubicacion: PropTypes.string,
        accesible: PropTypes.string,
        clasificacion: PropTypes.string,
        autor: PropTypes.string,
        propietarioAC: PropTypes.string,
        visibilidad: PropTypes.string,
        estadoAC: PropTypes.string,
        imagen: PropTypes.string,
        archivoUrl: PropTypes.string,
    }),
};

export default ViewAC;
