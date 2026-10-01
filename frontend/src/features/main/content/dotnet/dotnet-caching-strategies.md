# Caching Strategies in .NET (Cache-Aside, Read/Write-Through, Write-Around, Write-Back)

Caching strategy defines **who talks to the cache and when**, and **how the cache stays in sync with the database**. Choosing the right strategy affects latency, consistency, and durability guarantees for your .NET application.

## Why It Matters

- Reduces load on the primary database for read-heavy workloads.
- Lowers latency for frequently accessed data.
- The wrong strategy can cause stale reads or lost writes — the strategy you pick is as important as the cache technology itself (`IMemoryCache`, Redis via `IDistributedCache`, etc.).

## 1. Cache-Aside (Lazy Loading)

The application code is responsible for checking the cache first, and loading from the database on a miss.

```archify
diagrams/dotnet-cache-aside.html
```

```csharp
public async Task<Product> GetProductAsync(int id)
{
    var cacheKey = $"product:{id}";
    if (_cache.TryGetValue(cacheKey, out Product? cached))
        return cached!;

    var product = await _dbContext.Products.FindAsync(id);
    if (product is not null)
        _cache.Set(cacheKey, product, TimeSpan.FromMinutes(10));

    return product!;
}
```

- **Pros**: Simple; only requested data is cached; cache failure doesn't break the app (falls back to DB).
- **Cons**: First request for any key is always a cache miss (cold-start latency); app owns the population logic.
- Most common pattern in .NET apps using `IMemoryCache`/`IDistributedCache` directly.

## 2. Read-Through

Similar to cache-aside, but the **cache provider itself** (not the app) is responsible for loading from the database on a miss — the app only ever talks to the cache.

```archify
diagrams/dotnet-read-through.html
```

```csharp
// The cache abstraction owns the "loader" delegate; app code never touches the DB directly.
public async Task<Product> GetProductAsync(int id)
{
    return await _cache.GetOrCreateAsync($"product:{id}", async entry =>
    {
        entry.SlidingExpiration = TimeSpan.FromMinutes(10);
        return await _dbContext.Products.FindAsync(id);
    });
}
```

- **Pros**: Centralizes loading logic; app code stays simple (`GetOrCreateAsync`-style API).
- **Cons**: Requires a caching layer/library that supports a loader function; still has a cold-miss penalty.
- In .NET, `IMemoryCache.GetOrCreateAsync` and libraries like `FusionCache` implement this pattern directly.

## 3. Write-Through

Every write goes to the cache **and** the database synchronously, in the same operation, before returning success to the caller.

```archify
diagrams/dotnet-write-through.html
```

```csharp
public async Task UpdateProductAsync(Product product)
{
    await _dbContext.SaveChangesAsync();          // persist to DB
    _cache.Set($"product:{product.Id}", product);  // keep cache in sync
}
```

- **Pros**: Cache is always consistent with the database; reads are always fresh.
- **Cons**: Higher write latency, since every write waits on both cache and DB.

## 4. Write-Around

Writes go **directly to the database**, bypassing the cache. The cache is only populated later, on a subsequent read (cache-aside style), rather than immediately on write.

```archify
diagrams/dotnet-write-around.html
```

```csharp
public async Task UpdateProductAsync(Product product)
{
    await _dbContext.SaveChangesAsync(); // DB updated
    _cache.Remove($"product:{product.Id}"); // invalidate stale entry instead of rewriting it
}
```

- **Pros**: Avoids caching data that may never be read again (e.g., bulk writes, infrequently accessed records) — keeps the cache lean.
- **Cons**: The first read after a write is always a cache miss, adding latency for recently written data.

## 5. Write-Back (Write-Behind)

Writes go to the cache first and return immediately; the cache asynchronously flushes the change to the database later (batched or delayed).

```archify
diagrams/dotnet-write-back.html
```

```csharp
public async Task UpdateProductAsync(Product product)
{
    _cache.Set($"product:{product.Id}", product);
    _pendingWrites.Enqueue(product); // background worker flushes this to the DB later
}
```

- **Pros**: Lowest write latency; can batch many writes into fewer DB operations.
- **Cons**: Risk of data loss if the cache crashes before flushing; adds complexity (background flush worker, retry/dedup logic).

## Comparison Table

| Strategy | Write Path | Read Path | Consistency | Best For |
|---|---|---|---|---|
| Cache-Aside | App writes to DB, invalidates/updates cache | App checks cache, falls back to DB on miss | Eventual (until cache updated) | General-purpose read-heavy workloads |
| Read-Through | N/A (read-focused) | Cache loads from DB automatically on miss | Eventual | Simplifying app code around reads |
| Write-Through | App/cache writes to both cache + DB synchronously | Always from cache (fresh) | Strong | Data that must always be fresh on read |
| Write-Around | App writes directly to DB, skips cache | Cache-aside style, loads on next read | Eventual, cache lags after writes | Rarely-read-after-write data (bulk imports/logs) |
| Write-Back | App writes to cache only, DB updated later async | From cache (freshest, even before DB flush) | Weakest (risk of loss on crash) | Write-heavy workloads needing low write latency |

## Real-World Example

An e-commerce product catalog:
- **Product detail pages** use **cache-aside** — most products are read far more than written.
- **Inventory count updates** use **write-through** — stock levels must be immediately consistent to avoid overselling.
- **Bulk product import jobs** use **write-around** — imported products aren't read again immediately, so caching them upfront would waste cache space.
- **Order/analytics event counters** use **write-back** — high write volume tolerates a small risk of loss in exchange for low latency.

## Summary

Cache-aside and read-through differ in who owns the load-on-miss logic; write-through, write-around, and write-back differ in when and how writes reach the database relative to the cache. Picking the right strategy per data type — rather than one strategy for the whole app — balances latency, consistency, and durability.
