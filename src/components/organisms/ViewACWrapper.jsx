import React from 'react';
import { useParams } from 'react-router-dom';
import { useAC } from '../../hooks/useACs';
import ViewAC from './ViewAC';

const ViewACWrapper = () => {
    const { id } = useParams();
    const { ac, loading } = useAC(id);

    if (loading) return <div>Cargando...</div>;
    if (!ac) return <div>No se encontró el activo.</div>;

    return <ViewAC ac={ac} />;
};

export default ViewACWrapper;
