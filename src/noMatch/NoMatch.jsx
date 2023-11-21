import React, { useEffect, useRef, useState } from "react";

import BaseAppbar from "../appbar/BaseAppbar";

const NoMatch = props => {
    return (
        <>
            <BaseAppbar />
            No se ha encontrado la pagina
        </>
    );
};

export default NoMatch;
