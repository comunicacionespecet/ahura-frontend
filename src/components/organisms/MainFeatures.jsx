import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainFeatures = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    return (
        <main className="flex-1 p-6 bg-[#FBFBFB]">
            <h3 className="text-4xl text-center font-bold mb-4">¿Qué puedes hacer aquí?</h3>

            {isAdmin ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                        onClick={() => navigate('/registrar')}
                        text="Registrar activos de conocimiento"
                        type="primary"
                        htmlType="button"
                    ></Button>
                    <Button
                        onClick={() => navigate('/buscar')}
                        text="Gestionar activos de conocimiento"
                        type="light"
                        htmlType="button"
                    ></Button>
                    <Button
                        onClick={() => navigate('/buscar')}
                        text="Buscar activos de conocimiento"
                        type="secondary"
                        htmlType="button"
                    ></Button>
                    <Button
                        text="Generar estadísticas"
                        type="success"
                        htmlType="button"
                    ></Button>
                    <Button
                        onClick={() => navigate('/listas')}
                        text="Gestor de listas"
                        type="primary"
                        htmlType="button"
                    ></Button>
                </div>
            ) : (
                <div className="flex justify-center">
                    <Button
                        onClick={() => navigate('/buscar')}
                        text="Buscar activos de conocimiento"
                        type="secondary"
                        htmlType="button"
                    ></Button>
                </div>
            )}
        </main>
    );
};

export default MainFeatures;
