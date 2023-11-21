import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import estilos from "./App.module.css";
import { ProveedorRuta } from "./elementos/ProveedorRuta";

const TableroAjedrez = lazy(() => import("./ajedrez/tablero/TableroAjedrez"));
const TableroBuscaminas = lazy(() => import("./buscaminas/TableroBuscaminas"));

import NoMatch from "./noMatch/NoMatch";
import Inicio from "./home/Inicio";

const App = props => {
    const isMounted = useRef(false);
    const [ruta, setRuta] = useState(window.location.search);

    useEffect(() => {
        // Constructor
        isMounted.current = true;
    }, []);

    function pintarVista() {
        let vista;

        switch (true) {
            // case ruta.includes("?buscar="):
            case ruta === "":
            case ruta === "?":
            case ruta === undefined:
                // Generar Home
                vista = <Inicio />;
                break;

            case ruta === "?ajedrez":
                // El tablero de ajedrez tiene su propio contenedor
                return <TableroAjedrez />;

            case ruta === "?buscaminas":
                vista = <TableroBuscaminas />;
                break;

            default:
                vista = <NoMatch />;
                break;
        }

        return <div className={estilos.contenedorAplicacion}>{vista}</div>;
    }

    return (
        <ProveedorRuta.Provider value={setRuta}>
            <div className={estilos.contenedorApp}>
                <Suspense fallback={<Inicio />}>{pintarVista()}</Suspense>
            </div>
        </ProveedorRuta.Provider>
    );
};

export default App;
