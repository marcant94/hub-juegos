import React from "react";
import Pieza from "./Pieza";

const Rey = ({ fila, columna, color }) => {
    return <Pieza texto="&#9818;" color={color} />;
};

Rey.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = [];

    for (
        let fila = fichaActiva.fila - 1;
        fila <= fichaActiva.fila + 1;
        fila++
    ) {
        for (
            let columna = fichaActiva.columna - 1;
            columna <= fichaActiva.columna + 1;
            columna++
        ) {
            let fichaDestino = fichas.find(
                (ficha) => ficha.fila === fila && ficha.columna === columna
            );

            if (!(fichaDestino && fichaActiva.color === fichaDestino.color)) {
                // No puede comerse una ficha del mismo color
                celdasDestino.push({
                    fila: fila,
                    columna: columna,
                });
            }
        }
    }

    return celdasDestino;
};

export default Rey;
