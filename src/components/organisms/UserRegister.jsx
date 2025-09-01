import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../utils/alerts';
import { useCreateUser } from '../../hooks/useUsers';

const UserRegister = () => {
    const navigate = useNavigate();
    const { create, loading } = useCreateUser();

    const [form, setForm] = useState({
        id: crypto.randomUUID(),
        email: '',
        name: '',
        phone: '',
        password: '',
        role: 'user',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.name || !form.phone || !form.password) {
            showError('Por favor completa todos los campos obligatorios.');
            return;
        }

        try {
            await create(form);
            showSuccess('Usuario registrado con éxito');
            navigate('/login');
        } catch (err) {
            showError(err.message || 'Error al registrar el usuario');
        }
    };

    return (
        <div className="flex items-center justify-center py-5 bg-[#F5F5F5]">
            <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-[#70205B] text-center">
                    Registro de Usuario
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Correo electrónico *" htmlFor="email">
                        <Input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </FormField>

                    <FormField label="Nombre completo *" htmlFor="name">
                        <Input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </FormField>

                    <FormField label="Teléfono *" htmlFor="phone">
                        <Input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </FormField>

                    <input type="hidden" name="role" value="user" />

                    <FormField label="Contraseña *" htmlFor="password">
                        <Input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </FormField>

                    <Button
                        onClick={handleSubmit}
                        text={loading ? 'Registrando...' : 'Registrar'}
                        type="primary"
                        htmlType="button"
                        className="w-full"
                        disabled={loading}
                    />
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes usuario?{" "}
                    <span
                        className="text-[#70205B] font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Inicia sesión
                    </span>
                </p>
            </div>
        </div>
    );
};

export default UserRegister;
