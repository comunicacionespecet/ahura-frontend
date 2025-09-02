import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../utils/alerts';
import { usePasswordRecovery, usePasswordResetConfirm } from '../../hooks/useUsers';

const UserRecovery = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const { request, loading: loadingRequest } = usePasswordRecovery();
    const { confirm, loading: loadingConfirm } = usePasswordResetConfirm();

    const handleRequest = async (e) => {
        e.preventDefault();
        try {
            await request(email);
            showSuccess('Se envió un código a tu correo.');
            setStep(2);
        } catch (err) {
            showError(err.message);
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showError('Las contraseñas no coinciden.');
            return;
        }

        try {
            await confirm(email, code, password);
            showSuccess('Contraseña actualizada con éxito');
            navigate('/login');
        } catch (err) {
            showError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center py-5 bg-[#F5F5F5]">
            <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-[#70205B] text-center">
                    Recuperar contraseña
                </h2>

                {step === 1 && (
                    <form onSubmit={handleRequest} className="space-y-4">
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
                            text={loadingRequest ? 'Enviando...' : 'Enviar código'}
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            disabled={loadingRequest}
                        />
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleConfirm} className="space-y-4">
                        <FormField label="Código recibido *" htmlFor="code">
                            <Input
                                type="text"
                                name="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                placeholder="Ej: 123456"
                            />
                        </FormField>

                        <FormField label="Nueva contraseña *" htmlFor="password">
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Mínimo 8 caracteres"
                            />
                        </FormField>

                        <FormField label="Confirmar contraseña *" htmlFor="confirmPassword">
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Repite tu contraseña"
                            />
                        </FormField>

                        <Button
                            text={loadingConfirm ? 'Cambiando...' : 'Cambiar contraseña'}
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            disabled={loadingConfirm}
                        />
                    </form>
                )}

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Recordaste tu contraseña?{' '}
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
