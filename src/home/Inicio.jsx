import React, { useEffect, useRef, useState } from "react";

import Enlace from "../elementos/Enlace";
import BaseAppbar from "../appbar/BaseAppbar";

const Inicio = props => {
    return (
        <>
            <BaseAppbar />

            <ul>
                <li>
                    <p>
                        <Enlace to="?buscaminas" decoracion={false}>
                            Buscaminas
                        </Enlace>
                    </p>
                </li>
                <li>
                    <p>
                        <Enlace to="?ajedrez" decoracion={false}>
                            Ajedrez
                        </Enlace>
                    </p>
                </li>
            </ul>
        </>
    );
};

export default Inicio;
