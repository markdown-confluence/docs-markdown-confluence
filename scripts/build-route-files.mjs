import { FileSystem } from "effect/FileSystem";
import { Path } from "effect/Path";
import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { fileURLToPath } from "node:url";

const websiteDirectory = fileURLToPath(new URL("../", import.meta.url));
const canonicalOrigin = "https://markdown-confluence.com";
const siteName = "Markdown Confluence";
const socialImageUrl = `${canonicalOrigin}/visuals/publishing-workshop.png`;
const socialImageDescription =
  "Graphite and orange document trays connecting local writing to shared knowledge";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function plainText(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function readMarkdownMetadata(markdown, fallbackTitle) {
  const content = markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, "");
  const heading = content.match(/^#{1,6}\s+(.+)$/m)?.[1];
  const paragraph = content
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(?:#|>|\||[-*+]\s|\d+[.)]\s)/.test(block));
  const title = fallbackTitle || plainText(heading || "Documentation");
  const summary = plainText(paragraph || `Documentation for ${title}.`);
  const description =
    summary.length > 180 ? `${summary.slice(0, 177).replace(/\s+\S*$/, "")}…` : summary;
  return { title, description };
}

function assertSlug(slug) {
  if (!/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid documentation slug: ${slug}`);
  }
}

function renderRouteHtml(template, metadata) {
  const title = metadata.title.endsWith(siteName)
    ? metadata.title
    : `${metadata.title} | ${siteName}`;
  const canonicalUrl = `${canonicalOrigin}${metadata.pathname}`;
  const metadataNames = new Set([
    "description",
    "robots",
    "og:title",
    "og:description",
    "og:type",
    "og:url",
    "og:site_name",
    "og:image",
    "og:image:alt",
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
    "twitter:image:alt",
  ]);
  const cleanTemplate = template
    .replace(/\s*<!-- route-metadata:start -->[\s\S]*?<!-- route-metadata:end -->/g, "")
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const name = tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i)?.[1];
      return metadataNames.has(name?.toLowerCase()) ? "" : tag;
    })
    .replace(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, "");
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    ...(metadata.noindex ? ['<meta name="robots" content="noindex, follow" />'] : []),
    ...Object.entries({
      "og:title": title,
      "og:description": metadata.description,
      "og:type": "website",
      "og:url": canonicalUrl,
      "og:site_name": siteName,
      "og:image": socialImageUrl,
      "og:image:alt": socialImageDescription,
    }).map(([property, value]) => `<meta property="${property}" content="${escapeHtml(value)}" />`),
    ...Object.entries({
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": metadata.description,
      "twitter:image": socialImageUrl,
      "twitter:image:alt": socialImageDescription,
    }).map(([name, value]) => `<meta name="${name}" content="${escapeHtml(value)}" />`),
  ];
  return cleanTemplate.replace(
    /\s*<\/head>/i,
    `\n    <!-- route-metadata:start -->\n    ${tags.join("\n    ")}\n    <!-- route-metadata:end -->\n  </head>`,
  );
}

const buildRouteFiles = Effect.gen(function* () {
  const filesystem = yield* FileSystem;
  const filesystemPath = yield* Path;
  const outputDirectory = filesystemPath.join(websiteDirectory, "dist");
  const template = yield* filesystem.readFileString(
    filesystemPath.join(outputDirectory, "index.html"),
  );
  if (!/<\/head>/i.test(template)) {
    throw new Error("Build output has no closing head element. Run the Vite+ build first.");
  }
  const navigation = JSON.parse(
    yield* filesystem.readFileString(
      filesystemPath.join(websiteDirectory, "content/documentation-navigation.json"),
    ),
  );
  const navigationTitles = new Map(
    navigation.flatMap((section) => section.guides.map((guide) => [guide.slug, guide.title])),
  );
  const currentDirectory = filesystemPath.join(websiteDirectory, "content/current");
  const currentFilenames = (yield* filesystem.readDirectory(currentDirectory))
    .filter((filename) => filename.endsWith(".md"))
    .sort();
  const legacyManifest = JSON.parse(
    yield* filesystem.readFileString(
      filesystemPath.join(websiteDirectory, "content/legacy-manifest.json"),
    ),
  );
  const vercelConfiguration = JSON.parse(
    yield* filesystem.readFileString(filesystemPath.join(websiteDirectory, "vercel.json")),
  );
  const redirectedPaths = new Set(vercelConfiguration.redirects.map((redirect) => redirect.source));
  const canonicalLegacyGuides = legacyManifest.filter(
    (entry) => !redirectedPaths.has(`/docs/${entry.slug}`),
  );
  const guideMetadata = yield* Effect.all(
    [
      ...currentFilenames.map((filename) =>
        Effect.gen(function* () {
          const slug = filename === "dataview-publishing.md" ? "dataview" : filename.slice(0, -3);
          const markdown = yield* filesystem.readFileString(
            filesystemPath.join(currentDirectory, filename),
          );
          return { slug, ...readMarkdownMetadata(markdown, navigationTitles.get(slug)) };
        }),
      ),
      ...canonicalLegacyGuides.map((entry) =>
        Effect.gen(function* () {
          const markdown = yield* filesystem.readFileString(
            filesystemPath.join(websiteDirectory, entry.sourcePath),
          );
          return {
            slug: entry.slug,
            ...readMarkdownMetadata(markdown, navigationTitles.get(entry.slug) || entry.title),
          };
        }),
      ),
    ],
    { concurrency: "unbounded" },
  );
  const seenSlugs = new Set();
  for (const guide of guideMetadata) {
    assertSlug(guide.slug);
    if (seenSlugs.has(guide.slug)) throw new Error(`Duplicate documentation slug: ${guide.slug}`);
    seenSlugs.add(guide.slug);
  }
  const useCases = JSON.parse(
    yield* filesystem.readFileString(
      filesystemPath.join(websiteDirectory, "content/use-cases.json"),
    ),
  );
  const routes = [
    {
      pathname: "/",
      title: "Your notes. Everyone’s knowledge. | Markdown Confluence",
      description:
        "Write in Markdown. Publish to Confluence Cloud. Open source tools for Obsidian, the command line, Docker, GitHub Actions, and Node.js.",
    },
    {
      pathname: "/docs",
      title: "Documentation",
      description:
        "Find your Markdown Confluence workflow. Guides for publishing, authentication, Obsidian, export, diagrams, and the Node.js library.",
    },
    {
      pathname: "/design",
      title: "Visual directions",
      description:
        "Compare ten generated website concepts and the editorial design synthesis for Markdown Confluence.",
      noindex: true,
    },
    {
      pathname: "/use-cases",
      title: "Find your use case",
      description:
        "Explore workflows for engineering documentation, Obsidian knowledge sharing, research, team handbooks, release updates and Confluence export.",
    },
    {
      pathname: "/design/workshop",
      title: "Your notes. Everyone’s knowledge. | Markdown Confluence",
      description: "The adopted publishing workshop design for Markdown Confluence.",
      noindex: true,
    },
    ...useCases.map((story) => ({
      pathname: `/use-cases/${story.slug}`,
      title: story.title,
      description: story.description,
    })),
    ...guideMetadata.map((guide) => ({ ...guide, pathname: `/docs/${guide.slug}` })),
  ];
  yield* Effect.all(
    routes.map((route) =>
      Effect.gen(function* () {
        const routeDirectory = filesystemPath.join(outputDirectory, route.pathname.slice(1));
        yield* filesystem.makeDirectory(routeDirectory, { recursive: true });
        yield* filesystem.writeFileString(
          filesystemPath.join(routeDirectory, "index.html"),
          renderRouteHtml(template, route),
        );
      }),
    ),
    { concurrency: "unbounded" },
  );
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .filter((route) => !route.noindex)
    .map((route) => `  <url><loc>${escapeHtml(`${canonicalOrigin}${route.pathname}`)}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
  yield* Effect.all(
    [
      filesystem.writeFileString(
        filesystemPath.join(outputDirectory, "spa-fallback.html"),
        renderRouteHtml(template, { ...routes[0], noindex: true }),
      ),
      filesystem.writeFileString(filesystemPath.join(outputDirectory, "sitemap.xml"), sitemap),
      filesystem.writeFileString(
        filesystemPath.join(outputDirectory, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${canonicalOrigin}/sitemap.xml\n`,
      ),
    ],
    { concurrency: "unbounded" },
  );
  console.info(`Generated metadata for ${routes.length} SPA routes, sitemap.xml, and robots.txt.`);
});

await Effect.runPromise(
  buildRouteFiles.pipe(Effect.provide(Layer.mergeAll(NodeFileSystem.layer, NodePath.layer))),
);
