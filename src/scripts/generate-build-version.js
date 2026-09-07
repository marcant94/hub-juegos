/* generate-build-version.js */
import fs from "fs";
import { execSync } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");

// La version es la del package.json con el numero de commits como cuarto componente,
// p. ej. "0.5.7" + 120 commits -> "0.5.7.120". El contador sube solo en cada build,
// asi nadie tiene que acordarse de subir el numero a mano.
let numCommits;
try {
    numCommits = parseInt(execSync("git rev-list --count HEAD", { encoding: "utf8" }).trim(), 10);
} catch (error) {
    console.log("No se pudo obtener el numero de commits de git, se omite el contador:", error.message);
    numCommits = undefined;
}

const version = numCommits !== undefined ? `${packageJson.version}.${numCommits}` : packageJson.version;

const jsonData = {
    version: version
};

var jsonContent = JSON.stringify(jsonData);

fs.writeFile("./public/meta.json", jsonContent, "utf8", function(err) {
    if (err) {
        console.log("An error occured while writing JSON Object to meta.json");
        return console.log(err);
    }

    console.log("meta.json file has been saved with latest version number (v" + version + ")");
});
