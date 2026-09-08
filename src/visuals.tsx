import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import directions from "../content/visual-directions.json";
const descriptions: Record<string, { name: string; take: string }> = {
  editorial: {
    name: "Editorial bridge",
    take: "An earlier direction exploring serif headlines, warm paper and an architectural metaphor for shared knowledge.",
  },
  blueprint: {
    name: "Technical blueprint",
    take: "Borrowed precise labels and clear source-to-destination structure for the workflow examples.",
  },
  swiss: {
    name: "Swiss clarity",
    take: "Borrowed disciplined alignment and strong hierarchy; kept the palette warmer in the final site.",
  },
  botanical: {
    name: "Knowledge garden",
    take: "Borrowed soft sage surfaces to balance technical sections and make the stories more approachable.",
  },
  cinematic: {
    name: "Cinematic product",
    take: "Explored dark contrast. The final site uses one restrained dark section for the publishing story.",
  },
  playful: {
    name: "Tactile optimism",
    take: "Borrowed friendly pastel accents for use-case cards without making the whole experience toy-like.",
  },
  atlas: {
    name: "Knowledge atlas",
    take: "Explored a journey through connected information. The final pages use a simpler numbered workflow.",
  },
  gallery: {
    name: "Quiet gallery",
    take: "Borrowed generous space and a single hero sculpture rather than competing illustrations.",
  },
  collage: {
    name: "Human notebook",
    take: "Explored source notes and shared output side by side. The final examples use selectable, copyable text.",
  },
  industrial: {
    name: "Publishing workshop",
    take: "Selected site direction: bold condensed type, orange actions, graphite surfaces and tactile document trays.",
  },
};
export function VisualsPage() {
  const [selected, setSelected] = useState("editorial");
  useEffect(() => {
    document.title = "Ten visual directions | Markdown Confluence";
  }, []);
  return (
    <main id="main-content" className="story-site">
      <section className="story-width design-intro">
        <p className="eyebrow">IMAGEGEN / ART DIRECTION EXPLORATION</p>
        <h1>
          Ten directions.
          <br />
          <em>One clearer story.</em>
        </h1>
        <p className="story-lead">
          An exploration of how local writing becomes shared knowledge. The final site uses the
          publishing workshop direction: orange and graphite, condensed type, and tactile document
          trays.
        </p>
        <p>
          <Link className="button primary" to="/">
            See the adopted workshop design <ArrowUpRight size={17} />
          </Link>
        </p>
        <p className="design-disclaimer">
          These are visual concepts, not product screenshots or feature specifications. The live
          site uses reviewed copy and working interface components.
        </p>
      </section>
      <section className="story-width design-gallery">
        <div className="design-selector" aria-label="Choose a visual direction">
          {directions.map((direction, index) => (
            <button
              key={direction.id}
              aria-pressed={selected === direction.id}
              onClick={() => setSelected(direction.id)}
            >
              {String(index + 1).padStart(2, "0")} {descriptions[direction.id]!.name}
              {selected === direction.id && <Check size={13} />}
            </button>
          ))}
        </div>
        <figure className="design-selected">
          <img
            src={`/visuals/directions/${selected}.webp`}
            alt={`${descriptions[selected]!.name} website design concept`}
            width="1536"
            height="1024"
          />
          <figcaption>
            <div>
              <h2>{descriptions[selected]!.name}</h2>
              <p>{descriptions[selected]!.take}</p>
            </div>
            <a href={`/visuals/directions/${selected}.png`}>
              View original <ArrowUpRight size={17} />
            </a>
          </figcaption>
        </figure>
        <div className="design-all">
          {directions.map((direction, index) => (
            <article key={direction.id}>
              <a href={`/visuals/directions/${direction.id}.png`}>
                <img
                  src={`/visuals/directions/${direction.id}.webp`}
                  width="1536"
                  height="1024"
                  loading="lazy"
                  alt={`${descriptions[direction.id]!.name} website concept`}
                />
              </a>
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} / {descriptions[direction.id]!.name}
              </p>
              <p>{descriptions[direction.id]!.take}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
