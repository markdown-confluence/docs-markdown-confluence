---
connie-publish: true
connie-page-id: '1736718'
---
# Markdown-Confluence Development Guide 🚀

Welcome to the development documentation for the markdown-confluence project! Let's dive into the development process for this fantastic TypeScript project that uses `tsc` and `esbuild` for building and packaging.

## 🛠️ Development Scripts

Here's a detailed overview of the essential scripts that keep our project flowing:

### 1. dev-obsidian

```bash
npm run dev --workspace=@markdown-confluence/lib & npm run dev --workspace=@markdown-confluence/mermaid-electron-renderer & npm run dev --workspace=obsidian-confluence
```

`dev-obsidian` is used for local development of the Obsidian plugin. This script simultaneously watches and builds code for the `lib`, `mermaid-electron-renderer`, and `obsidian-confluence` workspaces.

### 2. build

```bash
npm run build -ws --if-present
```

`build` is used to build all packages within the workspace. It's essential to run this command whenever you add a new type or modify an exported type across the package boundary to ensure everything is updated accordingly.

### 3. fmt

```bash
npm run fmt -ws --if-present
```

`fmt` is a convenient script for formatting all the code in the workspace using Prettier. This command helps maintain code consistency and readability throughout the project.

### 4. test

```bash
npm test -ws --if-present
```

`test` is used to run all the tests within the workspace. It helps ensure that new changes don't introduce unexpected issues or break existing functionality.

⚠️ **Note:** If you add a new type or modify an exported type across the package boundary, make sure to run `npm run build`.

## 🌐 Mono Repo Development

Development is done in the mono repo `markdown-confluence/markdown-confluence`.

### Code Consistency and Formatting

We use `husky` to help keep files formatted, but please rely on `eslint` and `prettier` to maintain code consistency. These tools run as part of the CI in check mode.

### TypeScript Strict Mode

TypeScript strict mode is enabled to assist with type checking as much as possible.

## Have Fun

Happy coding, and we hope you enjoy contributing to the delightful universe of markdown-confluence!
