import React from "react";

import estilos from "./Pieza.module.css";

const Pieza = ({ texto, color }) => {
    return (
        <span
            className={
                estilos.pieza +
                " " +
                (color === "B" ? estilos.blanca : estilos.negra)
            }
        >
            {texto}
        </span>
    );
};

export default Pieza;
