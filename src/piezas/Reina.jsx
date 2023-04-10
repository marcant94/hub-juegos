import React from "react";
import Pieza from "./Pieza";

const Reina = ({ fila, columna, color }) => {
    return <Pieza texto="&#9819;" color={color} />;
};

Reina.puedeMoverse = function(celda, fichaActiva) {
    return false;
};

export default Reina;
