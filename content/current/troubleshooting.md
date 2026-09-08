# Troubleshooting

Start with the symptom you see. Keep the error message and the command or plugin action that produced it; those details help distinguish configuration problems from content problems.

## Cannot connect or access a page

1. Confirm that the destination is **Confluence Cloud**. Server and Data Center are unsupported.
2. Check your authentication type. An unscoped API token uses your site origin; scoped tokens and service-account OAuth use the Atlassian gateway with a separate browsable site URL.
3. Confirm that your account or service account has access to the destination space and permission for the operation you are attempting.
4. For publishing, verify that the parent page ID identifies an existing page. For export, verify the source page ID instead.

Use [Connect to Confluence](./authentication.md) for the exact settings. Do not paste tokens, client secrets, or private page content into an issue.

## No notes are selected

Check `contentRoot` and `folderToPublish` together. `contentRoot: "."` with `folderToPublish: "docs"` scans the current directory and selects the `docs` folder by default.

Notes can also be included by a configured YAML tag or `connie-publish: true`. `connie-publish: false` excludes a note even if another rule matches. A link to a note does not select that note for publishing.

See [Select & control publishing](./publishing.md#select-by-folder-tag-or-note).

## A page appears in the wrong place

The common root of the selected notes maps to your configured parent page. Including notes outside the default folder can expand that common root. A folder note at the root can provide content for the configured parent itself.

Review [Build a page hierarchy](/docs/features/folder-structure) and [Add folder overview pages](/docs/features/folder-note) before changing your parent ID or selection.

## Publishing reports a conflict or changes local files

Publishing records `connie-page-id` and `connie-page-url` in the source note, so the files must be writable. Preserve these properties between runs; they identify the existing destination page.

Keep `forceOverwrite` disabled while you investigate changes made by another Confluence user. Review the remote changes before explicitly choosing to overwrite them.

In GitHub Actions, frontmatter written into the temporary checkout is not automatically committed back. In Docker, the mounted content directory must be writable by the container user. See [GitHub Actions](/docs/usage/github-actions) or [Docker](/docs/usage/docker).

## Images or attachments are missing

Check that the referenced file exists and the path resolves relative to the note. For a remote image, check that the URL is accessible. Review [Images & attachments](/docs/features/image-upload) for supported references.

When a note is embedded, its relative assets are rebased from the embedded note. Check the original note's paths rather than assuming they are relative to the outer page.

## A diagram does not render

Check the fenced block's language and syntax, then the renderer's requirements. Mermaid rendering has a configurable timeout; PlantUML requires its own renderer setup. Follow [Mermaid & PlantUML](./diagrams.md) for the relevant environment.

Keep the diagram error and try a small example to distinguish a renderer setup problem from a particular diagram. Raising the timeout will not fix invalid syntax.

## Dataview results are missing or fail

Use Obsidian with Dataview installed and result publishing enabled. Supported queries are TABLE, LIST and TASK. DataviewJS is not supported by this feature.

A query error stops preparation before page creation or content updates. Check the query in Obsidian and confirm it evaluates in the intended note's context. See [Dataview results](/docs/dataview).

## Export does not read the page

Use a numeric page ID or a full HTTPS page URL for the configured site. Short share URLs are not accepted as a substitute. Check the configured API URL and read permissions, then follow [Export a Confluence page](./export-confluence.md).

An exported Markdown file can contain `adf` blocks by design: they preserve information Markdown cannot express. Use [readable mode](./export.md#what-lossless-means) if exact round-trip preservation is not your priority. Export does not download attachments.

## Native browser login is unavailable

Native Obsidian OAuth requires an approved app registration; public onboarding is still pending. Device-code authorization is not enabled for the project's registered app. Use a documented API-token or service-account setup unless you have an approved browser registration. See [authentication](./authentication.md#native-obsidian-browser-oauth).

## Ask for help

Search [existing GitHub issues](https://github.com/markdown-confluence/markdown-confluence/issues), then include:

- Your package or plugin version and operating system.
- Whether you use Obsidian, the CLI, GitHub Actions, Docker, or the library.
- The exact error and a minimal, non-sensitive Markdown example.
- Configuration key names and relevant non-secret values, with credentials removed.

For behavior that changed during an upgrade, start with [Upgrade to v7](./upgrade-to-v7.md).

## New v7 controls

- **A selected note is missing:** folder exclusions override tags and `connie-publish: true`; check paths relative to the content root.
- **Planning says reconcile:** this is expected for existing pages. It does not predict exact version changes. See [preflight](/docs/preflight).
- **A page remains locked after disabling locking:** remove the existing edit restriction in Confluence. Disabling the setting only stops management.
- **Locking fails:** check restriction permissions and scopes; content may already have published. Resolve access and retry.
- **Kroki fails or times out:** verify the configured server, supported diagram type/format and timeout. Source is sent to that server; failures stop publication.
- **YAML table conversion fails:** correct invalid or overlapping explicit spans. Cells accept scalar text; limits are 100 columns and 1000 rows.
- **Page ordering fails:** check permissions and at least two ranked siblings. Single-note runs, blog posts and preserved-parent pages are excluded. Content already written stays published.
- **Cancellation left changes:** this is cooperative cancellation, not rollback. Publish again to reconcile the remaining notes.
