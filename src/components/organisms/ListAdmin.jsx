import React, { useState } from 'react';
import { Pencil, Trash2, X } from "lucide-react";
import { showSuccess, showError, showConfirm } from '../../utils/alerts';

const tabs = [
    { label: 'Tipos Activo', data: ['Explícito', 'Físico', 'Tácito'] },
    {
        label: 'Tipos Conocimiento',
        data: [
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
        ],
    },
    {
        label: 'Formatos',
        data: [
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
        ],
    },
    { label: 'Orígenes', data: ['Investigación', 'Experiencia', 'Desarrollo', 'Otros'] },
    { label: 'Accesibilidad', data: ['Se puede acceder', 'No se puede acceder'] },
    { label: 'Niveles', data: ['Alta', 'Media', 'Baja'] },
    { label: 'Visibilidad', data: ['Público', 'Privado'] },
    { label: 'Estado AC', data: ['Finalizado', 'En proceso', 'Suspendido'] },
];

const AdminTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState("");
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const getDescription = (item) => `Descripción de ${item}`;

    const handleEdit = async (item) => {
        setCurrentItem(item);
        setEditedTitle(item);
        setEditedDescription(getDescription(item));
        setIsEditing(true);
    };

    const handleSave = () => {
        const newTabs = [...tabs];
        const index = newTabs[activeTab].data.indexOf(currentItem);
        if (index !== -1) {
            newTabs[activeTab].data[index] = editedTitle;
        }
        setTabs(newTabs);
        console.log("Guardado:", { titulo: editedTitle, descripcion: editedDescription });
        setIsEditing(false);
    };

    const handleDelete = async (item) => {
        const confirmDelete = await showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer'
        );
    };

    return (
        <div className="p-6 bg-[#FBFBFB]">
            <div className="flex border-b mb-4">
                {tabs.map((tab, tabIndex) => (
                    <button
                        key={tab.label}
                        className={`px-4 py-2 -mb-px border-b-2 font-medium focus:outline-none ${activeTab === tabIndex
                            ? 'border-[#70205B] text-[#70205B]'
                            : 'border-transparent text-gray-700'
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

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={() => setIsEditing(false)}
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Editar elemento</h2>

                        <label className="block text-sm font-medium">Título</label>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />

                        <label className="block text-sm font-medium">Descripción</label>
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded bg-[#70205B] text-white hover:bg-[#50153f]"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTabs;
