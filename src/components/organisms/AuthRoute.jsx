import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthRoute = ({ children }) => {
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <p className="text-lg mb-6 max-w-xl">
                    Para poder acceder a los activos de conocimiento del PECET y
                    poder interactuar con ellos, haz click en{' '}
                    <span className="font-semibold">Iniciar sesión</span> si ya
                    tienes usuario. <br />
                    De lo contrario haz click en{' '}
                    <span className="font-semibold">Registrarte</span>.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 rounded bg-[#70205B] text-white hover:bg-[#50153f]"
                    >
                        Iniciar sesión
                    </button>
                    <button
                        onClick={() => navigate('/registerUser')}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Registrarse
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default AuthRoute;
