import React from "react";
import packageJson from "../../package.json";

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
    const versionsA = versionA.split(/\./g);

    const versionsB = versionB.split(/\./g);
    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift());

        const b = Number(versionsB.shift());
        // eslint-disable-next-line no-continue
        if (a === b) continue;
        // eslint-disable-next-line no-restricted-globals
        return a > b || isNaN(b);
    }
    return false;
};

class CacheBuster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLatestVersion: false,
            refreshCacheAndReload: (reload = true) => {
                console.log("Limpiando cache y recargando aplicación...");

                try {
                    if (caches) {
                        // Service worker cache should be cleared with caches.delete()
                        caches.keys().then(function(names) {
                            for (let name of names) caches.delete(name);
                        });
                    }
                } catch (error) {}

                if (reload) {
                    // delete browser cache and hard reload
                    window.location.reload(true);
                }
            },
        };
    }

    componentDidMount() {
        if (process.env.NODE_ENV !== "production") {
            // Solo comprobamos la versión en producción.
            this.setState({ loading: false, isLatestVersion: true });
            return;
        }

        // Traemos siempre el meta.json sin cachear para tener la última versión.
        fetch("./meta.json?f=" + new Date().getTime())
            .then((response) => response.json())
            .then((meta) => {
                const latestVersion = meta.version;
                const currentVersion = packageJson.version;

                const shouldForceRefresh = semverGreaterThan(
                    latestVersion,
                    currentVersion
                );
                if (shouldForceRefresh) {
                    console.log(
                        `Tenemos una nueva versión - ${latestVersion}. Debemos forzar el refresco de la aplicación.`
                    );
                    this.setState({ loading: false, isLatestVersion: false });
                } else {
                    console.log(
                        `Tienes la última versión disponible - ${latestVersion}. No se necesita actualizar la caché.`
                    );
                    this.setState({ loading: false, isLatestVersion: true });
                }
            })
            .catch((error) => {
                console.log(
                    `Versión anterior desconocida. Forzamos el refresco de la aplicación.`
                );
                this.state.refreshCacheAndReload(false);
                this.setState({ loading: false, isLatestVersion: true });
            });
    }
    render() {
        const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
        return this.props.children({
            loading,
            isLatestVersion,
            refreshCacheAndReload,
        });
    }
}

export default CacheBuster;
