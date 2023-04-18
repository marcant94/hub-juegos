import React from "react";
import Pieza from "./Pieza";

const Alfil = ({ ficha }) => {
    return <Pieza texto="&#9821;" ficha={ficha} />;
};

Alfil.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = Pieza.calcularCeldasDestinoAlfil(fichaActiva, fichas);
    return celdasDestino;
};

export default Alfil;
