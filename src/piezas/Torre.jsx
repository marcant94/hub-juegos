import React from "react";
import Pieza from "./Pieza";

const Torre = ({ ficha }) => {
    return <Pieza texto="&#9820;" ficha={ficha} />;
};

Torre.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = Pieza.calcularCeldasDestinoTorre(fichaActiva, fichas);
    return celdasDestino;
};

export default Torre;
