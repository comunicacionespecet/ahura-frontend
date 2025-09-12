import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { useFilteredACs, useExportACs } from "../../hooks/useACs";
import { useAuth } from "../../context/AuthContext";
import LoadingScreen from "../../utils/LoadingScreen";
import { useCatalogs } from "../../hooks/useCatalogs";
import Pagination from "../molecules/Pagination";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const getFieldLabel = (field) => {
    const labels = {
        title: "Título",
        knowledgeType: "Tipo de activo",
        format: "Formato",
        classificationLevelLevel: "Clasificación",
        status: "Estatus",
        keywords: "Palabras clave",
        responsibleOwner: "Autor",
        publishDate: "Fecha",
    };
    return labels[field] || field;
};

const formatFieldValue = (field, item) => {
    if (field === "publishDate") return new Date(item.publishDate).toLocaleDateString("es-CO");
    if (field === "classificationLevelLevel") return item.classificationLevel?.level || "";
    return item[field] || "";
};

const buildTableConfig = (filters, data) => {
    const headers = ["Título"];
    if (filters.format) headers.push("Formato");
    if (filters.knowledgeType) headers.push("Tipo de activo");
    if (filters.status) headers.push("Estatus");
    if (filters.classificationLevelLevel) headers.push("Clasificación");
    headers.push("Autor", "Fecha");

    const rows = data.map((item) => {
        const row = [item.title || ""];
        if (filters.format) row.push(item.format || "");
        if (filters.knowledgeType) row.push(item.knowledgeType || "");
        if (filters.status) row.push(item.status || "");
        if (filters.classificationLevelLevel) row.push(item.classificationLevel?.level || "");
        row.push(item.responsibleOwner || "");
        row.push(new Date(item.publishDate).toLocaleDateString("es-CO"));
        return row;
    });

    return { headers, rows };
};

const SearchAC = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    const [titulo, setTitulo] = useState("");
    const [tipoActivo, setTipoActivo] = useState("");
    const [palabrasClave, setPalabrasClave] = useState("");
    const [clasificacion, setClasificacion] = useState("");
    const [estatus, setEstatus] = useState("");
    const [formato, setFormato] = useState("");

    const { catalogs } = useCatalogs();
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const limit = 10;

    const { acs, loading, error, total, totalPages } = useFilteredACs(filters, page, limit);
    const { exportAll, loading: loadingExport } = useExportACs();

    const generatePDF = (data, title, filters) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor("#026937");
        doc.text("PECET - Universidad de Antioquia", 14, 20);

        doc.setFontSize(14);
        doc.setTextColor("#000000");
        doc.text(title, 14, 30);

        doc.setFontSize(10);
        doc.text(`Fecha de exportación: ${new Date().toLocaleString("es-CO")}`, 14, 40);

        if (filters && Object.keys(filters).length > 0) {
            doc.text("Filtros aplicados:", 14, 50);
            let y = 55;
            Object.entries(filters).forEach(([key, value]) => {
                doc.text(`- ${getFieldLabel(key)}: ${value}`, 20, y);
                y += 5;
            });
        }

        const { headers, rows } = buildTableConfig(filters, data);
        autoTable(doc, {
            head: [headers],
            body: rows,
            startY: 70,
            styles: { fontSize: 10 },
            headStyles: { fillColor: "#026937", textColor: "#FFFFFF" },
            alternateRowStyles: { fillColor: "#F2F2F2" },
        });

        doc.save(`${title}.pdf`);
    };

    const handleExport = async () => {
        try {
            const allAssets = await exportAll(filters);
            generatePDF(allAssets, "Reporte - Activos de Conocimiento", filters);
        } catch (err) {
            console.error("Error exportando", err);
        }
    };

    const handleSearch = () => {
        const newFilters = {};
        if (titulo) newFilters.title = titulo;
        if (tipoActivo) newFilters.knowledgeType = tipoActivo;
        if (palabrasClave) newFilters.keywords = palabrasClave;
        if (clasificacion) newFilters.classificationLevelLevel = clasificacion;
        if (estatus) newFilters.status = estatus;
        if (formato) newFilters.format = formato;

        setFilters(newFilters);
        setPage(1);
    };

    const handleView = (id) => {
        if (isAdmin) navigate(`/registrar/${id}`);
        else navigate(`/ver/${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FBFBFB] p-4 rounded">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-4xl font-bold mb-4">Buscar activo de conocimiento</h4>

                <FormField label="Título" htmlFor="titulo">
                    <Input
                        name="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Buscar por título"
                    />
                </FormField>

                <FormField label="Clasificación" htmlFor="clasificacion">
                    <select
                        id="clasificacion"
                        value={clasificacion}
                        onChange={(e) => setClasificacion(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.classificationLevelLevelEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Formato" htmlFor="formato">
                    <select
                        id="formato"
                        value={formato}
                        onChange={(e) => setFormato(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.formatEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Tipo de activo" htmlFor="tipoActivo">
                    <select
                        id="tipoActivo"
                        value={tipoActivo}
                        onChange={(e) => setTipoActivo(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.knowledgeTypeEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Estatus" htmlFor="estatus">
                    <select
                        id="estatus"
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        className="w-full p-2 border border-[#8DC63F] rounded"
                    >
                        <option value="">Seleccione...</option>
                        {catalogs?.assetStatusEnum?.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.key}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Palabras clave" htmlFor="palabrasClave">
                    <Input
                        name="palabrasClave"
                        value={palabrasClave}
                        onChange={(e) => setPalabrasClave(e.target.value)}
                        placeholder="Ej: innovación, IA..."
                    />
                </FormField>

                <div className="mt-4 flex justify-end gap-2">
                    <Button text="Buscar" type="success" onClick={handleSearch} />
                    <Button
                        text={loadingExport ? "Exportando..." : "Exportar PDF"}
                        type="secondary"
                        onClick={handleExport}
                        disabled={loadingExport}
                    />
                </div>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-4xl font-bold mb-4 text-[#70205B]">Resultados</h4>

                {loading ? (
                    <LoadingScreen />
                ) : error ? (
                    <p className="text-red-500">Error cargando activos</p>
                ) : acs.length === 0 ? (
                    <p className="text-gray-500">No se encontraron resultados</p>
                ) : (
                    <>
                        <p className="text-gray-600 mb-2">
                            Mostrando {(page - 1) * limit + 1}–{Math.min(page * limit, total)} de {total} resultados
                        </p>

                        {acs.map((item) => (
                            <div key={item.id} className="border-b py-3">
                                <p className="font-bold text-[#026937]">{item.title}</p>
                                <p className="text-sm">
                                    <span className="text-[#7E7373] font-bold">Tipo: </span>
                                    <span className="text-black font-bold">{item.activeKnowledgeType}</span>

                                    <span className="text-[#7E7373] font-bold"> | Año: </span>
                                    <span className="text-black font-bold">
                                        {new Date(item.publishDate).getFullYear()}
                                    </span>

                                    <span className="text-[#7E7373] font-bold"> | Autor: </span>
                                    <span className="text-black font-bold">{item.responsibleOwner}</span>
                                </p>

                                <button
                                    className="text-[#137598] text-sm underline mt-1"
                                    onClick={() => handleView(item.id)}
                                >
                                    Ver más
                                </button>
                            </div>
                        ))}

                        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchAC;
