import React from 'react';
import PropTypes from 'prop-types';

const getFileType = (fileUrl) => {
    if (!fileUrl) return '';
    const ext = fileUrl.split('.').pop().toLowerCase();
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'ppt', 'pptx'].includes(ext)) {
        return ext;
    }
    return '';
};

const ViewAC = ({ ac }) => {
    if (!ac) return <div>No se encontró el activo.</div>;

    //const fileUrl = ac.archivoUrl;
    const signedExcelUrl =
        'https://ahura-bucket-s3.s3.us-east-1.amazonaws.com/JULIO.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZLCLJLCQAHKEOAUE%2F20250715%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250715T213120Z&X-Amz-Expires=900&X-Amz-Signature=6a717910808fd19f6998ad9bc9825641b2ff235d0a82515bdce6e53471f8302c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject';
    const cleanUrl = signedExcelUrl.split('?')[0]; // Esto elimina los parámetros
    const fileType = getFileType(cleanUrl);
    const fileUrl = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileType)
        ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(signedExcelUrl)}`
        : signedExcelUrl;

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

            {/* Previsualización de archivo */}
            {fileUrl && fileType === 'pdf' && (
                <iframe
                    src={fileUrl}
                    title="Vista previa PDF"
                    width="100%"
                    height="600px"
                    className="mb-4"
                />
            )}
            {fileUrl && ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileType) && (
                <iframe
                    src={fileUrl}
                    title="Vista previa Office"
                    width="100%"
                    height="600px"
                    className="mb-4"
                />
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
