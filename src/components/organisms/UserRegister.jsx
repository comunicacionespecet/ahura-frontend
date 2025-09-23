import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../utils/alerts';
import { useCreateUser } from '../../hooks/useUsers';
import { v4 as uuidv4 } from 'uuid';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRegex = /^\+?\d[\d\s]{6,14}\d$/;

const UserRegister = () => {
    const navigate = useNavigate();
    const { create, loading } = useCreateUser();

    const [form, setForm] = useState({
        id: uuidv4(),
        email: '',
        name: '',
        phone: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = (values, confirmPwd) => {
        const e = {};

        if (!values.email) e.email = 'El correo es obligatorio.';
        else if (!emailRegex.test(values.email)) e.email = 'Correo inválido.';

        if (!values.name) e.name = 'El nombre es obligatorio.';

        if (!values.phone) e.phone = 'El teléfono es obligatorio.';
        else if (!phoneRegex.test(values.phone)) e.phone = 'Teléfono inválido.';

        if (!values.password) e.password = 'La contraseña es obligatoria.';
        else if (values.password.length < 8)
            e.password = 'Mínimo 8 caracteres.';

        if (!confirmPwd) e.confirmPassword = 'Confirma tu contraseña.';
        else if (values.password !== confirmPwd)
            e.confirmPassword = 'Las contraseñas no coinciden.';

        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => {
            const next = { ...prev };
            if (name === 'email') {
                if (!value) next.email = 'El correo es obligatorio.';
                else if (!emailRegex.test(value))
                    next.email = 'Correo inválido.';
                else delete next.email;
            }
            if (name === 'name') {
                if (!value) next.name = 'El nombre es obligatorio.';
                else delete next.name;
            }
            if (name === 'phone') {
                if (!value) next.phone = 'El teléfono es obligatorio.';
                else if (!phoneRegex.test(value))
                    next.phone = 'Teléfono inválido.';
                else delete next.phone;
            }
            if (name === 'password') {
                if (!value) next.password = 'La contraseña es obligatoria.';
                else if (value.length < 8)
                    next.password = 'Mínimo 8 caracteres.';
                else delete next.password;

                if (confirmPassword && value !== confirmPassword)
                    next.confirmPassword = 'Las contraseñas no coinciden.';
                else if (confirmPassword) delete next.confirmPassword;
            }
            return next;
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const foundErrors = validate(form, confirmPassword);
        setErrors(foundErrors);
        setTouched({
            email: true,
            name: true,
            phone: true,
            password: true,
            confirmPassword: true,
        });

        if (Object.keys(foundErrors).length > 0) {
            showError('Revisa los campos marcados en rojo.');
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

    const fieldClass = (field) =>
        touched[field] && errors[field]
            ? 'border-red-500'
            : touched[field] && !errors[field]
              ? 'border-green-500'
              : '';

    return (
        <div className="flex items-center justify-center py-5 bg-[#F5F5F5]">
            <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-[#70205B] text-center">
                    Registro de Usuario
                </h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <FormField label="Correo electrónico *" htmlFor="email">
                        <Input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="Ej: nombre@empresa.com"
                            className={fieldClass('email')}
                        />
                        {touched.email && errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email}
                            </p>
                        )}
                    </FormField>

                    <FormField label="Nombre completo *" htmlFor="name">
                        <Input
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="Ej: Laura Restrepo"
                            className={fieldClass('name')}
                        />
                        {touched.name && errors.name && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.name}
                            </p>
                        )}
                    </FormField>

                    <FormField label="Teléfono *" htmlFor="phone">
                        <Input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="Ej: 300 123 4567"
                            className={fieldClass('phone')}
                            inputMode="tel"
                        />
                        {touched.phone && errors.phone && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </FormField>

                    <input type="hidden" name="role" value="user" />

                    <FormField label="Contraseña *" htmlFor="password">
                        <Input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="Mín. 8 caracteres"
                            className={fieldClass('password')}
                        />
                        {touched.password && errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </FormField>

                    <FormField
                        label="Confirmar contraseña *"
                        htmlFor="confirmPassword"
                    >
                        <Input
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => {
                                const v = e.target.value;
                                setConfirmPassword(v);
                                setErrors((prev) => {
                                    const next = { ...prev };
                                    if (!v)
                                        next.confirmPassword =
                                            'Confirma tu contraseña.';
                                    else if (v !== form.password)
                                        next.confirmPassword =
                                            'Las contraseñas no coinciden.';
                                    else delete next.confirmPassword;
                                    return next;
                                });
                            }}
                            onBlur={handleBlur}
                            required
                            placeholder="Repite tu contraseña"
                            className={fieldClass('confirmPassword')}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                        {touched.confirmPassword &&
                            !errors.confirmPassword &&
                            confirmPassword && (
                                <p className="text-sm text-green-600 mt-1">
                                    ✅ Contraseñas coinciden.
                                </p>
                            )}
                    </FormField>

                    <Button
                        text={loading ? 'Registrando...' : 'Registrar'}
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                        disabled={loading}
                    />
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes usuario?{' '}
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
