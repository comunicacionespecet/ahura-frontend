import { useState, useEffect } from 'react';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/userServices';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, setUsers, loading, error };
}

export function useUserById(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (userData) => {
    setLoading(true);
    try {
      const newUser = await createUser(userData);
      setLoading(false);
      return newUser;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { create, loading, error };
}

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, updatedData) => {
    setLoading(true);
    try {
      const updated = await updateUser(id, updatedData);
      setLoading(false);
      return updated;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { update, loading, error };
}

export function useDeleteUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    try {
      await deleteUser(id);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { remove, loading, error };
}
