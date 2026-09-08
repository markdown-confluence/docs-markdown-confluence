import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  GitBranch,
  FileText,
  Puzzle,
  Terminal,
  Layers3,
  Code2,
  Sigma,
  Network,
  BookOpen,
  Download,
} from "lucide-react";
import { WorkshopHero } from "./workshop-hero";
import { StoryExample, UseCaseCards, useCases } from "./story-components";
const tools = [
  { name: "Obsidian", icon: Puzzle, slug: "obsidian" },
  { name: "CLI", icon: Terminal, slug: "cli" },
  { name: "GitHub Actions", icon: GitBranch, slug: "usage/github-actions" },
  { name: "Docker", icon: Layers3, slug: "usage/docker" },
  { name: "Node.js", icon: Code2, slug: "library" },
];
const capabilities = [
  {
    icon: Check,
    title: "Check before you publish",
    text: "Validate offline, plan destinations without writes, and collect JSON publishing reports.",
    slug: "preflight",
  },
  {
    icon: FileText,
    title: "Keep editing with your source",
    text: "Opt into page edit locks for the publishing account. Preserve existing viewing restrictions.",
    slug: "page-edit-locks",
  },
  {
    icon: Layers3,
    title: "Structure without copy-paste",
    text: "Footnotes, excerpts, page properties, YAML tables and Jira links, authored in Markdown.",
    slug: "structured-content",
  },
  {
    icon: Network,
    title: "Diagrams that travel",
    text: "Keep Mermaid, PlantUML and Kroki source editable. Publish diagrams with the explanation.",
    slug: "diagrams",
  },
  {
    icon: Sigma,
    title: "Equations, included",
    text: "Inline and display LaTeX, rendered locally with bundled MathJax. No equation service to configure.",
    slug: "latex",
  },
  {
    icon: Layers3,
    title: "Knowledge you can reuse",
    text: "Bring selected headings, blocks and whole notes into a page. Keep shared sections in one source.",
    slug: "publishing",
  },
  {
    icon: FileText,
    title: "Queries become context",
    text: "Publish supported Obsidian Dataview results as tables, lists and tasks your team can read.",
    slug: "dataview",
  },
  {
    icon: BookOpen,
    title: "Pages with a place",
    text: "Turn folders into a page tree, add labels and publish dated updates as Confluence blog posts.",
    slug: "blog-posts",
  },
  {
    icon: Download,
    title: "A way back to local tools",
    text: "Export a Confluence page as Markdown or ADF. Choose readable text or lossless preservation.",
    slug: "export-confluence",
  },
];
export function HomePage() {
  const [selected, setSelected] = useState(0);
  const samples = [useCases[0]!, useCases[2]!, useCases[4]!];
  useEffect(() => {
    document.title = "Your notes. Everyone’s knowledge. | Markdown Confluence";
  }, []);
  return (
    <main id="main-content" className="story-site">
      <WorkshopHero />
      <div className="story-tools story-width" id="workflows">
        <span>
          KEEP YOUR
          <br />
          <strong>favorite tools.</strong>
        </span>
        {tools.map(({ name, icon: Icon, slug }) => (
          <Link to="/docs/$" params={{ _splat: slug }} key={slug}>
            <Icon size={22} />
            {name}
            <ArrowUpRight size={13} />
          </Link>
        ))}
      </div>
      <section className="story-problem story-width">
        <p className="eyebrow">THE GAP BETWEEN WRITING AND SHARING</p>
        <div>
          <h2>
            Great thinking shouldn’t
            <br />
            get stuck <em>in a file.</em>
          </h2>
          <p>
            Your team reads Confluence. You write in Markdown. Markdown Confluence connects the two,
            so sharing useful knowledge can be part of the work—not another round of copying and
            formatting.
          </p>
        </div>
      </section>
      <section className="story-demo story-width" id="how-it-works">
        <div className="story-section-heading">
          <div>
            <p className="eyebrow">SAME SOURCE. A WIDER AUDIENCE.</p>
            <h2>
              Keep the detail.
              <br />
              <em>Lose the copy-paste.</em>
            </h2>
          </div>
          <p>
            Write your source, choose what to publish, and give readers a structured page in
            Confluence.
          </p>
        </div>
        <div className="story-demo-tabs" role="tablist" aria-label="Example workflows">
          {samples.map((sample, index) => (
            <button
              key={sample.slug}
              id={`story-tab-${index}`}
              role="tab"
              aria-selected={selected === index}
              aria-controls="story-demo-panel"
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const next =
                    (selected + (event.key === "ArrowRight" ? 1 : -1) + samples.length) %
                    samples.length;
                  setSelected(next);
                  document.getElementById(`story-tab-${next}`)?.focus();
                }
              }}
            >
              {["Engineering docs", "Research & equations", "Release updates"][index]}
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        <div role="tabpanel" id="story-demo-panel" aria-labelledby={`story-tab-${selected}`}>
          <StoryExample story={samples[selected]!} />
        </div>
        <div className="story-demo-caption">
          <span>
            <Check size={15} /> Source stays editable
          </span>
          <span>
            <Check size={15} /> Published pages keep their IDs
          </span>
          <Link to="/use-cases/$slug" params={{ slug: samples[selected]!.slug }}>
            See this workflow <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="story-value-band">
        <div className="story-width">
          <p className="eyebrow">WRITE → PUBLISH → KEEP IMPROVING</p>
          <h2>
            A publishing habit.
            <br />
            <em>More room for your next idea.</em>
          </h2>
          <div className="story-value-columns">
            <article>
              <span>01 / OWN THE SOURCE</span>
              <h3>Your Markdown is still yours.</h3>
              <p>
                Keep your files in a vault or repository. Publishing adds page IDs to source
                frontmatter so later runs know where the content belongs.
              </p>
            </article>
            <article>
              <span>02 / MAKE IT REPEATABLE</span>
              <h3>Update the page you already shared.</h3>
              <p>
                Republish changes through the plugin, CLI or your pipeline. Unchanged content avoids
                unnecessary page versions and attachment uploads.
              </p>
            </article>
            <article>
              <span>03 / RESPECT THE CONVERSATION</span>
              <h3>Know when edits need attention.</h3>
              <p>
                Default overwrite protection detects pages last edited by another user. Inline
                comments can survive changes elsewhere in the page.
              </p>
            </article>
          </div>
          <Link
            to="/docs/$"
            params={{ _splat: "publishing-lifecycle" }}
            className="story-text-link"
          >
            Understand what happens on publish <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="story-width story-use-cases" id="use-cases">
        <div className="story-section-heading">
          <div>
            <p className="eyebrow">BUILT AROUND THE WAY YOU WORK</p>
            <h2>
              What could you
              <br />
              <em>share next?</em>
            </h2>
          </div>
          <p>
            A decision your team needs. Research worth reading. A handbook that is easier to
            maintain. Start with your use case.
          </p>
        </div>
        <UseCaseCards />
      </section>
      <section className="story-features story-width" id="features">
        <div className="story-section-heading">
          <div>
            <p className="eyebrow">MORE THAN PARAGRAPHS</p>
            <h2>
              The context
              <br />
              <em>comes with you.</em>
            </h2>
          </div>
          <Link
            to="/docs/$"
            params={{ _splat: "features/supported-markdown" }}
            className="story-text-link"
          >
            Explore Markdown support <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="story-feature-grid">
          {capabilities.map(({ icon: Icon, title, text, slug }) => (
            <Link to="/docs/$" params={{ _splat: slug }} key={slug}>
              <Icon size={27} />
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="story-faq story-width">
        <div>
          <p className="eyebrow">A FEW THINGS WORTH KNOWING</p>
          <h2>
            A good fit
            <br />
            <em>for your team?</em>
          </h2>
          <p>Clear expectations make a better workflow.</p>
        </div>
        <div className="story-faq-list">
          {[
            [
              "Do my teammates need Obsidian or Markdown tools?",
              "No. They read the published content in Confluence using their existing access. You can keep writing in Obsidian, a text editor, or a repository.",
            ],
            [
              "Is this automatic two-way synchronization?",
              "Publishing sends your selected Markdown to Confluence. Export separately reads a page into Markdown or ADF. Confluence edits are not automatically merged back into your source files.",
            ],
            [
              "What do I need to get started?",
              "A Confluence Cloud site, permission to publish under an existing parent page, and a supported authentication method. Choose the desktop Obsidian plugin, CLI, Docker or GitHub Actions. Local file conversion works without Confluence credentials.",
            ],
            [
              "Where does rendering happen?",
              "Mermaid and LaTeX render locally in the publishing environment before images are uploaded to Confluence. Optional PlantUML and Kroki send diagram source to the servers you configure.",
            ],
            [
              "Is it open source?",
              "Yes. The project is Apache-2.0 licensed. You run the publishing tools and connect them to your Confluence site. Your existing Confluence subscription and any infrastructure you choose are separate.",
            ],
            [
              "Does every Obsidian feature publish?",
              "The supported Markdown, wikilinks, embeds and selected integrations do. Dataview result publication is opt-in and supports TABLE, LIST and TASK queries. Arbitrary plugin interfaces and interactive JavaScript views are not reproduced.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="story-final">
        <div className="story-width">
          <p className="eyebrow">YOUR NEXT USEFUL PAGE STARTS HERE</p>
          <h2>
            You’ve already
            <br />
            done the thinking.
            <br />
            <em>Let it travel.</em>
          </h2>
          <div className="story-actions">
            <Link className="button primary" to="/docs">
              Publish your first page <ArrowRight size={19} />
            </Link>
            <Link className="story-text-link" to="/use-cases">
              Find your use case <ArrowDown size={17} />
            </Link>
          </div>
        </div>
        <div className="story-final-mark" aria-hidden="true">
          ↗
        </div>
      </section>
    </main>
  );
}
