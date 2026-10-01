# What is MAF? What are its Key Components and use Cases?

MAF (Microsoft Agent Framework) is Microsoft's unified framework for building, orchestrating, and running AI agents — combining ideas from Semantic Kernel (enterprise-grade plugins/state) and AutoGen (multi-agent orchestration) into one SDK.

## Short Answer

- MAF gives you a standard way to define an **agent** (LLM + instructions + tools), connect it to models/tools, and orchestrate **multiple agents** working together.
- It targets both simple single-agent assistants and complex multi-agent workflows (planning, delegation, review loops).
- Available for .NET and Python, with first-class support for connecting to MCP servers, plugins, and enterprise identity/security.

## Key Components

```archify
diagrams/ai-maf-components.html
```

- **Agent** — the core unit: a model, a system prompt/instructions, and a set of tools it's allowed to call.
- **Tools/Plugins** — functions, APIs, or MCP servers an agent can invoke to take action or fetch data.
- **Memory/State** — short-term conversation context plus optional long-term memory (vector store-backed).
- **Orchestration patterns** — ways multiple agents collaborate:
  - **Sequential** — agents run one after another, passing output forward.
  - **Hand-off** — one agent delegates to a more specialized agent.
  - **Group chat / concurrent** — multiple agents discuss or work in parallel, then converge on a result.
- **Model connectors** — pluggable backends (Azure OpenAI, OpenAI, other providers).
- **Observability/security** — built-in hooks for logging, tracing, content filtering, and identity (so agents run under enterprise auth policies).

## Use Cases

- **Customer support copilot** — one agent classifies intent, hands off to a specialized billing or technical-support agent.
- **Research/report generation** — a "researcher" agent gathers data, a "writer" agent drafts the report, a "reviewer" agent critiques it before final output.
- **DevOps automation** — an agent with tools to query deployment status, roll back a release, or open a ticket, all gated by enterprise auth.
- **Data analysis pipelines** — an orchestrator coordinates a "query" agent (SQL), a "chart" agent (visualization), and a "summarizer" agent.

## Sequence: Multi-Agent Hand-off

```archify
diagrams/ai-maf-triage-sequence.html
```

## Real-World Example

An enterprise IT helpdesk uses MAF to run a triage agent that reads an employee's request, then hands off to either a "password reset" agent (with a tool that calls the identity API) or an "hardware request" agent (with a tool that opens a procurement ticket) — all under the same auditable, policy-controlled framework.

## Summary

MAF provides the building blocks — agents, tools, memory, and orchestration patterns — needed to move from single-prompt LLM calls to coordinated, tool-using, multi-agent systems, with enterprise concerns like security and observability built in from the start.
