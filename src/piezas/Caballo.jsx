import React from "react";
import Pieza from "./Pieza";

const Caballo = ({ fila, columna, color }) => {
    return <Pieza texto="&#9822;" color={color} />;
};

export default Caballo;
