import React from "react";
import Pieza from "./Pieza";

const Peon = ({ fila, columna, color }) => {
    return <Pieza texto="&#9823;" color={color} />;
};

Peon.puedeMoverse = function(
    filaOrigen,
    columnaOrigen,
    filaDestino,
    columnaDestino
) {
    if (filaOrigen === filaDestino && 0) {
    }
};

export default Peon;
