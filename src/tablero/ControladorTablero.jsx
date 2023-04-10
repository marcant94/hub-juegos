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
    let hayActivo = Object.keys(activo).length;
    let fichaActiva = undefined;

    if (hayActivo) {
        fichaActiva = fichas.find(
            (ficha) =>
                ficha.fila === activo.fila &&
                ficha.columna === activo.columna
        );
    }

    return tableroFichas.map((celda) => {
        indice++;

        if (typeof celda.type === "string") {
            return celda;
        } else {
            let fichaEnEstaCelda = fichas.find(
                (ficha) =>
                    ficha.fila === celda.fila &&
                    ficha.columna === celda.columna
            );

            let celdaSeleccionada =
                celda.fila === activo.fila && celda.columna === activo.columna;
            if (hayActivo && !celdaSeleccionada) {
                // Comprobamos si la ficha se puede mover hasta aqui
                fichaActiva.type.puedeMoverse(
                    celda.fila,
                    celda.columna,
                    fichaActiva.fila,
                    fichaActiva.columna
                );
            }

            if (fichaEnEstaCelda) {
                let funcionPulsar = undefined;
                if (hayActivo && celdaSeleccionada) {
                    funcionPulsar = desseleccionarFicha.bind(this, setActivo);
                } else if (fichaEnEstaCelda.color === turno) {
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
                let funcionPulsar = undefined;
                if (hayActivo) {
                    // Permitimos pulsar aqui si la ficha seleccionada puede moverse hasta aqui
                }

                return (
                    <Celda
                        pulsarCelda={funcionPulsar}
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
