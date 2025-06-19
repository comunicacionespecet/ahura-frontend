import React from 'react';
import PropTypes from 'prop-types';

const ViewAC = ({}) => {
    const ejemploAC = {
        id: 'AC123',
        titulo: 'Método de recolección de zancudos',
        descripcion: 'Método utilizado en zonas rurales para capturar zancudos transmisores.',
        fecha: '2024-05-12',
        tipoActivo: 'Físico',
        tipoConocimiento: 'Métodos desarrollados o mejorados',
        formato: 'PDF',
        palabrasClave: 'zancudos, recolección, método',
        origen: 'Investigación',
        ubicacion: 'Laboratorio PECET, Medellín',
        accesible: 'Se puede acceder',
        clasificacion: 'Alta',
        autor: 'Juan Pérez Velez',
        propietarioAC: 'PECET',
        visibilidad: 'Público',
        estadoAC: 'Finalizado',
        imagen: '/Prueba.jpg',
    };

    return (
        <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{ejemploAC.titulo}</h2>

            {ejemploAC.imagen && (
                <img
                    src={ejemploAC.imagen}
                    alt="Imagen del AC"
                    className="mb-4 w-full max-h-64 object-cover rounded"
                />
            )}

            <p>
                <strong>Descripción:</strong> {ejemploAC.descripcion}
            </p>
            <p>
                <strong>ID:</strong> {ejemploAC.id}
            </p>
            <p>
                <strong>Autor:</strong> {ejemploAC.autor}
            </p>
            <p>
                <strong>Fecha:</strong> {ejemploAC.fecha}
            </p>
            <p>
                <strong>Tipo de Activo:</strong> {ejemploAC.tipoActivo}
            </p>
            <p>
                <strong>Tipo de Conocimiento:</strong> {ejemploAC.tipoConocimiento}
            </p>
            <p>
                <strong>Formato:</strong> {ejemploAC.formato}
            </p>
            <p>
                <strong>Palabras Clave:</strong> {ejemploAC.palabrasClave}
            </p>
            <p>
                <strong>Origen:</strong> {ejemploAC.origen}
            </p>
            <p>
                <strong>Ubicación:</strong> {ejemploAC.ubicacion}
            </p>
            <p>
                <strong>Accesible:</strong> {ejemploAC.accesible}
            </p>
            <p>
                <strong>Clasificación:</strong> {ejemploAC.clasificacion}
            </p>
            <p>
                <strong>Propietario:</strong> {ejemploAC.propietarioAC}
            </p>
            <p>
                <strong>Visibilidad:</strong> {ejemploAC.visibilidad}
            </p>
            <p>
                <strong>Estado:</strong> {ejemploAC.estadoAC}
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
