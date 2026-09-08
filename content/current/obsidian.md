# Publish from Obsidian

Write in your vault, then publish selected notes to Confluence Cloud using a command or the ribbon icon. The plugin handles links, attachments, folder hierarchy and supported Obsidian Markdown extensions.

## Install the plugin

These instructions cover **version 7**. The plugin is currently absent from Obsidian's community catalog, so use the downloadable release files:

1. Download `main.js` and `manifest.json` from the [Obsidian integration releases](https://github.com/markdown-confluence/obsidian-integration/releases).
2. Create `.obsidian/plugins/confluence-integration` inside your vault.
3. Put both files in that directory and restart Obsidian.
4. Enable community plugins for the vault, then enable **Confluence Integration**.

Use the desktop app. Back up your vault before a major upgrade and try the new version in a separate vault and Confluence space.

## Connect to Confluence

For an unscoped API token, open the plugin settings and configure:

| Setting | Example |
| --- | --- |
| Confluence API URL | `https://your-site.atlassian.net` |
| Confluence Parent Id | `123456` — an existing parent page |
| Atlassian User Name | Your Atlassian account email |
| Atlassian API Token | Your API token |
| Authentication Type | API token / Basic |
| Folder To Publish | `Confluence Pages` |

Create the configured folder, add a Markdown note, then click the cloud ribbon icon or run **Publish All to Confluence** from the command palette. The plugin writes `connie-page-id` and `connie-page-url` to each published source note.

For a scoped API token, use `https://api.atlassian.com/ex/confluence/YOUR_CLOUD_ID` as the API URL and set the separate **Confluence Site URL** to your browsable site. Service-account OAuth is available in settings. Native browser login is available for approved app registrations; public onboarding remains pending. See [authentication](./authentication.md).

## Select notes beyond one folder

Set **Tags to publish** to a comma-separated list such as `docs, public` to include notes whose YAML `tags` match. You can also opt a note in explicitly:

```yaml
---
connie-publish: true
connie-title: Project handbook
---
```

Set `connie-publish: false` to exclude a note even when its folder or tags match. Links resolve to Confluence for notes in the selected publication set; linking to a note does not automatically select it for publishing.

## Reuse notes and keep your hierarchy

An embedded note can live outside your publishing folder:

```markdown
![[Shared Notes/Release Checklist]]
![[Shared Notes/Release Checklist#Before release]]
```

Heading and block embeds include the referenced section, and relative assets are rebased. Literal embed examples inside code remain literal.

The common root of your selected tree maps to the configured Confluence parent. Selecting notes outside the default folder can expand that root. To supply a folder page's content, add a note named after the folder, `index.md`, `README.md`, or `readme.md`. A folder note at the root can update the configured parent page itself.

[Publishing controls](./publishing.md) covers block embeds, headers and footers, TOC macros, ignored code languages, labels and per-page frontmatter.

## More in version 7

- [Dataview TABLE, LIST and TASK results](/docs/dataview) can become ordinary Confluence content while preserving queries in your vault.
- [Native browser OAuth](./authentication.md) supports site selection and rotating refresh tokens for approved app registrations. Public onboarding remains pending.
- Service-account OAuth and scoped API-token settings share the new Cloud transport.
- Live verification covers existing inline comments surviving edits elsewhere and unchanged republishing.

Device-code login is not enabled for the project's registered Atlassian app and is not a working public onboarding path.

## New v7 publishing controls

- **Excluded folders** selects paths to omit; it does not redact embedded content. See [selection](/docs/publishing#exclude-private-or-draft-folders).
- Click status-bar progress or run **Cancel publishing after the current request** to stop subsequent operations. Completed writes remain.
- **Restrict editing to the publishing account** enables [page edit locks](/docs/page-edit-locks).
- **Apply page ordering** uses sibling notes' numeric `sort-order` values.
- Mermaid output, scale and theme variables control diagram images. Optional [Kroki diagrams](/docs/kroki) adds server-rendered diagram types.

[Footnotes, excerpts, page properties, YAML tables and Jira shorthand](/docs/structured-content) work in note content through the shared v7 parser.

## Sources

- [Installation, selection and hierarchy](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/obsidian/README.md)
- [Native OAuth setup and distribution limits](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/OBSIDIAN_OAUTH.md)
- [Version 7 verification matrix](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md)
