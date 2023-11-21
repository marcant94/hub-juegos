import React, { useEffect, useRef, useState } from "react";

import estilos from "./TableroBuscaminas.module.css";
import BaseAppbar from "../appbar/BaseAppbar";

// import ControladorTablero from "./ControladorTablero";

function generarTableroVacio() {
    let tableroVacio = [];

    return tableroVacio;
}

function generarFichas() {
    let fichasIniciales = [];

    return fichasIniciales;
}

const TableroBuscaminas = props => {
    function iniciarJuego(cargaInicial = false) {}

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

    const [colorTablero, setColorTablero] = useState("tableroGris");

    useEffect(() => {
        if (!isMounted.current) {
            return;
        }

        // Guardamos en el localstorage las fichas y el nº movimientos
        // localStorage.setItem("fichas", JSON.stringify(fichas));
        // localStorage.setItem("movimientos", JSON.stringify(movimientos));
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
        </>
    );
};

export default TableroBuscaminas;
