# What is MCP? How do you develop MCP server using .NET?

MCP (Model Context Protocol) is an open standard that lets AI clients (assistants, IDEs, agents) discover and invoke external tools, resources, and prompts through one consistent protocol instead of a custom integration per service.

## Short Answer

- MCP defines a client-server contract: an **MCP client** (e.g., an AI assistant) talks to one or more **MCP servers**, each exposing tools/resources.
- Communication happens over a transport such as stdio (local process) or HTTP/SSE (remote server).
- Building an MCP server means implementing that contract so any MCP-compatible client can call your tools.

## Core MCP Concepts

- **Tools** — callable functions the client can invoke (e.g., `getWeather(city)`).
- **Resources** — readable data the client can fetch (e.g., a file, a config value).
- **Prompts** — reusable prompt templates the server can expose.
- **Transport** — how messages move (stdio for local dev, HTTP/SSE or streamable HTTP for remote/hosted servers).

```archify
diagrams/ai-mcp-client-server.html
```

## Developing an MCP Server in .NET

Microsoft publishes an official C# SDK, `ModelContextProtocol`, that integrates with the standard .NET hosting model.

### 1. Create the project

```bash
dotnet new console -n MyMcpServer
cd MyMcpServer
dotnet add package ModelContextProtocol --prerelease
dotnet add package Microsoft.Extensions.Hosting
```

### 2. Define a tool

```csharp
using System.ComponentModel;
using ModelContextProtocol.Server;

[McpServerToolType]
public static class WeatherTools
{
    [McpServerTool, Description("Gets the current weather for a city.")]
    public static string GetWeather(string city) =>
        $"The weather in {city} is sunny, 24°C.";
}
```

### 3. Wire up the host

```csharp
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithToolsFromAssembly();

await builder.Build().RunAsync();
```

- `WithStdioServerTransport()` runs the server over standard input/output — ideal for local tools launched by an IDE/assistant.
- For a hosted/remote server, use `WithHttpTransport()` (ASP.NET Core) instead, so clients connect over HTTP/SSE.

### 4. Register the server with a client

Most MCP clients (VS Code, Claude Desktop, custom agents) read a config pointing at your server executable:

```json
{
  "servers": {
    "my-mcp-server": {
      "command": "dotnet",
      "args": ["run", "--project", "MyMcpServer"]
    }
  }
}
```

Once registered, the client discovers `GetWeather` automatically and can call it during a conversation.

## Sequence: Tool Call Flow

```archify
diagrams/ai-mcp-dotnet-sequence.html
```

## Real-World Example

A company exposes internal APIs (ticket system, deployment status, knowledge base) as an MCP server written in .NET. Any MCP-aware assistant (VS Code Copilot Chat, a custom agent) can then query ticket status or trigger a deployment check — without the company building a separate plugin for every AI tool.

## Summary

MCP standardizes how AI clients discover and call external capabilities. In .NET, the `ModelContextProtocol` SDK lets you expose existing services as MCP tools/resources with a few attributes and a hosted server, making your APIs usable by any MCP-compatible AI client.
