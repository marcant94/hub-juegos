import React, { useState } from "react";

import estilos from "./Tablero.module.css";
import Celda from "../celdas/Celda";

function pintarTablero(tableroFichas, fichas) {
    let indice = -1;
    return tableroFichas.map((celda) => {
        indice++;

        if (typeof celda.type === "string") {
            return celda;
        } else {
            let fichaEnEstaCelda = fichas.find(
                (ficha) =>
                    ficha.props.fila === celda.fila &&
                    ficha.props.columna === celda.columna
            );

            if (fichaEnEstaCelda) {
                return (
                    <Celda
                        key={indice++}
                        fila={celda.fila}
                        columna={celda.columna}
                        ficha={fichaEnEstaCelda}
                    />
                );
            } else {
                return (
                    <Celda
                        key={indice++}
                        fila={celda.fila}
                        columna={celda.columna}
                    />
                );
            }
        }
    });
}

const ControladorTablero = ({
    tableroFichas,
    setTableroFichas,
    fichas,
    setFichas,
}) => {
    return (
        <div className={estilos.tablaFlex}>
            {pintarTablero(tableroFichas, fichas)}
        </div>
    );
};

export default ControladorTablero;
