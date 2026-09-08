# Connect to Confluence Cloud

Choose credentials that match your organization's setup. Confluence Cloud is supported; Server and Data Center are unsupported.

**Version 7** supports scoped and unscoped API tokens, service-account OAuth, and native Obsidian browser login for approved app registrations. Public browser-OAuth onboarding is still pending; API tokens and service accounts provide the documented general setup paths.

## API tokens

Basic authentication pairs your Atlassian account email with an API token. For an unscoped token, use the site origin:

```json
{
  "confluenceBaseUrl": "https://your-site.atlassian.net",
  "confluenceParentId": "123456",
  "atlassianUserName": "you@example.com",
  "confluenceAuthType": "basic",
  "contentRoot": ".",
  "folderToPublish": "docs"
}
```

Supply `ATLASSIAN_API_TOKEN` through the environment or your CI secret store. In Obsidian, use the plugin's credential settings.

**Scoped tokens still use Basic authentication with your email**, but requests must use the Atlassian gateway. Configure both addresses:

```json
{
  "confluenceBaseUrl": "https://api.atlassian.com/ex/confluence/YOUR_CLOUD_ID",
  "confluenceSiteUrl": "https://your-site.atlassian.net",
  "confluenceAuthType": "basic"
}
```

The API URL routes requests; the site URL creates browsable page links. Obtain the cloud ID from your site's `/_edge/tenant_info` endpoint. Account permissions in the target space still apply.

## Service-account OAuth

Use Atlassian Administration **service-account OAuth 2.0 credentials**. These are different from a developer-console interactive OAuth app. Create the service account, give it Confluence access, and grant page, attachment and label permissions in the target space.

Configure the CLI or publishing environment:

```sh
export CONFLUENCE_AUTH_TYPE=oauth2
export CONFLUENCE_BASE_URL=https://api.atlassian.com/ex/confluence/YOUR_CLOUD_ID
export CONFLUENCE_SITE_URL=https://your-site.atlassian.net
export CONFLUENCE_PARENT_ID=123456
export CONFLUENCE_CONTENT_ROOT=.
export FOLDER_TO_PUBLISH=docs
# Inject ATLASSIAN_CLIENT_ID and ATLASSIAN_CLIENT_SECRET from your secret store.
vp dlx @markdown-confluence/cli@7.0.0
```

The [source OAuth guide](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_OAUTH.md) lists all ten required scopes, including `read:confluence-user` and `read:content.metadata:confluence`. The API gateway is required. Tokens are acquired once per CLI invocation and expire after 60 minutes; split longer publishing runs.

Service-account mode is also available in the desktop plugin. Its client secret uses the plugin's existing credential settings storage. Exclude those settings from source control and shared backups. Publishing blog posts also requires Blogs to be enabled in the space and permission to create blog posts.

## Native Obsidian browser OAuth

Version 7 implements browser login, Confluence site selection, connection testing and rotating refresh tokens without a hosted login service. It stores interactive tokens and the configured app secret using Obsidian SecretStorage, which requires Obsidian 1.11.4 or newer.

The project's working app registration is currently **private**. Public onboarding is pending the maintainer's discussion with Atlassian. Native browser login currently requires an approved registration; creating an individual OAuth app is not the recommended general onboarding path.

For approved integration testing, the registered app uses an exact loopback callback, `http://127.0.0.1:8766/callback` by default, S256 PKCE and a configured app secret. The [Obsidian OAuth guide](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/OBSIDIAN_OAUTH.md) describes registration, lifecycle and test requirements.

## Device-code status

Device-code controls and protocol behavior have automated coverage, but Atlassian returns `grant_type is not enabled for client` for the project's registered app. A successful real device login and secret-free refresh remain unverified. Choose an API token, service account, or approved browser registration.

## API migration

Version 7 uses `confluence.js` 3.2.0. Pages, blog posts, spaces, ancestors, attachment reads and label reads use REST v2. Current-user lookup, multipart uploads and label writes retain supported v1 endpoints. The old API-prefix setting is deprecated and ignored; the SDK supplies endpoint paths.

## Permissions for edit locks

Opt-in [page edit locks](/docs/page-edit-locks) additionally need content-restriction read/write permission. Granular scopes are `read:content.restriction:confluence` and `write:content.restriction:confluence`. Add these to your OAuth app and reconnect if the existing grant lacks them, or replace a scoped API token with one carrying these scopes. The authenticated account must also be allowed to manage the page's restrictions.

## Sources

- [Cloud OAuth credentials, scopes and examples](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_OAUTH.md)
- [Native OAuth and public distribution limits](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/OBSIDIAN_OAUTH.md)
- [Authentication and endpoint verification matrix](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md)
