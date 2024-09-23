import React from "react";

import estilos from "./CeldaBuscaminas.module.css";

const CeldaBuscaminas = ({ fila, columna, tieneMina = false, minasAlrededor = 0, descubierto = false, funcionPulsarCelda }) => {
    let textoMostrar = "";
    if (descubierto && minasAlrededor > 0) {
        textoMostrar = tieneMina ? "*" : minasAlrededor;
    }

    return (
        <div
            className={estilos.celda + " " + (tieneMina ? estilos.mina : "") + " " + (descubierto ? estilos.descubierto : "")}
            onClick={funcionPulsarCelda.bind(this, fila, columna)}
        >
            {textoMostrar}
        </div>
    );
};

export default CeldaBuscaminas;
