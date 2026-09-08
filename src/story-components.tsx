import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  FileText,
  FlaskConical,
  GitBranch,
  Download,
  Check,
} from "lucide-react";
import stories from "../content/use-cases.json";
import { CopyButton } from "./shell";
export const useCases = stories;
export const storyIcons = {
  code: Code2,
  notes: FileText,
  math: FlaskConical,
  book: BookOpen,
  release: GitBranch,
  export: Download,
};
export function UseCaseCards({ limit }: { limit?: number }) {
  return (
    <div className="story-card-grid">
      {stories.slice(0, limit).map((story, index) => {
        const Icon = storyIcons[story.icon as keyof typeof storyIcons];
        return (
          <Link
            key={story.slug}
            to="/use-cases/$slug"
            params={{ slug: story.slug }}
            className={`story-card tone-${story.color}`}
          >
            <div className="story-card-top">
              <span className="story-number">0{index + 1}</span>
              <Icon size={27} />
            </div>
            <p className="eyebrow">{story.audience}</p>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <span className="story-card-action">
              Explore the workflow <ArrowUpRight size={20} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
export function StoryExample({ story }: { story: (typeof stories)[number] }) {
  return (
    <div className="story-example">
      <div className="story-source">
        <div className="story-windowbar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>{story.artifact}</span>
          <CopyButton text={story.example} />
        </div>
        <pre>
          <code>{story.example}</code>
        </pre>
      </div>
      <div className="story-result">
        <p className="eyebrow">
          {story.icon === "export" ? "LOCAL OUTPUT" : "SHARED IN CONFLUENCE"}{" "}
          <ArrowUpRight size={16} />
        </p>
        <h3>{story.outputTitle}</h3>
        <IllustrativeContent kind={story.icon} />
        {story.outputLabels.map((label) => (
          <div className="result-line" key={label}>
            <Check size={17} />
            <span>{label}</span>
          </div>
        ))}
        <div className="result-rule" />
        <p className="example-note">
          Illustrative output ·{" "}
          {story.icon === "export"
            ? "See the export guide for preservation limits."
            : "Your Markdown remains the source."}
        </p>
      </div>
    </div>
  );
}

function IllustrativeContent({ kind }: { kind: string }) {
  if (kind === "code")
    return (
      <div className="illustrative-content">
        <strong>Decision</strong>
        <p>Process jobs asynchronously.</p>
        <div className="mini-flow" aria-label="API to Queue to Worker">
          <span>API</span>
          <span aria-hidden="true">→</span>
          <span>Queue</span>
          <span aria-hidden="true">→</span>
          <span>Worker</span>
        </div>
        <strong>Trade-off</strong>
        <p>Retries must be idempotent.</p>
      </div>
    );
  if (kind === "math")
    return (
      <div className="illustrative-content">
        <p>
          Energy is{" "}
          <span className="inline-equation">
            E = mc<sup>2</sup>
          </span>
          .
        </p>
        <div
          className="display-equation"
          aria-label="sigma equals the square root of one over N times the sum of x i minus mu squared"
        >
          σ = √(⅟N ∑ᵢ(xᵢ − μ)²)
        </div>
        <strong>References</strong>
        <p className="illustrative-link">Measurement study ↗</p>
      </div>
    );
  if (kind === "release")
    return (
      <div className="illustrative-content">
        <p className="sample-date">8 September 2026 · Blog post</p>
        <strong>Shipped</strong>
        <ul>
          <li>Inline and display equations</li>
          <li>Confluence page export</li>
        </ul>
        <span className="sample-label">release-notes</span>
      </div>
    );
  if (kind === "notes")
    return (
      <div className="illustrative-content">
        <p className="illustrative-link">Architecture decision ↗</p>
        <div className="sample-panel">
          <strong>Start here</strong>
          <p>Read the decision before the details.</p>
        </div>
      </div>
    );
  if (kind === "book")
    return (
      <div className="illustrative-content">
        <div className="sample-panel">
          <strong>Need a hand?</strong>
          <p>Ask the platform team.</p>
        </div>
        <strong>First week</strong>
        <p>□ Read the service runbook</p>
      </div>
    );
  return (
    <div className="illustrative-content">
      <div className="export-file">
        <FileText size={35} />
        <span>
          Markdown / ADF<strong>A local copy for your next step</strong>
        </span>
      </div>
    </div>
  );
}
