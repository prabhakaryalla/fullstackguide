# Fire-and-Forget Background Work Getting Killed in Azure Functions

Starting background work and returning an HTTP response immediately feels like a reasonable "respond fast, keep working" pattern — but on Azure Functions, the platform can recycle or freeze the instance right after the response is sent, silently killing that "background" work before it finishes.

## The Trap

```csharp
[FunctionName("ProcessAndRespond")]
public static IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req, ILogger log)
{
    _ = Task.Run(async () =>
    {
        await Task.Delay(5000); // simulate a slow background operation
        log.LogInformation("Background work finished!"); // this log may NEVER appear
    });

    return new OkObjectResult("Request accepted, processing in background"); // returns immediately
}
```

**Expectation:** the HTTP response returns instantly, while the 5-second background task keeps running and eventually logs "Background work finished!"

**Reality:** once the function returns its response, Azure considers the invocation **complete** — the host is free to freeze, scale down, or recycle that instance at any point afterward, and the detached `Task.Run` work can be silently abandoned mid-execution, with no error, no exception, and no log line ever appearing.

## Why This Happens

- Azure Functions' execution model is built around the assumption that an invocation's work is done when the function method returns (or, for `async Task`-returning functions, when the returned task completes) — the platform has no way to know that a detached, unawaited `Task.Run` is "still part of" this invocation's real work.
- Unlike a traditional always-on web server (where a background thread can plausibly keep running as long as the process itself is alive), a Function App instance can be deallocated the moment it's judged idle — especially on the Consumption plan, where minimizing running instances when there's no active work is the entire cost-saving mechanism.
- This is a much more severe version of the classic "fire-and-forget `async void`" anti-pattern in ASP.NET Core — at least a traditional web server process usually stays alive for a while after a response is sent; a Function App instance has no such guarantee at all.

## The Fix: Don't Detach the Work — Make It Durable, or Await It Properly

```csharp
// Option 1: If the work genuinely must finish before responding, just await it (accept the latency)
[FunctionName("ProcessAndRespond")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
{
    await DoBackgroundWorkAsync(); // now guaranteed to complete before the function returns
    return new OkObjectResult("Done");
}

// Option 2: If it truly needs to run asynchronously/independently, hand it off to something
// durable that survives instance recycling - e.g. queue a message for another Function to process.
[FunctionName("QueueBackgroundWork")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req,
    [Queue("background-work")] IAsyncCollector<string> queue)
{
    await queue.AddAsync("work-item-payload"); // durable - survives even if THIS instance is recycled
    return new AcceptedResult(); // 202 Accepted - a separate, queue-triggered function does the real work
}
```

- If the work genuinely must complete before the caller gets an answer, just `await` it directly — the response is slower, but correct and reliable.
- If "respond fast, do the work later" is a genuine requirement, the correct implementation is queuing the work durably (Storage Queue, Service Bus) and letting a **separate, queue-triggered function** pick it up — that queued message survives even if the original HTTP-triggered instance is recycled immediately after responding, which a detached in-memory `Task.Run` never can.

## Common Mistake

Treating Azure Functions like a traditional always-on server process where "just start a background thread" is a reasonably safe pattern. On Functions, any work that isn't awaited (or made durable via a queue/Durable Functions orchestration) has no guaranteed lifetime beyond the current invocation — the platform owes it nothing once the response has been sent.

## Summary

Detached, unawaited background work (`_ = Task.Run(...)`) inside an Azure Function has no guarantee of completing — the hosting platform can recycle the instance the moment the response is sent, silently abandoning that work with no error. Either `await` the work directly (accepting the added response latency) or make it durable by handing it off to a queue (or Durable Functions), so it survives independently of whether the original instance is still around.
