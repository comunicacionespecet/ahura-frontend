import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SubHeader = () => {
    const navigate = useNavigate();
    const { isAdmin, toggleAuth } = useAuth();

    return (
        <section className="flex flex-col md:flex-row bg-[#EEEEEE] gap-6 min-h-[250px]">
            <div className="w-full md:w-[30%] flex flex-col justify-center p-6">
                <h1 className="text-xl font-semibold mb-4">Bienvenido al sistema AHURA.</h1>
                <p className="mb-4">Gestión de activos del conocimiento.</p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={toggleAuth}
                        text={isAdmin ? 'Cerrar sesión (admin)' : 'Iniciar sesión'}
                        type="primary"
                        htmlType="button"
                    ></Button>
                    <Button
                        onClick={() => navigate('/')}
                        text={'Página principal'}
                        type="secondary"
                        htmlType="button"
                    ></Button>
                    <a
                        href="https://pecet-colombia.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button 
                            text="Conocer más sobre el PECET"
                            type="success"
                            htmlType="button"
                            Conocer más sobre el PECET
                        ></Button>
                    </a>

                </div>
            </div>
            <div className="w-full md:w-[70%]">
                <img
                    src="/Semi_header_pecet.png"
                    alt="Imagen descriptiva"
                    className="w-full h-full object-cover rounded"
                />
            </div>
        </section>
    );
};

export default SubHeader;
