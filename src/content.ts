import legacyManifest from "../content/legacy-manifest.json";
import documentationNavigation from "../content/documentation-navigation.json";

export interface Guide {
  slug: string;
  title: string;
  category: string;
  sectionId: string;
  summary: string;
  markdown: string;
  legacy: boolean;
  sourcePath: string;
  nextSteps: string[];
}
const currentFiles = import.meta.glob<string>("../content/current/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const legacyFiles = import.meta.glob<string>("../content/legacy/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
export const documentationSections = documentationNavigation;
export const guides: Guide[] = documentationSections.flatMap((section) =>
  section.guides.map((entry) => {
    const currentFilename = entry.slug === "dataview" ? "dataview-publishing" : entry.slug;
    const currentPath = `content/current/${currentFilename}.md`;
    const legacyEntry = legacyManifest.find((candidate) => candidate.slug === entry.slug);
    const currentMarkdown = currentFiles[`../${currentPath}`];
    const sourcePath = currentMarkdown !== undefined ? currentPath : legacyEntry?.sourcePath;
    const markdown = currentMarkdown ?? (sourcePath ? legacyFiles[`../${sourcePath}`] : undefined);
    if (!markdown || !sourcePath) throw new Error(`Missing documentation source for ${entry.slug}`);
    return {
      ...entry,
      category: section.title,
      sectionId: section.id,
      sourcePath,
      legacy: currentMarkdown === undefined,
      markdown: markdown.replace(/^<!--[\s\S]*?-->\s*/, ""),
    };
  }),
);
export function getNextGuides(guide: Guide) {
  return guide.nextSteps
    .map((slug) => guides.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Guide => candidate !== undefined);
}
const aliases: Record<string, string> = {
  "/index.html": "getting-started",
  "/docs/usage/cli": "cli",
  "/docs/features/mermaid": "diagrams",
  "/docs/usage/npm-library/md-to-adf": "library",
  "/docs/usage/npm-library": "library",
  "/docs/usage/node-library": "library",
  "/docs/usage/obsidian": "obsidian",
  "/introduction.html": "getting-started",
  "/usage/index.html": "getting-started",
  "/features/index.html": "getting-started",
  "/usage/cli.html": "cli",
  "/usage/obsidian.html": "obsidian",
  "/usage/npm-library.html": "library",
  "/usage/node-library.html": "library",
  "/usage/npm-library/md-to-adf.html": "library",
  "/CHANGELOG.html": "release-notes",
  "/changelog.html": "release-notes",
  "/usage/github_action.html": "usage/github-actions",
  "/usage/github-actions.html": "usage/github-actions",
  "/features/mermaid.html": "diagrams",
};
export function resolveLegacyPath(pathname: string) {
  return (
    aliases[pathname] || legacyManifest.find((entry) => entry.legacyPaths.includes(pathname))?.slug
  );
}
export function normalizeDocHref(href: string, currentSlug: string) {
  if (/^(https?:|mailto:|#|obsidian:)/.test(href)) return href;
  if (href.startsWith("/docs-assets/")) return href;
  if (/^\/(?:use-cases(?:\/|$|#)|docs(?:$|#)|design(?:$|#)|visuals\/)/.test(href) || href === "/")
    return href;
  const [path, hash] = href.split("#");
  if (path.startsWith("/docs/")) {
    const requestedSlug = path.slice(6).replace(/\.md$/, "");
    const preferredSlug = aliases[`/${requestedSlug}.html`] || requestedSlug;
    return `/docs/${preferredSlug}${hash ? `#${hash}` : ""}`;
  }
  const pathname = new URL(path, `https://markdown-confluence.com/${currentSlug}`).pathname;
  const requestedSlug =
    resolveLegacyPath(pathname.replace(/\.md$/, ".html")) ||
    pathname.replace(/^\//, "").replace(/\.md$/, "");
  return `/docs/${requestedSlug}${hash ? `#${hash}` : ""}`;
}
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getGuideHeadings(markdown: string) {
  const headings: { label: string; id: string }[] = [];
  let fenceCharacter = "";
  let fenceLength = 0;
  for (const line of markdown.split("\n")) {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (!fenceCharacter) {
        fenceCharacter = fence[1][0];
        fenceLength = fence[1].length;
      } else if (
        fence[1][0] === fenceCharacter &&
        fence[1].length >= fenceLength &&
        line.trim() === fence[1]
      )
        fenceCharacter = "";
      continue;
    }
    if (fenceCharacter) continue;
    const heading = line.match(/^## (.+)$/);
    if (heading) {
      const label = heading[1].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*]/g, "");
      if (label !== "Sources") headings.push({ label, id: headingId(label) });
    }
  }
  return headings;
}
