# Juegos React

Colección de juegos web en React: **ajedrez** y **buscaminas**. Construida con esbuild y desplegada como sitio estático.

## Stack

- [React 18](https://react.dev/) + CSS Modules
- [esbuild](https://esbuild.github.io/) para bundling; `live-server` + `chokidar` para el servidor de desarrollo con recarga
- [pnpm](https://pnpm.io/) como gestor de paquetes (lockfile: `pnpm-lock.yaml`). No se fija versión en `packageManager`: cada desarrollador usa la suya, aunque conviene mantenerla reciente para que el lockfile sea compatible
- Enrutado propio sin librerías: `src/elementos/ProveedorRuta.jsx` envuelve `window.location` y `popstate`

## Requisitos

- Node.js ≥ 24 (la versión usada por el pipeline)
- pnpm ≥ 10 (`npm install -g pnpm` o `corepack enable && corepack prepare pnpm@latest --activate`)

No se usa Docker: todo corre con Node directamente.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:4000 (también imprime URLs de red)
```

El script `dev` limpia la carpeta `.dev`, copia `public/`, arranca live-server con recarga y recompila al cambiar archivos.

## Build de producción

```bash
pnpm build      # genera ./build
```

Antes de compilar, `prebuild` ejecuta `generate-build-version.js` que inyecta la versión del build (cache-busting).

## Despliegue (CI/CD)

El despliegue lo hace [GitHub Actions](https://docs.github.com/en/pages) con el workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml):

1. Job `build` en `ubuntu-latest`: pnpm 11 + Node 24, `pnpm install --frozen-lockfile` y `pnpm build`.
2. Copia `build/` a `_site/` y lo sube como artefacto de Pages.
3. Job `deploy` publica `_site/` en GitHub Pages.

Se activa en push a `prod` (o manualmente desde la pestaña Actions). En el repo hay que configurar **Settings → Pages → Source: GitHub Actions**.

> Ramas: `main` es la rama de desarrollo; `prod` es la que despliega en GitHub Pages.

## Scripts disponibles

| Script | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo con live-reload en el puerto 4000 |
| `pnpm build` | Compila la app a `./build` (ejecuta `prebuild` antes) |
| `pnpm lint` | ESLint sobre `src/**` con `--max-warnings=0` |
| `pnpm format` | Prettier sobre todo el código fuente |

## Estructura

```
src/
  ajedrez/          # juego de ajedrez
    celdas/         # casilla del tablero
    piezas/         # fichas (rey, dama, torre, alfil, caballo, peón)
    tablero/        # tablero y controlador de partidas
  buscaminas/       # juego de buscaminas
  appbar/           # barra superior compartida
  home/             # pantalla de inicio
  noMatch/          # pantalla 404
  elementos/        # Botón, Enlace y ProveedorRuta (enrutado)
  scripts/          # configuración de esbuild, dev y build
public/             # index.html, manifest y assets estáticos
```
