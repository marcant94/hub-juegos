import React from "react";

import estilos from "./Celda.module.css";

const Celda = ({ indice, fila, columna }) => {
    let letra = String.fromCharCode(columna + "A".charCodeAt(0));

    return (
        <div className={estilos.celda}>
            {/* {fila}-{letra} */}
        </div>
    );
};

export default Celda;
