import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../utils/alerts';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const { login, loading } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            showError('Por favor ingresa un correo electrónico válido.');
            return;
        }

        try {
            await login(form.email, form.password);
            showSuccess('¡Bienvenido!');
            navigate('/');
        } catch (err) {
            showError('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex items-center justify-center py-5 bg-[#F5F5F5]">
            <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-[#70205B] text-center">
                    Iniciar sesión
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Usuario *" htmlFor="username">
                        <Input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </FormField>

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
                        text="Iniciar Sesión"
                        type="primary"
                        htmlType="button"
                    />
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿No tienes usuario?{' '}
                    <span
                        className="text-[#70205B] font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate('/registerUser')}
                    >
                        Regístrate
                    </span>
                </p>

                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿Olvidaste tu contraseña?{" "}
                    <span
                        className="text-[#70205B] font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate('/recoveryUser')}
                    >
                        Recupérala aquí
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
