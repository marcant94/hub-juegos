import React from "react";
import Pieza from "./Pieza";

const Caballo = ({ fila, columna, color }) => {
    return <Pieza texto="&#9822;" color={color} />;
};

Caballo.puedeMoverse = function(celda, fichaActiva, fichas) {
    let difColumna = Math.abs(celda.columna - fichaActiva.columna);
    let difFila = Math.abs(celda.fila - fichaActiva.fila);

    if (
        (difColumna === 1 && difFila === 2) ||
        (difColumna === 2 && difFila === 1)
    ) {
        let fichaDestino = fichas.find(
            (ficha) =>
                ficha.fila === celda.fila && ficha.columna === celda.columna
        );

        if (fichaDestino && fichaActiva.color === fichaDestino.color) {
            return false;
        }

        return true;
    }

    return false;
};

export default Caballo;
