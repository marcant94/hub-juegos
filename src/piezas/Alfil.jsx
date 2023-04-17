import React from "react";
import Pieza from "./Pieza";

const Alfil = ({ fila, columna, color }) => {
    return <Pieza texto="&#9821;" color={color} />;
};

Alfil.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = [];

    // Comprobamos hacia arriba a la izquierda
    for (
        let fila = fichaActiva.fila + 1, columna = fichaActiva.columna - 1;
        fila <= 8, columna >= 1;
        fila++, columna--
    ) {
        let fichaDestino = fichas.find(
            (ficha) => ficha.fila === fila && ficha.columna === columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fila,
                    columna: columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fila,
                columna: columna,
            });
        }
    }

    // Comprobamos hacia arriba a la derecha
    for (
        let fila = fichaActiva.fila + 1, columna = fichaActiva.columna + 1;
        fila <= 8, columna <= 8;
        fila++, columna++
    ) {
        let fichaDestino = fichas.find(
            (ficha) => ficha.fila === fila && ficha.columna === columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fila,
                    columna: columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fila,
                columna: columna,
            });
        }
    }

    // Comprobamos hacia abajo a la izquierda
    for (
        let fila = fichaActiva.fila - 1, columna = fichaActiva.columna - 1;
        fila >= 1, columna >= 1;
        fila--, columna--
    ) {
        let fichaDestino = fichas.find(
            (ficha) => ficha.fila === fila && ficha.columna === columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fila,
                    columna: columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fila,
                columna: columna,
            });
        }
    }

    // Comprobamos hacia abajo a la derecha
    for (
        let fila = fichaActiva.fila - 1, columna = fichaActiva.columna + 1;
        fila >= 1, columna <= 8;
        fila--, columna++
    ) {
        let fichaDestino = fichas.find(
            (ficha) => ficha.fila === fila && ficha.columna === columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fila,
                    columna: columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fila,
                columna: columna,
            });
        }
    }

    return celdasDestino;
};

export default Alfil;
