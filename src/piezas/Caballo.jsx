import React from "react";
import Pieza from "./Pieza";

const Caballo = ({ fila, columna, color }) => {
    return <Pieza texto="&#9822;" color={color} />;
};

Caballo.puedeMoverse = function(celda, fichaActiva) {
    return true;
};

export default Caballo;
