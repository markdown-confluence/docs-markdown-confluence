<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Revised for v7: current APIs, commands, configuration, links and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Folder notes

A folder note supplies the content of a folder's Confluence page. Other notes in that folder become its children rather than siblings of a separate folder-note page.

## Supported names

For a folder called `Engineering`, use one of these names:

- `Engineering.md`.
- `index.md`.
- `README.md`.
- `readme.md`.

Place the note directly inside that folder. Use one folder note per folder to keep the intended content clear. Without an explicit title or first-heading title, `index.md` and README folder notes use the folder name as the Confluence page title.

## The publishing root

The common root of your selected Markdown tree maps to `confluenceParentId`. A folder note at that root updates the configured parent page's content itself; it does not create another child called `index` or `README`.

Folder pages without Markdown content are generated with the standard child-page listing. Headers and footers configured for Markdown source pages do not replace that generated content.

## Existing page locations

Use `connie-page-id` to identify an existing page. `connie-dont-change-parent-page: true` can preserve that page's existing parent when publishing. It does not automatically choose or move to a different space. Review [folder structure](/docs/features/folder-structure) when changing an established tree.

No additional Obsidian plugin is required to recognize these filenames. An optional folder-notes editor plugin can make authoring more convenient.

## Sources

- [Publishing hierarchy and folder notes](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md#publishing-hierarchy-and-folder-notes)
- [Publishing behavior](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/MIGRATING_TO_6.md#publishing-behavior)
