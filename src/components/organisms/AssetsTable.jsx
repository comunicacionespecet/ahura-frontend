import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// 🔹 Datos de ejemplo
const sampleAssets = [
  {
    id: 1,
    titulo: "Modelo de investigación A",
    tipoConocimiento: "Artículo",
    formato: "PDF",
    visibilidad: "Público",
    criticality: "Alta",
    downloadCount: 12,
  },
  {
    id: 2,
    titulo: "Prototipo de software X",
    tipoConocimiento: "Prototipo",
    formato: "Código",
    visibilidad: "Privado",
    criticality: "Media",
    downloadCount: 7,
  },
  {
    id: 3,
    titulo: "Base de datos Y",
    tipoConocimiento: "Dataset",
    formato: "CSV",
    visibilidad: "Público",
    criticality: "Crítica",
    downloadCount: 25,
  },
];

export default function AssetsTable({ assets = sampleAssets }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Título</b></TableCell>
            <TableCell><b>Tipo</b></TableCell>
            <TableCell><b>Formato</b></TableCell>
            <TableCell><b>Visibilidad</b></TableCell>
            <TableCell><b>Criticalidad</b></TableCell>
            <TableCell><b>Descargas</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.titulo}</TableCell>
              <TableCell>{asset.tipoConocimiento}</TableCell>
              <TableCell>{asset.formato}</TableCell>
              <TableCell>{asset.visibilidad}</TableCell>
              <TableCell>{asset.criticality}</TableCell>
              <TableCell>{asset.downloadCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
