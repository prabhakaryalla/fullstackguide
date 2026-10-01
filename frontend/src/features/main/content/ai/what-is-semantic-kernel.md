# What is Semantic Kernel? How Does It Differ From LangChain?

Semantic Kernel is Microsoft's own open-source SDK for building AI applications and agents — it plays a similar role to LangChain, but is designed with enterprise .NET/C# development, native Azure integration, and long-term stability/versioning guarantees as first-class concerns from the start.

## Short Answer

Semantic Kernel lets you define **plugins** (functions the model can call, whether native code or prompt-based "semantic functions"), orchestrate them via **planners**/function-calling, and maintain conversational **memory** — the same core building blocks LangChain provides, but built with a strong emphasis on enterprise-grade .NET support, dependency injection integration, and being a stable, Microsoft-maintained foundation for production Azure applications specifically.

## Plugins: The Core Building Block

```csharp
public class WeatherPlugin
{
    [KernelFunction, Description("Gets the current weather for a city")]
    public string GetWeather(string city) => CallWeatherApi(city);
}

var kernel = Kernel.CreateBuilder()
    .AddAzureOpenAIChatCompletion("gpt-4o", endpoint, apiKey)
    .Build();

kernel.Plugins.AddFromType<WeatherPlugin>();

var result = await kernel.InvokePromptAsync(
    "What's the weather like in Seattle?",
    new(new OpenAIPromptExecutionSettings { FunctionChoiceBehavior = FunctionChoiceBehavior.Auto() }));
```

- A **plugin** groups related functions (native C# methods decorated with `[KernelFunction]`, or prompt templates) that the model can discover and call — conceptually equivalent to LangChain's "tools."
- `FunctionChoiceBehavior.Auto()` lets the model decide, at runtime, whether and which registered functions to call to answer the prompt — the same underlying idea as LangChain's tool-calling agents, expressed through Semantic Kernel's own API surface.

## Why Microsoft Built a Second Framework Instead of Just Using LangChain

- **First-class .NET support** — Semantic Kernel is designed around C#/.NET idioms (dependency injection, strongly-typed plugins, native integration with `IServiceCollection`) rather than being a Python-first framework with a secondary .NET port.
- **Enterprise stability guarantees** — Microsoft maintains Semantic Kernel with the same versioning/support discipline as its other enterprise SDKs, which matters for organizations that need predictable, long-term-supported dependencies rather than a fast-moving open-source project's frequent breaking changes.
- **Deep Azure integration** — native, well-supported connectors for Azure OpenAI, Azure AI Search, and other Azure services, maintained directly by the teams that build those services.

## Semantic Kernel vs LangChain: A Practical Comparison

| | Semantic Kernel | LangChain |
|---|---|---|
| Primary language focus | C#/.NET (also supports Python, Java) | Python/JS-first |
| Backing | Microsoft, enterprise support model | Open-source community-driven |
| Best fit | .NET-heavy enterprise teams, deep Azure integration | Rapid prototyping, broadest model/tool ecosystem, Python-first teams |
| Core concepts | Plugins, Planners, Kernel | Chains, Agents, Tools |

## Where This Fits With MAF (Microsoft Agent Framework)

Microsoft's newer **Microsoft Agent Framework (MAF)** explicitly combines ideas from Semantic Kernel (enterprise plugin/state model) and AutoGen (multi-agent orchestration) into one unified SDK — Semantic Kernel isn't being replaced overnight, but MAF represents Microsoft's current direction for consolidating agent-building efforts into a single framework going forward.

## Common Mistake

Assuming Semantic Kernel and LangChain are simply interchangeable "pick either one" choices with no real difference — the actual decision usually comes down to your team's language/stack (.NET vs Python-first), how deeply you're already invested in the Azure ecosystem, and whether you need Microsoft's enterprise support/versioning guarantees over the broader (but faster-moving) open-source LangChain ecosystem.

## Summary

Semantic Kernel is Microsoft's enterprise-focused answer to the same problem LangChain solves — composing LLM calls, tools, and memory into working applications — built with .NET-first support and deep Azure integration as core design goals. Choose it over LangChain specifically when enterprise support guarantees, native .NET idioms, or tight Azure ecosystem integration matter more than LangChain's broader, faster-moving open-source tooling.
