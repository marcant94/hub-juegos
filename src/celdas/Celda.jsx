import React from "react";

import estilos from "./Celda.module.css";

const Celda = ({ fila, columna, ficha, pulsarCelda, seleccionado }) => {
    let letra = String.fromCharCode(columna + "A".charCodeAt(0));

    return (
        <div
            className={
                estilos.celda +
                " " +
                (fila % 2 === 0 ? estilos.filaPar : estilos.filaImpar) +
                " " +
                (ficha ? estilos.celdaConFicha : "") +
                " " +
                (seleccionado ? estilos.celdaSeleccionada : "")
            }
            onClick={pulsarCelda}
        >
            <div className={estilos.marcador}>
                {fila}
                {letra}
            </div>
            {ficha ? ficha : undefined}
        </div>
    );
};

export default Celda;
