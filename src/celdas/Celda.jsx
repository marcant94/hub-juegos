import React from "react";

import estilos from "./Celda.module.css";

const Celda = ({
    fila,
    columna,
    // ficha,
    tieneFicha = false,
    pulsarCelda,
    seleccionado,
    puedeLlegar,
}) => {
    let letra = String.fromCharCode(columna - 1 + "A".charCodeAt(0));

    return (
        <div
            className={
                estilos.celda +
                " " +
                (fila % 2 === 0 ? estilos.filaPar : estilos.filaImpar) +
                " " +
                (tieneFicha ? estilos.celdaConFicha : "") +
                " " +
                (seleccionado ? estilos.celdaSeleccionada : "") +
                " " +
                (puedeLlegar ? estilos.puedeLlegar : "")
            }
            onClick={pulsarCelda}
        >
            <div className={estilos.marcador}>
                {fila}
                {letra}
            </div>
            {/* {ficha ? <ficha.pieza color={ficha.color} /> : undefined} */}
        </div>
    );
};

export default Celda;
