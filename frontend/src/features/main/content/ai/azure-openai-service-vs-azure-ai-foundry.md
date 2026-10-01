# What is the difference between Azure Open AI service and Azure AI Foundry?

Azure OpenAI Service is the **hosting/API layer** for OpenAI's models on Azure. Azure AI Foundry is the **broader platform** for building, evaluating, and operating full AI applications — of which Azure OpenAI models are just one ingredient.

## Short Answer

| | Azure OpenAI Service | Azure AI Foundry |
|---|---|---|
| What it is | Managed API access to OpenAI models (GPT, embeddings, DALL·E, Whisper) | End-to-end platform for building AI apps/agents |
| Scope | Model hosting + inference | Model catalog, orchestration, agents, evaluation, safety, deployment |
| Model choice | OpenAI models only | OpenAI + Microsoft + third-party/open-source models (Llama, Mistral, etc.) |
| Typical use | Call a chat/completions/embeddings endpoint directly | Build, test, and ship a full AI solution (agents, RAG, prompt flows) |

## Azure OpenAI Service

- Provides REST/SDK access to OpenAI models with Azure's enterprise features: private networking, regional deployment, RBAC, compliance certifications.
- You send a prompt, get a completion/chat response/embedding back — it's the inference layer.
- Good fit when you just need "call GPT-4o securely from my app."

## Azure AI Foundry

- A superset platform: it includes access to Azure OpenAI models **plus** a model catalog (Meta, Mistral, Cohere, Microsoft's own models), agent-building tools, prompt orchestration, evaluation, and content-safety tooling.
- Provides a project-based workspace where teams collaborate on datasets, prompt flows, fine-tuning, and agent orchestration (including MCP/tool integration).
- Includes evaluation and monitoring tools to test model/agent quality before and after deployment.

```archify
diagrams/ai-openai-vs-foundry.html
```

## When to Use Which

- Use **Azure OpenAI Service** directly when you only need raw model inference wired into an existing app with minimal extra tooling.
- Use **Azure AI Foundry** when you're building a complete AI solution — comparing models, orchestrating agents/tools, running evaluations, and managing the app lifecycle in one place.

## Real-World Example

A team building a customer support copilot starts in Azure AI Foundry: they compare GPT-4o vs. a Llama model in the catalog, build an agent with RAG over their knowledge base, evaluate answer quality, then deploy — and under the hood, when they pick the OpenAI model, calls flow through Azure OpenAI Service for inference.

## Summary

Azure OpenAI Service is the model inference API; Azure AI Foundry is the umbrella platform for building, evaluating, and shipping AI applications and agents, which includes Azure OpenAI as one of its supported model sources.
