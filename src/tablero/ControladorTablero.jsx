import React, { useState } from "react";

import estilos from "./Tablero.module.css";
import Celda from "../celdas/Celda";

function seleccionarFicha(celda, activo, setActivo, evento) {
    if (activo.fila === celda.fila && activo.columna === celda.columna) {
        setActivo({});
    } else {
        setActivo(celda);
    }
}

function pintarTablero(tableroFichas, fichas, activo, setActivo) {
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
                let celdaSeleccionada =
                    celda.fila === activo.fila &&
                    celda.columna === activo.columna;

                if (celdaSeleccionada) {
                    console.log(celda, "=", activo);
                }

                return (
                    <Celda
                        pulsarCelda={seleccionarFicha.bind(
                            this,
                            celda,
                            activo,
                            setActivo
                        )}
                        key={indice++}
                        fila={celda.fila}
                        columna={celda.columna}
                        ficha={fichaEnEstaCelda}
                        seleccionado={celdaSeleccionada}
                    />
                );
            } else {
                return (
                    <Celda
                        pulsarCelda={seleccionarFicha.bind(
                            this,
                            celda,
                            activo,
                            setActivo
                        )}
                        key={indice++}
                        fila={celda.fila}
                        columna={celda.columna}
                        seleccionado={false}
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
    const [activo, setActivo] = useState({});

    return (
        <div className={estilos.tablaFlex}>
            {pintarTablero(tableroFichas, fichas, activo, setActivo)}
        </div>
    );
};

export default ControladorTablero;
