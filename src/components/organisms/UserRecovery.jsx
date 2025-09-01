import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../utils/alerts';

const UserRecovery = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Por favor ingresa un correo electrónico válido.');
            return;
        }

        try {
            // Aquí deberías llamar a tu API de recuperación
            // Ejemplo: await recoveryPassword(email);

            showSuccess('Se han enviado las instrucciones de recuperación a tu correo.');
            navigate('/login'); // Redirige después de éxito
        } catch (err) {
            showError('No se pudo enviar el correo de recuperación.');
        }
    };

    return (
        <div className="flex items-center justify-center py-5 bg-[#F5F5F5]">
            <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-[#70205B] text-center">
                    Recuperar contraseña
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Correo electrónico *" htmlFor="email">
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="ejemplo@correo.com"
                        />
                    </FormField>

                    <Button
                        onClick={handleSubmit}
                        text="Recuperar contraseña"
                        type="primary"
                        htmlType="button"
                        className="w-full"
                    />
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Recordaste tu contraseña?{" "}
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

export default UserRecovery;
