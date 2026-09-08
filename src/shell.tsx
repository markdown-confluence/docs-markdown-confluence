import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  GitFork,
  Menu,
  Search,
  X,
  FileText,
} from "lucide-react";
import { guides } from "./content";

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Markdown Confluence home">
      <span className="brand-mark">
        m<span>↗</span>
      </span>
      <span>
        markdown<span className="brand-bottom">confluence</span>
      </span>
    </Link>
  );
}
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            <Link to="/docs" activeProps={{ className: "active" }}>
              Documentation
            </Link>
            <Link to="/use-cases" activeProps={{ className: "active" }}>
              Use cases
            </Link>
            <Link to="/docs/$" params={{ _splat: "release-notes" }}>
              What’s new <span className="tiny-badge">v7</span>
            </Link>
            <a
              href="https://github.com/markdown-confluence/markdown-confluence"
              className="github-link"
            >
              <GitFork size={18} /> GitHub <ArrowUpRight size={14} />
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="search-trigger"
              aria-label="Search documentation"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={17} />
              <span>Search docs</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className="menu-toggle icon-button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (open) {
      setQuery("");
      dialogRef.current?.showModal();
    } else dialogRef.current?.close();
  }, [open]);
  const searchWords = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = guides
    .filter((guide) =>
      searchWords.every((word) =>
        `${guide.title} ${guide.summary} ${guide.markdown}`.toLowerCase().includes(word),
      ),
    )
    .sort(
      (left, right) =>
        Number(right.title.toLowerCase().includes(query.toLowerCase())) -
        Number(left.title.toLowerCase().includes(query.toLowerCase())),
    )
    .slice(0, 12);
  return (
    <dialog
      ref={dialogRef}
      className="search-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby="search-heading"
    >
      <div className="search-dialog-top">
        <Search size={22} />
        <label id="search-heading" className="sr-only" htmlFor="docs-search">
          Search documentation
        </label>
        <input
          id="docs-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search guides, features, and commands…"
          autoComplete="off"
        />
        <button className="icon-button" onClick={onClose} aria-label="Close search">
          <X size={20} />
        </button>
      </div>
      <div className="search-results">
        <p className="eyebrow" aria-live="polite">
          {query ? `${matches.length} matching guides` : "Start exploring"}
        </p>
        {matches.map((guide) => (
          <Link
            key={guide.slug}
            to="/docs/$"
            params={{ _splat: guide.slug }}
            onClick={onClose}
            className="search-result"
          >
            <FileText size={19} />
            <span>
              <strong>{guide.title}</strong>
              <small>
                {guide.category} · {guide.summary}
              </small>
            </span>
            <ArrowUpRight size={17} />
          </Link>
        ))}
        {matches.length === 0 && (
          <p className="search-empty">No guides found. Try “OAuth”, “export”, or “diagrams”.</p>
        )}
      </div>
      <div className="search-dialog-footer">
        Searches all documentation{" "}
        <span>
          <kbd>esc</kbd> to close
        </span>
      </div>
    </dialog>
  );
}
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timeout);
  }, [status]);
  return (
    <button
      className="copy-button"
      aria-label={`${label} code`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setStatus("copied");
        } catch {
          setStatus("failed");
        }
      }}
    >
      {status === "copied" ? <Check size={15} /> : <Copy size={15} />}
      <span aria-live="polite">
        {status === "copied" ? "Copied" : status === "failed" ? "Select to copy" : label}
      </span>
    </button>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Brand />
          <p>Your docs. Your tools. Connected.</p>
        </div>
        <div className="footer-links">
          <Link to="/use-cases">
            Use cases <ArrowRight size={14} />
          </Link>
          <Link to="/docs">
            Documentation <ArrowRight size={14} />
          </Link>
          <a href="https://github.com/markdown-confluence/markdown-confluence/issues">
            Issues & ideas <ArrowUpRight size={14} />
          </a>
          <a href="https://github.com/markdown-confluence/markdown-confluence">
            Contribute on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Open source · Apache-2.0</span>
        <span>Built for Confluence Cloud. An independent community project.</span>
      </div>
    </footer>
  );
}
