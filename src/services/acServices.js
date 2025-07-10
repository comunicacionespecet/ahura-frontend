const acs = [
    {
        id: 'AC123',
        titulo: 'Método de recolección de zancudos',
        descripcion: 'Método utilizado en zonas rurales para capturar zancudos transmisores.',
        fecha: '2024-06-01',
        tipoActivo: 'Manual',
        tipoConocimiento: 'Técnico',
        formato: 'Documento',
        palabrasClave: 'zancudos, recolección, rural',
        origen: 'Proyecto UdeA',
        ubicacion: 'Biblioteca Central',
        accesible: 'Sí',
        clasificacion: 'Público',
        autor: 'Juan Pérez Velez',
        propietarioAC: 'Grupo Entomología',
        visibilidad: 'Público',
        estadoAC: 'Validado',
        imagen: '/Prueba.jpg',
        archivoUrl: 'https://calibre-ebook.com/downloads/demos/demo.docx',
    },
    {
        id: 'AC124',
        titulo: 'Software de análisis de datos',
        descripcion: 'Aplicación para analizar datos de campo en investigaciones biológicas.',
        fecha: '2023-11-15',
        tipoActivo: 'Software',
        tipoConocimiento: 'Científico',
        formato: 'Aplicación',
        palabrasClave: 'software, análisis, biología',
        origen: 'Convenio UdeA',
        ubicacion: 'Repositorio Digital',
        accesible: 'No',
        clasificacion: 'Privado',
        autor: 'Ana Gómez',
        propietarioAC: 'Laboratorio BioData',
        visibilidad: 'Privado',
        estadoAC: 'En revisión',
        imagen: '/Prueba.jpg',
        archivoUrl: 'https://filesamples.com/samples/document/xlsx/sample1.xlsx',
    },
    {
        id: 'AC125',
        titulo: 'Software de análisis de datos',
        descripcion: 'Aplicación para analizar datos de campo en investigaciones biológicas.',
        fecha: '2023-11-15',
        tipoActivo: 'Software',
        tipoConocimiento: 'Científico',
        formato: 'Aplicación',
        palabrasClave: 'software, análisis, biología',
        origen: 'Convenio UdeA',
        ubicacion: 'Repositorio Digital',
        accesible: 'No',
        clasificacion: 'Privado',
        autor: 'Ana Gómez',
        propietarioAC: 'Laboratorio BioData',
        visibilidad: 'Privado',
        estadoAC: 'En revisión',
        imagen: '/Prueba.jpg',
        archivoUrl: 'https://files.rg-adguard.net/test.pptx',
    },
];

// Simula obtener todos los ACs
export const getAllACs = async () => {
    return acs;
};

// Simula obtener un AC por ID
export const getACById = async (id) => {
    return acs.find((ac) => ac.id === id) || null;
};
