# Difference Between throw; and throw ex; in C#

Both re-throw an exception from a catch block, but only one of them preserves the original stack trace.

## Quick Difference

- `throw;` re-throws the current exception and preserves the full original stack trace, including where it was first thrown.
- `throw ex;` throws the same exception object but resets the stack trace to start at this `throw ex;` line, hiding the real origin.

## throw; in C#

```csharp
try
{
    DoWork();
}
catch (Exception ex)
{
    LogError(ex);
    throw; // preserves original stack trace pointing into DoWork()
}
```

Key points:

- the stack trace still shows exactly where the exception was originally thrown, which is critical for debugging
- this is the recommended way to re-throw after logging or partial handling

## throw ex; in C#

```csharp
try
{
    DoWork();
}
catch (Exception ex)
{
    LogError(ex);
    throw ex; // stack trace now starts here, original location is lost
}
```

Key points:

- functionally rethrows the same exception object and message
- but `ex.StackTrace` is overwritten to point at this line, not the real failure point
- makes production debugging much harder — the log shows the catch block, not the actual bug

## Real-World Example

```csharp
public void ProcessOrder(Order order)
{
    try
    {
        ValidateOrder(order);   // throws deep inside validation logic
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Order processing failed");
        throw ex; // BUG: on-call engineer sees ProcessOrder in the trace, not ValidateOrder
    }
}
```

Switching `throw ex;` to `throw;` fixes the stack trace immediately, with no other code changes needed — a one-word fix that meaningfully improves production diagnostics.

## Summary

- Always prefer `throw;` when re-throwing the caught exception unchanged — it keeps the real stack trace.
- Only use `throw ex;` (or better, wrap in a new exception with `innerException: ex`) if you intentionally want to reset/replace the trace, which is rarely the goal.
