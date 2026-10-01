# IHttpClientFactory Deep Dive: Solving HttpClient Socket Exhaustion

Instantiating `new HttpClient()` per request is one of the most common .NET performance mistakes — it silently exhausts available sockets under load. `IHttpClientFactory` exists specifically to fix this.

## Short Answer

Creating a new `HttpClient` per request and disposing it leaves the underlying TCP connection in a `TIME_WAIT` state, and under load this exhausts available sockets. `IHttpClientFactory` manages a pool of reusable `HttpMessageHandler` instances, giving you the performance of connection reuse without the DNS-staleness problems of a single static, never-disposed `HttpClient`.

## The Problem: Per-Request HttpClient

```csharp
// Anti-pattern
using (var httpClient = new HttpClient())
{
    var response = await httpClient.GetAsync(apiUrl);
    return await response.Content.ReadAsStringAsync();
}
```

- Disposing an `HttpClient` doesn't immediately close its underlying socket — the connection lingers in `TIME_WAIT` for a period of time.
- Under sustained load, sockets are consumed faster than they're released, eventually causing `SocketException: Only one usage of each socket address is normally permitted` or similar exhaustion errors.

```archify
diagrams/dotnet-socket-exhaustion.html
```

## The "Obvious" Fix That Has Its Own Problem

```csharp
private static readonly HttpClient _httpClient = new HttpClient(); // reused for app lifetime
```

- Reusing one static `HttpClient` solves socket exhaustion, but introduces a **DNS staleness** problem: the underlying connection can keep pointing at a stale IP address even after the target's DNS record changes, since the connection isn't re-resolved for as long as it stays open.

## The Fix: IHttpClientFactory

```csharp
// Program.cs
builder.Services.AddHttpClient();
```

```csharp
public class WeatherController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    public WeatherController(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

    [HttpGet]
    public async Task<string> Get(string city)
    {
        var httpClient = _httpClientFactory.CreateClient();
        var response = await httpClient.GetAsync($"https://api.weather.com/v1/current.json?q={city}");
        return await response.Content.ReadAsStringAsync();
    }
}
```

- `IHttpClientFactory` manages a pool of `HttpMessageHandler` instances internally, periodically recycling them (default: every 2 minutes) — giving you connection reuse **and** fresh DNS resolution, solving both problems simultaneously.

## Named Clients

```csharp
builder.Services.AddHttpClient("weather", client =>
{
    client.BaseAddress = new Uri("https://api.weather.com/v1/");
});
```

```csharp
var httpClient = _httpClientFactory.CreateClient("weather");
var response = await httpClient.GetAsync("current.json?q=Seattle");
```

- Useful when different external APIs need different base addresses, default headers, or timeouts, without hardcoding the name as a string sprinkled across the codebase (see Typed Clients below for an even better approach).

## Typed Clients (Recommended Pattern)

```csharp
public interface IWeatherService
{
    Task<string> GetAsync(string city);
}

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    public WeatherService(HttpClient httpClient) => _httpClient = httpClient;

    public async Task<string> GetAsync(string city)
    {
        var response = await _httpClient.GetAsync($"current.json?q={city}");
        return await response.Content.ReadAsStringAsync();
    }
}
```

```csharp
builder.Services.AddHttpClient<IWeatherService, WeatherService>(client =>
{
    client.BaseAddress = new Uri("https://api.weather.com/v1/");
});
```

```csharp
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;
    public WeatherController(IWeatherService weatherService) => _weatherService = weatherService;

    [HttpGet]
    public Task<string> Get(string city) => _weatherService.GetAsync(city);
}
```

- Encapsulates the external API call behind a dedicated service class with its own interface — no magic strings for client names, easily mockable in unit tests, and the controller no longer needs to know any HTTP details at all.

## Generated Clients

- `IHttpClientFactory` integrates with libraries like **Refit**, which generates a full typed HTTP client implementation from an interface decorated with route attributes — removing even the manual `HttpClient` call code shown above.

## Summary

Creating a new `HttpClient` per call exhausts sockets under load; a single static `HttpClient` avoids that but risks stale DNS. `IHttpClientFactory` solves both by pooling and periodically recycling handlers internally. Prefer the **Typed Client** pattern — injecting `HttpClient` into a dedicated service class registered via `AddHttpClient<TInterface, TImplementation>` — for the cleanest, most testable, and most maintainable usage.
