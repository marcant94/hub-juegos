import React from "react";
import Pieza from "./Pieza";

const Peon = ({ fila, columna, color }) => {
    return <Pieza texto="&#9823;" color={color} />;
};

Peon.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = [];
    let direccion = fichaActiva.color === "B" ? 1 : -1;
    let direccionDoble = fichaActiva.color === "B" ? 2 : -2;

    // Comprobamos las 2 celdas de delante
    let fichaDelante = fichas.find(
        (ficha) =>
            ficha.fila === fichaActiva.fila + direccion &&
            ficha.columna === fichaActiva.columna
    );

    if (!fichaDelante) {
        celdasDestino.push({
            fila: fichaActiva.fila + direccion,
            columna: fichaActiva.columna,
        });
    }

    let fichaSiguiente = fichas.find(
        (ficha) =>
            ficha.fila === fichaActiva.fila + direccionDoble &&
            ficha.columna === fichaActiva.columna
    );

    if (!fichaSiguiente) {
        celdasDestino.push({
            fila: fichaActiva.fila + direccionDoble,
            columna: fichaActiva.columna,
        });
    }

    // Comprobamos las 2 celdas en diagonal
    let fichaDiagonalIzquierda = fichas.find(
        (ficha) =>
            ficha.fila === fichaActiva.fila + direccion &&
            ficha.columna === fichaActiva.columna - 1
    );

    if (
        fichaDiagonalIzquierda &&
        fichaDiagonalIzquierda.color !== fichaActiva.color
    ) {
        celdasDestino.push({
            fila: fichaDiagonalIzquierda.fila,
            columna: fichaDiagonalIzquierda.columna,
        });
    }

    let fichaDiagonalDerecha = fichas.find(
        (ficha) =>
            ficha.fila === fichaActiva.fila + direccion &&
            ficha.columna === fichaActiva.columna + 1
    );

    if (
        fichaDiagonalDerecha &&
        fichaDiagonalDerecha.color !== fichaActiva.color
    ) {
        celdasDestino.push({
            fila: fichaDiagonalDerecha.fila,
            columna: fichaDiagonalDerecha.columna,
        });
    }


    // Comprobar captura en paso

    return celdasDestino;
};

export default Peon;
