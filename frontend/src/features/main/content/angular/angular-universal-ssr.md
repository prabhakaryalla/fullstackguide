# Angular Universal / Server-Side Rendering (SSR)

By default, an Angular app ships an empty HTML shell and builds the entire page in the browser via JavaScript — Angular Universal renders that same application on the **server** first, sending fully-formed HTML to the browser, then "hydrating" it into a fully interactive Angular app.

## Short Answer

Angular Universal runs your Angular application inside a Node.js server process, rendering components to an HTML string for each request — the browser receives real, visible content immediately, instead of a blank page waiting for JavaScript to download, parse, and execute. Once the JavaScript does load, Angular "hydrates" the existing server-rendered HTML, attaching event listeners and reconciling it with the client-side render, rather than throwing it away and re-rendering from scratch.

## Why SSR Matters

```
Client-Side Rendering (CSR), no SSR:
  Browser requests page → gets near-empty HTML shell → downloads/parses JS bundle →
  Angular bootstraps → components render → user finally sees content

Server-Side Rendering (SSR) with Angular Universal:
  Browser requests page → server renders the app → gets FULLY-FORMED HTML immediately →
  user sees content right away → JS loads in the background → Angular hydrates → fully interactive
```

- **Faster perceived load** (First Contentful Paint) — the user sees real content immediately, rather than a blank page or loading spinner while the JS bundle downloads and Angular bootstraps.
- **Better SEO** — search engine crawlers (and social media link-preview bots) that don't execute JavaScript still see fully-rendered, meaningful HTML content, rather than an empty shell.
- **Better performance on slow devices/networks** — the visible content doesn't depend on the client's CPU finishing JS execution first.

## Hydration: Reusing Server-Rendered DOM

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(), // enables non-destructive hydration
  ]
}
```

- Without hydration support, historically Angular Universal would **destroy and re-render** the entire DOM on the client once JavaScript loaded — visually this could cause a flicker/flash as server-rendered content is thrown away and replaced.
- Modern Angular's hydration reuses the existing server-rendered DOM nodes directly, attaching event listeners and Angular's internal state to them — avoiding the destroy-and-rebuild flicker, much like React's hydration model.
- Just like other frameworks' hydration, this requires the client's initial render to produce output matching what the server actually sent — code that behaves differently on server vs. client (browser-only APIs like `window`/`document` accessed during rendering) can cause hydration mismatches.

## Server-Only vs Browser-Only Code

```typescript
import { isPlatformBrowser } from '@angular/common'

constructor(@Inject(PLATFORM_ID) private platformId: object) {}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // safe to use window, document, localStorage, etc. - only runs in the browser
    const width = window.innerWidth
  }
}
```

- The server has no `window`, `document`, or `localStorage` — code that unconditionally accesses these during a component's lifecycle will throw when rendered on the server.
- `isPlatformBrowser`/`isPlatformServer` let you branch behavior explicitly, deferring any browser-only logic until the code is actually confirmed to be running in a browser context (typically inside `ngOnInit` or `afterNextRender`, never during the initial render pass itself).

## Common Mistake

Directly accessing `window`/`document`/`localStorage` inside a component's constructor or template-rendering logic without a platform check — this works fine in local development (where you're always in a browser) and then throws a server-side rendering error only once actually deployed with SSR enabled, since the server has no such globals available at all.

## Summary

Angular Universal renders the application on the server into real HTML first, dramatically improving perceived load time and SEO compared to shipping an empty shell for client-side JavaScript to fill in. Modern hydration reuses that server-rendered DOM directly instead of discarding and rebuilding it — but only works correctly when server and client renders agree, which requires explicitly guarding any browser-only API access with platform checks.
