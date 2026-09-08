<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Modified for this site migration: publishing frontmatter removed, internal links adapted, and development tooling instructions updated where applicable. See LEGACY-CONTENT-NOTES.md. -->

# CLI development

To build and test the CLI for the markdown-confluence project, follow these steps:

### 1. Build the Project

Before you can test the CLI, you need to build the entire project. Run the following command:

```bash
vp run build
```

This command builds all the packages within the workspace, including the CLI package.

### 2. Test the CLI

After building the project, you can test the CLI using the output from the `dist` folder within the `cli` package. Run the following command:

```bash
node ./packages/cli/dist/index.js [options]
```

Replace `[options]` with the appropriate options and commands for the markdown-confluence CLI.

See [CLI Usage](/docs/usage/cli) for a list of options.
