# Start with Markdown. Publish to Confluence.

Keep writing in the tools you already use. Markdown Confluence 7 converts your notes to Atlassian Document Format (ADF), publishes pages and attachments, and builds the page hierarchy from your folders. Publish Dataview results from Obsidian or export individual Confluence pages back to Markdown.

These guides cover **version 7**. See [what changed](./release-notes.md) if you are upgrading an existing workflow.

## Choose your workflow

Pick **one** publishing guide. Each covers its own setup and first publish; you do not need to read the other tool guides first.

| Where your Markdown lives | Follow this guide |
| --- | --- |
| An Obsidian vault | [Publish from Obsidian](./obsidian.md) |
| A local folder | [Publish from the CLI](./cli.md) |
| A GitHub repository with automated publishing | [Automate with GitHub Actions](/docs/usage/github-actions) |
| A mounted directory in a container | [Run with Docker](/docs/usage/docker) |

Already have content in Confluence? Start with [Export a Confluence page](./export-confluence.md). Building an application? Use the [Node.js library](./library.md). Existing users can follow [Upgrade to v7](./upgrade-to-v7.md).

## What you need

Have a Confluence Cloud site, permission to publish in the target space, and an existing page to use as the publishing parent. The parent page determines the destination space. CLI and library users need Node.js 24.15.0 or newer. Obsidian publishing runs in the desktop app.

Confluence Cloud is the supported target. Server and Data Center are unsupported. Review [authentication](./authentication.md) to choose API-token, service-account OAuth or available native browser credentials.

## Follow the publishing path

1. **Choose your tool** from the table above.
2. **Connect your site** using that guide's configuration. [Compare authentication options](./authentication.md) if your organization requires a particular credential type.
3. **Publish a small note**, then open the resulting Confluence page. Keep the page IDs written to your source for subsequent publishes.

## Make your first page

Create a `docs` folder and add `welcome.md`:

```markdown
# Welcome to the team

Our documentation lives in Markdown and publishes to Confluence.

- [x] Write the first page
- [ ] Share it with the team
```

Configure `contentRoot` as `.` and `folderToPublish` as `docs`, then publish using your chosen interface. Successful publishing adds `connie-page-id` and `connie-page-url` to the source note's frontmatter. Keep these properties: the ID identifies the existing Confluence page on future runs.

## Choose what gets published

`contentRoot` is the directory the publisher scans. `folderToPublish` selects notes under that root by default. Matching YAML tags or `connie-publish: true` can include notes elsewhere. `connie-publish: false` always excludes a note.

```yaml
---
connie-publish: true
connie-title: Team handbook
tags:
  - documentation
---
```

Folders become pages. A folder note named after its folder, `index.md`, `README.md`, or `readme.md` supplies that folder page's content. The selected tree's root maps to your configured parent page; a root folder note can update that page itself.

## Publish changes deliberately

Publishing updates local frontmatter, so the source files need to be writable. Keep `forceOverwrite` disabled to protect pages last edited by another Confluence user. Inspect conflicts before deciding to overwrite them. Unchanged content is compared with the existing page to avoid unnecessary updates.

This is a Markdown publishing workflow. Pages created directly in Confluence are not automatically imported into your vault. The [export tools](./export.md) read individual pages separately; they do not create a continuous two-way sync.

After your first publish, use [Select & control publishing](./publishing.md) to expand your content. If something does not work, start with [Troubleshooting](./troubleshooting.md).

Use [publishing controls](./publishing.md) for shared headers and footers, page titles, labels, transclusion, ignored blocks, TOC macros and blog posts.

## Sources

- [Project overview and supported interfaces](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/README.md)
- [Publishing behavior and v6 migration](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/MIGRATING_TO_6.md)
- [Selection and hierarchy](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md)
