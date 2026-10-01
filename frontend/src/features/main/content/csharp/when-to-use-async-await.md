# Async and Await — When to Use

`async`/`await` shines for I/O-bound work — anything that spends time waiting on something external (network, disk, database) rather than actively using the CPU. Using it for CPU-bound work doesn't help, and can even hurt.

## Short Answer

Use `async`/`await` for: API calls, database calls, file operations, and external service integrations — anywhere the thread would otherwise sit idle waiting for a response. Avoid it for CPU-intensive computation, where the thread is actively busy and `async` provides no benefit (use parallelism instead — see the Parallel Programming topic).

## Good Use Cases

```csharp
// API call
public async Task<WeatherData> GetWeatherAsync(string city)
{
    var response = await _httpClient.GetAsync($"/weather?city={city}");
    return await response.Content.ReadFromJsonAsync<WeatherData>();
}

// Database call
public async Task<List<User>> GetActiveUsersAsync()
{
    return await _dbContext.Users.Where(u => u.IsActive).ToListAsync();
}

// File operation
public async Task<string> ReadConfigAsync(string path)
{
    return await File.ReadAllTextAsync(path);
}
```

```archify
diagrams/async-await-sequence.html
```

- While waiting on the database/API/disk, the thread isn't blocked spinning — it's released back to the thread pool to serve other requests, then resumes once the result is ready. This is what makes async valuable for scalability in a server application.

## When NOT to Use Async — CPU-Intensive Work

```csharp
// Anti-pattern — async provides no benefit here; the CPU is actively busy the whole time
public async Task<int> CalculateHashAsync(byte[] data)
{
    return await Task.Run(() => ExpensiveHashComputation(data)); // still consumes a thread-pool thread doing real work
}
```

- Wrapping CPU-bound work in `Task.Run`/`async` doesn't make it faster — it just moves the work to a different thread. It can even add overhead (context switching, thread-pool scheduling) without any scalability benefit, since the thread is busy computing, not waiting.
- For genuinely CPU-bound work, use **parallelism** (`Parallel.For`, PLINQ, `Task.Run` for offloading from a UI thread) — a different tool solving a different problem (see the Parallel Programming topic for the distinction).

## Decision Table

| Scenario | Use Async? |
|---|---|
| Calling a REST API | Yes |
| Querying a database | Yes |
| Reading/writing a file | Yes |
| Calling another microservice | Yes |
| Computing a hash/checksum over large data | No — CPU-bound, use parallelism if needed |
| Image processing/resizing | No — CPU-bound |
| Sorting a huge in-memory array | No — CPU-bound |

## Common Mistake

Sprinkling `async`/`Task.Run` around CPU-bound code because "async is supposed to make things faster." Async improves **scalability/responsiveness** for I/O-bound work by freeing up threads while waiting — it does not make computation itself execute any faster.

## Real-World Example

An order processing API: fetching the order from the database, calling a payment gateway API, and writing an audit log entry are all `await`ed — the thread is freed during each of those waits, letting the server handle many concurrent orders with a small thread pool. But calculating a shipping cost estimate via a CPU-heavy pricing algorithm is done synchronously (or parallelized with `Parallel.For` if it can be split into independent chunks), since wrapping it in `async` wouldn't make the calculation itself any faster.

## Summary

Reach for `async`/`await` whenever your code is waiting on something external — API calls, database calls, file I/O, or other service integrations — since it frees the thread during that wait, improving throughput and responsiveness. Avoid it for CPU-bound work, where the thread is genuinely busy and only true parallelism (not async) can speed things up.
