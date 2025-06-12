import React from "react";
import Button from "../atoms/Button";


const SubHeader = () => {
    return (
        /* Sub-header con texto, botones e imagen */
        <section className="flex flex-col md:flex-row bg-[#EEEEEE] gap-6 min-h-[250px]">
            <div className="w-full md:w-[70%] flex flex-col justify-center p-6">
                <h1 className="text-xl font-semibold mb-4">
                    Bienvenido al sistema AHURA.
                </h1>
                <p className="mb-4">Gestión de activos del conocimiento.</p>
                <div className="flex flex-wrap gap-2">
                    <Button text={"Iniciar sesión"} type="primary" ></Button>
                    <Button text={"Ver activos públicos"} type="secondary" ></Button>
                    <Button text={"Conocer más sobre el pecet"} type="success" ></Button>
                </div>
            </div>
            <div className="w-full md:w-[30%]">
                <img
                    src="/Semi_header_pecet.png"
                    alt="Imagen descriptiva"
                    className="w-full h-full object-cover rounded"
                />
            </div>
        </section>
    )
}

export default SubHeader