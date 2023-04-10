import React from "react";

import Tablero from "./tablero/Tablero";
import CacheBuster from "./scripts/cacheBuster";

import "./App.css";

const App = (props) => {
    return (
        <CacheBuster>
            {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                if (loading) return null;
                if (!loading && !isLatestVersion) {
                    refreshCacheAndReload();
                }

                return <Tablero />;
            }}
        </CacheBuster>
    );
};

export default App;
