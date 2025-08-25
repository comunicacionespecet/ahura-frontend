import { Navigate } from 'react-router-dom';
import { showError } from '../../utils/alerts';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const token = localStorage.getItem('token');

    if (!token || !user) {
        showError('No autorizado. Por favor inicia sesión.');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
