/*import { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole } from '../services/usersServices';

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllUsers()
            .then(setUsers)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const changeRole = async (userId, newRole) => {
        await updateUserRole(userId, newRole);
        setUsers(users =>
            users.map(u => (u.id === userId ? { ...u, role: newRole } : u))
        );
    };

    return { users, loading, error, changeRole };
}*/

import { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole } from '../services/usersServices';

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllUsers()
            .then(setUsers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const changeRole = async (userId, newRole) => {
        await updateUserRole(userId, newRole);
        setUsers((users) => users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    };

    return { users, loading, error, changeRole };
}
