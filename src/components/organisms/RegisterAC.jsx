import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';
import ImageUpload from '../molecules/ImagenUpload';

const tiposActivo = ['Explícito', 'Físico', 'Tácito'];
const tiposConocimiento = [
    'Proyectos',
    'Publicaciones',
    'Bases de datos',
    'Protocolos',
    'Tablas',
    'Fotos',
    'Videos',
    'Métodos desarrollados o mejorados',
    'Manuales',
    'Prototipos',
    'Herramientas tecnológicas',
    'Muestras biológicas',
    'Software',
    'Productos',
    'Patentes',
    'Marcas registradas',
    'Actas de inicio de proyectos',
    'Eventos organizados',
    'Memorias Eventos',
    'Trabajos presentados en eventos',
    'Premios y distinciones',
    'Archivos de prensa',
    'Trabajos de grado',
    'Informes',
    'Saberes',
    'Experiencias',
];
const formatos = [
    'PDF',
    'DOI',
    'EXCEL',
    'VIDEOS',
    'Word',
    'JPG',
    'JPEG',
    'PNG',
    'GIF',
    'TIFF',
    'BMP',
    'MP3',
    'MP4',
    'FÍSICOS',
    'URL',
];
const origenes = ['Investigación', 'Experiencia', 'Desarrollo', 'Otros'];
const accesibilidad = ['Se puede acceder', 'No se puede acceder'];
const niveles = ['Alta', 'Media', 'Baja'];
const visibilidad = ['Público', 'Privado'];
const estadoAC = ['Finalizado', 'En proceso', 'Suspendido'];

const RegisterAC = () => {
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    fecha: '',
    tipoActivo: '',
    tipoConocimiento: '',
    formato: '',
    palabrasClave: '',
    origen: '',
    ubicacion: '',
    accesible: '',
    clasificacion: '',
    autor: '',
    visibilidad: '',
    propietarioAC: '',
    estadoAC: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', { ...formData, imagen });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
    >
      <FormField label="Imagen del activo" htmlFor="imagen">
        {previewUrl ? (
          <div className="flex flex-col items-start">
            <img
              src={previewUrl}
              alt="Vista previa"
              className="mb-2 w-32 h-32 object-cover rounded border"
            />
            <Button
              type="Primary"
              text="Cambiar imagen"
              onClick={() => {
                setPreviewUrl(null);
                setImagen(null);
              }}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            />
          </div>
        ) : (
          <ImageUpload id="imagen" onChange={handleImageChange} />
        )}
      </FormField>

      <FormField label="Descripción *" htmlFor="descripcion">
        <TextArea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="ID *" htmlFor="id">
        <Input name="id" value={formData.id} onChange={handleChange} required />
      </FormField>

      <FormField label="Título *" htmlFor="titulo">
        <Input name="titulo" value={formData.titulo} onChange={handleChange} required />
      </FormField>

      <FormField label="Autor *" htmlFor="autor">
        <Input name="autor" value={formData.autor} onChange={handleChange} required />
      </FormField>

      <FormField label="Fecha de publicación" htmlFor="fecha">
        <Input name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
      </FormField>

      <FormField label="Tipo de activo" htmlFor="tipoActivo">
        <select
          id="tipoActivo"
          name="tipoActivo"
          value={formData.tipoActivo}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {tiposActivo.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Tipo de conocimiento *" htmlFor="tipoConocimiento">
        <select
          id="tipoConocimiento"
          name="tipoConocimiento"
          value={formData.tipoConocimiento}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {tiposConocimiento.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Formato *" htmlFor="formato">
        <select
          id="formato"
          name="formato"
          value={formData.formato}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {formatos.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Palabras clave" htmlFor="palabrasClave">
        <Input name="palabrasClave" value={formData.palabrasClave} onChange={handleChange} />
      </FormField>

      <FormField label="Origen" htmlFor="origen">
        <select
          id="origen"
          name="origen"
          value={formData.origen}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {origenes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Ubicación" htmlFor="ubicacion">
        <Input name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
      </FormField>

      <FormField label="Propietario del Activo de conocimiento" htmlFor="propietarioAC">
        <Input name="propietarioAC" value={formData.propietarioAC} onChange={handleChange} />
      </FormField>

      <FormField label="Accesibilidad" htmlFor="accesible">
        <select
          id="accesible"
          name="accesible"
          value={formData.accesible}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {accesibilidad.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Visibilidad" htmlFor="visibilidad">
        <select
          id="visibilidad"
          name="visibilidad"
          value={formData.visibilidad}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {visibilidad.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Nivel de clasificación" htmlFor="clasificacion">
        <select
          id="clasificacion"
          name="clasificacion"
          value={formData.clasificacion}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {niveles.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Estado del Activo de conocimiento *" htmlFor="estadoAC">
        <select
          id="estadoAC"
          name="estadoAC"
          value={formData.estadoAC}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione...</option>
          {estadoAC.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </FormField>

      <div className="md:col-span-2 flex justify-center">
        <Button text="Registrar" type="primary" />
      </div>
    </form>
  );
};

export default RegisterAC;