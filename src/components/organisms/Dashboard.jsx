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
import { useACs } from "../../hooks/useACs";

export default function Dashboard() {
  const { acs, loading, error } = useACs();

  // Etiquetas legibles para mostrar
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

  // Propiedades a usar para filtrado según categoría
  const categoriaPropiedad = {
    activeKnowledgeType: "activeKnowledgeType",
    format: "formato",
    knowledgeType: "tipo",
    origin: "origin",
    classificationLevelLevel: "classificationLevel.level",
    criticality: "criticality",
    assetStatus: "status",
    repository: "repository",
  };

  // Transformamos la data del backend para usar en Dashboard
  const activos = useMemo(() => {
    return acs.map((a) => ({
      id: a.id,
      titulo: a.title,
      tipo: a.knowledgeType,
      formato: a.format,
      visibilidad: a.availability?.accessibility ? "Público" : "Privado",
      criticidad: a.criticality,
      descargas: a.downloadCount,
      vistas: a.viewCount,
      activeKnowledgeType: a.activeKnowledgeType,
      origin: a.origin,
      status: a.status,
      classificationLevel: a.classificationLevel?.level,
      repository: a.repository,
    }));
  }, [acs]);

  // --- Primer filtro: categoría ---
  const categoriasDisponibles = useMemo(() => Object.keys(categoriaPropiedad), []);
  const [categoria, setCategoria] = useState(categoriasDisponibles[0] || "");

  // --- Segundo filtro: opción ---
  const opciones = useMemo(() => {
    if (!categoria) return ["Todos"];
    const prop = categoriaPropiedad[categoria];
    const valoresUnicos = Array.from(
      new Set(activos.map((a) => {
        // soporte para paths como "classificationLevel.level"
        if (prop.includes(".")) {
          const [p1, p2] = prop.split(".");
          return a[p1]?.[p2] ?? "";
        } else {
          return a[prop] ?? "";
        }
      }).filter(v => v !== null && v !== undefined))
    );
    return ["Todos", ...valoresUnicos];
  }, [categoria, activos]);
  const [opcion, setOpcion] = useState("Todos");

  // Reset segunda opción cuando cambia la categoría
  React.useEffect(() => {
    setOpcion("Todos");
  }, [categoria]);

  // --- Filtrado final ---
  const activosFiltrados = useMemo(() => {
    if (opcion === "Todos") return activos;
    const prop = categoriaPropiedad[categoria];
    return activos.filter((a) => {
      if (prop.includes(".")) {
        const [p1, p2] = prop.split(".");
        return a[p1]?.[p2] === opcion;
      }
      return a[prop] === opcion;
    });
  }, [activos, categoria, opcion]);

  // --- Stats para gráficos ---
  const stats = useMemo(() => {
    return {
      totalActivos: activosFiltrados.length,
      publicos: activosFiltrados.filter((a) => a.visibilidad === "Público").length,
      privados: activosFiltrados.filter((a) => a.visibilidad === "Privado").length,
      descargas: activosFiltrados.reduce((acc, a) => acc + a.descargas, 0),
      vistas: activosFiltrados.reduce((acc, a) => acc + a.vistas, 0),
      porCategoria: (() => {
        const prop = categoriaPropiedad[categoria];
        const valores = activosFiltrados.map((a) => {
          if (prop.includes(".")) {
            const [p1, p2] = prop.split(".");
            return a[p1]?.[p2] ?? "";
          }
          return a[prop] ?? "";
        });
        const unicos = Array.from(new Set(valores));
        return unicos.map((v) => ({
          name: v,
          value: valores.filter((x) => x === v).length,
        }));
      })(),
    };
  }, [activosFiltrados, categoria]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>;

  return (
    <Container maxWidth={false} sx={{ width: "90%", py: 4 }}>
      {/* Filtros */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categoriasDisponibles.map((c) => (
                <MenuItem key={c} value={c}>
                  {categoriaLabels[c] ?? c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Opción</InputLabel>
            <Select
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
            >
              {opciones.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Cards de stats */}
      <Grid container spacing={2} justifyContent="center">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%", mx: "auto" }}>
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
                flexBasis: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(20% - 16px)" },
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

      {/* Gráficas */}
      <Grid container spacing={3} py={2} justifyContent="center" alignItems="stretch" sx={{ width: "100%", mx: "auto", display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* Pie chart Visibilidad */}
        <Paper sx={{ p: 2, flexGrow: 1, flexBasis: { xs: "100%", sm: "calc(50% - 16px)" }, maxWidth: "100%", height: 360 }}>
          <Typography variant="h6" gutterBottom align="center">Visibilidad</Typography>
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

        {/* Bar chart según categoría */}
        <Paper sx={{ p: 2, flexGrow: 1, flexBasis: { xs: "100%", sm: "calc(50% - 16px)" }, maxWidth: "100%", height: 360 }}>
          <Typography variant="h6" gutterBottom align="center">{categoriaLabels[categoria]}</Typography>
          <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.porCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Tabla de activos */}
      <Grid container spacing={3} py={2} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2, overflowX: "auto" }}>
            <Typography variant="h6" gutterBottom>Lista de Activos</Typography>
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
                  {activosFiltrados.map((row) => (
                    <TableRow key={row.id}>
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
