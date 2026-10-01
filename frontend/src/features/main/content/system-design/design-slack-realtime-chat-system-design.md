# Design Slack (Real-Time Chat)

Slack organizes real-time messaging into workspaces and channels for teams, layering in search, threads, presence, and file sharing on top of a messaging core similar to WhatsApp but structured around persistent, searchable team channels rather than primarily private 1:1 chats.

In system design interviews, this question tests your understanding of channel-based fan-out, real-time delivery via WebSockets, and building a searchable message index at scale.

## 1. Problem Statement

Design a system like Slack that supports:

- workspaces containing multiple channels, each with many members
- real-time message delivery to all online channel members
- message history that's fully searchable
- threads, reactions, and file sharing within channels

## 2. Requirements

### Functional

- Create workspaces/channels; add/remove members.
- Send/receive messages in a channel in real time.
- Search message history by keyword within a workspace.
- Support threaded replies, reactions, and file attachments.

### Non-Functional

- Low-latency delivery to all currently-connected members of a channel.
- Message history must be durable and fully searchable, not just recent messages.
- Channels can be very large (thousands of members in an enterprise workspace) — fan-out must scale accordingly.
- High availability per workspace; an outage in one workspace's shard shouldn't affect others.

## 3. Scale (Rough Estimate)

Assume:

- 20M daily active users across millions of workspaces.
- Average channel size: tens of members; largest enterprise channels: thousands.
- 5B messages/day (~58K messages/sec average, bursty around business hours per time zone).

Implications:

- Channel fan-out is comparatively small versus a social feed's celebrity problem (thousands, not millions, of recipients per channel) — direct push fan-out to all connected members is generally feasible.
- Search requires a dedicated inverted index over message history — cannot be served by scanning a relational message table.
- Multi-tenant isolation (per-workspace) matters both for security and for limiting the blast radius of any single workspace's load spike.

## 4. API Design

Real-time traffic runs over a persistent WebSocket connection; logical operations:

### Send Message

- Client → Server: `{ type: "message", channelId, clientMsgId, text, threadId? }`
- Server → Clients in channel: `{ type: "message", serverMsgId, channelId, senderId, text, timestamp }`

### Channel History

- `GET /api/v1/channels/{id}/messages?before={cursor}&limit=50`

### Search

- `GET /api/v1/workspaces/{id}/search?q={query}`

### Reactions / Threads

- `POST /api/v1/messages/{id}/reactions`
- `POST /api/v1/messages/{id}/replies`

## 5. High-Level Architecture

```archify
diagrams/sd-slack-architecture.html
```

## 6. Database Schema

**workspaces**

- `workspace_id` (PK), `name`, `plan_tier`

**channels**

- `channel_id` (PK), `workspace_id`, `name`, `is_private`

**channel_members**

- `channel_id`, `user_id` (composite PK), `joined_at`

**messages** (partitioned by `channel_id` for scale)

- `message_id` (PK), `channel_id`, `sender_id`, `text`, `thread_parent_id` (nullable), `created_at`

**reactions**

- `message_id`, `user_id`, `emoji` (composite PK)

**search_index** (logically separate store, e.g., inverted index/Elasticsearch)

- tokenized message text → posting list of `(message_id, channel_id, timestamp)`

## 7. Channel Fan-out Flow

```archify
diagrams/sd-slack-fanout-sequence.html
```

Because channel sizes are moderate (unlike a social-feed celebrity account), the router can fan out live pushes directly to every currently-connected member rather than needing a precomputed inbox/pull-hybrid model.

## 8. Search Indexing Pipeline

```archify
diagrams/sd-slack-search-indexing.html
```

Indexing happens asynchronously after the message is durably stored, so sending a message never waits on search-index updates — search results simply lag live messages by a very short delay.

## 9. Presence & Multi-Device Sync

```archify
diagrams/sd-slack-presence-sync.html
```

Presence uses the same connection-gateway + session-store pattern as other real-time messaging systems (see Design WhatsApp), with presence changes broadcast to channel members who have that user in a shared channel.

## 10. Key Components

- **WebSocket gateway** — holds persistent connections; sharded across many nodes with a presence/session store mapping users to their current gateway node.
- **Channel fan-out router** — pushes new messages to all currently-connected members of a channel; durable-writes first, then fans out.
- **Partitioned message store** — keyed by `channel_id` so a single busy channel's write volume doesn't bottleneck unrelated channels.
- **Async search indexer** — builds and maintains an inverted index over message history, decoupled from the message send path.
- **File service** — handles attachment uploads to object storage, referenced from messages rather than embedded inline.

## 11. Key Challenges

- **Large channel fan-out** — an enterprise channel with thousands of members still requires fanning out to every connected client; batching pushes and prioritizing currently-visible channels (vs. background/muted ones) keeps this tractable.
- **Search relevance and recency tradeoff** — ranking must balance keyword relevance with how recent a message is, and must handle multi-workspace isolation so search never leaks across tenants.
- **Message ordering within threads** — thread replies need to preserve both their position in the parent channel and their order within the thread — often modeled as a separate ordered sub-collection keyed by `thread_parent_id`.
- **Multi-tenant noisy neighbor** — one workspace's message burst (e.g., an incident channel during an outage) shouldn't degrade latency for unrelated workspaces; partitioning/sharding by `workspace_id`/`channel_id` limits blast radius.

## 12. Interview Tips

- Contrast this explicitly with WhatsApp: Slack's fan-out is channel-based and typically small/bounded (compared to WhatsApp's 1:1/offline-queue focus), so direct push fan-out is usually sufficient without a hybrid celebrity-style model.
- Bring up asynchronous search indexing early — a common mistake is assuming search can be served directly from the transactional message table.
- Mention partitioning message storage by `channel_id` (or `workspace_id`) to explain both scalability and multi-tenant isolation in one design decision.
- If asked about threads, describe them as an ordered sub-collection keyed by `thread_parent_id` rather than a wholly separate messaging system.

## 13. Summary

Slack's real-time core mirrors general messaging-system patterns (WebSocket gateway + presence store + durable per-channel message log) but its distinguishing challenges are channel-based fan-out at moderate (not celebrity) scale and building a fully searchable, asynchronously-indexed message history across many isolated workspaces. Partitioning by channel/workspace keeps both write throughput and multi-tenant blast radius under control.
