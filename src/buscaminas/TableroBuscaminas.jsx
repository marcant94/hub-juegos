import React, { useEffect, useRef, useState } from "react";

import estilos from "./TableroBuscaminas.module.css";
import BaseAppbar from "../appbar/BaseAppbar";
import { coloresTablero, colorTableroPredeterminado } from "../utilidades";

// import ControladorTablero from "./ControladorTablero";

function generarTableroVacio() {
    let tableroVacio = [];

    return tableroVacio;
}

function generarFichas() {
    let minasIniciales = [];

    return minasIniciales;
}

const TableroBuscaminas = (props) => {
    function iniciarJuego(cargaInicial = false) {
        let arrayFichas = null;
        let movimientosInicial = 0;
        
        if (cargaInicial) {
            // Solo cuando no es reinicio

            const local_color_tablero = localStorage.getItem("colorTablero");
            if (local_color_tablero) {
                setColorTablero(local_color_tablero);
            } else {
                localStorage.setItem(
                    "colorTablero",
                    colorTableroPredeterminado
                );
            }

            // if (local_movimientos) {
            //     const local_fichas = JSON.parse(localStorage.getItem("fichas"));

            //     arrayFichas = local_fichas;
            //     movimientosInicial = local_movimientos;

            // arrayFichas.forEach((ficha) => {
            //     switch (ficha.nombrePieza) {
            //         case "Alfil":
            //             ficha.pieza = Alfil;
            //             break;
            //         case "Caballo":
            //             ficha.pieza = Caballo;
            //             break;
            //         case "Peon":
            //             ficha.pieza = Peon;
            //             break;
            //         case "Reina":
            //             ficha.pieza = Reina;
            //             break;
            //         case "Rey":
            //             ficha.pieza = Rey;
            //             break;
            //         case "Torre":
            //             ficha.pieza = Torre;
            //             break;
            //         default:
            //             break;
            //     }
            // });
            // }
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

        // Guardamos en el localstorage las minas
        // localStorage.setItem("minas", JSON.stringify(minas));
    }, [movimientos]);

    useEffect(() => {
        // Constructor
        isMounted.current = true;

        let tableroVacio = generarTableroVacio();

        setTableroFichas(tableroVacio);
        iniciarJuego(true);
    }, []);

    return (
        <>
            <BaseAppbar />
            aqui ira el buscaminas
        </>
    );
};

export default TableroBuscaminas;
