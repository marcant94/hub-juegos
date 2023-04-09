import React, { useState } from "react";

import estilos from "./Tablero.module.css";
import Celda from "../celdas/Celda";

// const [count, setCount] = useState(0);

function generarTableroVacio() {
    let tableroVacio = [];

    let indice = 0;
    for (let fila = 8; fila > 0; fila--) {
        tableroVacio.push(<div className={estilos.celdaFila}>{fila}</div>);
        for (let columna = 0; columna <= 7; columna++) {
            let celda = (
                <Celda
                    key={indice}
                    indice={indice}
                    fila={fila}
                    columna={columna}
                />
            );

            tableroVacio.push(celda);
            indice++;
        }
    }

    tableroVacio.push(<div></div>);
    for (let columna = 0; columna <= 7; columna++) {
        let letra = String.fromCharCode(columna + "A".charCodeAt(0));

        tableroVacio.push(<div className={estilos.celdaColumna}>{letra}</div>);
        indice++;
    }

    return tableroVacio;
}

function generarFichas() {
    return {};
}

const Tablero = (props) => {
    let tableroVacio = generarTableroVacio();
    // console.log("pido el tablero vacio");

    let arrayFichas = generarFichas();
    // console.log("pido las fichas");

    const [tableroFichas, setTableroFichas] = useState(tableroVacio);
    const [fichas, setFichas] = useState(arrayFichas);

    return (
        <div>
            <br />
            <div className={estilos.tablaFlex}>{tableroFichas}</div>
        </div>
    );
};

export default Tablero;
