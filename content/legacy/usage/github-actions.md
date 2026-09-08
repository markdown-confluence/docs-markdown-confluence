<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Revised for v7: current APIs, commands, configuration, links and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Publish with GitHub Actions

Run Markdown Confluence 7 when documentation changes in your repository. The Action invokes the containerized CLI, so publishing behavior, diagrams and configuration are shared with the other interfaces.

## Publish with an API token

Save this as `.github/workflows/publish.yml` and configure the referenced repository secrets:

```yaml
name: Publish to Confluence
on:
  push:
    branches: [main]
    paths: ["docs/**", ".markdown-confluence.json"]
  workflow_dispatch:
permissions:
  contents: read
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: markdown-confluence/publish-action@v7
        with:
          confluenceBaseUrl: https://your-site.atlassian.net
          confluenceParentId: "123456"
          atlassianUserName: ${{ secrets.ATLASSIAN_USERNAME }}
          atlassianApiToken: ${{ secrets.ATLASSIAN_API_TOKEN }}
          contentRoot: .
          folderToPublish: docs
```

This example uses an unscoped API token. For a scoped token, use the Atlassian gateway as `confluenceBaseUrl`, set `confluenceSiteUrl` to the browsable site, and retain Basic authentication with the account email. See [authentication](/docs/authentication).

## Publish with a service account

An Atlassian Administration service-account OAuth credential can replace the email/API-token pair:

```yaml
- uses: actions/checkout@v6
- uses: markdown-confluence/publish-action@v7
  with:
    confluenceAuthType: oauth2
    confluenceBaseUrl: https://api.atlassian.com/ex/confluence/YOUR_CLOUD_ID
    confluenceSiteUrl: https://your-site.atlassian.net
    confluenceParentId: "123456"
    atlassianClientId: ${{ secrets.ATLASSIAN_CLIENT_ID }}
    atlassianClientSecret: ${{ secrets.ATLASSIAN_CLIENT_SECRET }}
    contentRoot: .
    folderToPublish: docs
```

The service account needs Confluence access, the required [scopes and permissions](/docs/authentication#service-account-oauth), and access to the publishing parent. A developer-console interactive OAuth app is a different credential type.

## Configuration file

Set `configFile: .markdown-confluence.json` to load shared settings. Supply credentials through Action secrets. Action inputs are passed as environment variables and take precedence over matching values in the JSON file. See [configuration sources](/docs/features/setting-sources).

## Inputs

| Input | Purpose |
| --- | --- |
| `confluenceBaseUrl` | Site origin for unscoped tokens, or gateway API URL for scoped tokens/OAuth. |
| `confluenceSiteUrl` | Browsable site URL; required when the API URL is the gateway. |
| `confluenceParentId` | Existing parent page; determines the initial target space. |
| `atlassianUserName` | Account email for Basic/API-token authentication. |
| `atlassianApiToken` | API token or configured Bearer token, supplied from secrets. |
| `confluenceAuthType` | `basic`, `bearer`, or `oauth2`. |
| `atlassianClientId` | Service-account OAuth client ID from secrets. |
| `atlassianClientSecret` | Service-account OAuth client secret from secrets. |
| `contentRoot` | Scan root, normally `.` in the checkout. |
| `folderToPublish` | Default publishing folder relative to `contentRoot`. |
| `tagsToPublish` | Comma-separated YAML tags selecting additional notes. |
| `configFile` | Path to a JSON configuration file. |
| `mermaidProtocolTimeout` | Positive timeout in milliseconds; defaults to `180000`. |
| `plantumlEnabled` | Explicitly enable PlantUML rendering. |
| `plantumlServerUrl` | Server trusted to receive PlantUML source. |
| `confluenceRequestHeaders` | Extra headers in the CLI environment format, such as `X-Header=value`; JSON config accepts an object. |

The historical `confluenceApiPrefix` compatibility input is ignored by the v7 SDK's routing. It does not enable Confluence Server or Data Center support. Array settings and controls without a dedicated Action input, including `ignoredCodeBlockLanguages`, page headers and page footers, can be set in the JSON configuration.

## Keep publishing identities

Publishing writes `connie-page-id` and `connie-page-url` to Markdown frontmatter. An ephemeral Actions checkout does not automatically commit these changes back to the repository. Preserve existing IDs in source control so subsequent publishing runs address the intended pages. Keep overwrite protection enabled unless you deliberately decide to replace another user's edits.

[Publishing controls](/docs/publishing) covers selection, hierarchy, embeds, labels, blog posts and reusable page content.

## Validate before publishing

Use v7 [validation, read-only planning and JSON reports](/docs/preflight) to catch source problems and inspect destinations before writing. Validation needs no credentials; planning uses the normal Confluence credentials. Publishing reports can be saved as CI artifacts. Do not treat a `reconcile` plan entry as a prediction of an unchanged page.

## Sources

- [Action input definition reviewed for launch](https://github.com/markdown-confluence/publish-action/blob/2a0af177d3d2eb33faf816a23f0316f093dcde80/action.yml)
- [Cloud OAuth scopes and workflow](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_OAUTH.md)
- [CLI settings and header formats](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md)
