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

    const fileUrl = ac.archivoUrl; // Debe venir en el objeto ac (puedes cambiar el nombre según tu modelo)
    const fileType = getFileType(fileUrl);

    return (
        <div className="bg-white p-6 rounded shadow max-w-4xl w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">{ac.titulo}</h2>

            {ac.imagen && (
                <img
                    src={ac.imagen}
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
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
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
                <strong>Descripción:</strong> {ac.descripcion}
            </p>
            <p>
                <strong>ID:</strong> {ac.id}
            </p>
            <p>
                <strong>Autor:</strong> {ac.autor}
            </p>
            <p>
                <strong>Fecha:</strong> {ac.fecha}
            </p>
            <p>
                <strong>Tipo de Activo:</strong> {ac.tipoActivo}
            </p>
            <p>
                <strong>Tipo de Conocimiento:</strong> {ac.tipoConocimiento}
            </p>
            <p>
                <strong>Formato:</strong> {ac.formato}
            </p>
            <p>
                <strong>Palabras Clave:</strong> {ac.palabrasClave}
            </p>
            <p>
                <strong>Origen:</strong> {ac.origen}
            </p>
            <p>
                <strong>Ubicación:</strong> {ac.ubicacion}
            </p>
            <p>
                <strong>Accesible:</strong> {ac.accesible}
            </p>
            <p>
                <strong>Clasificación:</strong> {ac.clasificacion}
            </p>
            <p>
                <strong>Propietario:</strong> {ac.propietarioAC}
            </p>
            <p>
                <strong>Visibilidad:</strong> {ac.visibilidad}
            </p>
            <p>
                <strong>Estado:</strong> {ac.estadoAC}
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
        archivoUrl: PropTypes.string, // Asegúrate de incluir este campo en tu modelo
    }),
};

export default ViewAC;
