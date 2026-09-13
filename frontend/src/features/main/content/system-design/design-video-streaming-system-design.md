# Design a Video Streaming Platform

A video streaming platform lets users upload video content and stream it back smoothly across varying network conditions and devices.

In system design interviews, this question tests your understanding of media processing pipelines, adaptive streaming, and CDN-driven delivery at global scale — similar to how YouTube or Netflix operate.

## 1. Problem Statement

Design a system like YouTube that supports:

- uploading videos of various formats/resolutions
- processing them into streamable formats
- playing videos smoothly on phones, laptops, and TVs on any network speed

## 2. Functional Requirements

- Upload a video file.
- Transcode into multiple resolutions/bitrates.
- Stream video with minimal buffering.
- Support seeking to any point in the video.

## 3. Non-Functional Requirements

- Playback must start quickly (low startup latency).
- Must adapt to changing network conditions mid-playback.
- Massive read scale (millions of concurrent viewers) vs. much smaller write (upload) volume.
- Global low-latency delivery.

## 4. High-Level Architecture

```mermaid
flowchart LR
    U[Uploader] --> UploadSvc[Upload Service]
    UploadSvc --> Raw[(Raw Video Storage)]
    UploadSvc --> Queue[[Transcoding Queue]]
    Queue --> Workers[Transcoding Workers]
    Workers --> Processed[(Processed Segments +<br/>Manifest Storage)]
    Processed --> CDN[CDN Edge Nodes]
    Viewer[Viewer] --> CDN
    CDN -->|cache miss| Processed
```

## 5. Upload & Transcoding Flow

```mermaid
sequenceDiagram
    participant Up as Uploader
    participant US as Upload Service
    participant Raw as Raw Storage
    participant Q as Transcoding Queue
    participant TW as Transcoding Worker
    participant PS as Processed Storage

    Up->>US: Upload raw video file
    US->>Raw: Store raw file
    US->>Q: Enqueue transcoding job
    Q->>TW: Assign job
    TW->>Raw: Read raw video
    TW->>TW: Encode into multiple resolutions (e.g., 240p-4K)
    TW->>TW: Split into small chunks (2-10s segments)
    TW->>PS: Store segments + generate manifest (HLS/DASH)
    TW-->>US: Mark video "ready to stream"
```

Transcoding is asynchronous and CPU-intensive, so it runs on a separate worker pool that scales independently from the upload/playback path.

## 6. Adaptive Bitrate Streaming (ABR)

Instead of one fixed-quality file, the video is encoded into multiple bitrate/resolution variants, split into small chunks, and described by a manifest file (HLS `.m3u8` or DASH `.mpd`):

```mermaid
flowchart TB
    Manifest["Manifest file<br/>(lists available qualities)"] --> Q1["240p chunks"]
    Manifest --> Q2["480p chunks"]
    Manifest --> Q3["1080p chunks"]
    Manifest --> Q4["4K chunks"]
    Player["Video Player"] -->|measures bandwidth<br/>each chunk| Manifest
    Player -->|switches quality<br/>chunk by chunk| Q2
```

The player continuously measures available bandwidth and switches between quality variants chunk-by-chunk, so playback keeps going smoothly instead of buffering when the network slows down.

## 7. Playback Flow

```mermaid
sequenceDiagram
    participant Player as Video Player
    participant CDN
    participant Origin as Processed Storage

    Player->>CDN: GET manifest.m3u8
    CDN-->>Player: manifest (lists quality variants)
    loop Every few seconds
        Player->>CDN: GET next chunk (chosen quality)
        alt Cached at edge
            CDN-->>Player: chunk (fast)
        else Not cached
            CDN->>Origin: fetch chunk
            Origin-->>CDN: chunk
            CDN-->>Player: chunk (cached for next viewer)
        end
    end
```

## 8. Data Model

- **Video metadata**: `video_id`, `owner_id`, `title`, `status` (uploading/processing/ready), `duration`.
- **Manifest**: list of available renditions and chunk URLs per video.
- **Storage**: raw uploads in cheap object storage; processed chunks in storage fronted by a CDN.

## 9. Scalability Considerations

- CDN edge caching absorbs the vast majority of playback traffic — origin storage only serves cache misses.
- Transcoding workers scale horizontally and process jobs from a queue independently of upload traffic spikes.
- Popular videos benefit enormously from edge caching; long-tail videos rely more on origin fetches.

## 10. Tradeoffs

- More resolution variants improve playback quality across devices but increase storage and transcoding cost.
- Smaller chunk sizes allow faster quality switching but add per-chunk request overhead.
- Storing all raw uploads forever is costly — many platforms delete/archive raw files after successful transcoding.

## 11. Common Mistakes

- Serving one fixed quality file to everyone regardless of network conditions.
- Doing transcoding synchronously in the upload request path (blocks the uploader for a long time).
- Not using a CDN, causing the origin to be overwhelmed by popular video traffic.
- Ignoring seek support — chunked storage plus manifests is what makes fast seeking possible.

## 12. Summary

A video streaming platform separates the expensive, asynchronous transcoding pipeline from the read-heavy playback path. Adaptive bitrate streaming, chunked storage, and CDN edge caching together let it serve smooth video to millions of viewers with varying network conditions and devices.
