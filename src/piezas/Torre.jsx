import React from "react";
import Pieza from "./Pieza";

const Torre = ({ fila, columna, color }) => {
    return <Pieza texto="&#9820;" color={color} />;
};

Torre.calcularCeldasDestino = function(fichaActiva, fichas) {
    // Calculamos todas las celdas de destino posibles
    let celdasDestino = [];

    // Comprobamos hacia la izquierda
    for (let columna = fichaActiva.columna - 1; columna >= 0; columna--) {
        let fichaDestino = fichas.find(
            (ficha) =>
                ficha.fila === fichaActiva.fila && ficha.columna === columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fichaActiva.fila,
                    columna: columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fichaActiva.fila,
                columna: columna,
            });
        }
    }

    // Comprobamos hacia la derecha
    for (let columna = fichaActiva.columna + 1; columna <= 8; columna++) {
        let fichaDestino = fichas.find(
            (ficha) =>
                ficha.fila === fichaActiva.fila && ficha.columna === columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fichaActiva.fila,
                    columna: columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fichaActiva.fila,
                columna: columna,
            });
        }
    }

    // Comprobamos hacia arriba
    for (let fila = fichaActiva.fila + 1; fila <= 8; fila++) {
        let fichaDestino = fichas.find(
            (ficha) =>
                ficha.fila === fila && ficha.columna === fichaActiva.columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fila,
                    columna: fichaActiva.columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fila,
                columna: fichaActiva.columna,
            });
        }
    }

    // Comprobamos hacia abajo
    for (let fila = fichaActiva.fila - 1; fila >= 0; fila--) {
        let fichaDestino = fichas.find(
            (ficha) =>
                ficha.fila === fila && ficha.columna === fichaActiva.columna
        );

        if (fichaDestino) {
            if (fichaDestino.color !== fichaActiva.color) {
                // Si hay ficha del otro color, puede comer
                celdasDestino.push({
                    fila: fila,
                    columna: fichaActiva.columna,
                });
            }

            // Si habia ficha, no puede avanzar más en esta direccion
            break;
        } else {
            // Si no hay ficha, puede moverse
            celdasDestino.push({
                fila: fila,
                columna: fichaActiva.columna,
            });
        }
    }

    return celdasDestino;
};

export default Torre;
