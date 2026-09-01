# How an Exception in finally Can Swallow the Original Exception

A `finally` block always runs, but if it throws its own exception, that new exception replaces the original one — silently losing the real error.

## Quick Difference

- Normally, an exception thrown in `try` propagates up to the caller after `finally` runs.
- If `finally` itself throws, that new exception is what propagates instead — the original exception from `try` is discarded and never seen.

## The Problem

```csharp
public void SaveData()
{
    try
    {
        throw new InvalidOperationException("Real bug: data was invalid");
    }
    finally
    {
        CloseConnection(); // also throws, e.g. connection already closed
    }
}

void CloseConnection()
{
    throw new ObjectDisposedException("connection"); // this masks the real bug above
}
```

Key points:

- the caller of `SaveData()` only ever sees `ObjectDisposedException`
- the actual root cause, `InvalidOperationException("Real bug...")`, is silently lost — it never reaches any catch block or log
- this is especially dangerous in cleanup code (closing connections, disposing resources) that can itself fail

## Real-World Example

```csharp
public void ProcessFile(string path)
{
    var stream = File.OpenRead(path);
    try
    {
        Parse(stream); // throws FormatException: "Corrupt file"
    }
    finally
    {
        stream.Dispose(); // if this throws too, FormatException is lost
    }
}
```

If `Dispose()` throws (for example due to a flaky network drive), the on-call engineer only sees the disposal failure in their logs and has no idea the file was actually corrupt — the real bug is masked.

## How to Avoid It

```csharp
public void ProcessFile(string path)
{
    Exception? primary = null;
    var stream = File.OpenRead(path);
    try
    {
        Parse(stream);
    }
    catch (Exception ex)
    {
        primary = ex;
        throw;
    }
    finally
    {
        try
        {
            stream.Dispose();
        }
        catch (Exception cleanupEx) when (primary != null)
        {
            _logger.LogError(cleanupEx, "Cleanup also failed after: {Primary}", primary.Message);
            // swallow cleanup-only exception so the primary one still propagates
        }
    }
}
```

Key points:

- wrap risky cleanup code in its own `try/catch` so it cannot override an in-flight exception
- log the secondary (cleanup) failure instead of letting it silently replace the primary one

## Summary

- An exception thrown inside `finally` always wins over one thrown in `try`, silently discarding the original.
- Guard cleanup code (`Dispose`, closing connections, releasing locks) with its own error handling so it never accidentally masks the real exception.
