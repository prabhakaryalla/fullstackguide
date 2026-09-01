# Exception Filters (catch when) vs catch + if + throw

Both patterns look similar, but exception filters evaluate their condition without unwinding the stack, while catch-then-rethrow always unwinds first.

## Quick Difference

- `catch (Exception ex) when (condition)` only catches the exception if `condition` is true; if false, the exception continues past this catch block as if it were never caught, keeping the stack intact.
- `catch (Exception ex) { if (!condition) throw; }` always catches first, unwinds the stack, then re-throws — which resets debugging information like the original crash-time state.

## Exception Filters in C#

```csharp
try
{
    CallExternalService();
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.TooManyRequests)
{
    // only runs for 429 responses
    RetryLater();
}
```

Key points:

- the condition runs while the exception is still "in flight", before any stack unwinding
- if the condition is false, execution behaves as though this catch block does not exist, and the search continues to the next catch or up the call stack
- side effects (like logging) can be placed inside the `when` clause and will run even if the filter ultimately returns false — useful for diagnostic logging without catching

## catch + if + throw in C#

```csharp
try
{
    CallExternalService();
}
catch (HttpRequestException ex)
{
    if (ex.StatusCode != HttpStatusCode.TooManyRequests)
    {
        throw; // re-throw, but stack has already unwound to here
    }
    RetryLater();
}
```

Key points:

- the exception is always caught first, meaning the stack has already unwound by the time you decide to re-throw
- some debugger features (like "break when an exception is thrown that would go unhandled") behave differently, since the exception was technically handled and then re-thrown

## Real-World Example: Logging Without Catching

```csharp
try
{
    ProcessPayment();
}
catch (Exception ex) when (LogAndReturnFalse(ex))
{
    // never actually reached
}

bool LogAndReturnFalse(Exception ex)
{
    _logger.LogError(ex, "Payment failed, exception will propagate");
    return false; // filter is false, so exception keeps propagating up unhandled
}
```

This pattern lets you log every exception passing through, without changing whether the application ultimately crashes or how a debugger attached to the process behaves.

## Summary

- Exception filters (`when`) evaluate before the stack unwinds and can conditionally "skip" a catch block entirely — useful for selective handling and non-intrusive logging.
- Plain `catch` + `if` + `throw;` always unwinds first, which is fine but behaves differently for debuggers and can be slightly less efficient when the exception is ultimately not meant to be handled here.
