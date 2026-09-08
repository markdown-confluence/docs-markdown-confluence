# LaTeX equations

Obsidian, the CLI and the Docker image automatically render LaTeX math during publication:

```markdown
Inline energy $E=mc^2$ stays in this sentence.

$$
\begin{aligned}
a &= \frac{1}{2} \\
b &= \sqrt{x^2+y^2}
\end{aligned}
$$
```

## Inline and display equations

Inline equations become Confluence inline images; display equations become centered image blocks. Inline math also works in lists and table cells. Put `$$` on its own lines for multiline equations, or write a single-line display equation as `$$x^2$$`. Use display math for tall fractions and matrices: Confluence fits inline images to the surrounding line height.

## Automatic rendering

Rendering uses bundled MathJax 4 and TeX fonts locally, then uploads PNG attachments through the same authenticated client as other images. No Confluence Marketplace app, TeX installation, rendering server or extra credentials are needed. OAuth, scoped API tokens and unscoped API tokens use the existing publishing configuration. The source Markdown is not replaced with images on disk.

Repeated expressions share an attachment within a page. Filenames include the source, display mode and rendering revision; PNG output is deterministic so unchanged equations do not cause attachment or page updates.

## Supported syntax and limits

The supported syntax is MathJax's TeX mathematics, including AMS environments and expression-local `\newcommand`. Full LaTeX documents, external files, HTML/URL macros, dynamically loaded extensions and document-wide macro definitions are not supported. Invalid equations fail the affected page's publication with an error instead of silently disappearing. Expressions are limited to 16,384 characters and rendered dimensions of 4096 pixels per side.

Escaped dollars and dollar signs inside inline/fenced/indented code remain literal. Dollar delimiters must touch the equation (`$x$`, not `$ x $`); escape currency dollars when mixed with mathematics to avoid ambiguous delimiters.

## Conversion and export

The file conversion commands preserve equation source as math extension nodes before publication and restore `$…$`/`$$…$$` on Markdown export. Published Confluence pages contain images: lossless export preserves those image nodes, not editable TeX. Confluence currently strips uploaded image alt text, so the original Markdown remains the source of truth.

## Library integrations

Register `new MathRendererPlugin(new PuppeteerMathRenderer())` with `Publisher`, alongside any other rendering plugins. `MathRendererPlugin`, `MathExpression` and `MathRenderer` are exported by `@markdown-confluence/lib`; `PuppeteerMathRenderer` and `ElectronMathRenderer` are exported by the existing Puppeteer and Electron renderer packages respectively. A custom renderer must return deterministic PNG buffers at twice the logical display size.

## Sources

- [LaTeX support and limits](https://github.com/markdown-confluence/markdown-confluence/blob/4a99928f08f76439a7bbdb6cf981b31e3cf8cffe/documentation/LATEX.md)
- [Inline and display equation implementation #914](https://github.com/markdown-confluence/markdown-confluence/pull/914)
