import React, { useEffect, useRef, useState } from "react";

import estilos from "./TableroBuscaminas.module.css";
import BaseAppbar from "../appbar/BaseAppbar";
import Boton from "../elementos/Boton";
import CeldaBuscaminas from "./CeldaBuscaminas";

const TableroBuscaminas = (props) => {
    function iniciarJuego() {
        let tableroVacio = generarTablero();

        setTablero(tableroVacio);
        setPartidaIniciada(false);
    }

    function generarTablero() {
        let filas = 8;
        let columnas = 8;

        let tableroVacio = [];
        for (let i = 0; i < filas; i++) {
            tableroVacio[i] = [];
            for (let j = 0; j < columnas; j++) {
                tableroVacio[i][j] = {
                    fila: i,
                    columna: j,
                    tieneMina: false,
                    minasAlrededor: 0,
                    descubierto: false,
                };
            }
        }

        return tableroVacio;
    }

    function sumarMinas(tableroActual, posFila, posColumna) {
        // A todas las celdas de alrededor sumamos una mina

        for (let fila = posFila - 1; fila <= posFila + 1; fila++) {
            for (let columna = posColumna - 1; columna <= posColumna + 1; columna++) {
                try {
                    tableroActual[fila][columna].minasAlrededor++;
                } catch (error) {}
            }
        }
    }

    function generarMina(tableroActual, filaInicial, columnaInicial) {
        let minaGenerada = false;

        while (!minaGenerada) {
            let posFila = Math.floor(Math.random() * tableroActual.length);
            let posColumna = Math.floor(Math.random() * tableroActual[0].length);

            let celda = tableroActual[posFila][posColumna];
            if (celda.tieneMina) {
                // Esta celda ya tiene mina
                continue;
            }

            if (posFila === filaInicial && posColumna === columnaInicial) {
                // La primera celda pulsada no puede tener minas
                continue;
            }

            let diferenciaFila = Math.abs(filaInicial - posFila);
            let diferenciaColumna = Math.abs(columnaInicial - posColumna);

            if (diferenciaFila <= 2 && diferenciaColumna <= 2) {
                // No puede haber minas en celdas colindantes a la inicial
                continue;
            }

            tableroActual[posFila][posColumna].tieneMina = true;
            sumarMinas(tableroActual, posFila, posColumna);
            minaGenerada = true;
        }
    }

    function repartirMinas(fila, columna) {
        let numMinas = 10;

        let tableroActual = tablero;
        tableroActual[fila][columna].descubierto = true;

        for (let i = 0; i < numMinas; i++) {
            generarMina(tableroActual, fila, columna);
        }

        // Iniciar tiempo
        setTablero(tableroActual);
        setPartidaIniciada(true);
    }

    function pulsarCelda(fila, columna, evento) {
        if (partidaIniciada) {
            let tableroActual = tablero;
            tableroActual[fila][columna].descubierto = true;
            setTablero(tableroActual);
        } else {
            // Se reparten las minas en el primer click
            repartirMinas(fila, columna);
        }
    }

    function pintarColumna(celda, indice) {
        return <CeldaBuscaminas {...celda} key={indice} funcionPulsarCelda={pulsarCelda} />;
    }

    function pintarFila(fila, indice) {
        return (
            <div key={indice} className={estilos.fila}>
                {fila.map(pintarColumna)}
            </div>
        );
    }

    function pintarTablero() {
        return tablero.map(pintarFila);
    }

    const isMounted = useRef(false);

    const [tablero, setTablero] = useState([]);
    const [partidaIniciada, setPartidaIniciada] = useState(false);

    useEffect(() => {
        if (!isMounted.current) {
            return;
        }

        // Guardamos en el localstorage las minas
        // localStorage.setItem("minas", JSON.stringify(minas));
    }, [tablero]);

    useEffect(() => {
        // Constructor
        isMounted.current = true;

        iniciarJuego(true);
    }, []);

    return (
        <>
            <BaseAppbar
                extra={
                    <>
                        <span>
                            <b>000</b> {/* Segundos */}
                        </span>

                        <span>
                            <b>Minas Restantes: 0</b>
                        </span>

                        <Boton desactivado={!partidaIniciada} fnClick={iniciarJuego.bind(this, false)}>
                            Reiniciar
                        </Boton>
                    </>
                }
            />

            <div className={estilos.cajaTablero}>{pintarTablero()}</div>
        </>
    );
};

export default TableroBuscaminas;
