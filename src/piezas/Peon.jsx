import React from "react";
import Pieza from "./Pieza";

const Peon = ({ fila, columna, color }) => {
    return <Pieza texto="&#9823;" color={color} />;
};

Peon.puedeMoverse = function(celda, fichaActiva, fichas) {
    let mover1 = fichaActiva.color === "B" ? 1 : -1;
    let mover2 = fichaActiva.color === "B" ? 2 : -2;
    if (celda.columna === fichaActiva.columna) {
        if (celda.fila === fichaActiva.fila + mover1) {
            let fichaDelante = fichas.find(
                (ficha) =>
                    ficha.fila === fichaActiva.fila + mover1 &&
                    ficha.columna === fichaActiva.columna
            );

            if (fichaDelante) {
                return false;
            }

            // Solo puede moverse si no hay ninguna ficha delante
            return true;
        } else if (
            fichaActiva.movimientos === 0 &&
            celda.fila === fichaActiva.fila + mover2
        ) {
            let fichaDelante = fichas.find(
                (ficha) =>
                    ficha.fila === fichaActiva.fila + mover1 &&
                    ficha.columna === fichaActiva.columna
            );

            let fichaFinal = fichas.find(
                (ficha) =>
                    ficha.fila === fichaActiva.fila + mover2 &&
                    ficha.columna === fichaActiva.columna
            );

            if (fichaDelante || fichaFinal) {
                return false;
            }

            // Solo puede moverse si no hay ninguna ficha en el camino
            return true;
        }
    } else if (
        celda.fila === fichaActiva.fila + mover1 &&
        (fichaActiva.columna === celda.columna + 1 ||
            fichaActiva.columna === celda.columna - 1)
    ) {
        // Si hay una ficha delante en diagonal, puede comer
        let fichaDelante = fichas.find(
            (ficha) =>
                ficha.fila === celda.fila && ficha.columna === celda.columna
        );

        if (fichaDelante && fichaDelante.color !== fichaActiva.color) {
            return true;
        }
    }
    // else if () { // Captura al paso
    // }

    return false;
};

export default Peon;
