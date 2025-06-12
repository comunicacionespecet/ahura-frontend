import React, { useState } from "react";
import RegisterAC from "./RegisterAC";
import Button from "../atoms/Button";

const MainFeatures = () => {
  const [showForm, setShowForm] = useState(false);

  const handleRegisterClick = () => {
    setShowForm(true);
  };

  return (
    <main className="flex-1 p-6 bg-white">
      <h3 className="text-lg text-center font-bold mb-4">
        ¿Qué puedes hacer aquí?
      </h3>

      {!showForm ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={handleRegisterClick}
            text="Registrar activos de conocimiento"
            type="primary"
          />
          <Button
            onClick={handleRegisterClick}
            text="Editar un activo de conocimiento"
            type="light"
          />
          <Button
            text="Buscar activos de conocimiento"
            type="secondary"
          />
          <Button
            text="Generar estadísticas"
            type="success"
          />
        </div>
      ) : (
        <RegisterAC />
      )}
    </main>
  );
};

export default MainFeatures;

