import React from 'react';
import PropTypes from 'prop-types';

const ViewAC = ({ ac }) => {
    if (!ac) return null;

    return (
        <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{ac.titulo}</h2>

            {ac.imagen && (
                <img
                    src={ac.imagen}
                    alt="Imagen del AC"
                    className="mb-4 w-full max-h-64 object-cover rounded"
                />
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
    }),
};

export default ViewAC;
