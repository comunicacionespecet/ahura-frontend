import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SubHeader = () => {
    const navigate = useNavigate();
    const { isAdmin, toggleAuth } = useAuth();

    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded">
            <img
                src="/Semi_header_pecet.png"
                alt="Imagen descriptiva"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">Bienvenido al sistema AHURA</h1>
                <p className="text-lg mb-4">Gestión de activos del conocimiento.</p>
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={toggleAuth}
                        text={isAdmin ? 'Cerrar sesión (admin)' : 'Iniciar sesión'}
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
