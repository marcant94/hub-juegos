import React from "react";
import Pieza from "./Pieza";

const Torre = ({ fila, columna, color }) => {
    return <Pieza texto="&#9820;" color={color} />;
};

export default Torre;
