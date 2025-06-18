import React, { useState } from 'react';
import RegisterAC from './RegisterAC';
import ViewAC from '../organisms/ViewAC';
import Button from '../atoms/Button';

const MainFeatures = () => {
    const [showForm, setShowForm] = useState(false);
    const [showExample, setShowExample] = useState(false);

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

    const handleRegisterClick = () => {
        setShowForm(true);
        setShowExample(false);
    };

    const handleSearchClick = () => {
        setShowExample(true);
        setShowForm(false);
    };

    return (
        <main className="flex-1 p-6 bg-white">
            <h3 className="text-lg text-center font-bold mb-4">¿Qué puedes hacer aquí?</h3>

            {!showForm && !showExample ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                        onClick={handleRegisterClick}
                        text="Registrar activos de conocimiento"
                        type="primary"
                    />
                    <Button
                        onClick={handleRegisterClick}
                        text="Editar un activo de conocimiento"
                        type="light"
                    />
                    <Button
                        onClick={handleSearchClick}
                        text="Buscar activos de conocimiento"
                        type="secondary"
                    />
                    <Button text="Generar estadísticas" type="success" />
                </div>
            ) : showForm ? (
                <RegisterAC />
            ) : (
                <ViewAC ac={ejemploAC} />
            )}
        </main>
    );
};

export default MainFeatures;
