import React, { useEffect, useRef, useState } from "react";

// La version empaquetada la inyecta esbuild desde src/scripts/esbuild-config.js
// (package.json + contador de commits), igual que meta.json
const versionApp = typeof __VERSION_APP__ !== "undefined" ? __VERSION_APP__ : "0.0.0";

import estilos from "./BaseAppbar.module.css";
import { dameUrlBase, semverGreaterThan } from "../utilidades";
import Enlace from "../elementos/Enlace";

let static_hay_actualizacion, static_ultima_version;
const BaseAppbar = props => {
    const isMounted = useRef(false);
    const [hayActualizacion, setHayActualizacion] = useState(true);
    const [ultimaVersion, setUltimaVersion] = useState("");

    async function recuperarVersion() {
        let response = await fetch(dameUrlBase() + "meta.json?f=" + new Date().getTime(), {
            method: "GET",
            mode: "no-cors",
            cache: "no-cache"
        });

        if (response.status >= 200 && response.status < 300) {
            const meta = await response.json();
            const latestVersion = String(meta.version);
            setUltimaVersion(latestVersion);
            static_ultima_version = latestVersion;

            let hayActualizacion = semverGreaterThan(latestVersion, versionApp);
            setHayActualizacion(hayActualizacion);

            static_hay_actualizacion = hayActualizacion;
        }
    }

    useEffect(() => {
        // Constructor
        isMounted.current = true;

        if (static_ultima_version !== undefined) {
            setUltimaVersion(static_ultima_version);
            setHayActualizacion(static_hay_actualizacion);
        } else {
            recuperarVersion();
        }
    }, []);

    return (
        <div className={estilos.appbar}>
            <b className={estilos.nombreApp}>
                <Enlace to="?" decoracion={false}>
                    Juegos React
                </Enlace>
            </b>

            <span className={estilos.separadorDerecha}></span>

            {props.extra ? props.extra : undefined}

            {!hayActualizacion && <div>v{versionApp}</div>}
            {hayActualizacion && (
                <div>
                    <span className={estilos.versionAnterior}>v{versionApp}</span>
                    &nbsp;-&nbsp;
                    <span className={estilos.versionNueva}>v{ultimaVersion}</span>
                </div>
            )}
        </div>
    );
};

export default BaseAppbar;
