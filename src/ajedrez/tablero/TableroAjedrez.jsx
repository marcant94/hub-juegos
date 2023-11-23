import React, { useEffect, useRef, useState } from "react";

import estilos from "./TableroAjedrez.module.css";
import ControladorTablero from "./ControladorTablero";
import BaseAppbar from "../../appbar/BaseAppbar";

import Alfil from "../piezas/Alfil";
import Caballo from "../piezas/Caballo";
import Peon from "../piezas/Peon";
import Reina from "../piezas/Reina";
import Rey from "../piezas/Rey";
import Torre from "../piezas/Torre";
import Boton from "../../elementos/Boton";
import { coloresTablero, colorTableroPredeterminado } from "../../utilidades";

function generarTableroVacio() {
    let tableroVacio = [];

    tableroVacio.push(<div key="celdaEsquinaArribaIzquierda"></div>);
    for (let columna = 0; columna <= 7; columna++) {
        let letra = String.fromCharCode(columna + "A".charCodeAt(0));

        tableroVacio.push(
            <div
                key={"celdaLetraArriba" + columna}
                className={estilos.celdaColumna}
            >
                {letra}
            </div>
        );
    }
    tableroVacio.push(<div key="celdaEsquinaArribaDerecha"></div>);

    for (let fila = 8; fila > 0; fila--) {
        tableroVacio.push(
            <div key={"celdaFilaInicio" + fila} className={estilos.celdaFila}>
                {fila}
            </div>
        );

        for (let columna = 1; columna <= 8; columna++) {
            let celda = {
                fila: fila,
                columna: columna,
            };

            tableroVacio.push(celda);
        }

        tableroVacio.push(
            <div key={"celdaFilaFin" + fila} className={estilos.celdaFilaFin}>
                {fila}
            </div>
        );
    }

    tableroVacio.push(<div key="celdaEsquinaAbajoIzquierda"></div>);
    for (let columna = 0; columna <= 7; columna++) {
        let letra = String.fromCharCode(columna + "A".charCodeAt(0));

        tableroVacio.push(
            <div
                key={"celdaLetraAbajo" + columna}
                className={estilos.celdaColumna}
            >
                {letra}
            </div>
        );
    }
    tableroVacio.push(<div key="celdaEsquinaAbajoDerecha"></div>);

    return tableroVacio;
}

function generarFichas() {
    let fichasIniciales = [];

    // Generamos los peones blancos
    for (let index = 1; index <= 8; index++) {
        fichasIniciales.push({
            fila: 2,
            columna: index,
            color: "B",
            pieza: Peon,
            nombrePieza: "Peon",
        });
    }

    // Generamos los peones negros
    for (let index = 1; index <= 8; index++) {
        fichasIniciales.push({
            fila: 7,
            columna: index,
            color: "N",
            pieza: Peon,
            nombrePieza: "Peon",
        });
    }

    // Generamos las torres
    fichasIniciales.push({
        fila: 8,
        columna: 1,
        color: "N",
        pieza: Torre,
        nombrePieza: "Torre",
    });
    fichasIniciales.push({
        fila: 8,
        columna: 8,
        color: "N",
        pieza: Torre,
        nombrePieza: "Torre",
    });

    fichasIniciales.push({
        fila: 1,
        columna: 1,
        color: "B",
        pieza: Torre,
        nombrePieza: "Torre",
    });
    fichasIniciales.push({
        fila: 1,
        columna: 8,
        color: "B",
        pieza: Torre,
        nombrePieza: "Torre",
    });

    // Generamos los caballos
    fichasIniciales.push({
        fila: 8,
        columna: 2,
        color: "N",
        pieza: Caballo,
        nombrePieza: "Caballo",
    });
    fichasIniciales.push({
        fila: 8,
        columna: 7,
        color: "N",
        pieza: Caballo,
        nombrePieza: "Caballo",
    });

    fichasIniciales.push({
        fila: 1,
        columna: 2,
        color: "B",
        pieza: Caballo,
        nombrePieza: "Caballo",
    });
    fichasIniciales.push({
        fila: 1,
        columna: 7,
        color: "B",
        pieza: Caballo,
        nombrePieza: "Caballo",
    });

    // Generamos los alfiles
    fichasIniciales.push({
        fila: 8,
        columna: 3,
        color: "N",
        pieza: Alfil,
        nombrePieza: "Alfil",
    });
    fichasIniciales.push({
        fila: 8,
        columna: 6,
        color: "N",
        pieza: Alfil,
        nombrePieza: "Alfil",
    });

    fichasIniciales.push({
        fila: 1,
        columna: 3,
        color: "B",
        pieza: Alfil,
        nombrePieza: "Alfil",
    });
    fichasIniciales.push({
        fila: 1,
        columna: 6,
        color: "B",
        pieza: Alfil,
        nombrePieza: "Alfil",
    });

    // Generamos los reyes y reinas
    fichasIniciales.push({
        fila: 8,
        columna: 5,
        color: "N",
        pieza: Rey,
        nombrePieza: "Rey",
    });
    fichasIniciales.push({
        fila: 8,
        columna: 4,
        color: "N",
        pieza: Reina,
        nombrePieza: "Reina",
    });

    fichasIniciales.push({
        fila: 1,
        columna: 5,
        color: "B",
        pieza: Rey,
        nombrePieza: "Rey",
    });
    fichasIniciales.push({
        fila: 1,
        columna: 4,
        color: "B",
        pieza: Reina,
        nombrePieza: "Reina",
    });

    for (let index = 0; index < fichasIniciales.length; index++) {
        let pieza = fichasIniciales[index];
        pieza["id"] =
            pieza.nombrePieza + "_f" + pieza.fila + "_c" + pieza.columna;
        pieza.movimientos = 0;
        pieza.eliminada = false;
    }

    return fichasIniciales;
}

const TableroAjedrez = (props) => {
    function iniciarJuego(cargaInicial = false) {
        let arrayFichas = null;
        let movimientosInicial = 0;

        if (cargaInicial) {
            // Solo cuando no es reinicio
            const local_movimientos = JSON.parse(
                localStorage.getItem("movimientos")
            );

            const local_color_tablero = localStorage.getItem("colorTablero");
            if (local_color_tablero) {
                setColorTablero(local_color_tablero);
            } else {
                localStorage.setItem(
                    "colorTablero",
                    colorTableroPredeterminado
                );
            }

            if (local_movimientos) {
                const local_fichas = JSON.parse(localStorage.getItem("fichas"));

                arrayFichas = local_fichas;
                movimientosInicial = local_movimientos;

                arrayFichas.forEach((ficha) => {
                    switch (ficha.nombrePieza) {
                        case "Alfil":
                            ficha.pieza = Alfil;
                            break;
                        case "Caballo":
                            ficha.pieza = Caballo;
                            break;
                        case "Peon":
                            ficha.pieza = Peon;
                            break;
                        case "Reina":
                            ficha.pieza = Reina;
                            break;
                        case "Rey":
                            ficha.pieza = Rey;
                            break;
                        case "Torre":
                            ficha.pieza = Torre;
                            break;
                        default:
                            break;
                    }
                });
            }
        }

        if (!arrayFichas) {
            arrayFichas = generarFichas();
        }

        setFichas(arrayFichas);
        setMovimientos(movimientosInicial);
        setActivo({});
    }

    function cambiarColorTablero(event) {
        let nuevoValor = event.target.value;
        setColorTablero(nuevoValor);
        localStorage.setItem("colorTablero", nuevoValor);
    }

    const isMounted = useRef(false);

    const [tableroFichas, setTableroFichas] = useState([]);
    const [fichas, setFichas] = useState([]);
    const [activo, setActivo] = useState({});
    const [movimientos, setMovimientos] = useState(0);

    const [colorTablero, setColorTablero] = useState(
        colorTableroPredeterminado
    );

    useEffect(() => {
        if (!isMounted.current) {
            return;
        }

        // Guardamos en el localstorage las fichas y el nº movimientos
        localStorage.setItem("fichas", JSON.stringify(fichas));
        localStorage.setItem("movimientos", JSON.stringify(movimientos));
    }, [movimientos]);

    useEffect(() => {
        // Constructor
        isMounted.current = true;

        let tableroVacio = generarTableroVacio();

        setTableroFichas(tableroVacio);
        iniciarJuego(true);
    }, []);

    let turno = movimientos % 2 === 0 ? "B" : "N";
    let textoTurno = movimientos % 2 === 0 ? "Blancas" : "Negras";

    return (
        <>
            <BaseAppbar
                extra={
                    <>
                        <span>
                            <select
                                value={colorTablero}
                                onChange={cambiarColorTablero}
                            >
                                {coloresTablero.map((color, indice) => {
                                    return (
                                        <option
                                            key={indice}
                                            value={color.valor}
                                        >
                                            {color.texto}
                                        </option>
                                    );
                                })}
                            </select>
                        </span>

                        <span>
                            <b>Turno:</b> {textoTurno}
                        </span>
                        <span>
                            <b>Movimientos:</b> {movimientos}
                        </span>

                        <Boton
                            desactivado={movimientos === 0}
                            fnClick={iniciarJuego.bind(this, false)}
                        >
                            Reiniciar
                        </Boton>
                    </>
                }
            />

            <div className={estilos.contenedorCajaTableroRelativo}>
                <div className={estilos.contenedorCajaTableroAbsoluto}>
                    <div className={estilos.cajaTablero + " " + colorTablero}>
                        <ControladorTablero
                            key="elcontrolador"
                            tableroFichas={tableroFichas}
                            setTableroFichas={setTableroFichas}
                            fichas={fichas}
                            setFichas={setFichas}
                            movimientos={movimientos}
                            setMovimientos={setMovimientos}
                            activo={activo}
                            setActivo={setActivo}
                            turno={turno}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableroAjedrez;
