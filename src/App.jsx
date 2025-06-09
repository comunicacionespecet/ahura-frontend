import React from "react";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header con los logos PECET-UdeA */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <img src="public\Logos_Pecet.jpg" alt="Logo Izquierdo" className="h-12" />
        <img src="public\facultad-medicina.png" alt="Logo Derecho" className="h-12" />
      </header>

      {/* Sub-header con texto, botones e imagen */}
      <section className="flex flex-col md:flex-row justify-between items-stretch bg-[#EEEEEE] gap-6 min-h-[250px] md:h-[250px]">
        <div className="w-full md:w-[50%] flex flex-col justify-center p-6 md:h-full">
          <h1 className="text-xl font-semibold mb-4">
            Bienvenido al sistema AHURA.
          </h1>
          <p className="mb-4">
            Gestión de activos del conocimiento.
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="bg-[#137598] text-white px-4 py-2 rounded hover:bg-blue-700">
              Iniciar sesión
            </button>
            <button className="bg-[#70205B] text-white px-4 py-2 rounded hover:bg-blue-700">
              Ver activos públicos
            </button>
            <button className="bg-[#8DC63F] text-white px-4 py-2 rounded hover:bg-blue-700">
              Conocer más sobre el PECET
            </button>
          </div>
        </div>
        <img
          src="public/Semi_header_pecet.png"
          alt="Imagen descriptiva"
          className="w-full md:w-[50%] h-full rounded"
        />
      </section>

      {/* Zona central de funciones primarias */}
      <main className="flex-1 p-6 bg-white">
        <h3 className="text-lg text-center font-bold mb-4">¿Qué puedes hacer aquí?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow">Registrar activos de conocimiento</div>
          <div className="p-4 border rounded shadow">Buscar activos de conocimiento</div>
          <div className="p-4 border rounded shadow">Generar estadísticas</div>
        </div>
      </main>

      {/* Acerca de */}
      <section className="p-6 bg-[#EDEDED] text-center">
        <h4 className="text-md font-semibold mb-2">Acerca del PECET</h4>
        <p className="text-sm text-gray-700">
          Somos un grupo de investigación multidisciplinario, especializado en salud humana, animal, vegetal y ambiental,
          con amplia experiencia en la generación de proyectos de ciencia y tecnología a nivel nacional e internacional.
        </p>
      </section>

      {/* Footer con logos juntos e información */}
      <footer className="flex flex-row justify-between p-4 bg-[#026937] text-white">
        <div className="text-lef text-left">
          <p>Universidad de Antioquia</p>
          <p>Teléfono: +57 604 219 65 06</p>
          <p>Horario de atención:</p>
          <p>Lunes a viernes de 8:00 a.m. a 4:00 p.m.</p>
          <p>Carrera 53 # 61 – 30 Laboratorio 632,</p>
          <p>Sede de Investigación Universitaria-SIU, Medellín, Colombia.</p>
          <p>Email: comunicacionespecet@udea.edu.co</p>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <img src="public\Logos_Pecet Blanco.png" alt="Logo 1" className="h-16" />
          <img src="public\udea_transparente.png" alt="Logo 2" className="h-16" />
        </div>
      </footer>
    </div>
  );
}

export default App;

