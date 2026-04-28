# Project Creation Guide (From Scratch)

This document provides a step-by-step guide detailing every command used to create this Nx monorepo, configure the React applications, set up the custom Rollup build pipeline, and initialize the Git submodule. This is useful for understanding how the architecture was built from the ground up.

## 1. Initializing the Monorepo

First, we create an empty Node.js project and set up the Yarn workspaces structure.

```bash
# Create project folder
mkdir framework-demo
cd framework-demo'/

# Initialize package.json
yarn init -y
```

### Configure Yarn Workspaces
Update the generated `package.json` to define the workspace structure:
```json
{
  "name": "source",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*",
    "modules/*",
    "common-pkg/*"
  ]
}
```

## 2. Installing Core Dependencies

Next, install Nx, React, Rollup, TypeScript, and necessary plugins.

```bash
# Install Nx & Core Tools
yarn add -D nx@latest @nx/workspace @nx/js @nx/react @nx/web typescript tslib

# Install React
yarn add react react-dom react-router-dom
yarn add -D @types/react @types/react-dom

# Install Rollup & Plugins
yarn add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript @rollup/plugin-replace @rollup/plugin-html @svgr/rollup rollup-plugin-postcss postcss
```

## 3. Creating the Workspace Configuration

Initialize the basic TypeScript base configuration (`tsconfig.base.json`) which will manage our path aliases.

```bash
# Create tsconfig.base.json
echo '{ "compilerOptions": { "paths": {} } }' > tsconfig.base.json
```

Initialize `nx.json` to allow Nx to cache our tasks and manage our monorepo scripts:
```bash
npx nx init
```

## 4. Creating the Packages (Libraries)

Create the directories for our shared components and logic.

```bash
mkdir -p packages/form/src/lib
mkdir -p modules/test/src/lib
```

### Scaffold a Library (e.g., `packages/form`)
Inside `packages/form`:
1. **Initialize package.json**: Define it as a module.
   ```bash
   cd packages/form
   yarn init -y
   ```
2. **Add `tsconfig.json` & `tsconfig.lib.json`**: Extending the base config.
3. **Add `rollup.config.mjs`**: The custom Rollup configuration used across all packages to bundle them into ESM.
4. **Create the source code**: e.g., `src/index.ts` and `src/lib/FormComponent.tsx`.

*Repeat this process for `modules/test`.*

## 5. Setting Up the Git Submodule (`common-pkg/ui`)

Instead of keeping the `ui` package directly in the repo, we host it as an independent repository and pull it in as a submodule.

```bash
# Navigate to root
cd ../../

# Add the external repository as a submodule into the common-pkg directory
git submodule add https://github.com/pritam-bhalnor/submodule-cmn-repo.git common-pkg

# If moving an existing package (like packages/ui) into the submodule:
# mv packages/ui common-pkg/ui
```

## 6. Creating the Shell Application

Create the main React application that consumes all the packages.

```bash
mkdir -p apps/shell/src/app
```

Inside `apps/shell`:
1. **Initialize package.json**.
2. **Add `tsconfig.app.json`** ensuring it references the library configs:
   ```json
   "references": [
     { "path": "../../common-pkg/ui/tsconfig.lib.json" },
     { "path": "../../packages/form/tsconfig.lib.json" }
   ]
   ```
3. **Add `rollup.config.mjs`**: Setup Rollup with `@rollup/plugin-html` to inject the built JS into an `index.html` file, and `rollup-plugin-serve`/`rollup-plugin-livereload` for the dev server.
4. **Create the entry point**: `src/main.tsx` and `src/app/app.tsx`.

## 7. Connecting the Architecture (Path Aliases)

Update the root `tsconfig.base.json` to map the packages so the shell app can import them cleanly (e.g., `import { Sidebar } from 'ui';`).

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ui": ["common-pkg/ui/src/index.ts"],
      "form": ["packages/form/src/index.ts"],
      "test": ["modules/test/src/index.ts"]
    }
  }
}
```

## 8. Defining Root Scripts

Finally, update the root `package.json` to orchestrate everything using Nx `run-many`:

```json
"scripts": {
  "dev": "nx run-many -t dev",
  "build": "nx run-many -t build",
  "lint": "nx run-many -t lint"
}
```

## Conclusion

With this setup, you can now run `yarn run build` or `yarn run dev`. Nx will intelligently determine the dependency graph (e.g., building `form` before `test`, and `test` before `shell`) and execute the Rollup configurations in the correct order.
