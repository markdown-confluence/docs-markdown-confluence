---
connie-publish: true
connie-page-id: '1343688'
---
# Docker Image

The `ghcr.io/markdown-confluence/publish:latest` Docker image is a ready-to-use container that wraps up the npm CLI and has the same arguments. By using this Docker image, you can quickly start publishing your Markdown files to Confluence without the need to set up the npm CLI tool manually.

## Usage

To use the `ghcr.io/markdown-confluence/publish:latest` Docker image, follow these steps:

1. Create a `.markdown-confluence.json` configuration file in your project directory as described in the "Example setup" section above.

2. Set up environment variables for sensitive information like the Atlassian API token.

3. Run the Docker container using the following command:

```bash
docker run -it --rm -v "$(pwd):/content" -e ATLASSIAN_API_TOKEN ghcr.io/markdown-confluence/publish:latest
```

This command does the following:

- `-it`: Runs the Docker container interactively, allowing you to see the output and interact with the running process if necessary.

- `--rm`: Removes the container once the process has completed.

- `-v "$(pwd):/content"`: Maps your current working directory (where your configuration file and Markdown files are located) to the `/content` volume inside the container. This allows the container to access your files.

- `-e ATLASSIAN_API_TOKEN`: Loads environment variables from the current console.

### Example setup
#### [.markdown-confluence.json](https://github.com/markdown-confluence/docs-markdown-confluence/blob/main/.markdown-confluence.json)
```json
{
    "confluenceBaseUrl": "https://markdown-confluence.atlassian.net",
    "confluenceParentId": "524353",
    "atlassianUserName": "andrew.mcclenaghan@gmail.com",
    "folderToPublish": ".",
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


## Updating the Docker Image

To update the Docker image to the latest version, run the following command:

```bash
docker pull ghcr.io/markdown-confluence/publish:latest
```

This command fetches the latest version of the `ghcr.io/markdown-confluence/publish:latest` Docker image and replaces the existing one on your system.

## Conclusion

By using the `ghcr.io/markdown-confluence/publish:latest` Docker image, you can quickly and easily publish your Markdown files to Confluence without any additional setup. With its straightforward configuration and seamless integration with Docker, this tool is a valuable resource for anyone who needs to work with Confluence and Markdown files.

