# Global Exception Handling Middleware in ASP.NET Core

Handling exceptions individually inside every controller action leads to duplicated try/catch logic and inconsistent error responses. Global exception-handling middleware centralizes this into one place that every request passes through.

## Short Answer

Write a custom middleware that wraps the rest of the pipeline in a `try/catch`, converts any unhandled exception into a consistent, structured error response (correct status code, JSON error body), and logs it — registered once, near the top of the pipeline, instead of repeated per-action error handling.

## Implementation

```csharp
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "Unhandled exception processing {Path}", context.Request.Path);

        context.Response.ContentType = "application/json";

        var (statusCode, message) = exception switch
        {
            ApplicationException ex when ex.Message.Contains("Invalid Token") => (StatusCodes.Status403Forbidden, ex.Message),
            ApplicationException ex => (StatusCodes.Status400BadRequest, ex.Message),
            KeyNotFoundException => (StatusCodes.Status404NotFound, "Resource not found"),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred"),
        };

        context.Response.StatusCode = statusCode;
        var result = System.Text.Json.JsonSerializer.Serialize(new { success = false, message });
        await context.Response.WriteAsync(result);
    }
}
```

```csharp
// Program.cs — register early, so it wraps everything after it
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
```

## Where This Fits in the Pipeline

```archify
diagrams/dotnet-exception-middleware.html
```

- Placing the exception handler near the very top of the pipeline ensures it can catch exceptions thrown by *any* downstream middleware or controller action, not just a subset.

## Alternative: Built-In Exception Handler Middleware

```csharp
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
        var exception = exceptionHandlerFeature?.Error;

        await context.Response.WriteAsync(
            System.Text.Json.JsonSerializer.Serialize(new { success = false, message = "An unexpected error occurred" }));
    });
});
```

- `UseExceptionHandler` is a built-in ASP.NET Core middleware achieving the same goal without a fully custom middleware class — a good default choice unless you need very specific per-exception-type behavior like the custom version above.

## Common Mistake

Registering the exception-handling middleware **after** other middleware that might throw (e.g., after `UseAuthorization()`), which means exceptions thrown by that earlier middleware bypass the handler entirely and produce the framework's default (often unhelpful) error page instead of your structured response.

## Real-World Example

An API returns `400 Bad Request` with a clear message when a custom `ApplicationException` (business rule violation) is thrown, `404 Not Found` for a `KeyNotFoundException` (missing resource), and a generic `500` with no internal details exposed for anything else — giving API consumers consistent, predictable error shapes regardless of which controller or service threw the exception, while internal exception details are only ever logged, never leaked to the client.

## Summary

Global exception-handling middleware centralizes error-to-HTTP-response translation in one place near the top of the pipeline, ensuring every unhandled exception — from any controller or downstream middleware — produces a consistent, correctly-status-coded, and properly logged response instead of scattered try/catch blocks or inconsistent error formats across the API.
