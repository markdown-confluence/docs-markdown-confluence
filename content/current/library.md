# Use the Node.js library

`@markdown-confluence/lib` provides the conversion and publishing engine shared by the CLI, Obsidian plugin and container. Use it to convert text, publish a Markdown workspace, or provide custom processing plugins.

## Install the package

Use Node.js 24.15.0 or newer:

```sh
pnpm add @markdown-confluence/lib@7.0.0
```

The package is ESM-only and includes TypeScript declarations. Use ESM `import`, or dynamic `import()` from CommonJS. Direct `require("@markdown-confluence/lib")` is unsupported. TypeScript projects should use `Bundler`, `Node16`, or `NodeNext` module resolution.

## Convert Markdown

```ts
import { parseMarkdownToADF } from "@markdown-confluence/lib";

const adf = parseMarkdownToADF(
  "# Release notes\n\nWritten in Markdown.",
  "https://your-site.atlassian.net",
);

console.log(adf);
```

This creates ADF from Markdown text. Uploading images, resolving a whole workspace and publishing pages belong to the publishing pipeline.

## Publish a workspace

The publisher receives settings, an authenticated Confluence client and processing plugins:

```ts
import {
  ConfluenceUploadSettings,
  Publisher,
  createAuthenticatedConfluenceClient,
  runEffect,
} from "@markdown-confluence/lib";

const token = process.env["ATLASSIAN_API_TOKEN"];
if (!token) throw new Error("ATLASSIAN_API_TOKEN is required");

const settings = {
  ...ConfluenceUploadSettings.DEFAULT_SETTINGS,
  contentRoot: "/absolute/path/to/notes",
  folderToPublish: "docs",
  confluenceBaseUrl: "https://your-site.atlassian.net",
  confluenceParentId: "123456",
  atlassianUserName: "you@example.com",
  atlassianApiToken: token,
};

const client = await runEffect(createAuthenticatedConfluenceClient(settings));
const results = await new Publisher(settings, client, []).publish();

if (results.some((result) => !result.successfulUploadResult)) {
  throw new Error("One or more pages failed to publish");
}
```

This uses Basic authentication and an unscoped API token. Add `MermaidRendererPlugin` and a renderer to publish Mermaid diagrams. `PlantumlRendererPlugin` and `@markdown-confluence/plantuml-renderer` are optional. Add `MathRendererPlugin` with `PuppeteerMathRenderer` or `ElectronMathRenderer` for [LaTeX equations](/docs/latex#library-integrations). See [diagrams](./diagrams.md) and the source's [processing plugin exports](https://github.com/markdown-confluence/markdown-confluence/blob/main/packages/lib/src/index.ts).

Publishing updates source frontmatter, so the workspace must be writable. The default overwrite protection preserves pages last edited by another user. Use the public package entry point rather than internal `dist` paths.

## Migrating from older integrations

Version 6 replaces the old `LoaderAdaptor` and `SettingsLoader` constructor arguments with settings, a client and plugins. Custom workspaces implement the current `MarkdownWorkspace` service. Effect integrations can use `publishEffect`, `MarkdownWorkspaceService` and the exported platform layers. Follow the [v6 migration guide](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/MIGRATING_TO_6.md).

## Conversion and source transformation

Version 7 exports `convertADFToMarkdown`, `fetchConfluencePageAdf` and related conversion helpers. It also exposes `MarkdownSourceTransformerService` for asynchronous source transformation before embed expansion, ADF conversion, link resolution and image upload. Included sections receive their own note context; raw source reads and frontmatter write-back bypass the transformation. See the [source-transform hook](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/DATAVIEW.md#source-transform-hook).

## Migrate a v6 client integration

Version 7 moves to `confluence.js` 3.2.0 and changes the public client contract: `host`/`auth`, `body`/`searchParams`, native `FormData` and a `fetch` transport override replace older SDK/Axios contracts. The old `createClient` override is removed, and API-prefix compatibility fields no longer affect routing. Existing Markdown and page IDs remain valid. Review the [v7 API migration guide](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md) before upgrading a custom client integration.

## New v7 integration hooks

The shared library exports `validatePublishingFiles`, `planPublishingFiles`, publishing reports and cancellation support. Plans perform reads and mark existing pages `reconcile`; they do not render attachments or predict every write. Pass an `AbortSignal` as `{ signal: controller.signal }` to `publish` or `publishEffect` for cooperative cancellation.

For optional Kroki rendering, import `KrokiRendererPlugin` and `HttpKrokiRenderer` from `@markdown-confluence/lib`, then add this plugin to your existing publisher plugin array when `settings.kroki?.enabled`:

```ts
import { KrokiRendererPlugin, HttpKrokiRenderer } from "@markdown-confluence/lib";

if (settings.kroki?.enabled) {
  plugins.push(new KrokiRendererPlugin(new HttpKrokiRenderer(settings.kroki)));
}
```

The [Kroki configuration](/docs/kroki) supplies the server URL, output format and timeout. Diagram source is sent to that server. Shared settings also support [edit locks](/docs/page-edit-locks), exclusions, ordering and Mermaid options; custom renderer integrations must pass Mermaid options through to their renderer as described in the released renderer packages.

## Sources

- [Library README](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/lib/README.md)
- [Package releases](https://github.com/markdown-confluence/markdown-confluence/releases)
- [v7 public client changes](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md)
