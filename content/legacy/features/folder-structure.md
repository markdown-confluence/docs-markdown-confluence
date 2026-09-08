<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Revised for v7: current APIs, commands, configuration, links and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Folder structure

Markdown Confluence builds a Confluence page tree from the relative paths of the Markdown notes selected for publishing. The common local root maps to your configured `confluenceParentId`; it is not created as an extra child page.

## Selection changes the tree

`contentRoot` determines what can be scanned. `folderToPublish` chooses notes by default. Matching configured tags and `connie-publish: true` can select notes elsewhere, expanding the common ancestor of the selected files. Those additional folders may then become child pages in Confluence.

![Example of a local folder hierarchy and Confluence pages](/docs-assets/features/attachments/Pasted%20image%2020230413135017.png)

The illustration comes from the original documentation. The current selection and root behavior is described above.

## Supply folder-page content

Use a [folder note](/docs/features/folder-note) named after its folder, `index.md`, `README.md`, or `readme.md`. At the publishing root, that content updates the configured parent page. Other folders become child pages, and generated folder pages retain a child-page listing.

## Preserve an existing parent

By default, publishing can move an existing page to match the local tree. To retain its existing parent:

```yaml
---
connie-page-id: "123456"
connie-dont-change-parent-page: true
---
```

The page ID must identify the page you intend to manage. The flag keeps its current parent; it does not create a named sub-parent or discover an arbitrary space. Explicit folder-page IDs can anchor a subtree to an existing destination, and the account must have access to that destination.

Pages created directly in Confluence are not automatically imported into the Markdown tree. Create a local note and assign the intended page ID when bringing an existing page under Markdown management. Review its content first, because publishing can replace it with the local source.

See [publishing controls](/docs/publishing) for selection, page titles and overwrite protection.

## Order sibling pages



Enable `orderPages: true`, `--orderPages`, or **Apply page ordering** in Obsidian. Add numeric `sort-order` frontmatter to at least two sibling pages. Lower values come first; ties use page IDs for stability.

Ordering applies only to successfully published, explicitly ranked pages sharing a parent. Unranked pages are not managed; pages with preserved parents and blog posts are excluded. Single-note publishing does not reorder siblings. The implementation reads the existing order through the v2 children endpoint and uses Cloud's v1 move endpoint where an order change is needed; v2 remains in use for the supported page operations. Permissions/API failures are surfaced. Completed content writes remain if ordering fails.


Example note frontmatter:

```yaml
---
sort-order: 10
---
```

Give at least two sibling notes different numeric ranks and enable ordering before publishing the collection.

## Sources

- [CLI hierarchy reference](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md#publishing-hierarchy-and-folder-notes)
- [Page-tree behavior and cross-space regression](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/lib/src/TreeConfluence.test.ts)
