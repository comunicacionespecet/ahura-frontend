import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainFeatures = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    return (
        <main className="flex-1 p-6 bg-[#FBFBFB]">
            <h3 className="text-lg text-center font-bold mb-4">¿Qué puedes hacer aquí?</h3>

            {isAdmin ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                        onClick={() => navigate('/registrar')}
                        text="Registrar activos de conocimiento"
                        type="primary"
                    />
                    <Button
                        onClick={() => navigate('/registrar')}
                        text="Editar un activo de conocimiento"
                        type="light"
                    />
                    <Button
                        onClick={() => navigate('/buscar')}
                        text="Buscar activos de conocimiento"
                        type="secondary"
                    />
                    <Button text="Generar estadísticas" type="success" />
                </div>
            ) : (
                <div className="flex justify-center">
                    <Button
                        onClick={() => navigate('/buscar')}
                        text="Buscar activos de conocimiento"
                        type="secondary"
                    />
                </div>
            )}
        </main>
    );
};

export default MainFeatures;
