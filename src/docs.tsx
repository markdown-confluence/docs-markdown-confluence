import { NotFoundPage } from "./not-found";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "@tanstack/react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Check,
  Terminal,
  Puzzle,
  GitBranch,
  Layers3,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  GitFork,
} from "lucide-react";
import {
  guides,
  documentationSections,
  getNextGuides,
  getGuideHeadings,
  headingId,
  normalizeDocHref,
} from "./content";
import { CopyButton } from "./shell";

function textContent(children: ReactNode): string {
  if (Array.isArray(children)) return children.map(textContent).join("");
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (children && typeof children === "object" && "props" in children)
    return textContent((children.props as { children?: ReactNode }).children);
  return "";
}
function DocumentationSidebar({ slug, open }: { slug?: string; open: boolean }) {
  const currentSection = guides.find((guide) => guide.slug === slug)?.sectionId;
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "start",
    "publish",
    ...(currentSection ? [currentSection] : []),
  ]);
  useEffect(() => {
    if (currentSection)
      setExpandedSections((sections) =>
        sections.includes(currentSection) ? sections : [...sections, currentSection],
      );
  }, [currentSection, slug]);
  return (
    <aside className={`docs-sidebar ${open ? "sidebar-open" : ""}`}>
      <Link className="docs-home-link" to="/docs">
        <BookOpen size={18} /> Documentation <span className="tiny-badge">v7</span>
      </Link>
      <nav aria-label="Documentation">
        {documentationSections.map((section) => (
          <details
            className="sidebar-group"
            key={section.id}
            open={expandedSections.includes(section.id)}
            onToggle={(event) => {
              const expanded = event.currentTarget.open;
              setExpandedSections((sections) =>
                expanded
                  ? sections.includes(section.id)
                    ? sections
                    : [...sections, section.id]
                  : sections.filter((identifier) => identifier !== section.id),
              );
            }}
          >
            <summary>
              {section.title}
              <ChevronDown size={14} />
            </summary>
            {section.guides.map((guide) => (
              <Link
                className={slug === guide.slug ? "selected" : ""}
                aria-current={slug === guide.slug ? "page" : undefined}
                key={guide.slug}
                to="/docs/$"
                params={{ _splat: guide.slug }}
              >
                {guide.title}
              </Link>
            ))}
          </details>
        ))}
      </nav>
      <Link className="sidebar-support" to="/docs/$" params={{ _splat: "troubleshooting" }}>
        Need help? <ArrowRight size={15} />
      </Link>
      <a
        className="sidebar-github"
        href="https://github.com/markdown-confluence/markdown-confluence"
      >
        <GitFork size={17} /> View source <ArrowUpRight size={15} />
      </a>
    </aside>
  );
}
export function DocsPage({ slug }: { slug: string }) {
  const guide = guides.find((entry) => entry.slug === slug);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    setSidebarOpen(false);
    document.title = `${guide?.title || "Page not found"} — Markdown Confluence`;
    if (window.location.hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(decodeURIComponent(window.location.hash.slice(1)))
          ?.scrollIntoView(),
      );
    }
  }, [guide]);
  if (!guide) return <NotFoundPage />;
  const headings = getGuideHeadings(guide.markdown);
  const nextGuides = getNextGuides(guide);
  return (
    <div className="docs-shell">
      <button
        className="mobile-docs-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-expanded={sidebarOpen}
      >
        <BookOpen size={18} /> {guide.title} <ChevronDown size={18} />
      </button>
      <DocumentationSidebar slug={slug} open={sidebarOpen} />
      <main id="main-content" className="docs-main">
        <div className="docs-breadcrumb">
          <Link to="/docs">Documentation</Link>
          <span>/</span>
          <Link to="/docs" hash={guide.sectionId}>
            {guide.category}
          </Link>
        </div>

        <article className="prose">
          <Markdown
            skipHtml
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 id={headingId(textContent(children))}>
                  {children}
                  <a
                    className="heading-anchor"
                    href={`#${headingId(textContent(children))}`}
                    aria-label={`Link to ${textContent(children)}`}
                  >
                    #
                  </a>
                </h2>
              ),
              h3: ({ children }) => <h3 id={headingId(textContent(children))}>{children}</h3>,
              a: ({ href = "", children }) => {
                const normalized = normalizeDocHref(href, slug);
                if (normalized.startsWith("/docs/")) {
                  const [destinationSlug, destinationHash] = normalized.slice(6).split("#");
                  return (
                    <Link
                      to="/docs/$"
                      params={{ _splat: destinationSlug }}
                      hash={destinationHash || ""}
                    >
                      {children}
                    </Link>
                  );
                }
                if (normalized.startsWith("/use-cases/"))
                  return (
                    <Link
                      to="/use-cases/$slug"
                      params={{ slug: normalized.slice(11).split("#")[0] }}
                      hash={normalized.split("#")[1] || ""}
                    >
                      {children}
                    </Link>
                  );
                if (normalized === "/use-cases") return <Link to="/use-cases">{children}</Link>;
                if (normalized === "/docs") return <Link to="/docs">{children}</Link>;
                return <a href={normalized}>{children}</a>;
              },
              pre: ({ children }) => (
                <div className="docs-code">
                  <CopyButton text={textContent(children).replace(/\n$/, "")} />
                  <pre>{children}</pre>
                </div>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt || "Documentation illustration"} loading="lazy" />
              ),
              table: ({ children }) => (
                <div className="table-scroll">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {guide.markdown}
          </Markdown>
        </article>
        <div className="docs-edit">
          <a
            href={`https://github.com/markdown-confluence/docs-markdown-confluence/edit/main/${guide.sourcePath}`}
          >
            Edit this page on GitHub <ArrowUpRight size={15} />
          </a>
        </div>
        <section className="guide-next-steps" aria-label="Recommended next steps">
          <h2>Where to go next</h2>
          <div className="next-guide-grid">
            {nextGuides.map((nextGuide) => (
              <Link key={nextGuide.slug} to="/docs/$" params={{ _splat: nextGuide.slug }}>
                <span>
                  <strong>{nextGuide.title}</strong>
                  <small>{nextGuide.summary}</small>
                </span>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <aside className="docs-toc">
        <p>ON THIS PAGE</p>
        {headings.map((heading) => (
          <a href={`#${heading.id}`} key={heading.id}>
            {heading.label}
          </a>
        ))}
        <div className="toc-help">
          <span>Something missing?</span>
          <a href="https://github.com/markdown-confluence/markdown-confluence/issues">
            Help improve the docs <ArrowUpRight size={13} />
          </a>
        </div>
      </aside>
    </div>
  );
}
const publishingPaths = [
  {
    slug: "obsidian",
    title: "I write in Obsidian",
    description: "Install the plugin, connect your site, and publish a note.",
    icon: Puzzle,
  },
  {
    slug: "cli",
    title: "I have Markdown files",
    description: "Publish a local folder from your terminal.",
    icon: Terminal,
  },
  {
    slug: "usage/github-actions",
    title: "I publish from GitHub",
    description: "Run publishing automatically from your repository.",
    icon: GitBranch,
  },
  {
    slug: "usage/docker",
    title: "I use containers",
    description: "Run the publisher with your mounted content.",
    icon: Layers3,
  },
];
export function DocsIndex() {
  useEffect(() => {
    document.title = "Documentation — Markdown Confluence";
  }, []);
  return (
    <div className="docs-shell docs-index-shell">
      <DocumentationSidebar open={false} />
      <main id="main-content" className="docs-main docs-index">
        <p className="eyebrow">
          <span className="small-rule" /> MARKDOWN CONFLUENCE V7
        </p>
        <h1>
          What do you
          <br />
          want to do?
        </h1>
        <p className="docs-lead">
          Start with the tools you use. Follow a publishing guide, find a specific answer, or bring
          a page back from Confluence.
        </p>
        <p className="docs-use-case-link">
          <Link to="/use-cases">
            Not sure where to start? Explore use cases <ArrowUpRight size={14} />
          </Link>
        </p>
        <div className="docs-orientation">
          <span>
            <Check size={15} /> Confluence Cloud
          </span>
          <span>
            <Check size={15} /> Markdown stays yours
          </span>
          <Link to="/docs/$" params={{ _splat: "upgrade-to-v7" }}>
            Coming from an earlier version? <ArrowUpRight size={14} />
          </Link>
        </div>
        <section className="docs-paths" aria-labelledby="publishing-paths-heading">
          <div className="docs-section-heading">
            <h2 id="publishing-paths-heading">Publish your first page</h2>
            <Link to="/docs/$" params={{ _splat: "getting-started" }}>
              Read the overview <ArrowRight size={14} />
            </Link>
          </div>
          <div className="publishing-path-grid">
            {publishingPaths.map(({ slug, title, description, icon: Icon }) => (
              <Link key={slug} to="/docs/$" params={{ _splat: slug }}>
                <Icon size={23} />
                <h3>{title}</h3>
                <p>{description}</p>
                <span>
                  Follow the guide <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
          <p className="docs-path-hint">
            Each guide walks through setup and publishing.{" "}
            <Link to="/docs/$" params={{ _splat: "authentication" }}>
              Compare authentication options
            </Link>{" "}
            if your organization requires a specific connection method.
          </p>
        </section>
        <div className="docs-fast-paths">
          <Link to="/docs/$" params={{ _splat: "export-confluence" }}>
            <span className="eyebrow">ALREADY IN CONFLUENCE?</span>
            <h2>Export a page</h2>
            <p>Save a page as Markdown or ADF.</p>
            <ArrowUpRight size={21} />
          </Link>
          <Link to="/docs/$" params={{ _splat: "troubleshooting" }}>
            <span className="eyebrow">SOMETHING NOT WORKING?</span>
            <h2>Find a fix</h2>
            <p>Start with the symptom you see.</p>
            <ArrowUpRight size={21} />
          </Link>
        </div>
        <section className="docs-directory" aria-labelledby="browse-heading">
          <div className="docs-section-heading">
            <h2 id="browse-heading">Browse by task</h2>
            <span>Guides and reference</span>
          </div>
          <div className="docs-directory-grid">
            {documentationSections.map((section) => (
              <section key={section.id} id={section.id} className="docs-topic-group">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <ul>
                  {section.guides.map((guide) => (
                    <li key={guide.slug}>
                      <Link to="/docs/$" params={{ _splat: guide.slug }}>
                        {guide.title}
                        <ArrowUpRight size={13} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function DocumentationRoute() {
  const { _splat } = useParams({ strict: false });
  return _splat ? <DocsPage slug={_splat} /> : <DocsIndex />;
}
