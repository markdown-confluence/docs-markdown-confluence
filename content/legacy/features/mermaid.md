<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Revised for v7: current APIs, commands, configuration, links and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Mermaid diagrams

Write Mermaid source in a fenced block and publish the rendered image with your page:

````markdown
```mermaid
flowchart LR
  Markdown --> Publish --> Confluence
```
````

The current [diagrams guide](/docs/diagrams) covers the CLI's Puppeteer renderer, Obsidian's Electron renderer, configurable protocol timeouts and optional PlantUML. Rendered diagrams are page attachments; unchanged images are reused where their content matches.
