import React from 'react';
import { useUsers } from '../../hooks/useUsers';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';

const UserRoleSelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="border border-[#8DC63F] rounded px-2 py-1 focus:outline-none focus:ring focus:ring-[#35944B] bg-white text-[#026937]"
  >
    <option value="user">Usuario</option>
    <option value="admin">Administrador</option>
  </select>
);

const AdminUsers = () => {
  const { users, loading, error, changeRole } = useUsers();

  const handleRoleChange = async (userId, newRole) => {
    try {
      await changeRole(userId, newRole);
      showSuccess('Rol actualizado correctamente');
    } catch {
      showError('Hubo un error al actualizar el usuario');
    }
  };

  if (loading) return <div className="text-[#026937]">Cargando usuarios...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-4xl font-bold text-[#70205B] mb-4 text-center py-8">Administrar usuarios</h2>
      <table className="min-w-full border border-[#8DC63F] rounded-lg overflow-hidden bg-white shadow">
        <thead>
          <tr className="bg-[#F3F8F0]">
            <th className="p-3 border-b border-[#8DC63F] text-[#026937] font-bold text-center align-middle">ID</th>
            <th className="p-3 border-b border-[#8DC63F] text-[#026937] font-bold text-center align-middle">Nombre</th>
            <th className="p-3 border-b border-[#8DC63F] text-[#026937] font-bold text-center align-middle">Correo</th>
            <th className="p-3 border-b border-[#8DC63F] text-[#026937] font-bold text-center align-middle">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-[#F9F6FB] transition">
              <td className="p-3 border-b border-[#8DC63F] text-center align-middle">{user.id}</td>
              <td className="p-3 border-b border-[#8DC63F] text-center align-middle">{user.name}</td>
              <td className="p-3 border-b border-[#8DC63F] text-center align-middle">{user.email}</td>
              <td className="p-3 border-b border-[#8DC63F] text-center align-middle">
                <UserRoleSelect
                  value={user.role}
                  onChange={role => handleRoleChange(user.id, role)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;