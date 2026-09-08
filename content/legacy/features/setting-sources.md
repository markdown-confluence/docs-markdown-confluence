<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Modified for this site migration: publishing frontmatter removed, internal links adapted, and development tooling instructions updated where applicable; revised for current v7 APIs and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Configuration reference

The CLI, Docker image and GitHub Action use the same publishing settings. In version 7, configuration is composed through Effect ConfigProviders; the old `DefaultSettingsLoader`, `StaticSettingsLoader`, `EnvironmentVariableSettingsLoader`, `ConfigFileSettingsLoader`, `CommandLineArgumentSettingsLoader` and `AutoSettingsLoader` classes are no longer public APIs.

## Which value wins?

Values are resolved in this order, with the first supplied value taking precedence:

1. Command-line options.
2. Environment variables.
3. The JSON configuration file.
4. Built-in defaults.

The default file is `.markdown-confluence.json` in the current working directory. Use `--config path/to/config.json` or `CONFLUENCE_CONFIG_FILE` to select another file. These names replace the historical `.mermaid-confluence.json` typo.

## Keep shared settings in JSON

```json
{
  "confluenceBaseUrl": "https://your-site.atlassian.net",
  "confluenceParentId": "123456",
  "atlassianUserName": "you@example.com",
  "contentRoot": ".",
  "folderToPublish": "docs",
  "tagsToPublish": "handbook, public",
  "forceOverwrite": false
}
```

This is an unscoped API-token example. For scoped tokens or OAuth, configure the gateway API URL and the separate browsable site URL as described in [authentication](/docs/authentication).

## Supply credentials through the environment

```sh
export ATLASSIAN_API_TOKEN="YOUR_API_TOKEN"
vp dlx @markdown-confluence/cli@7.0.0
```

The environment takes precedence over JSON. Keep secrets out of committed files and use your CI secret store for automation. An environment variable is a configuration channel, not encryption or protection from other processes with sufficient access.

## Override one publishing option

```sh
vp dlx @markdown-confluence/cli@7.0.0 \
  --config .markdown-confluence.json \
  --contentRoot . \
  --enableFolder docs \
  --tagsToPublish handbook
```

Notice that `folderToPublish` uses the CLI flag `--enableFolder`; the similarly named global setting is not itself a flag. Use [publishing controls](/docs/publishing) for headers, footers, tag selection and per-page frontmatter. Array settings such as `ignoredCodeBlockLanguages` belong in JSON configuration.

## Settings lookup

These are the shared CLI/library settings and their built-in defaults. Obsidian exposes its own settings interface. Use explicit folder and connection values for your workflow. Dotted PlantUML names mean nested JSON properties.

| JSON setting | Default | Purpose |
| --- | --- | --- |
| `confluenceBaseUrl` | `Required` | API destination; use the gateway for scoped tokens and OAuth. |
| `confluenceSiteUrl` | `Empty` | Browsable site URL; required with the gateway. |
| `confluenceParentId` | `Required for publish` | Existing parent page that determines the target space. |
| `atlassianUserName` | `Empty` | Account email for Basic API-token authentication. |
| `atlassianApiToken` | `Empty` | API token or supplied bearer token; prefer environment secrets. |
| `confluenceAuthType` | `basic` | basic, bearer or oauth2. |
| `atlassianClientId` | `Empty` | Service-account OAuth client ID. |
| `atlassianClientSecret` | `Empty` | Service-account OAuth secret; prefer environment secrets. |
| `confluenceRequestHeaders` | `{}` | Additional headers; JSON object or comma-separated Header=Value pairs. |
| `contentRoot` | `.` | Directory to scan for source and referenced content. |
| `folderToPublish` | `Confluence Pages` | Folder selected by default, relative to the scan root. |
| `tagsToPublish` | `Empty` | Comma-separated YAML tags that select additional scanned notes. |
| `firstHeadingPageTitle` | `false` | Use the first heading when connie-title is absent. |
| `forceOverwrite` | `false` | Allow overwriting content last edited by another user. |
| `pageHeaderMarkdown` | `Empty` | Markdown inserted before each source page. |
| `pageFooterMarkdown` | `Empty` | Markdown inserted after each source page. |
| `mermaidProtocolTimeout` | `180000` | Positive Puppeteer protocol timeout in milliseconds. |
| `ignoredCodeBlockLanguages` | `[]` | JSON array of fenced languages to omit from publication. |
| `plantuml.enabled` | `false` | Enable rendering through your configured PlantUML server. |
| `plantuml.serverUrl` | `Empty` | Server receiving PlantUML source when rendering is enabled. |
| `confluenceApiPrefix` | `Deprecated` | Ignored in v7; endpoint routing is supplied by the Cloud client. |

## Environment variables and CLI options

| JSON setting | Environment variable | CLI option |
| --- | --- | --- |
| `confluenceBaseUrl` | `CONFLUENCE_BASE_URL` | `--baseUrl` |
| `confluenceSiteUrl` | `CONFLUENCE_SITE_URL` | `--siteUrl` |
| `confluenceParentId` | `CONFLUENCE_PARENT_ID` | `--parentId` |
| `atlassianUserName` | `ATLASSIAN_USERNAME` | `--userName` |
| `atlassianApiToken` | `ATLASSIAN_API_TOKEN` | `--apiToken` |
| `confluenceAuthType` | `CONFLUENCE_AUTH_TYPE` | `--authType` |
| `atlassianClientId` | `ATLASSIAN_CLIENT_ID` | `--clientId` |
| `atlassianClientSecret` | `ATLASSIAN_CLIENT_SECRET` | `--clientSecret` |
| `confluenceRequestHeaders` | `CONFLUENCE_REQUEST_HEADERS` | `--requestHeaders` |
| `contentRoot` | `CONFLUENCE_CONTENT_ROOT` | `--contentRoot` |
| `folderToPublish` | `FOLDER_TO_PUBLISH` | `--enableFolder` |
| `tagsToPublish` | `CONFLUENCE_TAGS_TO_PUBLISH` | `--tagsToPublish` |
| `firstHeadingPageTitle` | `CONFLUENCE_FIRST_HEADING_PAGE_TITLE` | `--firstHeaderPageTitle` |
| `forceOverwrite` | `CONFLUENCE_FORCE_OVERWRITE` | `--forceOverwrite` |
| `pageHeaderMarkdown` | `CONFLUENCE_PAGE_HEADER_MARKDOWN` | `--pageHeaderMarkdown` |
| `pageFooterMarkdown` | `CONFLUENCE_PAGE_FOOTER_MARKDOWN` | `--pageFooterMarkdown` |
| `mermaidProtocolTimeout` | `CONFLUENCE_MERMAID_PROTOCOL_TIMEOUT` | `--mermaidProtocolTimeout` |
| `ignoredCodeBlockLanguages` | `—` | `—` |
| `plantuml.enabled` | `CONFLUENCE_PLANTUML_ENABLED` | `--plantumlEnabled` |
| `plantuml.serverUrl` | `CONFLUENCE_PLANTUML_SERVER_URL` | `--plantumlServerUrl` |
| `confluenceApiPrefix` | `CONFLUENCE_API_PREFIX` | `--apiPrefix` |

`--config` / `CONFLUENCE_CONFIG_FILE` selects the configuration file. Common aliases include `-b` (base URL), `-p` (parent ID), `-u` (user name), `-f` (publish folder), `-t` (tags), `--cr` (content root), `--fh` (first heading) and `--fo` (overwrite). For true/false options, use an explicit value such as `--forceOverwrite false`.

There is no shared LaTeX toggle: built-in publishing tools render equations automatically. [Dataview publication](/docs/dataview) is a separate opt-in Obsidian setting. Frontmatter keys beginning `connie-` configure individual notes; see [Page properties](/docs/features/yaml-frontmatter).

## Load the same settings in a library integration

```ts
import {
  Publisher,
  createAuthenticatedConfluenceClient,
  loadConfluenceSettings,
  runEffect,
} from "@markdown-confluence/lib";

const settings = await loadConfluenceSettings();
const client = await runEffect(createAuthenticatedConfluenceClient(settings));
const results = await new Publisher(settings, client, []).publish();

if (results.some((result) => !result.successfulUploadResult)) {
  throw new Error("One or more pages failed to publish");
}
```

`loadConfluenceSettings()` loads and validates settings from the standard sources. For explicit application configuration, spread `ConfluenceUploadSettings.DEFAULT_SETTINGS` into your own settings object as shown in the [library guide](/docs/library). Add renderer plugins when you need Mermaid, PlantUML or [LaTeX](/docs/latex#library-integrations).

Effect applications can use `loadConfluenceSettingsEffect`, `makeConfluenceSettingsConfigProvider`, `parseConfluenceSettingsEffect` and `ConfluenceSettingsLive`. Provide the required platform services when composing these APIs. The obsolete API-prefix setting no longer changes endpoint routing in v7.

## New v7 settings

These extend the shared settings above. A dash means no dedicated environment variable or CLI flag; use JSON. `mermaid` defaults to an empty options object, leaving renderer defaults in place.

| JSON setting | Default | Environment variable | CLI option |
| --- | --- | --- | --- |
| `foldersToExclude` | `[]` | — | `--excludeFolders private,drafts` |
| `jiraUrl` | Empty | — | `--jiraUrl` |
| `orderPages` | `false` | — | `--orderPages` |
| `lockPublishedPages` | `false` | `CONFLUENCE_LOCK_PUBLISHED_PAGES` | `--lockPublishedPages` |
| `mermaid.format` | PNG output | — | `--mermaidFormat` |
| `mermaid.scale` | Renderer default | — | `--mermaidScale` (1–4) |
| `mermaid.theme` | Renderer default | — | `--mermaidTheme` |
| `mermaid.themeVariables` | Unset | — | —; JSON object of strings |
| `kroki.enabled` | `false` | `CONFLUENCE_KROKI_ENABLED` | `--krokiEnabled` |
| `kroki.serverUrl` | Empty | `CONFLUENCE_KROKI_SERVER_URL` | `--krokiServerUrl` |
| `kroki.format` | `png` | `CONFLUENCE_KROKI_FORMAT` | `--krokiFormat` |
| `kroki.timeoutMs` | `30000` | `CONFLUENCE_KROKI_TIMEOUT_MS` | `--krokiTimeoutMs` |

```json
{
  "foldersToExclude": ["private", "drafts"],
  "jiraUrl": "https://example.atlassian.net",
  "orderPages": true,
  "lockPublishedPages": false,
  "mermaid": {"format": "svg", "theme": "neutral"},
  "kroki": {"enabled": false, "serverUrl": "", "format": "png", "timeoutMs": 30000}
}
```

Kroki requires a trusted HTTP(S) server URL without embedded credentials, query or fragment. Its timeout must be an integer from 1 to 2147483647. Supported formats are PNG and SVG. Mermaid themes are `default`, `neutral`, `dark`, `forest` and `base`.

See [exclusions](/docs/publishing#exclude-private-or-draft-folders), [ordering](/docs/features/folder-structure#order-sibling-pages), [edit locks](/docs/page-edit-locks), [Jira shorthand](/docs/structured-content#jira-shorthand), [Mermaid output](/docs/diagrams#mermaid-output-controls), and [Kroki](/docs/kroki) for behavior and limits.

`validate` / `plan` accept `--input` and `--output`; publishing accepts `--report`. These are command controls, not shared JSON settings. See [preflight and reporting](/docs/preflight).

## Sources

- [Verified defaults](https://github.com/markdown-confluence/markdown-confluence/blob/obsidian-confluence-root-v7.0.0/packages/lib/src/Settings.ts)
- [Verified environment and CLI mappings](https://github.com/markdown-confluence/markdown-confluence/blob/obsidian-confluence-root-v7.0.0/packages/lib/src/SettingsConfig.ts)

- [Current settings API and precedence](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/lib/src/SettingsConfig.ts)
- [Public library exports](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/lib/src/index.ts)
- [Cloud client migration](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md)
