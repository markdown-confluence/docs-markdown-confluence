# Publish Confluence blog posts

Use a blog post for release notes, project updates and dated announcements. Markdown Confluence publishes both pages and blog posts through the same tools and authentication settings.

## Prepare the destination

Start with a working [Obsidian](/docs/obsidian), [CLI](/docs/cli), [Docker](/docs/usage/docker) or [GitHub Actions](/docs/usage/github-actions) setup. Configure an existing parent page in the intended Confluence space. That space must have Blogs enabled, and your publishing account needs blog-post creation permission.

## Mark a note as a blog post

Create a selected Markdown note with this frontmatter:

```markdown
---
connie-publish: true
connie-content-type: blogpost
connie-blog-post-date: "2026-09-08"
connie-title: September engineering update
tags:
  - engineering
  - release-notes
---

## What shipped

Inline and display equations now publish with our technical notes.

## What comes next

Update the team handbook with the new workflow.
```

Quote the date and use `YYYY-MM-DD`. Setting a blog-post date also selects `blogpost` when the content type is absent. Do not combine it with `connie-content-type: page`.

The date is blog-post metadata, not a scheduler. Publishing runs when you invoke the tool or when your configured automation runs.

## Publish and update

Publish the note using your usual tool. Keep the resulting `connie-page-id` and `connie-page-url` in the Markdown source so subsequent runs address the same content. In CI, retain the updated source between runs.

Blog posts support labels from YAML tags and the shared attachment pipeline. The current source's verification covers creation, updates, label additions and removals, attachments, unchanged republishing and ADF file export.

An existing content ID continues to identify that content. Changing a frontmatter field does not migrate an existing Confluence page into a blog post, or vice versa. Start with a new source note for a different content type.

## When to choose a page instead

Use ordinary pages for durable reference material such as handbooks, runbooks and architecture decisions that belong in a navigable [page hierarchy](/docs/features/folder-structure). Use blog posts for dated updates in a space's blog.

For an end-to-end scenario, see [Release updates & team blogs](/use-cases/release-updates).

## Sources

- [Page and blog frontmatter implementation](https://github.com/markdown-confluence/markdown-confluence/blob/4a99928f08f76439a7bbdb6cf981b31e3cf8cffe/packages/lib/src/ConniePageConfig.ts)
- [Blog publishing acceptance coverage](https://github.com/markdown-confluence/markdown-confluence/blob/4a99928f08f76439a7bbdb6cf981b31e3cf8cffe/documentation/CLOUD_API_MIGRATION.md#feature-acceptance)
