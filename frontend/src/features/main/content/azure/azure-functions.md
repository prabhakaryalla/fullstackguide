# Azure Functions

Azure Functions is a serverless compute service that lets you run event-driven
code without managing infrastructure.

## Triggers

- HTTP trigger
- Timer trigger
- Blob storage trigger
- Service Bus trigger

## Example: HTTP Trigger

```csharp
[FunctionName("HelloWorld")]
public static IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequest req)
{
    return new OkObjectResult("Hello, World!");
}
```
