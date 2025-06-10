import React from "react";
import Button from "./Button";
import { BookOpen, Search, BarChart2 } from "lucide-react";

const MainFeatures = () => {
    return (
        /* Zona central de funciones primarias */
        <main className="flex-1 p-6 bg-white">
            <h3 className="text-lg text-center font-bold mb-4">¿Qué puedes hacer aquí?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button text={"Registrar activos"} type="primary" icon={<BookOpen />}></Button>
                <Button text={"Buscar activos"} type="secondary" icon={<Search />} ></Button>
                <Button text={"Ver estadísticas"} type="success" icon={<BarChart2 />}></Button>
            </div>
        </main>
    )
}

export default MainFeatures