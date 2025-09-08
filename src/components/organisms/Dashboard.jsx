import React from "react";
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

export default function Dashboard() {
    // 🔹 Datos quemados para pruebas
    const stats = {
        totalActivos: 25,
        publicos: 15,
        privados: 10,
        descargas: 280,
        vistas: 1750,
        porTipo: [
            { name: "Artículo", value: 3 },
            { name: "Prototipo", value: 2 },
            { name: "Dataset", value: 4 },
            { name: "Patente", value: 1 },
            { name: "Presentación", value: 2 },
            { name: "Informe", value: 1 },
            { name: "Video", value: 2 },
            { name: "Audio", value: 1 },
            { name: "Código", value: 3 },
            { name: "Otro", value: 2 },
        ],
    };

    const activos = [
        {
            titulo: "Modelo de investigación A",
            tipo: "Artículo",
            formato: "PDF",
            visibilidad: "Público",
            criticidad: "Alta",
            descargas: 12,
        },
        {
            titulo: "Prototipo de software X",
            tipo: "Prototipo",
            formato: "Código",
            visibilidad: "Privado",
            criticidad: "Media",
            descargas: 7,
        },
        {
            titulo: "Base de datos Y",
            tipo: "Dataset",
            formato: "CSV",
            visibilidad: "Público",
            criticidad: "Crítica",
            descargas: 25,
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* --- Fila 1: Cards resumen --- */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={2.4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Activos</Typography>
                            <Typography variant="h5">{stats.totalActivos}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Públicos</Typography>
                            <Typography variant="h5">{stats.publicos}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Privados</Typography>
                            <Typography variant="h5">{stats.privados}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Descargas</Typography>
                            <Typography variant="h5">{stats.descargas}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Vistas</Typography>
                            <Typography variant="h5">{stats.vistas}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* --- Fila 2: Gráficas --- */}
            <Grid container spacing={3} py={2} justifyContent="center" alignItems="stretch">
                {/* Gráfica de Visibilidad */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, minWidth: 360, width: "100%", height: 360 }}>
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
                </Grid>

                {/* Gráfica de Tipos de Activo */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, minWidth: 360, width: "100%", height: 360 }}>
                        <Typography variant="h6" gutterBottom align="center">
                            Tipos de Activo
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
            </Grid>

            {/* --- Fila 3: Tabla de activos --- */}
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activos.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row.titulo}</TableCell>
                                            <TableCell>{row.tipo}</TableCell>
                                            <TableCell>{row.formato}</TableCell>
                                            <TableCell>{row.visibilidad}</TableCell>
                                            <TableCell>{row.criticidad}</TableCell>
                                            <TableCell>{row.descargas}</TableCell>
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
