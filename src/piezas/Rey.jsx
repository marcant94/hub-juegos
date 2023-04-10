import React from "react";
import Pieza from "./Pieza";

const Rey = ({ fila, columna, color }) => {
    return <Pieza texto="&#9818;" color={color} />;
};

Rey.puedeMoverse = function(celda, fichaActiva) {
    return false;
};

export default Rey;
