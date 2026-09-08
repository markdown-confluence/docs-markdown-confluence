import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
export function WorkshopHero() {
  return (
    <>
      <section className="workshop-hero">
        <img
          className="workshop-backdrop"
          src="/visuals/publishing-workshop.webp"
          alt="Graphite and orange document trays connected by a publishing arrow, showing local notes becoming shared knowledge"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div className="workshop-hero-copy">
          <p className="eyebrow">MARKDOWN CONFLUENCE / VERSION 7</p>
          <h1>
            Your notes.
            <br />
            Everyone’s knowledge.
          </h1>
          <p>Write in Markdown. Share in Confluence.</p>
          <Link to="/use-cases" className="button primary">
            Find your workflow <ArrowRight size={18} />
          </Link>
        </div>
        <div className="workshop-art-labels" aria-hidden="true">
          <span>
            <b>01</b> Local writing
          </span>
          <span>
            <b>02</b> Publish
          </span>
          <span>
            <b>03</b> Shared knowledge
          </span>
        </div>
        <div className="workshop-proof">
          Open source <span>•</span> Your Markdown stays yours <span>•</span> Built for Confluence
          Cloud
        </div>
      </section>
    </>
  );
}
