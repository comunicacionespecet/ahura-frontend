import React, { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';
import { useUsers } from '../../hooks/useUsers';
import { useUpdateUser } from '../../hooks/useUsers';
import { useDeleteUser } from '../../hooks/useUsers';

const AdminUser = () => {
    const { users, setUsers, loading, error } = useUsers();

    const { update } = useUpdateUser();
    const { remove } = useDeleteUser();

    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [editedRole, setEditedRole] = useState('');

    if (loading) return <p className="p-6">Cargando...</p>;
    if (error)
        return <p className="p-6 text-red-600">Error: {error.message}</p>;

    const handleEdit = (user) => {
        setCurrentUser(user);
        setEditedRole(user.role);
        setIsEditing(true);
    };

    const roleMap = {
        user: "Usuario",
        super_administrador: "Administrador",
        administrador: "Funcionario PECET",
    };


    const handleSave = async () => {
        if (!currentUser) return;
        try {
            const updated = await update(currentUser.id, { role: editedRole });
            setUsers((prev) =>
                prev.map((u) => (u.id === updated.id ? updated : u))
            );
            setIsEditing(false);
            showSuccess('Rol actualizado correctamente');
        } catch (err) {
            showError('Error actualizando rol');
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = await showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer'
        );
        if (!confirmDelete) return;

        try {
            await remove(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            showSuccess('Usuario eliminado correctamente');
        } catch (err) {
            showError('Error eliminando usuario');
        }
    };

    return (
        <div className="p-6 bg-[#FBFBFB]">
            <div className="p-4 bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Correo</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{roleMap[user.role]}</td>
                                <td className="px-4 py-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Editar rol"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Borrar"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={() => setIsEditing(false)}
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">
                            Editar rol de {currentUser?.name}
                        </h2>

                        <label className="block text-sm font-medium">Rol</label>
                        <select
                            value={editedRole}
                            onChange={(e) => setEditedRole(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="user">Usuario</option>
                            <option value="administrador">Funcionario PECET</option>
                            <option value="super_administrador">Administrador</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded bg-[#70205B] text-white hover:bg-[#50153f]"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUser;
