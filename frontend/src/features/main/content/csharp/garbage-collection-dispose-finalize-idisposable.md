# Garbage Collection: Generations, Dispose, Finalize, and IDisposable

.NET manages memory automatically via the Garbage Collector (GC), but unmanaged resources (file handles, network sockets, database connections) still need explicit cleanup — that's what `Dispose`, `Finalize`, and `IDisposable` are for.

## Short Answer

The GC automatically reclaims memory for objects no longer reachable from your code, using a generational strategy (Gen 0/1/2) to make collection efficient. `Finalize` (a finalizer) is a safety-net for releasing unmanaged resources if `Dispose` was never called; `IDisposable.Dispose()` is the deterministic, explicit way to release resources as soon as you're done with them — always prefer calling `Dispose` over relying on finalizers.

## Generational Garbage Collection

```archify
diagrams/gc-generations.html
```

- **Generation 0** — newly created objects; most objects die here (short-lived) and are collected very frequently and cheaply.
- **Generation 1** — objects that survived a Gen 0 collection; acts as a buffer between short-lived and long-lived objects.
- **Generation 2** — long-lived objects (e.g., static caches, singletons); collected least often since scanning it is the most expensive.
- The core insight the GC relies on: most objects die young. Optimizing around this ("generational hypothesis") means the GC spends most of its effort on the cheap, frequent Gen 0 collections rather than expensive full (Gen 2) collections.

## Finalize (Finalizers)

```csharp
public class UnmanagedResourceHolder
{
    private IntPtr _handle;

    ~UnmanagedResourceHolder() // finalizer syntax
    {
        // Release the unmanaged handle if Dispose was never called
        ReleaseHandle(_handle);
    }
}
```

- A finalizer runs **at some point** after the object becomes unreachable, on a dedicated finalizer thread, at a time the GC decides — never immediately and never deterministically.
- Objects with a finalizer survive at least one extra GC generation (they're not collected the moment they become unreachable — they're queued for finalization first), making finalizers noticeably more expensive than normal object cleanup.

## IDisposable — Deterministic Cleanup

```csharp
public class FileLogger : IDisposable
{
    private StreamWriter _writer;
    private bool _disposed;

    public FileLogger(string path) => _writer = new StreamWriter(path);

    public void Log(string message) => _writer.WriteLine(message);

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this); // no need for the finalizer to run — cleanup already happened
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;

        if (disposing)
        {
            _writer?.Dispose(); // release managed/unmanaged resources here
        }

        _disposed = true;
    }
}
```

```csharp
using (var logger = new FileLogger("app.log"))
{
    logger.Log("Started");
} // Dispose() called automatically here, even if an exception is thrown
```

- `using` (or `using var` declarations) guarantees `Dispose()` runs deterministically as soon as the block exits — including via an exception — unlike a finalizer's unpredictable timing.
- `GC.SuppressFinalize(this)` tells the GC this object no longer needs its finalizer to run, since `Dispose` already cleaned everything up — this avoids the extra GC generation overhead a finalizer would otherwise incur.

## The Full Dispose Pattern (With a Finalizer as Backup)

```csharp
public class ResourceHolder : IDisposable
{
    private IntPtr _unmanagedHandle;
    private bool _disposed;

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;
        if (disposing)
        {
            // dispose managed resources (other IDisposable objects) here
        }
        ReleaseUnmanagedHandle(_unmanagedHandle); // unmanaged cleanup — always runs
        _disposed = true;
    }

    ~ResourceHolder() => Dispose(false); // safety net if Dispose() was never called
}
```

- The finalizer calls `Dispose(false)` — skipping managed resource cleanup (those objects may already be finalized/collected by the time the finalizer runs) but still releasing the raw unmanaged handle.
- This is the standard full pattern only needed when a class **directly** owns unmanaged resources (raw handles/pointers) — a class that only holds other `IDisposable` objects (like `StreamWriter`) doesn't need its own finalizer at all, since those inner objects already have their own.

## Common Mistake

Relying on the finalizer alone to eventually clean up a resource, instead of implementing and calling `Dispose()`. This leaves file handles, connections, or memory held open for an unpredictable amount of time (until the GC gets around to it) — always implement `IDisposable` for anything holding an unmanaged or scarce resource, and always call/`using` it.

## Summary

The GC reclaims managed memory automatically using a generational strategy that optimizes for the common case of short-lived objects. Finalizers are a last-resort safety net for unmanaged resource cleanup with unpredictable, non-deterministic timing and real performance cost. `IDisposable.Dispose()` (used via `using`) is the correct, deterministic way to release resources promptly — finalizers should only exist alongside `Dispose` as a backup, calling `GC.SuppressFinalize(this)` once `Dispose` has already done the cleanup.
