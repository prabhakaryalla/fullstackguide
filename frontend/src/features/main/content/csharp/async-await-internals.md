# Internals of the C# Async/Await Mechanism

This topic explains what the C# compiler and runtime do behind async and await.

## High-Level Idea

When you mark a method with async and use await, the compiler transforms the method into a state machine.

That state machine:

- Pauses when an awaited operation is incomplete.
- Registers a continuation to resume later.
- Restores execution at the next state.
- Completes a Task or Task<T> when finished.

## From Source Code to State Machine

### Input code

```csharp
public async Task<int> GetLengthAsync(HttpClient client)
{
    string text = await client.GetStringAsync("https://example.com");
    return text.Length;
}
```

### Conceptual rewrite (simplified)

```csharp
private struct GetLengthAsyncStateMachine : IAsyncStateMachine
{
    public int _state;
    public AsyncTaskMethodBuilder<int> _builder;
    public HttpClient _client;

    private TaskAwaiter<string> _awaiter;

    public void MoveNext()
    {
        int result;
        try
        {
            if (_state == -1)
            {
                var task = _client.GetStringAsync("https://example.com");
                _awaiter = task.GetAwaiter();

                if (!_awaiter.IsCompleted)
                {
                    _state = 0;
                    _builder.AwaitUnsafeOnCompleted(ref _awaiter, ref this);
                    return;
                }
            }

            if (_state == 0)
            {
                // resumed after await completed
            }

            string text = _awaiter.GetResult();
            result = text.Length;
        }
        catch (Exception ex)
        {
            _builder.SetException(ex);
            return;
        }

        _builder.SetResult(result);
    }

    public void SetStateMachine(IAsyncStateMachine stateMachine) { }
}
```

This is not exact generated code, but it shows the mechanics.

## Core Pieces Involved

### 1. IAsyncStateMachine

The generated type implements IAsyncStateMachine and exposes:

- MoveNext: runs method logic and state transitions.
- SetStateMachine: runtime plumbing for builder integration.

### 2. AsyncTaskMethodBuilder / AsyncTaskMethodBuilder<T>

The builder manages:

- Creating the Task seen by callers.
- Completing the Task with SetResult or SetException.
- Scheduling continuation wiring through AwaitOnCompleted or AwaitUnsafeOnCompleted.

### 3. Awaiter Pattern

Any awaitable type must provide an awaiter with:

- IsCompleted
- OnCompleted or UnsafeOnCompleted
- GetResult

Task and ValueTask provide awaiters out of the box.

## Continuation Scheduling and Context Capture

By default, await captures current context:

- In UI apps, continuation usually returns to UI thread.
- In ASP.NET Core, there is no SynchronizationContext by default, so continuation may run on any thread-pool thread.

ConfigureAwait(false) tells await not to capture context:

```csharp
await ioTask.ConfigureAwait(false);
```

This can reduce context-switch overhead and avoid deadlock patterns in legacy sync-over-async code.

## Exception Flow Internals

Exceptions inside async methods are stored in the returned Task.

- Throw before first await: still observed via Task for async Task methods.
- Throw after await: captured and stored when continuation runs.
- await task re-throws the stored exception.

Example:

```csharp
public async Task<string> ReadAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("Failure");
}

// Caller side
try
{
    await ReadAsync();
}
catch (InvalidOperationException ex)
{
    Console.WriteLine(ex.Message);
}
```

## Why async void Is Special

async void does not return Task, so:

- Caller cannot await completion.
- Exceptions are raised to synchronization context and are harder to compose.

Use async void only for event handlers.

## Allocation and Performance Notes

Async machinery can allocate due to:

- State machine boxing in some paths.
- Task objects.
- Captured locals/closures.

Optimization patterns:

- Return Task directly when no await is needed.
- Use ValueTask in high-throughput hot paths when appropriate.
- Avoid unnecessary async/await wrappers.

Example wrapper to avoid:

```csharp
public async Task<int> GetAsync()
{
    return await _service.GetAsync();
}
```

Prefer:

```csharp
public Task<int> GetAsync()
{
    return _service.GetAsync();
}
```

## End-to-End Execution Flow

1. Caller invokes async method.
2. Compiler-generated state machine starts in state -1.
3. On incomplete await, method stores state and returns Task to caller.
4. Awaiter schedules continuation to MoveNext.
5. MoveNext resumes at saved state.
6. Final result or exception is pushed into builder Task.

## Real-World Analogy

Think of async/await like a restaurant order tracker.

- The order ticket is the state machine.
- Each cooking station completion is an awaited operation.
- When one step is pending, the ticket is parked.
- When the station signals done, the ticket continues from that exact step.
- Final plated dish is Task completion.
