# What is LangChain? How Do Chains, Agents, and Memory Work?

LangChain is an open-source framework for building LLM-powered applications by composing reusable building blocks — prompts, models, retrievers, tools, and memory — into pipelines ("chains") or autonomous, tool-using loops ("agents"), instead of hand-writing raw API calls and glue code for every application.

## Short Answer

LangChain gives you standard abstractions for the pieces every non-trivial LLM application ends up needing: prompt templates, a common interface across many model providers, document loaders/retrievers for RAG, memory for multi-turn conversations, and tools an LLM can call. A **chain** wires several of these steps together in a fixed sequence; an **agent** lets the LLM itself decide, at runtime, which tools to call and in what order to accomplish a goal.

## Chains: Fixed, Composable Pipelines

```python
from langchain.prompts import PromptTemplate
from langchain_openai import AzureChatOpenAI
from langchain.chains import LLMChain

prompt = PromptTemplate.from_template("Summarize this in one sentence: {text}")
llm = AzureChatOpenAI(deployment_name="gpt-4o")
chain = LLMChain(llm=llm, prompt=prompt)

result = chain.invoke({"text": long_document})
```

- A chain defines a fixed, predictable sequence of steps (format a prompt → call a model → parse the output) — the flow of control is decided by *you*, at development time, not by the model.
- Chains compose: the output of one chain can feed directly into another, building larger pipelines (e.g. retrieve documents → summarize each → combine into one final answer) out of small, reusable, independently testable pieces.

## Agents: LLM-Decided Tool Use

```python
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import tool

@tool
def get_weather(city: str) -> str:
    """Get the current weather for a city."""
    return call_weather_api(city)

@tool
def search_orders(customer_id: str) -> str:
    """Look up a customer's recent orders."""
    return query_order_database(customer_id)

agent = create_tool_calling_agent(llm, tools=[get_weather, search_orders], prompt=agent_prompt)
executor = AgentExecutor(agent=agent, tools=[get_weather, search_orders])

executor.invoke({"input": "What's the weather in Seattle, and what did customer 42 last order?"})
```

- Unlike a chain, the agent isn't told in advance which tool(s) to call — the LLM itself reads the user's request, decides which tool(s) are relevant, calls them (possibly several in sequence, using each result to decide the next step), and only then produces a final answer.
- This flexibility is also the risk: an agent's behavior is less predictable than a fixed chain, since the LLM is making runtime decisions about control flow — production agents need careful tool design (clear descriptions, tightly scoped permissions) and guardrails, not just "give it every tool and hope for the best."

## Memory: Carrying Context Across Turns

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()
# Automatically injects prior conversation turns into each new prompt,
# so the model can reference what was said earlier without you manually
# re-threading the entire conversation history through your own code.
```

- Without memory, each call to a chain/agent is stateless — the model has no idea what was discussed in a previous turn unless you explicitly re-send that history yourself.
- LangChain's memory abstractions (buffer memory, summary memory, vector-store-backed long-term memory) standardize how that conversation history is stored and re-injected, rather than every application inventing its own ad hoc history-tracking logic.

## Where LangChain Fits Next to Azure AI Foundry / MAF

LangChain is a **model-agnostic**, open-source, Python/JS-first framework — usable with Azure OpenAI, OpenAI directly, Anthropic, or open-source models interchangeably. Microsoft's own **Azure AI Foundry** and **Microsoft Agent Framework (MAF)** cover overlapping ground (orchestration, agents, tool-calling) but are more deeply integrated with the Azure ecosystem (enterprise identity, built-in evaluation/safety tooling, first-class .NET support). Many teams use LangChain for rapid prototyping and model-agnostic flexibility, then adopt MAF/Azure AI Foundry specifically for the enterprise governance, security, and .NET-native integration that come with staying inside the Azure ecosystem.

## Common Mistake

Reaching for a full agent when a simple, fixed chain would do — agents trade predictability for flexibility, and a workflow whose steps are actually always the same (retrieve, then summarize, then respond) doesn't need an LLM deciding its own control flow at runtime; a plain chain is simpler, cheaper, faster, and far easier to test and debug.

## Summary

LangChain standardizes the recurring building blocks of LLM applications — prompts, model calls, retrieval, tools, and memory — letting you compose them into fixed, predictable chains or into LLM-driven agents that decide their own tool-use at runtime. Use chains when the workflow's steps are known in advance; use agents specifically when the model genuinely needs to decide, dynamically, which tools to use and in what order.
