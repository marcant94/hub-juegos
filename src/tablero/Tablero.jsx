import React, { useState } from "react";

import estilos from "./Tablero.module.css";
import Peon from "../piezas/Peon";
import ControladorTablero from "./ControladorTablero";
import Torre from "../piezas/Torre";
import Alfil from "../piezas/Alfil";
import Caballo from "../piezas/Caballo";
import Rey from "../piezas/Rey";
import Reina from "../piezas/Reina";

// const [count, setCount] = useState(0);

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
            movimientos: 0,
        });
    }

    // Generamos los peones negros
    for (let index = 1; index <= 8; index++) {
        fichasIniciales.push({
            fila: 7,
            columna: index,
            color: "N",
            pieza: Peon,
            movimientos: 0,
        });
    }

    // Generamos las torres
    fichasIniciales.push({
        fila: 8,
        columna: 1,
        color: "N",
        pieza: Torre,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 8,
        columna: 8,
        color: "N",
        pieza: Torre,
        movimientos: 0,
    });

    fichasIniciales.push({
        fila: 1,
        columna: 1,
        color: "B",
        pieza: Torre,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 1,
        columna: 8,
        color: "B",
        pieza: Torre,
        movimientos: 0,
    });

    // Generamos los caballos
    fichasIniciales.push({
        fila: 8,
        columna: 2,
        color: "N",
        pieza: Caballo,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 8,
        columna: 7,
        color: "N",
        pieza: Caballo,
        movimientos: 0,
    });

    fichasIniciales.push({
        fila: 1,
        columna: 2,
        color: "B",
        pieza: Caballo,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 1,
        columna: 7,
        color: "B",
        pieza: Caballo,
        movimientos: 0,
    });

    // Generamos los alfiles
    fichasIniciales.push({
        fila: 8,
        columna: 3,
        color: "N",
        pieza: Alfil,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 8,
        columna: 6,
        color: "N",
        pieza: Alfil,
        movimientos: 0,
    });

    fichasIniciales.push({
        fila: 1,
        columna: 3,
        color: "B",
        pieza: Alfil,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 1,
        columna: 6,
        color: "B",
        pieza: Alfil,
        movimientos: 0,
    });

    // Generamos los reyes y reinas
    fichasIniciales.push({
        fila: 8,
        columna: 5,
        color: "N",
        pieza: Rey,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 8,
        columna: 4,
        color: "N",
        pieza: Reina,
        movimientos: 0,
    });

    fichasIniciales.push({
        fila: 1,
        columna: 5,
        color: "B",
        pieza: Rey,
        movimientos: 0,
    });
    fichasIniciales.push({
        fila: 1,
        columna: 4,
        color: "B",
        pieza: Reina,
        movimientos: 0,
    });

    return fichasIniciales;
}

const Tablero = (props) => {
    let tableroVacio = generarTableroVacio();
    let arrayFichas = generarFichas();

    const [tableroFichas, setTableroFichas] = useState(tableroVacio);
    const [fichas, setFichas] = useState(arrayFichas);
    const [turno, setTurno] = useState("B");

    return (
        <div>
            {/* Menu seleccion colores de tablero y de fichas */}
            {/* Mostrar turno (y contador de turnos) */}
            {/* Mostrar fichas comidas */}
            {/* Añadir transiciones cortas al mover las fichas */}
            {/* Boton para reiniciar (guardar fichas en localstorage) */}
            <br />
            <ControladorTablero
                key="elcontrolador"
                tableroFichas={tableroFichas}
                setTableroFichas={setTableroFichas}
                fichas={fichas}
                setFichas={setFichas}
                turno={turno}
                setTurno={setTurno}
            />
        </div>
    );
};

export default Tablero;
