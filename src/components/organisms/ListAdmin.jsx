import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const tabs = [
  { label: 'Tipos Activo', data: ['Explícito', 'Físico', 'Tácito'] },
  { label: 'Tipos Conocimiento', data: [
    'Proyectos', 'Publicaciones', 'Bases de datos', 'Protocolos', 'Tablas', 'Fotos', 'Videos',
    'Métodos desarrollados o mejorados', 'Manuales', 'Prototipos', 'Herramientas tecnológicas',
    'Muestras biológicas', 'Software', 'Productos', 'Patentes', 'Marcas registradas',
    'Actas de inicio de proyectos', 'Eventos organizados', 'Memorias Eventos',
    'Trabajos presentados en eventos', 'Premios y distinciones', 'Archivos de prensa',
    'Trabajos de grado', 'Informes', 'Saberes', 'Experiencias',
  ] },
  { label: 'Formatos', data: [
    'PDF', 'DOI', 'EXCEL', 'VIDEOS', 'Word', 'JPG', 'JPEG', 'PNG', 'GIF', 'TIFF', 'BMP',
    'MP3', 'MP4', 'FÍSICOS', 'URL',
  ] },
  { label: 'Orígenes', data: ['Investigación', 'Experiencia', 'Desarrollo', 'Otros'] },
  { label: 'Accesibilidad', data: ['Se puede acceder', 'No se puede acceder'] },
  { label: 'Niveles', data: ['Alta', 'Media', 'Baja'] },
  { label: 'Visibilidad', data: ['Público', 'Privado'] },
  { label: 'Estado AC', data: ['Finalizado', 'En proceso', 'Suspendido'] },
];

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const getDescription = (item) => `Descripción de ${item}`;

  const handleEdit = (item) => {
    alert(`Editar: ${item}`);
  };

  const handleDelete = (item) => {
    alert(`Borrar: ${item}`);
  };

  return (
    <div className='p-6 bg-[#FBFBFB]'>
      <div className="flex border-b mb-4">
        {tabs.map((tab, tabIndex) => (
          <button
            key={tab.label}
            className={`px-4 py-2 -mb-px border-b-2 font-medium focus:outline-none ${
              activeTab === tabIndex
                ? 'border-[#70205B] text-[#70205B]'
                : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab(tabIndex)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tabs[activeTab].data.map((item) => (
              <tr key={item} className="border-t">
                <td className="px-4 py-2">{item}</td>
                <td className="px-4 py-2">{getDescription(item)}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:text-red-800"
                    title="Borrar"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTabs;