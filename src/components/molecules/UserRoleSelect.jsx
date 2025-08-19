import React from 'react';

const UserRoleSelect = ({ value, onChange, disabled }) => (
    <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="border rounded p-1"
    >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
    </select>
);

export default UserRoleSelect;