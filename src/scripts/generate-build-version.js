/* generate-build-version.js */
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");

const jsonData = {
    version: packageJson.version
};

var jsonContent = JSON.stringify(jsonData);

fs.writeFile("./public/meta.json", jsonContent, "utf8", function(err) {
    if (err) {
        console.log("An error occured while writing JSON Object to meta.json");
        return console.log(err);
    }

    console.log("meta.json file has been saved with latest version number (v" + packageJson.version + ")");
});
