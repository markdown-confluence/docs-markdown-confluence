import { describe, expect, it } from "@effect/vitest";
import {
  guides,
  documentationSections,
  getNextGuides,
  getGuideHeadings,
  normalizeDocHref,
  resolveLegacyPath,
} from "./content";
import useCases from "../content/use-cases.json";
import deploymentConfiguration from "../vercel.json";

describe("documentation migration", () => {
  it("keeps each published guide addressable with real content", () => {
    expect(new Set(guides.map((guide) => guide.slug)).size).toBe(guides.length);
    for (const guide of guides) {
      expect(guide.markdown, guide.slug).toMatch(/^# .+/m);
      expect(guide.markdown, guide.slug).not.toContain("Guide in preparation");
      expect(guide.markdown, guide.slug).not.toContain("Guide unavailable");
    }
  });
  it("resolves every legacy redirect to a canonical guide", () => {
    for (const redirect of deploymentConfiguration.redirects) {
      const slug = redirect.destination.replace(/^\/docs\//, "");
      expect(
        guides.some((guide) => guide.slug === slug),
        redirect.source,
      ).toBe(true);
      expect(resolveLegacyPath(redirect.source), redirect.source).toBe(slug);
    }
  });
  it("keeps Markdown-relative links and their section fragments usable", () => {
    expect(normalizeDocHref("./export.md#export-a-page", "cli")).toBe("/docs/export#export-a-page");
    expect(normalizeDocHref("../features/callouts.md", "usage/docker")).toBe(
      "/docs/features/callouts",
    );
    expect(normalizeDocHref("/docs/usage/cli", "getting-started")).toBe("/docs/cli");
    expect(
      normalizeDocHref("https://github.com/markdown-confluence/markdown-confluence", "cli"),
    ).toBe("https://github.com/markdown-confluence/markdown-confluence");
    expect(normalizeDocHref("#authentication", "cli")).toBe("#authentication");
    expect(normalizeDocHref("/use-cases/release-updates", "blog-posts")).toBe(
      "/use-cases/release-updates",
    );
    expect(normalizeDocHref("/docs", "blog-posts")).toBe("/docs");
  });
  it("does not surface superseded API guides in search or navigation", () => {
    for (const slug of ["usage/cli", "features/mermaid", "usage/npm-library/md-to-adf"]) {
      expect(guides.some((guide) => guide.slug === slug)).toBe(false);
    }
  });
});

describe("task-based documentation navigation", () => {
  it("gives each canonical guide one home in the navigation", () => {
    const slugs = documentationSections.flatMap((section) =>
      section.guides.map((guide) => guide.slug),
    );
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toEqual(guides.map((guide) => guide.slug));
    expect(documentationSections[0].guides[0].slug).toBe("getting-started");
  });
  it("recommends real next steps instead of moving through unrelated tools", () => {
    for (const guide of guides) {
      const nextGuides = getNextGuides(guide);
      expect(nextGuides.length, guide.slug).toBe(guide.nextSteps.length);
      expect(
        nextGuides.some((candidate) => candidate.slug === guide.slug),
        guide.slug,
      ).toBe(false);
    }
    expect(
      getNextGuides(guides.find((guide) => guide.slug === "obsidian")!).map((guide) => guide.slug),
    ).toEqual(["publishing", "dataview"]);
  });
  it("does not create table-of-contents entries for Markdown code examples", () => {
    const markdown =
      "# Guide\n## Set up\n\n```markdown\n## Example heading\n```\n\n## Publish\n## Sources\n";
    expect(getGuideHeadings(markdown)).toEqual([
      { label: "Set up", id: "set-up" },
      { label: "Publish", id: "publish" },
    ]);
  });
});

describe("use-case journeys", () => {
  it("routes every story to existing setup and related guides", () => {
    expect(new Set(useCases.map((story) => story.slug)).size).toBe(useCases.length);
    const guideSlugs = new Set(guides.map((guide) => guide.slug));
    for (const story of useCases) {
      for (const slug of [story.guide, ...story.related])
        expect(guideSlugs.has(slug), `${story.slug} -> ${slug}`).toBe(true);
      expect(story.steps.length, story.slug).toBeGreaterThan(0);
      expect(story.limit.length, story.slug).toBeGreaterThan(0);
    }
  });
});
