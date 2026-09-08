# Validate, plan and report

Check your Markdown before publishing, inspect the intended destinations, and collect a machine-readable result for automation. Install the [v7 CLI](/docs/cli) first; the commands below use its `markdown-confluence` executable.



```sh
markdown-confluence validate --input notes/example.md --output validation.json
markdown-confluence validate --enableFolder notes --output -
markdown-confluence plan --enableFolder notes --output plan.json
markdown-confluence --enableFolder notes --report publish.json
markdown-confluence --enableFolder notes --report -
```

`validate` works without Confluence credentials. It checks conversion, titles and local hierarchy. Without `--input`, it uses the normal folder/tag/exclusion selection. Explicit `--input` validates that file independently of selection.

`plan` requires the normal Cloud credentials and performs read-only page discovery. It never creates placeholder pages, renders/uploads attachments or changes local frontmatter. Existing pages are marked `reconcile`, since determining every content, attachment, label and permission change requires the publishing pipeline. New pages are marked `create`; ambiguous/inaccessible pages are `blocked`. Treat this as preflight, not an exact prediction of version changes.

Reports use `schemaVersion: 1`. Validation and planning support `--output FILE` or `--output -`; publishing supports `--report FILE` or `--report -`. A failed validation or partial publishing failure returns a nonzero exit status. Publishing reports include per-page failures; errors before page discovery may prevent a publishing report. No credentials are included in reports.


## Suggested workflow

1. Run `validate` locally or in a pull request to catch source problems without credentials.
2. Run `plan` with your publishing credentials to inspect destinations and blocked pages.
3. Review the plan, then publish with `--report publish.json`.
4. Check the exit status and per-page failures before treating the run as successful.

A plan is not a transactional preview or a promise that a page will remain unchanged. Publishing still performs its own reconciliation. See [publishing lifecycle](/docs/publishing-lifecycle).

## Sources

- [Released preflight behavior](https://github.com/markdown-confluence/markdown-confluence/blob/obsidian-confluence-root-v7.0.0/documentation/FORK_PORTS.md#validation-planning-and-reports)
