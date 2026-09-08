import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
export function NotFoundPage() {
  return (
    <main id="main-content" className="page-message">
      <span className="eyebrow">404 / A LITTLE OFF THE PAGE</span>
      <h1>Let’s find your way back.</h1>
      <p>This page isn’t here. Explore the documentation or head back home.</p>
      <div>
        <Link to="/docs" className="button primary">
          Find a guide <ArrowRight size={18} />
        </Link>
        <Link to="/" className="button secondary">
          Back home
        </Link>
      </div>
    </main>
  );
}
