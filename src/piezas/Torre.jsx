import React from "react";
import Pieza from "./Pieza";

const Torre = ({ fila, columna, color }) => {
    return <Pieza texto="&#9820;" color={color} />;
};

Torre.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = Pieza.calcularCeldasDestinoTorre(fichaActiva, fichas);
    return celdasDestino;
};

export default Torre;
