import React, { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
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

  const normStr = (s = "") =>
    s
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const catalogObj = useMemo(() => {
    if (!catalogs) return {};
    if (Array.isArray(catalogs)) return catalogs[0] ?? {};
    return catalogs;
  }, [catalogs]);

  const categoryEnums = useMemo(() => {
    return Object.keys(catalogObj)
      .filter((k) => k.endsWith("Enum"))
      .map((k) => k.replace("Enum", ""));
  }, [catalogObj]);

  const [categoria, setCategoria] = useState("Todos");
  const [opcion, setOpcion] = useState("Todos");

  useEffect(() => {
    if (categoryEnums.length && categoria === "Todos") {
      setCategoria(categoryEnums[0]);
    }
  }, [categoryEnums]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload; // 👈 aquí está { name, value, description }
      return (
        <div style={{ background: "white", border: "1px solid #ccc", padding: "8px" }}>
          <p><strong>{item.name}</strong></p>
          <p>Valor: {item.value}</p>
          <p>Descripción: {item.description}</p>
        </div>
      );
    }
    return null;
  };

  const opciones = useMemo(() => {
    if (!categoryEnums.includes(categoria)) return ["Todos"];
    const enumKey = `${categoria}Enum`;
    const list = catalogObj[enumKey] ?? [];
    return ["Todos", ...list.filter((i) => i.isActive !== false).map((i) => i.key)];
  }, [categoria, catalogObj, categoryEnums]);

  const activosMapeados = useMemo(() => {
    if (!allActivos) return [];
    return allActivos.map((a) => ({
      titulo: a.title || "",
      activeKnowledgeType: a.activeKnowledgeType || "",
      knowledgeType: a.knowledgeType || "",
      format: a.format || "",
      origin: a.origin || "",
      classificationLevelLevel: a.classificationLevel?.level || "",
      criticality: a.criticality || "",
      assetStatus: a.status || "",
      repository: a.howIsItStored?.pecetKnowledge || "",
      visibilidad: a.confidentiality ? "Privado" : "Público",
      descargas: a.downloadCount || 0,
      vistas: a.viewCount || 0,
    }));
  }, [allActivos]);

  const activosFiltrados = useMemo(() => {
    if (!activosMapeados) return [];
    if (!categoria || categoria === "Todos") {
      if (opcion === "Todos") return activosMapeados;
      return activosMapeados.filter((a) => {
        return (
          normStr(a.titulo).includes(normStr(opcion)) ||
          Object.values(a).some((v) => normStr(v).includes(normStr(opcion)))
        );
      });
    }

    const prop = categoria;
    if (opcion === "Todos") return activosMapeados;

    return activosMapeados.filter((a) => normStr(a[prop]) === normStr(opcion));
  }, [activosMapeados, categoria, opcion]);

  const stats = useMemo(() => {
    const total = activosFiltrados.length;
    const publicos = activosFiltrados.filter(
      (a) => normStr(a.visibilidad) === normStr("Público")
    ).length;
    const privados = activosFiltrados.filter(
      (a) => normStr(a.visibilidad) === normStr("Privado")
    ).length;
    const descargas = activosFiltrados.reduce((acc, a) => acc + (a.descargas || 0), 0);
    const vistas = activosFiltrados.reduce((acc, a) => acc + (a.vistas || 0), 0);

    const prop = categoryEnums.includes(categoria) ? categoria : "knowledgeType";

    const counts = activosFiltrados.reduce((acc, a) => {
      const val = a[prop] || "Sin valor";
      const key = normStr(val);

      if (!acc[key]) {
        const enumKey = `${prop}Enum`;
        const catalogList = catalogObj[enumKey] || [];
        const catalogItem = catalogList.find((c) => normStr(c.key) === key);

        acc[key] = {
          name: val || "Sin valor",
          value: 0,
          description: catalogItem?.descripcion || "Sin descripción", // 👈 aquí
        };
      }
      acc[key].value += 1;
      return acc;
    }, {});
    const porTipo = Object.values(counts);


    return {
      totalActivos: total,
      publicos,
      privados,
      descargas,
      vistas,
      porTipo,
    };
  }, [activosFiltrados, categoria, categoryEnums]);

  if (loadingCatalogs || loadingActivos) return <p className="p-6">Cargando...</p>;
  if (errorCatalogs) return <p className="p-6 text-red-600">Error: {errorCatalogs.message}</p>;
  if (errorActivos) return <p className="p-6 text-red-600">Error: {errorActivos.message}</p>;

  const barColors = ["#2196F3", "#4CAF50", "#FF9800", "#9C27B0", "#FF5722", "#00BCD4"];

  return (
    <Box sx={{ width: "100%", py: 4, bgcolor: "#FBFBFB" }}>
      <Container maxWidth={false} sx={{ width: "90%" }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1, minWidth: "200px" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 500, color: "text.secondary" }}
                >
                  Categoría
                </Typography>
                <FormControl fullWidth size="small" variant="outlined">
                  <Select
                    value={categoria}
                    onChange={(e) => {
                      setCategoria(e.target.value);
                      setOpcion("Todos");
                    }}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    {categoryEnums.map((baseKey) => (
                      <MenuItem key={baseKey} value={baseKey}>
                        {categoriaLabels[baseKey] ?? baseKey}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1, minWidth: "200px" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 500, color: "text.secondary" }}
                >
                  Opción
                </Typography>
                <FormControl fullWidth size="small" variant="outlined">
                  <Select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                    {opciones.map((opt, i) => (
                      <MenuItem key={i} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%", mx: "auto" }}>
            {[
              { label: "Total Activos de conocimiento", value: stats.totalActivos },
              { label: "Activos de conocimiento Públicos", value: stats.publicos },
              { label: "Activos de conocimiento Privados", value: stats.privados },
              { label: "Total de descargas de activos de conocimiento", value: stats.descargas },
              { label: "Total de visualizaciones de activos de conocimiento", value: stats.vistas },
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

        <Grid container spacing={3} py={2} justifyContent="center" alignItems="stretch">
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
              {categoriaLabels[categoria] ?? (categoria === "format" ? "Formatos" : categoria)}
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.porTipo}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                    tickFormatter={(value) =>
                      value.length > 12 ? value.substring(0, 12) + "..." : value
                    }
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />   {/* 👈 aquí va */}
                  <Bar dataKey="value">
                    {stats.porTipo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
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
                      <TableCell>Tipo (knowledgeType)</TableCell>
                      <TableCell>ActiveKnowledgeType</TableCell>
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
                        <TableCell>{row.knowledgeType}</TableCell>
                        <TableCell>{row.activeKnowledgeType}</TableCell>
                        <TableCell>{row.format}</TableCell>
                        <TableCell>{row.visibilidad}</TableCell>
                        <TableCell>{row.criticality}</TableCell>
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
    </Box>
  );
}
