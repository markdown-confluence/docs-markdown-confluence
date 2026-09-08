<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Modified for this site migration: publishing frontmatter removed, internal links adapted, and development tooling instructions updated where applicable. See LEGACY-CONTENT-NOTES.md. -->

# Markdown-Confluence Development Guide 🚀

Welcome to the development documentation for the markdown-confluence project! Let's dive into the development process for this TypeScript project that uses Vite+ (`vp`) for builds, formatting, linting, and tests.

Use Node.js **24.15.0** and the repository-pinned **pnpm** version. After setting up Vite+, install the workspace dependencies with `vp install --frozen-lockfile`. The authoritative lockfile is `pnpm-lock.yaml`.

## 🛠️ Development Scripts

Here's a detailed overview of the essential scripts that keep our project flowing:

### 1. dev-obsidian

```bash
vp run dev-obsidian
```

`dev-obsidian` is used for local development of the Obsidian plugin. This script simultaneously watches and builds code for the `lib`, `mermaid-electron-renderer`, and `obsidian-confluence` workspaces.

### 2. build

```bash
vp run build
```

`build` is used to build all packages within the workspace. It's essential to run this command whenever you add a new type or modify an exported type across the package boundary to ensure everything is updated accordingly.

### 3. fmt

```bash
vp run fmt
```

`fmt` is a convenient script for formatting all the code in the workspace using Vite+. This command helps maintain code consistency and readability throughout the project.

### 4. test

```bash
vp test run
```

`test` is used to run all the tests within the workspace. It helps ensure that new changes don't introduce unexpected issues or break existing functionality.

⚠️ **Note:** If you add a new type or modify an exported type across the package boundary, make sure to run `vp run build`.

## 🌐 Mono Repo Development

Development is done in the mono repo `markdown-confluence/markdown-confluence`.

### Code Consistency and Formatting

Use `vp run check` for repository checks and `vp run fmt:check` to verify formatting. These are the same Vite+ commands used in CI. Use `vp run fmt` to apply formatting fixes.

### TypeScript Strict Mode

TypeScript strict mode is enabled to assist with type checking as much as possible.

## Have Fun

Happy coding, and we hope you enjoy contributing to the delightful universe of markdown-confluence!
