import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainFeatures = () => {
    const { isAdmin, isSuperAdmin } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex-1 py-24 px-8 bg-[#FBFBFB]">
            <h3 className="text-4xl text-center font-bold mb-4">
                ¿Qué puedes hacer aquí?
            </h3>

            {isAdmin ? (
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-6">
                        <Button
                            onClick={() => navigate('/registrar')}
                            text="Registrar activos de conocimiento"
                            type="dark"
                            htmlType="button"
                            className="w-full md:w-[300px]"
                        />
                        <Button
                            onClick={() => navigate('/dashboard')}
                            text="Ver estadísticas"
                            type="light"
                            htmlType="button"
                            className="w-full md:w-[300px]"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        <Button
                            onClick={() => navigate('/buscar')}
                            text="Gestionar activos de conocimiento"
                            type="light"
                            htmlType="button"
                            className="w-full md:w-[300px]"
                        />
                        <Button
                            onClick={() => navigate('/listas')}
                            text="Gestor de listas"
                            type="dark"
                            htmlType="button"
                            className="w-full md:w-[300px]"
                        />
                        {isSuperAdmin && (
                            <Button
                                onClick={() => navigate('/usuarios')}
                                text="Gestor de usuarios"
                                type="light"
                                htmlType="button"
                                className="w-full md:w-[300px]"
                            />
                        )}

                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <Button
                        onClick={() => navigate('/buscar')}
                        text="Buscar activos de conocimiento"
                        type="dark"
                        htmlType="button"
                        className="w-full md:w-[300px]"
                    />
                    <Button
                        onClick={() => navigate('/dashboard')}
                        text="Ver estadísticas"
                        type="light"
                        htmlType="button"
                        className="w-full md:w-[300px]"
                    />
                </div>
            )}
        </div>
    );
};

export default MainFeatures;
