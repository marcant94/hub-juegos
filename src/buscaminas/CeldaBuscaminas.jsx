import React from "react";

import estilos from "./CeldaBuscaminas.module.css";

import flag from "./flag.ico";
import mine from "./mine.ico";

const CeldaBuscaminas = ({
    fila,
    columna,
    minasAlrededor = 0,
    tieneMina = false,
    descubierto = false,
    bandera = false,
    partidaFinalizada = false,
    funcionPulsarCelda,
    funcionPulsarSecundario
}) => {
    let textoMostrar = "";
    let claseColor = "";

    if (bandera) {
        textoMostrar = <img className={estilos.bandera} src={flag} alt="Flag" />;
    } else if (descubierto || partidaFinalizada) {
        if (tieneMina) {
            textoMostrar = <img className={estilos.mina} src={mine} alt="Mine" />;
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
            className={
                estilos.celda +
                " " +
                (tieneMina && descubierto ? estilos.celdaMina : "") +
                " " +
                (descubierto ? estilos.descubierto : "") +
                " " +
                (partidaFinalizada ? estilos.finalizado : "") +
                " " +
                ((tieneMina && descubierto) || (!tieneMina && bandera && partidaFinalizada) ? estilos.error : "") +
                " " +
                claseColor
            }
            onClick={funcionPulsarCelda.bind(this, fila, columna)}
            onContextMenu={funcionPulsarSecundario.bind(this, fila, columna)}
        >
            {textoMostrar}
        </div>
    );
};

export default CeldaBuscaminas;
