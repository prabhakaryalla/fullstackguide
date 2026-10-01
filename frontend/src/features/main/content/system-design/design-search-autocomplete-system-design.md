# Design a Search Autocomplete / Typeahead System

An autocomplete system suggests likely completions as a user types into a search box, prioritizing speed and relevance — like Google Search or Amazon's product search.

In system design interviews, this question tests your knowledge of trie data structures, offline ranking computation, and serving prefix queries with very low latency.

## 1. Problem Statement

Design a system that:

- suggests the top-K completions for a partial search query as the user types
- ranks suggestions by popularity/relevance
- updates suggestions over time as search trends change

## 2. Functional Requirements

- Given a prefix (e.g., "syst"), return the top-K matching completed queries (e.g., "system design", "system32").
- Suggestions should reflect real search popularity.
- New trending terms should surface within a reasonable time (minutes to hours, not real-time).

## 3. Non-Functional Requirements

- Extremely low latency (tens of milliseconds) since it fires on every keystroke.
- High read throughput, much lower write/update throughput.
- Approximate freshness is fine — perfect real-time ranking isn't required.

## 4. High-Level Architecture

```archify
diagrams/sd-autocomplete-architecture.html
```

The read path (typing → suggestions) is fully separated from the write path (logs → aggregated frequencies → rebuilt trie), so live typing never waits on expensive analytics.

## 5. The Trie Data Structure

A trie (prefix tree) stores each character of a query along a path from the root, letting prefix lookups run in time proportional to the prefix length rather than scanning all queries:

```archify
diagrams/sd-autocomplete-trie-structure.html
```

At each trie node, the top-K most frequent completions are precomputed and cached, so a lookup for a prefix is a direct node traversal plus reading a small cached list — no scanning required at query time.

## 6. Query Flow

```archify
diagrams/sd-autocomplete-query-sequence.html
```

Clients typically debounce keystrokes (wait ~100-200ms after the last keypress) to avoid firing a request on every single character.

## 7. Offline Ranking Pipeline

1. Search query logs stream into a log store.
2. A batch (or mini-batch) aggregation job periodically counts query frequency, often with time-decay so recent searches count more than old ones.
3. A trie-builder job constructs a new trie (or updates counts in place) from the aggregated frequencies.
4. The new trie is deployed/swapped into the serving layer, typically with minimal downtime via a blue-green swap.

## 8. Data Model

- **Aggregated query stats**: `query_text`, `frequency`, `last_updated` (produced by the offline job).
- **Trie node**: character edges + a small cached list of top-K completions and their scores.

## 9. Scalability Considerations

- **Sharding the trie**: split by first character(s) of the prefix (e.g., a-h, i-p, q-z) across multiple trie service instances.
- **Caching hot prefixes**: extremely common prefixes (e.g., single letters) can be cached at the API/CDN layer directly.
- The entire trie is often small enough to fit in memory per shard, keeping lookups fast without hitting disk.

## 10. Tradeoffs

- Precomputing top-K per node uses more memory but makes reads trivially fast; computing on the fly at query time would be too slow.
- Batch rebuild is simple but suggestions lag real-time trends by minutes; a streaming update pipeline is more complex but fresher.
- Personalized suggestions (per-user ranking) improve relevance but add significant complexity over a single global trie.

## 11. Common Mistakes

- Computing suggestions by scanning all queries at request time instead of precomputing and caching top-K per prefix.
- No debouncing on the client, causing a request per keystroke and wasted load.
- Updating the trie synchronously from live traffic instead of via a decoupled offline pipeline.
- Ignoring trending/recency — a purely all-time frequency count misses fast-rising new terms.

## 12. Summary

Autocomplete is a read-heavy, latency-critical system solved by precomputing ranked suggestions into a trie offline, then serving lookups purely from fast in-memory traversal. Separating the cheap, fast read path from the expensive, periodic ranking pipeline is the key design insight.
