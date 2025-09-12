import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (assets, title = "Reporte") => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(title, 14, 20);

  const rows = assets.map((a, i) => [
    i + 1,
    a.title || "",
    a.activeKnowledgeType || "",
    new Date(a.publishDate).getFullYear(),
    a.responsibleOwner || "",
  ]);

  doc.autoTable({
    head: [["#", "Título", "Tipo", "Año", "Autor"]],
    body: rows,
    startY: 30,
  });

  doc.save(`${title}.pdf`);
};
