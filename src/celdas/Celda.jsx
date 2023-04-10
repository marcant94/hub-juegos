import React from "react";

import estilos from "./Celda.module.css";

const Celda = ({ fila, columna, ficha }) => {
    // let letra = String.fromCharCode(columna + "A".charCodeAt(0));

    return (
        <div
            className={
                estilos.celda + " " + (ficha ? estilos.celdaConFicha : "")
            }
        >
            {/* {fila}-{letra} */}
            {ficha ? ficha : undefined}
        </div>
    );
};

export default Celda;
