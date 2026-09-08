<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Modified for this site migration: publishing frontmatter removed, internal links adapted, and development tooling instructions updated where applicable. See LEGACY-CONTENT-NOTES.md. -->

# Markdown-Confluence: Unleashing the Ninja Power of Raw Atlassian Document Format Blocks 🥷

Greetings, honorable Markdown-Confluence user! Are you ready to unleash the ninja power of raw Atlassian Document Format (ADF) blocks in your Markdown? Behold, the secret technique to render ADF elements in your Markdown-Confluence documents! 🐉

## The Secret Art of Raw ADF Blocks

The ancient ninja art of raw ADF blocks allows you to embed ADF content directly into your Markdown document using a special code block. To master this technique, you must first learn the sacred format for raw blocks:

~~~md
```adf
{"type":"paragraph","content":[{"type":"text","text":"Native ADF content"}]}
```
~~~

The path to enlightenment begins with the following example, young grasshopper:

~~~md
```adf
{"type":"decisionList","attrs":{"localId":"39becc7a-48c3-4e2d-a6bc-35648d6689a2"},"content":[{"type":"decisionItem","attrs":{"state":"DECIDED","localId":"95268b83-2fc0-4801-9b4f-e5c42cc530e6"},"content":[{"text":"Decision to track","type":"text"}]},{"type":"decisionItem","attrs":{"state":"DECIDED","localId":"564ab974-e6fe-48d2-a144-507f5ec30906"},"content":[{"text":"Testing Decision 2","type":"text"}]}]}
```
~~~

This mystical incantation will transform into an ADF node, as described in the ancient scrolls of Atlassian: [Atlassian Document Format Structure](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/)
For the latest information on nodes check out [https://atlaskit.atlassian.com/packages/editor/adf-schema](https://atlaskit.atlassian.com/packages/editor/adf-schema). You can use unpkg to view the nodes folder under types and see what attributes you can set on each node type. [https://unpkg.com/browse/@atlaskit/adf-schema@25.6.0/dist/types/schema/nodes/](https://unpkg.com/browse/@atlaskit/adf-schema@25.6.0/dist/types/schema/nodes/). NB. This unpkg link is for a particular version. Make sure you use the latest version for any new updates.

## Read a page's ADF

Use the v7 CLI to export the original ADF of a Confluence page with your existing authentication:

```sh
vp dlx @markdown-confluence/cli@7.0.0 to-adf --page 123456 --output page.adf.json
```

Set the API/site URLs and credentials in your normal configuration. A publishing parent ID is not required for this read. The command does not change the page or download attachments. See [conversion and export](/docs/export) for file/stream conversion and the lossless contract.

## Conclusion

You have now learned the secret ninja art of raw ADF blocks in Markdown-Confluence. Use your newfound power wisely, and remember: with great power comes great responsibility. Now, go forth and create stunning Confluence documents like the ninja you are! 🥷📜💥
