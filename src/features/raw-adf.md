---
connie-publish: true
connie-page-id: '3735553'
---
# Markdown-Confluence: Unleashing the Ninja Power of Raw Atlassian Document Format Blocks 🥷

Greetings, honorable Markdown-Confluence user! Are you ready to unleash the ninja power of raw Atlassian Document Format (ADF) blocks in your Markdown? Behold, the secret technique to render ADF elements in your Markdown-Confluence documents! 🐉

## The Secret Art of Raw ADF Blocks

The ancient ninja art of raw ADF blocks allows you to embed ADF content directly into your Markdown document using a special code block. To master this technique, you must first learn the sacred format for raw blocks:

~~~md
```adf
{"type":"yourADFType","attrs":{...},"content":[...]}
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

## The Forbidden API Technique

To peer into the heart of the `atlaskit_doc_format`, which stores the ADF content, you must invoke the power of the forbidden API. Gaze upon its hidden knowledge:

[https://markdown-confluence.atlassian.net/wiki/rest/api/content/2916353?expand=body.atlas_doc_format](https://markdown-confluence.atlassian.net/wiki/rest/api/content/2916353?expand=body.atlas_doc_format)

To adapt this technique to your own Confluence domain and page, replace the domain with your Confluence site domain and `2916353` with the page id you wish to reveal the ADF for.

## Conclusion

You have now learned the secret ninja art of raw ADF blocks in Markdown-Confluence. Use your newfound power wisely, and remember: with great power comes great responsibility. Now, go forth and create stunning Confluence documents like the ninja you are! 🥷📜💥
