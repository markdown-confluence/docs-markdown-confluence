# Publish from your terminal

Follow this guide to publish a local Markdown folder to Confluence Cloud. For automated publishing, use [GitHub Actions](/docs/usage/github-actions); for a container, use [Docker](/docs/usage/docker).

The quick start below uses **version 7** with an unscoped Confluence Cloud API token. Node.js **24.15.0 or newer** is required. The commands use Vite+ (`vp`); the package can also be invoked with `pnpm dlx @markdown-confluence/cli@7.0.0`.

## Create a Markdown folder

Create a `docs` directory with a `welcome.md` file:

```markdown
# Welcome to the team

Our documentation lives in Markdown and publishes to Confluence.
```

You will publish this note under an existing Confluence parent page. See [the overview](./getting-started.md#what-you-need) for prerequisites.

## Configure the destination

Create `.markdown-confluence.json` beside your `docs` directory:

```json
{
  "confluenceBaseUrl": "https://your-site.atlassian.net",
  "confluenceParentId": "123456",
  "atlassianUserName": "you@example.com",
  "contentRoot": ".",
  "folderToPublish": "docs"
}
```

Use the numeric ID of an existing parent page. Leave `/wiki` off the site URL. Supply the API token through the environment rather than putting it in a committed configuration file:

```sh
export ATLASSIAN_API_TOKEN="YOUR_API_TOKEN"
vp dlx @markdown-confluence/cli@7.0.0
```

Run this from the directory containing the configuration. The publisher uploads selected pages and attachments and writes page IDs and URLs into your Markdown frontmatter. Subsequent runs use those IDs to address the same pages. A failed publish exits unsuccessfully with an error.

Scoped API tokens need the Atlassian API gateway and a separate site URL. See [authentication](./authentication.md) for scoped tokens and service-account OAuth.

## Control selection and page structure

`contentRoot: "."` scans the repository; `folderToPublish: "docs"` publishes notes under `docs` by default. To scan only that directory and select all of it, use `contentRoot: "docs"` and `folderToPublish: "."`.

`connie-publish: true` includes a note outside the default folder. A matching configured YAML tag also selects it. `connie-publish: false` excludes it regardless of folder or tag.

The common root of the selected notes maps to `confluenceParentId`. Selecting notes in additional directories can expand that common root. Folder notes named after their folder, `index.md`, `README.md`, or `readme.md` provide folder-page content. A root folder note updates the configured parent page.

Keep `forceOverwrite: false`, the default, to preserve pages last edited by another Confluence user. Publishing requires write access to source files because it records `connie-page-id` and `connie-page-url`.

See [publishing controls](./publishing.md) for page headers and footers, `tagsToPublish`, reusable embeds, ignored code fences, TOC macros and blog posts. [Configuration sources](../features/setting-sources.md) explains CLI → environment → file → default precedence.

## Publish with GitHub Actions

Use the dedicated [GitHub Actions guide](/docs/usage/github-actions) to configure repository secrets and automated publishing. Frontmatter written in an ephemeral checkout is not automatically committed back, so keep existing page IDs in your source repository.

## Use the container

Follow [Run with Docker](/docs/usage/docker) for the image, volume mount, and credentials. The mounted content must be writable so page IDs can be saved.

## Convert without publishing

Convert local Markdown to ADF or ADF back to Markdown without Confluence credentials:

```sh
vp dlx @markdown-confluence/cli@7.0.0 to-adf docs/welcome.md --output welcome.adf.json
vp dlx @markdown-confluence/cli@7.0.0 to-markdown welcome.adf.json --output welcome.md
```

Default reverse conversion preserves rich ADF through `adf` fences. Use `--readable` to favor Markdown, or supply a Confluence page URL/ID to export an existing page. See [conversion and export](./export.md).

## Validate before publishing

Use v7 [validation, read-only planning and JSON reports](/docs/preflight) to catch source problems and inspect destinations before writing. Validation needs no credentials; planning uses the normal Confluence credentials. Publishing reports can be saved as CI artifacts. Do not treat a `reconcile` plan entry as a prediction of an unchanged page.

## Sources

- [CLI configuration reference](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md)
- [Conversion reference](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CONVERSION.md)
- [Publishing Action](https://github.com/markdown-confluence/publish-action)
