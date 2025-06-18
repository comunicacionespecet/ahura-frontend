import React from 'react';

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row justify-between items-center p-4 bg-[#026937] text-white gap-4">
            <div className="text-left">
                <p>Universidad de Antioquia</p>
                <p>Teléfono: +57 604 219 65 06</p>
                <p>Horario de atención:</p>
                <p>Lunes a viernes de 8:00 a.m. a 4:00 p.m.</p>
                <p>Carrera 53 # 61 – 30 Laboratorio 632,</p>
                <p>Sede de Investigación Universitaria-SIU, Medellín, Colombia.</p>
                <p>Email: comunicacionespecet@udea.edu.co</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
                <img
                    src="/Logos_Pecet_Blanco.png"
                    alt="Logo PECET"
                    className="h-12 md:h-16 object-contain"
                />
                <img
                    src="/Udea_transparenteV2.png"
                    alt="Logo UdeA"
                    className="h-12 md:h-16 object-contain"
                />
            </div>
        </footer>
    );
};

export default Footer;
