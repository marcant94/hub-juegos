const clonar = (elemento) => {
    if (Array.isArray(elemento)) {
        return elemento.slice();
    } else if (typeof elemento === "object") {
        return Object.assign({}, elemento);
    }
};

const semverGreaterThan = (versionA, versionB) => {
    const versionsA = versionA.split(/\./g);

    const versionsB = versionB.split(/\./g);
    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift());

        const b = Number(versionsB.shift());
        if (a === b) continue;
        return a > b || isNaN(b);
    }
    return false;
};

const dameUrlBase = () => {
    if (window.location.pathname == "/") {
        // Es Desarrollo
        return "/";
    } else {
        // Es GitLab Pages
        return window.location.pathname;
    }
};

const dameBusqueda = () => {
    try {
        let busquedaCompleta = window.location.search
            .replace("?", "")
            .split("&");

        let uri = busquedaCompleta[0].split("=")[1];
        return uri ? decodeURI(uri) : "";
    } catch (error) {
        return "";
    }
};

const dameBusquedaMultiple = () => {
    try {
        let busquedaCompleta = window.location.search
            .replace("?", "")
            .split("&");

        return busquedaCompleta.map((element) => {
            return element.split("=");
        });
    } catch (error) {
        return [];
    }
};

export {
    clonar,
    semverGreaterThan,
    dameUrlBase,
    dameBusqueda,
    dameBusquedaMultiple,
};
