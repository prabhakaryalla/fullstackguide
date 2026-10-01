# CloudFront and CDN Caching Strategies

CloudFront is AWS's Content Delivery Network — it caches content at edge locations physically close to users, so repeat requests are served from a nearby cache instead of round-tripping all the way back to your origin server every time.

## Short Answer

CloudFront sits in front of an origin (S3, an ALB, or any HTTP server) and caches responses at globally distributed **edge locations**. The first request for a given object from a given edge location is a **cache miss** (fetched from the origin, then cached); subsequent requests for the same object from that edge are **cache hits**, served directly from the edge with no origin round trip. How long content stays cached, and how it's invalidated when it changes, is controlled by cache behaviors, headers, and (when needed) explicit invalidation.

## How Caching Works

```
User (Mumbai) → nearest CloudFront edge location →
  Cache MISS (first request) → fetches from Origin (e.g. S3 in us-east-1) → caches the response → returns to user
  Cache HIT  (later requests) → serves directly from the edge, no origin round trip
```

- Caching dramatically reduces both latency (served from a nearby edge instead of a distant origin) and origin load (repeat requests never even reach your origin server).

## Controlling Cache Behavior

```
Cache-Control: max-age=86400        # cache this response for 24 hours
Cache-Control: no-cache             # always revalidate with the origin before serving from cache
Cache-Control: private, no-store    # never cache this response at all (e.g. user-specific data)
```

- The origin's HTTP response headers (`Cache-Control`, `Expires`) are the primary way to control how long CloudFront (and browsers) cache a given response — set generous cache times for static assets (images, CSS, JS with content-hashed filenames), and short/no caching for personalized or frequently-changing content.
- CloudFront **cache behaviors** let you apply different caching rules per URL path pattern on the same distribution — e.g. `/static/*` cached for a year, `/api/*` never cached, on the same CloudFront distribution in front of the same or different origins.

## Cache Keys: What Makes Two Requests "The Same"

```
Cache Policy determines what's included in the "cache key":
  - Query strings?  (e.g. is /image.jpg?v=1 different from /image.jpg?v=2?)
  - Headers?        (e.g. does Accept-Language create separate cached versions per language?)
  - Cookies?         (e.g. does a session cookie make every user get a unique cache entry?)
```

Including more of the request in the cache key (query strings, headers, cookies) creates more precise caching (correct per-variant content) but fragments the cache into far more entries, reducing the effective hit rate. Including too little risks serving the wrong cached variant to the wrong user/language/version. Getting this configuration right is one of the most common real-world CloudFront tuning tasks.

## Invalidating Stale Cached Content

```
aws cloudfront create-invalidation --distribution-id ABCD1234 --paths "/index.html" "/static/*"
```

- An **invalidation** forces CloudFront to fetch fresh content from the origin the next time each specified path is requested, even if the cached TTL hasn't expired yet — necessary when you've deployed new content but the old version is still within its cache lifetime.
- Invalidations have a cost at scale and take a short time to propagate to all edge locations — for frequently-updated assets, a better long-term pattern is **cache-busting via versioned/content-hashed filenames** (e.g. `app.a3f9c1.js`) so each new deployment is automatically a new, distinct cache key, and you never need to invalidate anything at all.

## Common Mistake

Setting overly long cache TTLs on content that changes without also having a cache-busting strategy (versioned filenames) or an invalidation step in the deployment pipeline — users end up seeing stale content for the full cache duration after a deploy, with no obvious error to indicate why.

## Summary

CloudFront caches origin responses at edge locations close to users, turning repeat requests into fast cache hits with no origin round trip. Cache duration is primarily controlled by origin response headers (`Cache-Control`), cache keys determine what counts as "the same" cached request, and invalidations (or, better, versioned filenames) handle serving fresh content after a deployment.
