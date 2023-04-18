import React from "react";

import estilos from "./Pieza.module.css";

const Pieza = ({ texto, ficha }) => {
    // ficha:
    // color
    // columna
    // fila
    // id
    // movimientos
    // nombrePieza

    return (
        <span
            key={ficha.id}
            style={
                ficha.eliminada
                    ? {
                          bottom: "570px",
                          left: "0px",
                      }
                    : {
                          bottom: ficha.fila * 65 - 17 + "px",
                          left: ficha.columna * 65 + "px",
                      }
            }
            className={
                estilos.pieza +
                " " +
                (ficha.eliminada ? estilos.eliminada : "") +
                " " +
                (ficha.color === "B" ? estilos.blanca : estilos.negra)
            }
        >
            {texto}
        </span>
    );
};

Pieza.calcularCeldasDestinoTorre = function(fichaActiva, fichas) {
    let celdasDestino = [];

    // Comprobamos hacia la izquierda
    for (let columna = fichaActiva.columna - 1; columna >= 1; columna--) {
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
    for (let fila = fichaActiva.fila - 1; fila >= 1; fila--) {
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

Pieza.calcularCeldasDestinoAlfil = function(fichaActiva, fichas) {
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

export default Pieza;
