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

    for (let fila = 8; fila > 0; fila--) {
        tableroVacio.push(
            <div key={"celdaFila" + fila} className={estilos.celdaFila}>
                {fila}
            </div>
        );

        for (let columna = 0; columna <= 7; columna++) {
            let celda = {
                fila: fila,
                columna: columna,
            };

            tableroVacio.push(celda);
        }
    }

    tableroVacio.push(<div key="celdaEsquina"></div>);
    for (let columna = 0; columna <= 7; columna++) {
        let letra = String.fromCharCode(columna + "A".charCodeAt(0));

        tableroVacio.push(
            <div key={"celdaLetra" + columna} className={estilos.celdaColumna}>
                {letra}
            </div>
        );
    }

    return tableroVacio;
}

function generarFichas() {
    let fichasIniciales = [];

    // Generamos los peones blancos
    for (let index = 0; index < 8; index++) {
        let peonBlanco = <Peon fila={2} columna={index} color="B" />;
        fichasIniciales.push(peonBlanco);
    }

    // Generamos los peones negros
    for (let index = 0; index < 8; index++) {
        let peonNegro = <Peon fila={7} columna={index} color="N" />;
        fichasIniciales.push(peonNegro);
    }

    // Generamos las torres
    fichasIniciales.push(<Torre fila={8} columna={0} color="N" />);
    fichasIniciales.push(<Torre fila={8} columna={7} color="N" />);

    fichasIniciales.push(<Torre fila={1} columna={0} color="B" />);
    fichasIniciales.push(<Torre fila={1} columna={7} color="B" />);

    // Generamos los caballos
    fichasIniciales.push(<Caballo fila={8} columna={1} color="N" />);
    fichasIniciales.push(<Caballo fila={8} columna={6} color="N" />);

    fichasIniciales.push(<Caballo fila={1} columna={1} color="B" />);
    fichasIniciales.push(<Caballo fila={1} columna={6} color="B" />);

    // Generamos los alfiles
    fichasIniciales.push(<Alfil fila={8} columna={2} color="N" />);
    fichasIniciales.push(<Alfil fila={8} columna={5} color="N" />);

    fichasIniciales.push(<Alfil fila={1} columna={2} color="B" />);
    fichasIniciales.push(<Alfil fila={1} columna={5} color="B" />);

    // Generamos los reyes y reinas
    fichasIniciales.push(<Rey fila={8} columna={4} color="N" />);
    fichasIniciales.push(<Reina fila={8} columna={3} color="N" />);

    fichasIniciales.push(<Rey fila={1} columna={4} color="B" />);
    fichasIniciales.push(<Reina fila={1} columna={3} color="B" />);

    return fichasIniciales;
}

const Tablero = (props) => {
    let tableroVacio = generarTableroVacio();
    let arrayFichas = generarFichas();

    console.log("inicio tablero");

    const [tableroFichas, setTableroFichas] = useState(tableroVacio);
    const [fichas, setFichas] = useState(arrayFichas);

    return (
        <div>
            <br />
            <ControladorTablero
                key="elcontrolador"
                tableroFichas={tableroFichas}
                setTableroFichas={setTableroFichas}
                fichas={fichas}
                setFichas={setFichas}
            />
            {/* <div className={estilos.tablaFlex}>{tableroFichas}</div> */}
        </div>
    );
};

export default Tablero;
