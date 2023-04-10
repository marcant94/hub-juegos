import React from "react";
import Pieza from "./Pieza";

const Alfil = ({ fila, columna, color }) => {
    return <Pieza texto="&#9821;" color={color} />;
};

Alfil.puedeMoverse = function(celda, fichaActiva) {
    return false;
};

export default Alfil;
