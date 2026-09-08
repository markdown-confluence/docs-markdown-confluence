import { useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import stories from "../content/use-cases.json";
import { StoryExample, UseCaseCards } from "./story-components";
import { NotFoundPage } from "./not-found";
export function UseCasesIndex() {
  useEffect(() => {
    document.title = "Find your use case | Markdown Confluence";
  }, []);
  return (
    <main id="main-content" className="story-site">
      <section className="story-index-intro story-width">
        <p className="eyebrow">YOUR WORK, BETTER CONNECTED</p>
        <h1>
          Good knowledge.
          <br />
          <em>More places to go.</em>
        </h1>
        <p className="story-lead">
          You already have a way of working. Find the bridge between the tools you write in and the
          people who need what you know.
        </p>
      </section>
      <section className="story-width story-index-grid">
        <UseCaseCards />
      </section>
      <section className="story-width story-bottom-callout">
        <h2>Know your tool already?</h2>
        <p>Go straight to a publishing walkthrough.</p>
        <Link className="button primary" to="/docs">
          Choose your setup <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
export function UseCasePage() {
  const { slug } = useParams({ from: "/use-cases/$slug" });
  const story = stories.find((item) => item.slug === slug);
  useEffect(() => {
    document.title = story
      ? `${story.title} | Markdown Confluence`
      : "Use case not found | Markdown Confluence";
  }, [story]);
  if (!story) return <NotFoundPage />;
  return (
    <main id="main-content" className={`story-site use-case-story tone-${story.color}`}>
      <section className="story-width use-case-hero">
        <Link to="/use-cases" className="story-back">
          Use cases <ChevronRight size={14} /> {story.title}
        </Link>
        <p className="eyebrow">{story.audience}</p>
        <h1>{story.headline}</h1>
        <p className="story-lead">{story.description}</p>
        <Link className="button primary" to="/docs/$" params={{ _splat: story.guide }}>
          {story.guideLabel}
          <ArrowRight size={18} />
        </Link>
      </section>
      <section className="story-width">
        <StoryExample story={story} />
      </section>
      <section className="story-width story-context">
        <div>
          <p className="eyebrow">THE FRICTION</p>
          <h2>Sound familiar?</h2>
          <p>{story.pain}</p>
        </div>
        <div>
          <p className="eyebrow">THE BETTER WORKFLOW</p>
          <h2>Keep the good part.</h2>
          <p>{story.payoff}</p>
        </div>
      </section>
      <section className="story-process">
        <div className="story-width">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>
            From your source
            <br />
            to the next useful thing.
          </h2>
          <ol className="story-steps">
            {story.steps.map(([title, description], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="story-width story-benefits">
        <p className="eyebrow">WHY IT HELPS</p>
        <div className="story-benefit-grid">
          {story.benefits.map(([title, description]) => (
            <article key={title}>
              <Check size={21} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <aside className="story-limit">
          <strong>Know before you start</strong>
          <p>{story.limit}</p>
        </aside>
      </section>
      <section className="story-width story-next">
        <div>
          <p className="eyebrow">MAKE IT YOUR WORKFLOW</p>
          <h2>
            Start with one
            <br />
            <em>useful page.</em>
          </h2>
          <Link className="button primary" to="/docs/$" params={{ _splat: story.guide }}>
            {story.guideLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="story-related">
          <h3>Go a little deeper</h3>
          {story.related.map((related) => (
            <Link to="/docs/$" params={{ _splat: related }} key={related}>
              {guideLabel(related)}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <Link to="/use-cases">
            Explore other use cases
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
const guideNames: Record<string, string> = {
  preflight: "Validate, plan and report",
  "page-edit-locks": "Restrict page editing",
  "structured-content": "Footnotes, macros and tables",
  kroki: "Kroki diagrams",
  cli: "Publish from the CLI",
  "features/folder-structure": "Build a page hierarchy",
  diagrams: "Mermaid & PlantUML",
  publishing: "Select and reuse content",
  "features/wikilinks": "Link and embed notes",
  dataview: "Publish Dataview results",
  "features/folder-note": "Add folder overview pages",
  "features/callouts": "Callouts and expand blocks",
  "features/yaml-frontmatter": "Page properties and labels",
  "usage/github-actions": "Automate with GitHub Actions",
  "features/image-upload": "Images and attachments",
  export: "Conversion and export modes",
  library: "Use the Node.js library",
  "features/raw-adf": "Preserve rich ADF content",
};
function guideLabel(slug: string) {
  return guideNames[slug] ?? slug;
}
