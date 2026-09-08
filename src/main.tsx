import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  redirect,
  RouterProvider,
  Outlet,
  useLocation,
  Link,
} from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "./shell";
import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";

import { resolveLegacyPath } from "./content";
import "./styles.css";
import "./workshop-theme.css";

function SiteLayout() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(location.hash))?.scrollIntoView(),
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
const rootRoute = createRootRoute({ component: SiteLayout, notFoundComponent: NotFoundPage });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const docsParentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/docs",
  component: Outlet,
});
const docsIndexRoute = createRoute({
  getParentRoute: () => docsParentRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./docs"), "DocsIndex"),
});
const docsRoute = createRoute({
  getParentRoute: () => docsParentRoute,
  path: "$",
  component: lazyRouteComponent(() => import("./docs"), "DocumentationRoute"),
  beforeLoad: ({ location }) => {
    const target = resolveLegacyPath(location.pathname);
    if (target) throw redirect({ to: "/docs/$", params: { _splat: target }, replace: true });
  },
});
const useCasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/use-cases",
  component: lazyRouteComponent(() => import("./use-cases"), "UseCasesIndex"),
});
const useCaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/use-cases/$slug",
  component: lazyRouteComponent(() => import("./use-cases"), "UseCasePage"),
});
const visualsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/design",
  component: lazyRouteComponent(() => import("./visuals"), "VisualsPage"),
});
const workshopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/design/workshop",
  component: HomePage,
});
const legacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$",
  component: function LegacyRoute() {
    const location = useLocation();
    const target = resolveLegacyPath(location.pathname);
    useEffect(() => {
      if (target)
        void router.navigate({
          to: "/docs/$",
          params: { _splat: target },
          hash: location.hash,
          replace: true,
        });
    }, [target, location.hash]);
    return target ? (
      <main id="main-content" className="page-message">
        <p>Opening the updated guide…</p>
        <Link to="/docs/$" params={{ _splat: target }}>
          Continue to documentation
        </Link>
      </main>
    ) : (
      <NotFoundPage />
    );
  },
});
const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    docsParentRoute.addChildren([docsIndexRoute, docsRoute]),
    useCasesRoute,
    useCaseRoute,
    visualsRoute,
    workshopRoute,
    legacyRoute,
  ]),
  defaultPreload: "intent",
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
