import React, { useState, useMemo } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { useCatalogs } from "../../hooks/useCatalogs";
import { useACs } from "../../hooks/useACs";

export default function Dashboard() {
    const { catalogs, loading: loadingCatalogs, error: errorCatalogs } = useCatalogs();
    const { acs: allActivos, loading: loadingActivos, error: errorActivos } = useACs();

    const categoriaLabels = {
        activeKnowledgeType: "Tipos de conocimiento",
        format: "Formatos",
        knowledgeType: "Tipos de activo",
        origin: "Origen",
        classificationLevelLevel: "Nivel de clasificación",
        criticality: "Criticidad",
        assetStatus: "Estado del activo",
        repository: "Repositorios del PECET",
    };

    const categoriaPropiedad = {
        activeKnowledgeType: "tipo",
        knowledgeType: "tipo",
        format: "formato",
        origin: "origin",
        classificationLevelLevel: "nivelClasificacion",
        criticality: "criticidad",
        assetStatus: "estadoActivo",
        repository: "repository",
    };

    const catalogActual = catalogs ?? {};
    const initialCategoria =
        Object.keys(catalogActual).length > 0
            ? Object.keys(catalogActual)[0].replace("Enum", "")
            : "Todos";

    const [categoria, setCategoria] = useState(initialCategoria);
    const catalogOpciones =
        categoria !== "Todos" ? catalogActual[categoria + "Enum"] ?? [] : [];
    const opciones = ["Todos", ...catalogOpciones.map((i) => i.key)];
    const [opcion, setOpcion] = useState("Todos");

    const activosMapeados = useMemo(() => {
        if (!allActivos) return [];
        return allActivos.map((a) => ({
            titulo: a.title,
            tipo: a.knowledgeType, 
            formato: a.format,
            visibilidad: a.confidentiality ? "Público" : "Privado",
            criticidad: a.criticality,
            descargas: a.downloadCount,
            vistas: a.viewCount,
            estadoActivo: a.status,
            origin: a.origin,
            repository: a.howIsItStored?.pecetKnowledge || "",
        }));
    }, [allActivos]);

    const activosFiltrados = useMemo(() => {
        if (!activosMapeados) return [];
        if (categoria === "Todos" && opcion === "Todos") return activosMapeados;

        const prop = categoriaPropiedad[categoria] ?? categoria;
        if (opcion === "Todos") return activosMapeados;
        return activosMapeados.filter((a) => a[prop] === opcion);
    }, [activosMapeados, categoria, opcion]);

    const stats = useMemo(() => {
        if (!activosFiltrados) return {};
        let porTipoData = [];

        if (categoria === "format") {
            const formatos = [...new Set(activosFiltrados.map((a) => a.formato))];
            porTipoData = formatos.map((f) => ({
                name: f,
                value: activosFiltrados.filter((a) => a.formato === f).length,
            }));
        } else {
            const tipos = [...new Set(activosFiltrados.map((a) => a.tipo))];
            porTipoData = tipos.map((t) => ({
                name: t,
                value: activosFiltrados.filter((a) => a.tipo === t).length,
            }));
        }

        return {
            totalActivos: activosFiltrados.length,
            publicos: activosFiltrados.filter((a) => a.visibilidad === "Público").length,
            privados: activosFiltrados.filter((a) => a.visibilidad === "Privado").length,
            descargas: activosFiltrados.reduce((acc, a) => acc + a.descargas, 0),
            vistas: activosFiltrados.reduce((acc, a) => acc + a.vistas, 0),
            porTipo: porTipoData,
        };
    }, [activosFiltrados, categoria]);

    if (loadingCatalogs || loadingActivos)
        return <p className="p-6">Cargando...</p>;
    if (errorCatalogs)
        return <p className="p-6 text-red-600">Error: {errorCatalogs.message}</p>;
    if (errorActivos)
        return <p className="p-6 text-red-600">Error: {errorActivos.message}</p>;

    return (
        <Container maxWidth={false} sx={{ width: "90%", py: 4 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Categoría</InputLabel>
                        <Select
                            value={categoria}
                            onChange={(e) => {
                                setCategoria(e.target.value);
                                setOpcion("Todos");
                            }}
                        >
                            <MenuItem value="Todos">Todos</MenuItem>
                            {Object.keys(catalogActual).map((key) => {
                                const baseKey = key.replace("Enum", "");
                                return (
                                    <MenuItem key={key} value={baseKey}>
                                        {categoriaLabels[baseKey] ?? baseKey}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Opción</InputLabel>
                        <Select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                            {opciones.map((opt, i) => (
                                <MenuItem key={i} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center">
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        width: "100%",
                        mx: "auto",
                    }}
                >
                    {[
                        { label: "Total Activos", value: stats.totalActivos },
                        { label: "Públicos", value: stats.publicos },
                        { label: "Privados", value: stats.privados },
                        { label: "Descargas", value: stats.descargas },
                        { label: "Vistas", value: stats.vistas },
                    ].map((item, i) => (
                        <Card
                            key={i}
                            sx={{
                                flexGrow: 1,
                                textAlign: "center",
                                flexBasis: {
                                    xs: "100%",
                                    sm: "calc(50% - 16px)",
                                    md: "calc(20% - 16px)",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{item.label}</Typography>
                                <Typography variant="h5">{item.value}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Grid>

            <Grid
                container
                spacing={3}
                py={2}
                justifyContent="center"
                alignItems="stretch"
                sx={{ width: "100%", mx: "auto", display: "flex", flexWrap: "wrap", gap: 3 }}
            >
                <Paper
                    sx={{
                        p: 2,
                        flexGrow: 1,
                        flexBasis: { xs: "100%", sm: "calc(50% - 16px)" },
                        maxWidth: "100%",
                        height: 360,
                    }}
                >
                    <Typography variant="h6" gutterBottom align="center">
                        Visibilidad
                    </Typography>
                    <Box sx={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Públicos", value: stats.publicos },
                                        { name: "Privados", value: stats.privados },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="70%"
                                    dataKey="value"
                                >
                                    <Cell fill="#4CAF50" />
                                    <Cell fill="#FF5722" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>

                <Paper
                    sx={{
                        p: 2,
                        flexGrow: 1,
                        flexBasis: { xs: "100%", sm: "calc(50% - 16px)" },
                        maxWidth: "100%",
                        height: 360,
                    }}
                >
                    <Typography variant="h6" gutterBottom align="center">
                        {categoria === "format" ? "Formatos" : "Tipos de Activo"}
                    </Typography>
                    <Box sx={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.porTipo}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    angle={-90}
                                    textAnchor="end"
                                    interval={0}
                                    height={100}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#2196F3" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Grid>

            <Grid container spacing={3} py={2} justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Paper sx={{ p: 2, overflowX: "auto" }}>
                        <Typography variant="h6" gutterBottom>
                            Lista de Activos
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Formato</TableCell>
                                        <TableCell>Visibilidad</TableCell>
                                        <TableCell>Criticidad</TableCell>
                                        <TableCell>Descargas</TableCell>
                                        <TableCell>Vistas</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activosFiltrados.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row.titulo}</TableCell>
                                            <TableCell>{row.tipo}</TableCell>
                                            <TableCell>{row.formato}</TableCell>
                                            <TableCell>{row.visibilidad}</TableCell>
                                            <TableCell>{row.criticidad}</TableCell>
                                            <TableCell>{row.descargas}</TableCell>
                                            <TableCell>{row.vistas}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
