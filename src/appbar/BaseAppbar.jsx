import React, { useEffect, useRef, useState } from "react";

// import packageJson from "../package.json" assert { type: "json" };
import packageJson from "../../package.json";

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
            const latestVersion = meta.version;
            setUltimaVersion(latestVersion);
            static_ultima_version = latestVersion;

            let hayActualizacion = semverGreaterThan(latestVersion, packageJson.version);
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

            {!hayActualizacion && <div>v{packageJson.version}</div>}
            {hayActualizacion && (
                <div>
                    <span className={estilos.versionAnterior}>v{packageJson.version}</span>
                    &nbsp;-&nbsp;
                    <span className={estilos.versionNueva}>v{ultimaVersion}</span>
                </div>
            )}
        </div>
    );
};

export default BaseAppbar;
