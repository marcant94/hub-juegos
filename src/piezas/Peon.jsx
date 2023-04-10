import React from "react";
import Pieza from "./Pieza";

const Peon = ({ fila, columna, color }) => {
    return <Pieza texto="&#9823;" color={color} />;
};

Peon.puedeMoverse = function(celda, fichaActiva) {
    if (celda.columna === fichaActiva.columna) {
        if (fichaActiva.color === "B") {
            if (
                celda.fila === fichaActiva.fila + 1 ||
                (fichaActiva.movimientos === 0 &&
                    celda.fila === fichaActiva.fila + 2)
            ) {
                return true;
            }
        } else {
            if (
                celda.fila === fichaActiva.fila - 1 ||
                (fichaActiva.movimientos === 0 &&
                    celda.fila === fichaActiva.fila - 2)
            ) {
                return true;
            }
        }
    }

    return false;
};

export default Peon;
