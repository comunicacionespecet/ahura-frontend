import React from "react";

const Header = () => {
    return (
        /* Header con los logos PECET-UdeA */
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <img src="/Logos_Pecet.jpg" alt="Logo Izquierdo" className="h-12" />
            <img src="/facultad_medicina.png" alt="Logo Derecho" className="h-12" />
        </header>
    );
};

export default Header;