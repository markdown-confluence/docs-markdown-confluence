# Upgrade to v7

Use this checklist for an existing publishing workflow. If you are installing for the first time, start with [Overview & first steps](./getting-started.md). For a feature summary, read [What's new in v7](./release-notes.md).

## 1. Identify what you are upgrading

| Your workflow | Upgrade path |
| --- | --- |
| Obsidian | Install the v7 plugin release files using the [Obsidian guide](./obsidian.md#install-the-plugin). |
| CLI | Use `@markdown-confluence/cli@7.0.0` with Node.js 24.15.0 or newer. |
| GitHub Actions | Follow the [v7 workflow example](/docs/usage/github-actions). |
| Docker | Confirm the published image contains the intended release; `latest` follows published artifacts. See [Docker](/docs/usage/docker). |
| Node.js integration | Upgrade the packages and review the [library client migration](./library.md#migrate-a-v6-client-integration). |

Back up your source and settings. Keep existing `connie-page-id` and `connie-page-url` properties: changing versions does not require removing page identifiers.

## 2. Check earlier breaking changes

If you are upgrading from 5.5.2 or another pre-v6 version, apply the [v6 migration guide](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/MIGRATING_TO_6.md) first. It covers ESM packages, the Node.js minimum, and the revised settings, client and plugin APIs.

Then apply the v7 changes below. Existing Markdown and page IDs remain valid.

## 3. Review authentication

Confirm that your API URL matches your credential type. Scoped tokens and service-account OAuth use the Atlassian gateway; the separate site URL is used for browsable page links.

An existing API-token workflow does not need to switch to native browser OAuth. Public browser onboarding remains pending, and device-code login is not enabled for the registered app. Follow [Connect to Confluence](./authentication.md).

## 4. Update custom library integrations

Version 7 moves to `confluence.js` 3.2.0 and changes the client contract. Custom integrations need the v3 `host`/`auth`, `body`/`searchParams`, native `FormData`, and `fetch` contracts. The old client-factory override is removed; API-prefix compatibility settings no longer control routing.

These changes matter if your code constructs or customizes the client. Follow the examples in [Use the Node.js library](./library.md).

## 5. Verify a small publish

Try the upgraded workflow in a separate vault or test Confluence space before your normal publishing run. Check:

1. The intended notes are selected and the page hierarchy is correct.
2. Images, diagrams, links and any Dataview results appear as expected.
3. Source frontmatter is written successfully and saved for future runs.
4. An unchanged second publish avoids unnecessary page updates.

Keep `forceOverwrite` disabled while you check conflicts. If anything fails, use [Troubleshooting](./troubleshooting.md).

## 6. Adopt the new capabilities when needed

- [Publish LaTeX equations](/docs/latex) with automatic inline and display rendering.

- [Export a Confluence page](./export-confluence.md) when you need a local copy.
- [Convert Markdown & ADF](./export.md) for readable or lossless conversion.
- [Publish Dataview results](/docs/dataview) from supported Obsidian queries.

Export is a separate read workflow; it does not introduce continuous two-way synchronization.

## Adopt the remaining v7 features

- Run [offline validation and read-only planning](/docs/preflight) before your first larger publish; save a JSON publish report.
- Review [folder exclusions](/docs/publishing#exclude-private-or-draft-folders) before relying on tags or explicit publication flags.
- Enable [edit locks](/docs/page-edit-locks) only when you want the publishing account to manage editing restrictions. Add restriction scopes and reconnect or replace tokens as needed. Disabling the feature does not unlock pages.
- Enable ordering only when you intend to manage ranked siblings. Cancellation keeps completed writes.
- Choose [Mermaid output options](/docs/diagrams#mermaid-output-controls) or configure a trusted [Kroki server](/docs/kroki).
- Adopt [footnotes, macros, YAML tables and Jira shorthand](/docs/structured-content), plus [MP4 embeds](/docs/features/image-upload#mp4-video-embeds).

Kroki, edit locks and page ordering are opt-in. Existing credentials and workflows can remain in use if you do not enable features needing additional permissions.

## Sources

- [v7 client and authentication changes](https://github.com/markdown-confluence/markdown-confluence/pull/913)
- [v7 verification and migration details](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md)
