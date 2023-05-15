---
connie-publish: true
connie-page-id: '1409233'
---
# NPM CLI

This tool is designed to make the process of publishing documentation to Confluence faster, more streamlined, and more efficient. It supports multiple authentication methods and allows you to publish your Markdown files to any Confluence space or page of your choice.

With its user-friendly and clear documentation, this tool is accessible to everyone, regardless of their technical expertise. Whether you're a software developer, technical writer, or project team member, this CLI tool is a game-changer for anyone who needs to publish documentation to Confluence.

## Configuration
Setting up the configuration for an application is an essential step to ensure its proper functioning. For non-technical users, it is important to understand the basics of managing settings. Generally, there are two types of settings you'll need to work with: non-sensitive values and sensitive values.

For non-sensitive values like the website's address, page identifiers, your username, or the folders you're working with, using a configuration file is the preferred method. A configuration file is a simple, organized, and user-friendly way to store settings. You don't need technical expertise to manage it, as the settings are typically listed in a readable format. By keeping these settings in a separate file, you can easily find and change them whenever needed without worrying about breaking the application.

Sensitive values, such as API tokens or passwords, should be handled with more care. Instead of storing them in a configuration file, it's recommended to use environment variables. Environment variables are a secure way to store sensitive information because they are accessible only to the application when needed and not exposed to others. As a non-technical user, you may need assistance from a technical team member or follow step-by-step instructions provided by the application to set up environment variables. By separating your settings into non-sensitive and sensitive categories and storing them appropriately, you can help ensure your application runs smoothly and securely.

### Example setup
#### [.markdown-confluence.json](https://github.com/markdown-confluence/docs-markdown-confluence/blob/main/.markdown-confluence.json)
```json
{
    "confluenceBaseUrl": "https://markdown-confluence.atlassian.net",
    "confluenceParentId": "524353",
    "atlassianUserName": "andrew.mcclenaghan@gmail.com",
    "folderToPublish": "."
  }
```

#### Environment Variables
##### macOS / Linux
```bash
export ATLASSIAN_API_TOKEN="YOUR API TOKEN"
```

##### Windows
```command
set ATLASSIAN_API_TOKEN="YOUR API TOKEN"
```
[https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1)


#### CLI Command
```bash
npx @markdown-confluence/cli
```

