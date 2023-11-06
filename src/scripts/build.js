import esbuild from "esbuild";
// import { config } from "dotenv";
import fse from "fs-extra";
import { buildParams, carpetaProd } from "./esbuild-config.js";
import packageJson from "../../package.json" assert { type: "json" };

const build = async () => {
    // config();
    if (fse.existsSync(carpetaProd)) {
        await fse.rm(carpetaProd, { recursive: true });
    }

    // Copiamos la carpeta public a la carpeta del build
    await fse.copy("./public", carpetaProd);
    
    // Insertamos en el index.html la versión
    fse.readFile(carpetaProd + "/index.html", "utf8", function(err, data) {
        if (err) {
            return console.log("Error al leer index.html", err);
        }

        data = data.replaceAll("index.js", "index.js?v=" + packageJson.version);
        data = data.replaceAll("index.css", "index.css?v=" + packageJson.version);
        
        fse.writeFile(carpetaProd + "/index.html", data, "utf8", function(err) {
            if (err) return console.log("Error al escribir el index.html", err);
        });
    });
    
    console.log(`⚡ [esbuild] Building..`);
    // Run build
    const ctx = await esbuild.context(buildParams);
    await ctx.rebuild();
    await ctx.dispose(); // To free resources
};

build();
