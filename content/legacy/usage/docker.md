<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Modified for this site migration: publishing frontmatter removed, internal links adapted, and development tooling instructions updated where applicable; revised for current v7 APIs and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Publish with Docker

The `ghcr.io/markdown-confluence/publish:latest` image contains the publishing CLI and Chromium-based Mermaid renderer. It supports AMD64 and ARM64 and accepts the same configuration as the [CLI](/docs/cli).

## Configure the source directory

Create `.markdown-confluence.json` beside your `docs` folder:

```json
{
  "confluenceBaseUrl": "https://your-site.atlassian.net",
  "confluenceParentId": "123456",
  "atlassianUserName": "you@example.com",
  "contentRoot": ".",
  "folderToPublish": "docs"
}
```

This example uses an unscoped API token. Supply the token from your environment:

```sh
export ATLASSIAN_API_TOKEN="YOUR_API_TOKEN"
docker run --rm \
  -v "$(pwd):/content" \
  -e ATLASSIAN_API_TOKEN \
  ghcr.io/markdown-confluence/publish:latest
```

The current directory is mounted at `/content`, which is the container's working directory. The standalone image runs as an unprivileged user. That user must be able to write the mounted Markdown files because publishing records `connie-page-id` and `connie-page-url` in frontmatter.

For scoped tokens or service-account OAuth, see [authentication](/docs/authentication). Pass the required variables explicitly with Docker `-e` arguments, or retain non-secret gateway/site settings in the JSON file. Environment variables in the host shell are not automatically available in the container.

## Convert without publishing

Pass the conversion command after the image name:

```sh
docker run --rm \
  -v "$(pwd):/content" \
  ghcr.io/markdown-confluence/publish:latest \
  to-adf docs/welcome.md --output welcome.adf.json

docker run --rm \
  -v "$(pwd):/content" \
  ghcr.io/markdown-confluence/publish:latest \
  to-markdown welcome.adf.json --output welcome.md
```

Local conversion does not need Confluence credentials. Create output directories first and make the output destination writable. For stdin, add `-i`; do not allocate a TTY when piping JSON or Markdown. See [conversion and export](/docs/export) for the lossless/readable distinction and live page reads.

## Diagrams and updating

Mermaid is included. PlantUML is optional and sends source to the configured server. The server URL must be reachable from the publishing container; `localhost` refers to the container itself. See [diagrams](/docs/diagrams).

Pull updated published artifacts before running:

```sh
docker pull ghcr.io/markdown-confluence/publish:latest
```

`latest` follows published releases. Pin a published image version or digest when your pipeline needs a repeatable container build.

## Sources

- [CLI and container reference](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md)
- [Container permissions and migration](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/MIGRATING_TO_6.md)
