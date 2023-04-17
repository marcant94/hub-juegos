import React, { useState } from "react";

import estilos from "./Tablero.module.css";
import Celda from "../celdas/Celda";
import { clonar } from "../utilidades";

const ControladorTablero = ({
    turno,
    tableroFichas,
    fichas,
    setFichas,
    movimientos,
    setMovimientos,
    activo,
    setActivo,
}) => {
    function seleccionarFicha(celda, evento) {
        if (activo.fila === celda.fila && activo.columna === celda.columna) {
            setActivo({});
        } else {
            setActivo(celda);
        }
    }

    function moverFicha(fichaOrigen, celdaDestino) {
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
        setMovimientos(movimientos + 1);
        setFichas(nuevasFichas);
    }

    function desseleccionarFicha() {
        setActivo({});
    }

    function pintarTablero() {
        let indice = -1;
        let hayActivo = Object.keys(activo).length;
        let fichaActiva = undefined;

        let posiblesCeldasDestino = [];

        if (hayActivo) {
            fichaActiva = fichas.find(
                (ficha) =>
                    ficha.fila === activo.fila &&
                    ficha.columna === activo.columna
            );

            posiblesCeldasDestino = fichaActiva.pieza.calcularCeldasDestino(
                fichaActiva,
                fichas
            );
        }

        return tableroFichas.map((celda) => {
            indice++;

            if (typeof celda.type === "string") {
                return celda;
            } else {
                let fichaEnEstaCelda = fichas.find(
                    (ficha) =>
                        ficha.fila === celda.fila &&
                        ficha.columna === celda.columna
                );
                let puedeLlegar = false;

                let celdaEstaSeleccionada =
                    celda.fila === activo.fila &&
                    celda.columna === activo.columna;

                if (hayActivo && !celdaEstaSeleccionada) {
                    puedeLlegar =
                        posiblesCeldasDestino.findIndex(
                            (celdaDestino) =>
                                celdaDestino.fila === celda.fila &&
                                celdaDestino.columna == celda.columna
                        ) >= 0;
                }

                if (fichaEnEstaCelda) {
                    let funcionPulsar = undefined;
                    if (hayActivo && celdaEstaSeleccionada) {
                        funcionPulsar = desseleccionarFicha;
                    } else if (fichaEnEstaCelda.color === turno) {
                        funcionPulsar = seleccionarFicha.bind(this, celda);
                    } else if (puedeLlegar) {
                        funcionPulsar = moverFicha.bind(
                            this,
                            fichaActiva,
                            celda
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
                            celda
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

    return <div className={estilos.tablaFlex}>{pintarTablero()}</div>;
};

export default ControladorTablero;
