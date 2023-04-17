import React from "react";
import Pieza from "./Pieza";

const Rey = ({ fila, columna, color }) => {
    return <Pieza texto="&#9818;" color={color} />;
};

Rey.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    return [];
};

export default Rey;
