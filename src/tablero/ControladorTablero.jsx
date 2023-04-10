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

function desseleccionarFicha(setActivo) {
    setActivo({});
}

function pintarTablero(
    tableroFichas,
    fichas,
    activo,
    setActivo,
    turno,
    setTurno
) {
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

                let funcionPulsar = undefined;

                let hayActivo = Object.keys(activo).length;
                if (hayActivo) {
                    if (celdaSeleccionada) {
                        funcionPulsar = desseleccionarFicha.bind(
                            this,
                            setActivo
                        );
                    }
                } else if (fichaEnEstaCelda.props.color === turno) {
                    funcionPulsar = seleccionarFicha.bind(
                        this,
                        celda,
                        activo,
                        setActivo
                    );
                }

                return (
                    <Celda
                        pulsarCelda={funcionPulsar}
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
                        // pulsarCelda={seleccionarFicha.bind(
                        //     this,
                        //     celda,
                        //     activo,
                        //     setActivo
                        // )}
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
    turno,
    setTurno,
}) => {
    const [activo, setActivo] = useState({});

    return (
        <div className={estilos.tablaFlex}>
            {pintarTablero(
                tableroFichas,
                fichas,
                activo,
                setActivo,
                turno,
                setTurno
            )}
        </div>
    );
};

export default ControladorTablero;
