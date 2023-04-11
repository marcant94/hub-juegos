import React, { useState } from "react";

import estilos from "./Tablero.module.css";
import Celda from "../celdas/Celda";
import { clonar } from "../utilidades";

function seleccionarFicha(celda, activo, setActivo, evento) {
    if (activo.fila === celda.fila && activo.columna === celda.columna) {
        setActivo({});
    } else {
        setActivo(celda);
    }
}

function moverFicha(
    fichaOrigen,
    fichaDestino = undefined,
    celdaDestino,
    setActivo,
    setTurno,
    fichas,
    setFichas
) {
    // let nuevasFichas = clonar(fichas);
    let nuevasFichas = fichas.filter((ficha, indice) => {
        // Eliminamos la ficha origen
        if (
            ficha.fila === fichaOrigen.fila &&
            ficha.columna === fichaOrigen.columna
        ) {
            return;
        }

        // Si habia una ficha en la celda destino, ha sido comida
        if (
            ficha.fila === celdaDestino.fila &&
            ficha.columna === celdaDestino.columna
        ) {
            return;
        }

        return ficha;
    });

    let nuevaFicha = clonar(fichaOrigen);

    nuevaFicha.movimientos++;
    nuevaFicha.fila = celdaDestino.fila;
    nuevaFicha.columna = celdaDestino.columna;

    nuevasFichas.push(nuevaFicha);

    setActivo({});
    setTurno(fichaOrigen.color === "B" ? "N" : "B");

    setFichas(nuevasFichas);
}

function desseleccionarFicha(setActivo) {
    setActivo({});
}

function pintarTablero(
    tableroFichas,
    fichas,
    setFichas,
    activo,
    setActivo,
    turno,
    setTurno
) {
    let indice = -1;
    let hayActivo = Object.keys(activo).length;
    let fichaActiva = undefined;

    if (hayActivo) {
        fichaActiva = fichas.find(
            (ficha) =>
                ficha.fila === activo.fila && ficha.columna === activo.columna
        );
    }

    return tableroFichas.map((celda) => {
        indice++;

        if (typeof celda.type === "string") {
            return celda;
        } else {
            let fichaEnEstaCelda = fichas.find(
                (ficha) =>
                    ficha.fila === celda.fila && ficha.columna === celda.columna
            );
            let puedeLlegar = false;

            let celdaEstaSeleccionada =
                celda.fila === activo.fila && celda.columna === activo.columna;
            if (hayActivo && !celdaEstaSeleccionada) {
                // Comprobamos si la ficha se puede mover hasta aqui
                puedeLlegar = fichaActiva.pieza.puedeMoverse(
                    celda,
                    fichaActiva,
                    fichas
                );
            }

            if (fichaEnEstaCelda) {
                let funcionPulsar = undefined;
                if (hayActivo && celdaEstaSeleccionada) {
                    funcionPulsar = desseleccionarFicha.bind(this, setActivo);
                } else if (fichaEnEstaCelda.color === turno) {
                    funcionPulsar = seleccionarFicha.bind(
                        this,
                        celda,
                        activo,
                        setActivo
                    );
                } else if (puedeLlegar) {
                    funcionPulsar = moverFicha.bind(
                        this,
                        fichaActiva,
                        fichaEnEstaCelda,
                        celda,
                        setActivo,
                        setTurno,
                        fichas,
                        setFichas
                    );
                }

                return (
                    <Celda
                        puedeLlegar={puedeLlegar}
                        pulsarCelda={funcionPulsar}
                        key={indice++}
                        fila={celda.fila}
                        columna={celda.columna}
                        ficha={fichaEnEstaCelda}
                        seleccionado={celdaEstaSeleccionada}
                    />
                );
            } else {
                let funcionPulsar = undefined;
                if (puedeLlegar) {
                    funcionPulsar = moverFicha.bind(
                        this,
                        fichaActiva,
                        undefined,
                        celda,
                        setActivo,
                        setTurno,
                        fichas,
                        setFichas
                    );
                }

                return (
                    <Celda
                        puedeLlegar={puedeLlegar}
                        pulsarCelda={funcionPulsar}
                        key={indice++}
                        fila={celda.fila}
                        columna={celda.columna}
                        seleccionado={false}
                    />
                );
            }
        }
    });
}

const ControladorTablero = ({
    tableroFichas,
    fichas,
    setFichas,
    turno,
    setTurno,
    activo,
    setActivo,
}) => {
    return (
        <div className={estilos.tablaFlex}>
            {pintarTablero(
                tableroFichas,
                fichas,
                setFichas,
                activo,
                setActivo,
                turno,
                setTurno
            )}
        </div>
    );
};

export default ControladorTablero;
