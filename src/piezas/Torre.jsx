import React from "react";
import Pieza from "./Pieza";

const Torre = ({ fila, columna, color }) => {
    return <Pieza texto="&#9820;" color={color} />;
};

Torre.puedeMoverse = function(celda, fichaActiva) {
    return true;
};

export default Torre;
