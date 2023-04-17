import React from "react";
import Pieza from "./Pieza";

const Reina = ({ fila, columna, color }) => {
    return <Pieza texto="&#9819;" color={color} />;
};

Reina.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = [];

    return celdasDestino;
};

export default Reina;
