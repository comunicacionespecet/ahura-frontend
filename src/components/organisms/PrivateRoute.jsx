import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { showError } from '../../utils/alerts';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, isAdmin } = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    if (!token || !user) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-6">
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
                        onClick={() => navigate('/login', { state: { from: location } })}
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

    if (user.role !== 'administrador' && !isAdmin) {
        useEffect(() => {
            showError('No tienes permisos para acceder a esta sección.');
            navigate('/');
        }, [navigate]);
        return null; 
    }

    return children;
};

export default PrivateRoute;
