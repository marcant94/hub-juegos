import React from "react";
import Pieza from "./Pieza";

const Alfil = ({ fila, columna, color }) => {
    return <Pieza texto="&#9821;" color={color} />;
};

Alfil.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = Pieza.calcularCeldasDestinoAlfil(fichaActiva, fichas);
    return celdasDestino;
};

export default Alfil;
