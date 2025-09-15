import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center text-center py-6">
            <h1 className="text-6xl font-bold text-[#70205B] mb-4">404</h1>
            <p className="text-lg mb-6">
                La página que buscas no existe o fue movida.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded bg-[#70205B] text-white hover:bg-[#50153f]"
            >
                Volver al inicio
            </button>
        </div>
    );
};

export default NotFound;
