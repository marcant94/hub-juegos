import React from "react";
import Pieza from "./Pieza";

const Torre = ({ fila, columna, color }) => {
    return <Pieza texto="&#9820;" color={color} />;
};

Torre.puedeMoverse = function(celda, fichaActiva, fichas) {
    let mismaFila = celda.fila === fichaActiva.fila;
    let mismaColumna = celda.columna === fichaActiva.columna;

    if (mismaFila || mismaColumna) {
        let fichaDestino = fichas.find(
            (ficha) =>
                ficha.fila === celda.fila && ficha.columna === celda.columna
        );

        if (fichaDestino && fichaActiva.color === fichaDestino.color) {
            // No puede comerse una ficha del mismo color
            return false;
        }

        // No puede pasar por encima de ninguna ficha, comprobamos si hay fichas en el camino
        if (mismaFila) {
        } else if (mismaColumna) {
        }

        return true;
    }

    return false;
};

Torre.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    return [];
};

export default Torre;
