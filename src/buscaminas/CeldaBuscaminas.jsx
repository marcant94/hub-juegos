import React from "react";

import estilos from "./CeldaBuscaminas.module.css";

const CeldaBuscaminas = ({ fila, columna, tieneMina = false, minasAlrededor = 0, descubierto = false, funcionPulsarCelda }) => {
    let textoMostrar = "";
    let claseColor = "";

    if (descubierto) {
        if (tieneMina) {
            textoMostrar = "*";
        } else {
            textoMostrar = minasAlrededor;

            switch (minasAlrededor) {
                case 1:
                    claseColor = estilos.uno;
                    break;
                case 2:
                    claseColor = estilos.dos;
                    break;
                case 3:
                    claseColor = estilos.tres;
                    break;
                case 4:
                    claseColor = estilos.cuatro;
                    break;
                case 5:
                    claseColor = estilos.cinco;
                    break;
                case 6:
                    claseColor = estilos.seis;
                    break;
                case 7:
                    claseColor = estilos.siete;
                    break;
                case 8:
                    claseColor = estilos.ocho;
                    break;

                default:
                    textoMostrar = "";
                    break;
            }
        }
    }

    return (
        <div
            className={estilos.celda + " " + (tieneMina ? estilos.mina : "") + " " + (descubierto ? estilos.descubierto : "") + " " + claseColor}
            onClick={funcionPulsarCelda.bind(this, fila, columna)}
            onAuxClick={funcionPulsarCelda.bind(this, fila, columna)}
        >
            {textoMostrar}
        </div>
    );
};

export default CeldaBuscaminas;
