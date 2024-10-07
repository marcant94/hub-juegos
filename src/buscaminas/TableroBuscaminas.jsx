import React, { useEffect, useRef, useState } from "react";

import estilos from "./TableroBuscaminas.module.css";
import BaseAppbar from "../appbar/BaseAppbar";
import Boton from "../elementos/Boton";
import CeldaBuscaminas from "./CeldaBuscaminas";
import { clonar } from "../utilidades";

const TableroBuscaminas = (props) => {
    function iniciarJuego(cargarLocalstorage = false) {
        let tableroInicial = null;
        let numFilasInicial = numFilas;
        let numColumnasInicial = numColumnas;

        if (cargarLocalstorage) {
            numFilasInicial = parseInt(localStorage.getItem("numFilas"));
            if (isNaN(numFilasInicial)) {
                numFilasInicial = numFilas;
            } else {
                setNumFilas(numFilasInicial);
            }

            numColumnasInicial = parseInt(localStorage.getItem("numColumnas"));
            if (isNaN(numColumnasInicial)) {
                numColumnasInicial = numColumnas;
            } else {
                setNumColumnas(numColumnasInicial);
            }

            let numMinasInicial = parseInt(localStorage.getItem("numMinas"));
            if (isNaN(numMinasInicial)) {
                numMinasInicial = numMinas;
            } else {
                setNumMinas(numMinasInicial);
            }

            tableroInicial = JSON.parse(localStorage.getItem("tablero"));
        }

        if (tableroInicial === null) {
            tableroInicial = generarTableroVacio(numFilasInicial, numColumnasInicial);
            setPartidaIniciada(false);
            setPartidaFinalizada(false);
        } else {
            comprobarTableroPrecargado(tableroInicial);
        }

        setTablero(tableroInicial);
    }

    function comprobarTableroPrecargado(tableroInicial) {
        let iniciada = false;
        let finalizada = false;

        for (let i = 0; i < numFilas; i++) {
            for (let j = 0; j < numColumnas; j++) {
                if (tableroInicial[i][j].descubierto) {
                    iniciada = true;
                    if (tableroInicial[i][j].tieneMina) {
                        finalizada = true;
                        break;
                    }
                }
            }
        }

        setPartidaIniciada(iniciada);
        setPartidaFinalizada(finalizada);
    }

    function generarTableroVacio(numFilasInicial, numColumnasInicial) {
        let tableroVacio = [];
        for (let i = 0; i < numFilasInicial; i++) {
            tableroVacio[i] = [];
            for (let j = 0; j < numColumnasInicial; j++) {
                tableroVacio[i][j] = {
                    fila: i,
                    columna: j,
                    minasAlrededor: 0,
                    tieneMina: false,
                    descubierto: false,
                    bandera: false
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
            let posFila = Math.floor(Math.random() * numFilas);
            let posColumna = Math.floor(Math.random() * numColumnas);

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
        let tableroActual = clonar(tablero);

        for (let i = 0; i < numMinas; i++) {
            generarMina(tableroActual, fila, columna);
        }

        // Iniciar tiempo
        setPartidaIniciada(true);

        return tableroActual;
    }

    function descubrirRecursivo(tableroActual, posFila, posColumna) {
        if (tableroActual[posFila][posColumna].minasAlrededor > 0) {
            return;
        }

        for (let fila = posFila - 1; fila <= posFila + 1; fila++) {
            for (let columna = posColumna - 1; columna <= posColumna + 1; columna++) {
                try {
                    let celda = tableroActual[fila][columna];
                    if (!celda.descubierto) {
                        celda.descubierto = true;
                        descubrirRecursivo(tableroActual, fila, columna);
                    }
                } catch (error) {}
            }
        }
    }

    function pulsarCelda(fila, columna, evento) {
        evento.preventDefault();
        evento.stopPropagation();

        if (partidaFinalizada) {
            return;
        }

        if (tablero[fila][columna].bandera) {
            return;
        }
        
        let tableroActual = undefined;
        if (partidaIniciada) {
            tableroActual = clonar(tablero);
        } else {
            // Se reparten las minas en el primer click
            tableroActual = repartirMinas(fila, columna);
        }

        tableroActual[fila][columna].descubierto = true;
        descubrirRecursivo(tableroActual, fila, columna);

        if (tableroActual[fila][columna].tieneMina) {
            setPartidaFinalizada(true);
        }

        setTablero(tableroActual);
    }

    function pulsarSecundarioCelda(fila, columna, evento) {
        evento.preventDefault();
        evento.stopPropagation();

        if (partidaFinalizada) {
            return;
        }

        if (!partidaIniciada) {
            return;
        }
        
        if (tablero[fila][columna].descubierto) {
            return;
        }
        
        let tableroActual = clonar(tablero);
        tableroActual[fila][columna].bandera = !tableroActual[fila][columna].bandera;
        
        setTablero(tableroActual);
    }

    function pintarColumna(celda, indice) {
        return <CeldaBuscaminas {...celda} key={indice} funcionPulsarCelda={pulsarCelda} funcionPulsarSecundario={pulsarSecundarioCelda} partidaFinalizada={partidaFinalizada} />;
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
    const [partidaFinalizada, setPartidaFinalizada] = useState(false);
    const [numFilas, setNumFilas] = useState(8);
    const [numColumnas, setNumColumnas] = useState(8);
    const [numMinas, setNumMinas] = useState(10);

    useEffect(() => {
        if (!isMounted.current) {
            return;
        }

        // Guardamos en el localstorage la configuracion
        localStorage.setItem("numFilas", JSON.stringify(numFilas));
        localStorage.setItem("numColumnas", JSON.stringify(numColumnas));
        localStorage.setItem("numMinas", JSON.stringify(numMinas));

        // Guardamos en el localstorage la partida
        localStorage.setItem("tablero", JSON.stringify(tablero));
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

            <div className={estilos.cajaTablero + " facil"}>{pintarTablero()}</div>
        </>
    );
};

export default TableroBuscaminas;
