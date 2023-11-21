import React, { useEffect, useRef, useState } from "react";

import Enlace from "../elementos/Enlace";
import BaseAppbar from "../appbar/BaseAppbar";

const Inicio = props => {
    return (
        <>
            <BaseAppbar />
            <Enlace to="?buscaminas" decoracion={false}>
                Buscaminas
            </Enlace>
            <br />
            <Enlace to="?ajedrez" decoracion={false}>
                Ajedrez
            </Enlace>
        </>
    );
};

export default Inicio;
