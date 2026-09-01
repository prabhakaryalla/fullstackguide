# .NET Minimal APIs

Minimal APIs provide a lightweight approach to building HTTP APIs in .NET.

## Basic Example

```csharp
var app = WebApplication.Create(args);

app.MapGet("/hello", () => "Hello, World!");

app.Run();
```

## Route Parameters

```csharp
app.MapGet("/items/{id}", (int id) => Results.Ok(new { Id = id }));
```
