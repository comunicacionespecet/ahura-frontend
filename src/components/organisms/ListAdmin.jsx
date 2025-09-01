import React, { useState } from 'react';
import { Pencil, Trash2, X, Plus } from 'lucide-react';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';
import {
    useCatalogs,
    usePostCatalogItem,
    useUpdateCatalog,
    useDeleteCatalogItem,
} from '../../hooks/useCatalogs';

const AdminTabs = () => {
    const { catalogs, setCatalogs, loading, error } = useCatalogs();
    const { postItem } = usePostCatalogItem();
    const { updateItem } = useUpdateCatalog();
    const { deleteItem } = useDeleteCatalogItem();

    const [activeTab, setActiveTab] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    if (loading) return <p className="p-6">Cargando...</p>;
    if (error)
        return <p className="p-6 text-red-600">Error: {error.message}</p>;
    if (!catalogs) return <p className="p-6">No hay catálogos disponibles</p>;

    const tabs = Object.keys(catalogs);
    const tabLabels = {
        activeKnowledgeTypeEnum: 'Tipos de conocimiento',
        formatEnum: 'Formatos',
        knowledgeTypeEnum: 'Tipo de activo de conocimiento',
        originEnum: 'Origen',
        classificationLevelLevelEnum: 'Nivel de clasificación',
        criticalityEnum: 'Criticidad',
        assetStatusEnum: 'Estado del activo',
    };

    const handleEdit = (item, tabName) => {
        setCurrentItem({ ...item, tabName });
        setEditedTitle(item.key ?? item.title);
        setEditedDescription(item.descripcion ?? item.description ?? '');
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!currentItem) return;
        try {
            const updatedBody = { ...catalogs };
            const enumList = updatedBody[currentItem.tabName] || [];
            const idx = enumList.findIndex(
                (i) =>
                    (i.key ?? i.title) ===
                    (currentItem.key ?? currentItem.title)
            );
            if (idx !== -1) {
                enumList[idx] = {
                    ...enumList[idx],
                    key: editedTitle,
                    title: editedTitle,
                    descripcion: editedDescription,
                    description: editedDescription,
                };
                updatedBody[currentItem.tabName] = enumList;
            }

            await updateItem(updatedBody.slug ?? 'default', updatedBody);
            setCatalogs(updatedBody);
            setCurrentItem(null);
            setIsEditing(false);
            showSuccess('Elemento actualizado correctamente');
        } catch (err) {
            console.error(err);
            showError('Error actualizando elemento');
        }
    };

    // Eliminar elemento
    const handleDelete = async (item, tabName) => {
        const confirmDelete = await showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer'
        );
        if (!confirmDelete) return;

        try {
            const slug = catalogs.slug ?? 'default';
            await deleteItem(
                slug,
                tabName,
                item.key ?? item.title,
                setCatalogs
            );
            showSuccess('Elemento eliminado correctamente');
        } catch (err) {
            console.error(err);
            showError('Error eliminando elemento');
        }
    };

    // Agregar nuevo elemento
    const handleAdd = async () => {
        try {
            const slug = catalogs.slug ?? 'default';
            await postItem(
                slug,
                tabs[activeTab],
                { key: editedTitle, descripcion: editedDescription },
                setCatalogs
            );
            setEditedTitle('');
            setEditedDescription('');
            setIsAdding(false);
            showSuccess('Elemento agregado correctamente');
        } catch (err) {
            console.error(err);
            showError('Error agregando elemento');
        }
    };

    return (
        <div className="p-6 bg-[#FBFBFB]">
            <div className="flex border-b mb-4 overflow-x-auto">
                <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden">
                    {tabs.map((tabName, i) => (
                        <button
                            key={tabName}
                            className={`flex-shrink-0 whitespace-nowrap px-4 py-2 -mb-px border-b-2 font-medium focus:outline-none transition-all duration-200
                                ${
                                    activeTab === i
                                        ? 'border-[#70205B] text-[#70205B] font-semibold bg-[#F3EAF1] rounded-t-lg shadow-sm'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab(i)}
                        >
                            {tabLabels[tabName] ?? tabName}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab !== null && (
                <div className="p-4 bg-white rounded shadow overflow-x-auto">
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={() => {
                                setIsAdding(true);
                                setEditedTitle('');
                                setEditedDescription('');
                            }}
                            className="flex items-center gap-1 px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                            <Plus size={16} /> Agregar
                        </button>
                    </div>
                    <table className="min-w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Título</th>
                                <th className="px-4 py-2">Descripción</th>
                                <th className="px-4 py-2 text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogs[tabs[activeTab]].map((item, idx) => (
                                <tr
                                    key={`${item.key ?? item.title}-${idx}`}
                                    className="border-t"
                                >
                                    <td className="px-4 py-2">
                                        {item.key ?? item.title}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.descripcion ?? item.description}
                                    </td>
                                    <td className="px-4 py-2 flex justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleEdit(
                                                    item,
                                                    tabs[activeTab]
                                                )
                                            }
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Editar"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    item,
                                                    tabs[activeTab]
                                                )
                                            }
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
            )}

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={() => setIsEditing(false)}
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">
                            Editar elemento
                        </h2>

                        <label className="block text-sm font-medium">
                            Título
                        </label>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />

                        <label className="block text-sm font-medium">
                            Descripción
                        </label>
                        <textarea
                            value={editedDescription}
                            onChange={(e) =>
                                setEditedDescription(e.target.value)
                            }
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

            {isAdding && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={() => setIsAdding(false)}
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">
                            Agregar elemento
                        </h2>

                        <label className="block text-sm font-medium">
                            Título
                        </label>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />

                        <label className="block text-sm font-medium">
                            Descripción
                        </label>
                        <textarea
                            value={editedDescription}
                            onChange={(e) =>
                                setEditedDescription(e.target.value)
                            }
                            className="w-full p-2 border rounded mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTabs;
