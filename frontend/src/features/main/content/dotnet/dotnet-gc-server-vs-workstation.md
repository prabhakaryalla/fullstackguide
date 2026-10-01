# .NET Garbage Collection Modes: Server GC vs Workstation GC

.NET's garbage collector isn't one-size-fits-all — Server GC and Workstation GC make different trade-offs between throughput and memory footprint, and picking the wrong one for a given workload (especially in a containerized environment) can silently waste resources or hurt performance.

## Short Answer

**Workstation GC** is optimized for low-latency, interactive applications with a single, mostly-idle-between-bursts UI thread (desktop apps) — it uses less memory and runs on the same thread that triggered the allocation. **Server GC** is optimized for throughput on multi-core server workloads — it creates a dedicated GC heap and collection thread **per core**, running collections in parallel, at the cost of a meaningfully higher baseline memory footprint. ASP.NET Core apps default to Server GC.

## Workstation GC

```xml
<PropertyGroup>
  <ServerGarbageCollection>false</ServerGarbageCollection>
</PropertyGroup>
```

- Uses a single heap and a single GC thread — collections happen on the same thread as the allocating code (though can still run concurrently with app code for a "background" mode, reducing pause times for a responsive UI).
- Lower baseline memory footprint — appropriate for desktop/client applications where minimizing memory usage matters more than maximizing raw allocation throughput.

## Server GC

```xml
<PropertyGroup>
  <ServerGarbageCollection>true</ServerGarbageCollection>
  <ConcurrentGarbageCollection>true</ConcurrentGarbageCollection>
</PropertyGroup>
```

- Creates a separate heap **per logical CPU core**, with dedicated GC threads that collect in parallel — significantly higher throughput on multi-core machines under heavy allocation load, since garbage collection work is parallelized across cores instead of contending for a single GC thread.
- Meaningfully higher baseline memory usage — each per-core heap reserves its own memory segments, so Server GC's memory footprint scales with core count, not just actual live object size.
- **ASP.NET Core defaults to Server GC** specifically because web servers are typically multi-core machines under sustained allocation load (handling many concurrent requests), where the throughput benefit clearly outweighs the extra memory cost.

## The Container Gotcha

```
A container configured with a CPU limit of "0.5 cores" but running on a host with 32 physical cores:
  - Server GC (older .NET versions) could detect 32 cores from the HOST, not the container's limit
  - This creates 32 separate GC heaps for a workload that's actually only allowed 0.5 CPU worth of work
  - Result: excessive memory reservation, completely mismatched to the container's actual resource limits
```

- This was a genuinely serious, common production issue with early containerized .NET deployments — Server GC's per-core heap allocation strategy detected the **host's** core count, not the container's configured CPU limit, leading to wildly oversized memory reservations for small, resource-constrained containers.
- Modern .NET (with proper container runtime support enabled, which is the default in current SDK/runtime versions) correctly detects the container's actual CPU limit (via cgroups) and sizes Server GC's heap count accordingly — but this is genuinely worth knowing as a "here's a real historical gotcha with a service-level explanation" answer, and worth double-checking (`DOTNET_GCHeapCount` / `DOTNET_gcServer` settings) in any older or unusually-configured container environment.

## Choosing the Right Mode

| Workload | Best Fit |
|---|---|
| Desktop/client application, single active user | Workstation GC |
| ASP.NET Core web API/app, multi-core server | Server GC (the default) |
| Many small containers, each with a tight CPU/memory limit | Server GC, but verify actual heap count matches the container's real CPU limit |
| Memory-constrained environment where throughput matters less than footprint | Consider Workstation GC even for a server workload, if measured memory pressure is the dominant concern |

## Common Mistake

Assuming Server GC is unconditionally "the correct choice for any server app" without ever measuring actual memory usage in a resource-constrained container — for many small, tightly-CPU-limited containers running the same service, Server GC's per-core heap multiplication can use meaningfully more memory than the workload's actual object graph would otherwise require, and Workstation GC (or explicitly tuning `GCHeapCount`) is sometimes the better fit in that specific scenario.

## Summary

Workstation GC favors lower memory footprint with single-threaded collection, suited to desktop/client apps. Server GC favors throughput via per-core parallel heaps and collection threads, at a real memory cost that scales with core count — the correct default for most ASP.NET Core server workloads, but worth verifying against actual container CPU limits and measured memory usage rather than assuming it's automatically optimal in every containerized deployment.
