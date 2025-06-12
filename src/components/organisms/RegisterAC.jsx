import React, { useState } from "react";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import Button from "../atoms/Button";
import ImageUpload from "../molecules/ImagenUpload";

const RegisterAC = () => {

    const [imagen, setImagen] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        autor: "",
        fecha: "",
        imagen: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        // Para conectarse con la API
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
        >

            <FormField label="Imagen del activo">
                {previewUrl ? (
                    <div className="flex flex-col items-start">
                        <img
                            src={previewUrl}
                            alt="Vista previa"
                            className="mb-2 w-32 h-32 object-cover rounded border"
                        />
                        <Button
                            type="Primary"
                            text={"Cambiar imagen"}
                            onClick={() => {
                                setPreviewUrl(null);
                                setImagen(null);
                            }}
                            className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                        </Button>
                    </div>
                ) : (
                    <ImageUpload onChange={handleImageChange} />
                )}
            </FormField>


            <FormField label="Descripción">
                <TextArea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </FormField>

            <FormField label="Nombre del activo">
                <Input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </FormField>

            <FormField label="Autor">
                <Input
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                />
            </FormField>

            <FormField label="Fecha">
                <Input
                    name="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={handleChange}
                />
            </FormField>

            <div className="md:col-span-2 flex justify-center">
                <Button text="Registrar" type="primary" />
            </div>
        </form>

    );
};

export default RegisterAC;
