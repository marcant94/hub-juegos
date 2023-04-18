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
        let nuevasFichas = clonar(fichas);

        let fichaMovida = nuevasFichas.find(
            (ficha) =>
                ficha.fila === fichaOrigen.fila &&
                ficha.columna === fichaOrigen.columna
        );

        // Si habia una ficha en la celda destino, ha sido comida
        let fichaComida = nuevasFichas.find(
            (ficha) =>
                ficha.fila === celdaDestino.fila &&
                ficha.columna === celdaDestino.columna
        );

        if (fichaComida) {
            fichaComida.eliminada = true;
            fichaComida.fila = -10;
            fichaComida.columna = -10;
        }

        // Movemos la ficha seleccionada
        fichaMovida.movimientos++;
        fichaMovida.fila = celdaDestino.fila;
        fichaMovida.columna = celdaDestino.columna;

        setActivo({});
        setMovimientos(movimientos + 1);
        setFichas(nuevasFichas);
    }

    function desseleccionarFicha() {
        setActivo({});
    }

    function pintarTablero() {
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

        let indice = -1;
        let lista_filas_celdas = tableroFichas.map((celda) => {
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
                            // ficha={fichaEnEstaCelda}
                            tieneFicha={true}
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

        fichas.forEach((ficha) => {
            lista_filas_celdas.push(
                <ficha.pieza key={ficha.id} ficha={ficha} />
            );
        });

        return lista_filas_celdas;
    }

    return <div className={estilos.tablaFlex}>{pintarTablero()}</div>;
};

export default ControladorTablero;
