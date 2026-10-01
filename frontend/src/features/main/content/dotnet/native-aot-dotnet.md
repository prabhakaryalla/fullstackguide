# Native AOT in .NET

Native AOT (Ahead-Of-Time) compilation compiles a .NET application directly into a fully native, self-contained executable at publish time — no JIT compiler, no .NET runtime installed on the target machine required, dramatically faster startup, at the cost of losing some of .NET's traditionally dynamic capabilities.

## Short Answer

Instead of shipping IL (Intermediate Language) that the .NET runtime JIT-compiles to native machine code the first time each method runs, Native AOT compiles the **entire application, including the parts of the runtime it needs**, directly into native machine code ahead of time, at `dotnet publish`. The result is a single native executable with near-instant startup and a smaller memory footprint, at the cost of losing runtime reflection-heavy features that depend on being able to generate/load code dynamically.

## Standard JIT vs Native AOT

```
Standard (JIT) compilation:
  Source code → IL (Intermediate Language) → shipped to target machine
  → .NET runtime installed on target machine JIT-compiles IL to native code, AT STARTUP / first use
  → requires the .NET runtime to be present on the target machine (or bundled via self-contained deployment)

Native AOT compilation:
  Source code → IL → compiled ALL THE WAY to native machine code, AT PUBLISH TIME (on the build machine)
  → ships as a single native executable
  → NO JIT step at runtime at all - the target machine doesn't need any .NET runtime installed
```

## Publishing with Native AOT

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
</PropertyGroup>
```

```bash
dotnet publish -r linux-x64 -c Release
# produces a single, self-contained native executable - no .NET runtime needed on the target machine
```

## The Real Benefits

- **Startup time**: dramatically faster — there's no JIT warm-up cost at all, since every method is already native machine code before the process even starts. This matters enormously for serverless/Lambda-style workloads billed partly on cold-start latency, and for CLI tools where instant startup is a genuine user-facing quality.
- **Memory footprint**: smaller — no JIT compiler needs to be loaded into the process, and unused code paths can be more aggressively trimmed away entirely at publish time.
- **Deployment simplicity**: a single native executable with no separate .NET runtime dependency to install/manage on the target machine.

## The Real Trade-offs

- **No runtime reflection-based code generation** — anything that relies on `Reflection.Emit`, dynamically loading assemblies at runtime, or certain forms of heavy runtime reflection (as used internally by some older serialization libraries, some ORMs, and dependency injection containers that build proxies dynamically) either doesn't work at all under Native AOT, or requires those libraries to have explicit AOT-compatible support built in.
- **Trimming requirements** — Native AOT requires the entire application (and its dependencies) to be "trim-compatible," meaning code that can't be statically analyzed (e.g., calling a method by a dynamically-constructed string name via reflection) can be silently removed at publish time if it's not properly annotated, causing runtime failures that only show up in the AOT-published build, not in normal development.
- **Platform-specific builds** — a Native AOT executable is compiled for one specific OS/architecture combination; you publish a separate build per target platform, rather than one platform-agnostic deployment that runs anywhere the .NET runtime is installed.

## When to Use It

- Serverless functions (AWS Lambda, Azure Functions) where cold-start latency directly affects cost and user-facing responsiveness.
- CLI tools where instant startup is a real, noticeable user experience factor.
- Containerized microservices where smaller image size and faster startup materially help scaling/restart behavior.
- **Not** yet a universal default — applications with heavy reliance on runtime reflection, dynamic assembly loading, or libraries without explicit AOT support may need significant changes (or aren't currently compatible at all) before they can be published with Native AOT.

## Common Mistake

Enabling Native AOT on an existing, large application without first checking whether its dependencies (ORMs, serializers, DI frameworks) have genuine AOT-compatible support — trimming/AOT-incompatible reflection usage can produce a build that "publishes successfully" but throws unexpected runtime errors for code paths the trimmer couldn't statically verify were actually needed.

## Summary

Native AOT compiles an entire .NET application to native machine code ahead of time, producing a single, runtime-independent executable with dramatically faster startup and smaller footprint — ideal for serverless functions, CLI tools, and startup-sensitive microservices. The trade-off is losing runtime reflection-based dynamic code generation and requiring the whole dependency chain to be trim/AOT-compatible, which isn't yet universal across the .NET library ecosystem.
