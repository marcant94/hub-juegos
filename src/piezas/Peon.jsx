import React from "react";
import Pieza from "./Pieza";

const Peon = ({ fila, columna, color }) => {
    return <Pieza texto="&#9823;" color={color} />;
};

Peon.puedeMoverse = function(celda, fichaActiva) {
    if (celda.fila === fichaActiva.fila && 0) {
    }

    return true;
};

export default Peon;
