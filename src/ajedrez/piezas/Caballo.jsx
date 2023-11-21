import React from "react";
import Pieza from "./Pieza";

const Caballo = ({ ficha }) => {
    return <Pieza texto="&#9822;" ficha={ficha} />;
};

Caballo.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = [];

    for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
            let fila = fichaActiva.fila + i;
            let columna = fichaActiva.columna + j;

            let difColumna = Math.abs(columna - fichaActiva.columna);
            let difFila = Math.abs(fila - fichaActiva.fila);

            if (
                (difColumna === 1 && difFila === 2) ||
                (difColumna === 2 && difFila === 1)
            ) {
                let fichaDestino = fichas.find(
                    (ficha) => ficha.fila === fila && ficha.columna === columna
                );

                if (
                    !(fichaDestino && fichaActiva.color === fichaDestino.color)
                ) {
                    // No puede comerse una ficha del mismo color
                    celdasDestino.push({
                        fila: fila,
                        columna: columna,
                    });
                }
            }
        }
    }

    return celdasDestino;
};

export default Caballo;
