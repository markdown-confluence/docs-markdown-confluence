# Understand publishing & updates

Treat Markdown as the maintained source and Confluence as the shared destination. A publish run prepares selected notes, resolves their page relationships, renders supported content and sends the resulting updates to Confluence.

## What happens on the first publish

1. The publisher scans `contentRoot` and selects notes using the publishing folder, matching tags and explicit frontmatter.
2. Selected notes and folders determine the page hierarchy under the configured parent. Source embeds are expanded and supported content is converted.
3. Rendering plugins prepare diagrams and equations. Images and files use the attachment pipeline.
4. The publisher creates or updates the corresponding content and saves `connie-page-id` and `connie-page-url` to your Markdown frontmatter.

A publish run is not an all-or-nothing transaction. Some preparation errors prevent page writes, but a later upload or page failure can occur after other work has succeeded. Read the reported errors and verify the affected pages before retrying.

## Keep the generated page IDs

Existing IDs identify existing pages or blog posts. Keep them when moving source through Git, backups or automated runs. The source directory must be writable so the publisher can record them.

For an existing Confluence page you want to manage deliberately, create a local Markdown file and set its `connie-page-id`. Check the configured parent boundary and [parent behavior](/docs/features/folder-structure) before publishing. An exported Markdown file alone is not a complete publishing configuration.

## What happens when you publish again

Changed source updates the existing destination. Content and attachment comparisons avoid unnecessary page versions and uploads when output is unchanged. This also applies to deterministic LaTeX rendering and supported Dataview output.

Changes to shared embedded content or Dataview dependencies reach a destination when the affected page is published again. These are publication-time results, not live remote views.

## Resolve Confluence-side edits

By default, `forceOverwrite` is false. The publisher protects content last updated by another user instead of silently replacing it. Review that page and reconcile the intended change in your Markdown before choosing whether to overwrite.

This protection is not a merge engine, and it does not detect every possible conflicting workflow—for example, different writers sharing one publishing account. Choose a clear source owner and publishing process.

Existing inline comments can survive edits elsewhere in the document when their annotations can be reattached. Editing or removing the highlighted text can affect that matching. See [inline comment handling](/docs/features/comment-handling).

## Understand the boundaries

- Publishing is not automatic two-way synchronization. Confluence edits do not flow back into Markdown.
- [Export](/docs/export-confluence) is a separate read operation, with its own preservation limits.
- Removing a local note or excluding it from selection is not a remote page-cleanup operation. Manage the corresponding Confluence content separately.
- A selected note can include content from other scanned notes through embeds. Review included content as well as the list of selected destinations.
- Folder notes at the publishing root can update the configured parent page itself. Check the hierarchy before your first run.

## Try a small publish first

Choose a test parent and a small note with an image or diagram. Publish it, retain the generated ID, and publish it again unchanged. Then edit a paragraph and check the resulting page. This gives you a concrete view of selection, rendering and updates before adopting a larger workflow.

If something fails, start with [Troubleshooting](/docs/troubleshooting).

## Cancel a publish

In Obsidian, click the publishing status-bar progress or run **Cancel publishing after the current request**. The active operation finishes; completed writes remain and later operations stop. Cancellation is not rollback. The result identifies notes that did not publish; publish again to resume normal reconciliation.

Library callers can pass `{ signal: controller.signal }` as the second argument to `publish` or `publishEffect`.

## Manage editing restrictions

[Edit locks](/docs/page-edit-locks) are opt-in and checked even when page content is unchanged. Restriction failures are reported separately from content publication. Turning locking off does not remove existing restrictions. For automation, [JSON reports](/docs/preflight) provide per-page results and a nonzero exit status for partial failures.

## Sources

- [Publisher implementation](https://github.com/markdown-confluence/markdown-confluence/blob/4a99928f08f76439a7bbdb6cf981b31e3cf8cffe/packages/lib/src/Publisher.ts)
- [Publishing behavior and writable source](https://github.com/markdown-confluence/markdown-confluence/blob/4a99928f08f76439a7bbdb6cf981b31e3cf8cffe/documentation/MIGRATING_TO_6.md#publishing-behavior)
- [Conflict and unchanged-publish verification](https://github.com/markdown-confluence/markdown-confluence/blob/4a99928f08f76439a7bbdb6cf981b31e3cf8cffe/documentation/CLOUD_API_MIGRATION.md#feature-acceptance)
