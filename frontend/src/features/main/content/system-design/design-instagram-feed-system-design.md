# Design Instagram (Social Media Feed)

Instagram's home feed shows each user a personalized, roughly-chronological stream of posts from accounts they follow, refreshed in near real time as new posts and interactions arrive.

In system design interviews, this question tests your understanding of fan-out strategies, the "celebrity problem" (accounts with millions of followers), feed ranking, and media delivery at global scale.

## 1. Problem Statement

Design a system like Instagram that supports:

- posting a photo/video with a caption
- following/unfollowed other users
- viewing a personalized home feed of posts from followed accounts
- liking and commenting on posts

## 2. Requirements

### Functional

- Users can create posts (image/video + caption).
- Users can follow/unfollow other users.
- Users can view a home feed populated from accounts they follow.
- Users can like/comment on posts.

### Non-Functional

- Feed reads are extremely high volume (orders of magnitude more reads than writes).
- Feed should feel "near real time" — new posts should appear within seconds.
- Highly available — a slightly stale feed is fine; a broken feed is not.
- Must gracefully handle celebrity accounts with 100M+ followers.

## 3. Scale (Rough Estimate)

Assume:

- 500M daily active users, each checking the feed ~5 times/day → ~2.5B feed reads/day (~30K QPS average, higher at peak).
- 50M new posts/day (~600 writes/sec average).
- Average follower count ~200, but a small percentage of "celebrity" accounts have 10M-100M+ followers.

Implications:

- Read:write ratio is roughly 100:1 — optimize aggressively for read latency.
- A celebrity post can trigger fan-out to 100M+ inboxes if done naively — this must be special-cased.
- Media (images/videos) dominates storage and bandwidth, not the post metadata itself.

## 4. API Design

### Create Post

- `POST /api/v1/posts`
- Body: `mediaUrl`, `caption`
- Response: `postId`, `createdAt`

### Follow / Unfollow

- `POST /api/v1/users/{id}/follow`
- `DELETE /api/v1/users/{id}/follow`

### Get Home Feed

- `GET /api/v1/feed?cursor={cursor}&limit=20`
- Response: paginated list of posts (`postId`, `authorId`, `mediaUrl`, `caption`, `likeCount`, `createdAt`)

### Like / Comment

- `POST /api/v1/posts/{id}/like`
- `POST /api/v1/posts/{id}/comments`

## 5. High-Level Architecture

```archify
diagrams/sd-instagram-architecture.html
```

## 6. Database Schema

**users**

- `user_id` (PK), `username`, `created_at`

**follows**

- `follower_id`, `followee_id` (composite PK), `created_at`
- Indexed both ways: "who does X follow" and "who follows X".

**posts**

- `post_id` (PK), `author_id`, `media_url`, `caption`, `created_at`, `like_count`, `comment_count`

**feed_inbox** (per-user precomputed feed, e.g., Redis sorted set or wide-column table)

- key: `user_id`
- value: sorted list of `(post_id, score/timestamp)`, capped to the most recent ~1,000 entries

**likes / comments**

- `post_id`, `user_id`, `created_at` (likes) — comments additionally store `comment_text`

## 7. Fan-out Strategies

### Fan-out on Write (push model)

When a user posts, immediately push the `post_id` into the feed inbox of every follower.

- Pros: feed reads are O(1) — just read the precomputed inbox.
- Cons: a celebrity with 50M followers triggers 50M writes for a single post — very expensive and slow.

### Fan-out on Read (pull model)

Feed is computed at read time by merging recent posts from all followed accounts.

- Pros: no explosion of writes on post creation.
- Cons: reading the feed is expensive — must fan out queries across every followed account each time.

### Hybrid Approach (used in practice)

```archify
diagrams/sd-instagram-hybrid-fanout.html
```

- Regular accounts: fan-out on write (cheap, since follower counts are small).
- Celebrity accounts: fan-out on read — at feed-read time, merge in recent posts from celebrities the user follows.
- This bounds the worst-case write amplification while keeping most reads O(1).

## 8. Feed Ranking Pipeline

```archify
diagrams/sd-instagram-feed-ranking.html
```

A simple, interview-friendly ranking score:

```text
score = w1 * recency_decay(post_age)
      + w2 * affinity(viewer, author)      // how often viewer engages with author
      + w3 * engagement_rate(post)         // likes/comments relative to author's average
```

Real systems replace the weighted formula with a learned ranking model, but the pipeline shape (candidates → features → ranker → sorted page) stays the same.

## 9. Flow: Posting and Feed Read

```archify
diagrams/sd-instagram-posting-feed-sequence.html
```

## 10. Key Components

- **Fan-out service** — decides push vs. pull per author and performs the fan-out asynchronously so post creation stays fast.
- **Feed inbox cache** — precomputed, capped per-user list acting as the read-optimized "materialized view" of the feed.
- **Social graph store** — must support fast "list followers of X" and "list who X follows" queries at very large scale.
- **CDN** — serves the actual media (images/video); the app servers never proxy binary media.
- **Ranking service** — reorders the raw candidate set into the final feed the user sees.

## 11. Key Challenges

- **Celebrity problem** — the primary reason for a hybrid fan-out model; a single post cannot legally/economically be pushed to 100M inboxes synchronously.
- **Feed staleness vs. cost** — precomputed inboxes can go stale if not invalidated/updated correctly; capping inbox size (~1,000 posts) trades old-post visibility for bounded storage.
- **Hot key problem** — a viral post generates a burst of likes/comments on one row; needs counter sharding or approximate counters instead of a single row update.
- **Deleted/edited posts** — a post pushed into millions of inboxes must still be removable everywhere; usually solved by storing only `post_id` in the inbox and fetching live post data (or a "deleted" tombstone) at read time.

## 12. Interview Tips

- Always mention the celebrity problem explicitly — it's the signature twist of this question and interviewers look for it.
- Don't over-engineer the ranking model; a simple recency + affinity + engagement formula is enough unless the interviewer pushes into ML territory.
- Call out that media storage/CDN is a separate concern from post metadata — mixing them is a common mistake.
- Discuss the read/write ratio early to justify why fan-out-on-write is the default strategy, not fan-out-on-read.

## 13. Summary

Instagram's feed is a read-optimized system: the hybrid fan-out model pushes posts to followers' precomputed inboxes for most accounts while falling back to read-time merging for celebrities, keeping both writes and reads bounded. A lightweight ranking layer reorders the merged candidates, and CDN-backed object storage keeps media delivery decoupled from the metadata path entirely.
