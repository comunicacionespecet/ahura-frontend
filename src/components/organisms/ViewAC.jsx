import React, { useState } from "react";
import CommentsSection from "../organisms/CommentSection";

const getFileType = (fileUrl) => {
    if (!fileUrl) return "";
    const ext = fileUrl.split(".").pop().toLowerCase();
    if (
        [
            "pdf",
            "doc",
            "docx",
            "xls",
            "xlsx",
            "jpg",
            "jpeg",
            "png",
            "ppt",
            "pptx",
            "mp4",
            "mp3",
        ].includes(ext)
    ) {
        return ext;
    }
    return "";
};

const ViewAC = ({ ac, user }) => {
    if (!ac) return <div>No se encontró el activo.</div>;

    const signedFileUrl = ac.signedFileUrl;
    const cleanUrl = signedFileUrl?.split("?")[0];
    const fileType = getFileType(cleanUrl);

    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
        signedFileUrl
    )}&embedded=true`;
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        signedFileUrl
    )}`;

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="bg-white p-6 rounded shadow max-w-6xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold mb-4">{ac.title}</h2>

            {/* Tabs Header */}
            <div className="flex border-b mb-4">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-4 py-2 -mb-px border-b-2 ${activeTab === "overview"
                            ? "border-green-600 text-green-600 font-semibold"
                            : "border-transparent text-gray-500 hover:text-green-600"
                        }`}
                >
                    Resumen
                </button>
                <button
                    onClick={() => setActiveTab("details")}
                    className={`px-4 py-2 -mb-px border-b-2 ${activeTab === "details"
                            ? "border-green-600 text-green-600 font-semibold"
                            : "border-transparent text-gray-500 hover:text-green-600"
                        }`}
                >
                    Detalles
                </button>
                <button
                    onClick={() => setActiveTab("file")}
                    className={`px-4 py-2 -mb-px border-b-2 ${activeTab === "file"
                            ? "border-green-600 text-green-600 font-semibold"
                            : "border-transparent text-gray-500 hover:text-green-600"
                        }`}
                >
                    Archivo
                </button>
            </div>

            {/* Tabs Content */}
            {activeTab === "overview" && (
                <div className="flex flex-col md:flex-row gap-6">
                    {ac.signedImageUrl && (
                        <div className="md:w-1/2 flex justify-center">
                            <img
                                src={ac.signedImageUrl}
                                alt="Imagen del AC"
                                className="max-w-full max-h-96 object-contain rounded"
                            />
                        </div>
                    )}
                    <div className="md:w-1/2 space-y-2">
                        <p className="whitespace-pre-line break-words">
                            <strong>Descripción:</strong> {ac.description || "No Aplica"}
                        </p>

                        <p>
                            <strong>Autor / Responsable:</strong>{" "}
                            {ac.responsibleOwner || "No Aplica"}
                        </p>
                        <p>
                            <strong>Fecha de Publicación:</strong>{" "}
                            {ac.publishDate
                                ? new Date(ac.publishDate).toLocaleDateString("es-CO")
                                : "No Aplica"}
                        </p>
                    </div>
                </div>
            )}

            {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                        <strong>Tipo de Activo:</strong> {ac.assetType || "No Aplica"}
                    </p>
                    <p>
                        <strong>Tipo de Conocimiento:</strong> {ac.knowledgeType || "No Aplica"}
                    </p>
                    <p>
                        <strong>Formato:</strong> {ac.format || "No Aplica"}
                    </p>
                    <p>
                        <strong>Palabras Clave:</strong> {ac.keywords || "No Aplica"}
                    </p>
                    <p>
                        <strong>Origen:</strong> {ac.origin || "No Aplica"}
                    </p>
                    <p>
                        <strong>Ubicación (Repositorio):</strong>{" "}
                        {ac.howIsItStored?.centralicedRepositories || "No Aplica"}
                    </p>
                    <p>
                        <strong>Accesible:</strong>{" "}
                        {ac.availability?.accessibility ? "Sí" : "No Aplica"}
                    </p>
                    <p>
                        <strong>Nivel de Clasificación:</strong>{" "}
                        {ac.classificationLevel?.level || "No Aplica"}
                    </p>
                    <p>
                        <strong>Nivel de Confidencialidad:</strong>{" "}
                        {ac.confidentialityLevel?.level || "No Aplica"}
                    </p>
                    <p>
                        <strong>Estado:</strong> {ac.status || "No Aplica"}
                    </p>
                    <p>
                        <strong>Copyright:</strong> {ac.copyright || "No Aplica"}
                    </p>
                    <p>
                        <strong>Patentes:</strong> {ac.patents || "No Aplica"}
                    </p>
                    <p>
                        <strong>Secretos Comerciales:</strong> {ac.tradeSecrets || "No Aplica"}
                    </p>
                    <p>
                        <strong>Diseños Industriales:</strong>{" "}
                        {ac.industrialDesigns || "No Aplica"}
                    </p>
                    <p>
                        <strong>Marcas:</strong> {ac.brands || "No Aplica"}
                    </p>
                    <p>
                        <strong>Propiedad Intelectual Industrial:</strong>{" "}
                        {ac.industrialIntellectualProperty || "No Aplica"}
                    </p>
                </div>
            )}

            {activeTab === "file" && (
                <div>
                    {signedFileUrl && fileType === "pdf" && (
                        <iframe
                            src={googleViewerUrl}
                            title="Vista previa PDF"
                            width="100%"
                            height="600px"
                            className="mb-4 border"
                        />
                    )}

                    {signedFileUrl &&
                        ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(fileType) && (
                            <iframe
                                src={officeViewerUrl}
                                title="Vista previa Office"
                                width="100%"
                                height="600px"
                                className="mb-4 border"
                            />
                        )}

                    {signedFileUrl && fileType === "mp4" && (
                        <video controls width="100%" className="mb-4 rounded border">
                            <source src={signedFileUrl} type="video/mp4" />
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    )}

                    {signedFileUrl && fileType === "mp3" && (
                        <audio controls className="mb-4 w-full rounded border">
                            <source src={signedFileUrl} type="audio/mpeg" />
                            Tu navegador no soporta la etiqueta de audio.
                        </audio>
                    )}

                    {signedFileUrl && ["jpg", "jpeg", "png"].includes(fileType) && (
                        <img
                            src={signedFileUrl}
                            alt="Vista previa"
                            className="max-w-full h-auto mb-4"
                        />
                    )}
                </div>
            )}

            {/* Comentarios siempre visibles */}
            <CommentsSection assetId={ac.id} authorId={user?.id} />
        </div>
    );
};

export default ViewAC;
