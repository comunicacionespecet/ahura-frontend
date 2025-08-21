import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SubHeader = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <section className="relative w-screen overflow-hidden rounded-none">
            <img
                src="/Semi_header_pecet.jpg"
                alt="Imagen descriptiva"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 text-white h-[300px] md:h-[400px] bg-black/40">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">Bienvenido al sistema AHURA</h1>
                <p className="text-lg mb-4">Gestión de activos del conocimiento.</p>
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={() => {
                            if (isAuthenticated) {
                                logout();
                            } else {
                                navigate('/login');
                            }
                        }}
                        text={isAuthenticated ? user?.name : 'Iniciar sesión'}
                        type="primary"
                        htmlType="button"
                    />
                    <Button
                        onClick={() => navigate('/')}
                        text="Página principal"
                        type="secondary"
                        htmlType="button"
                    />
                    <a href="https://pecet-colombia.org/" target="_blank" rel="noopener noreferrer">
                        <Button
                            text="Conocer más sobre el PECET"
                            type="success"
                            htmlType="button"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SubHeader;
