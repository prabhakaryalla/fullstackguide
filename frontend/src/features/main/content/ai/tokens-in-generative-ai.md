# What are Tokens in Generative AI? How tokens are related to input, output, context window and cost?

A token is the basic unit of text an LLM reads and generates — roughly a word, part of a word, or punctuation mark. Everything an LLM does — reading your prompt, thinking, and answering — is measured and billed in tokens.

## Short Answer

- Text is broken into tokens before being fed to the model (a process called tokenization).
- **Input tokens** = your prompt + any context (retrieved documents, chat history).
- **Output tokens** = the model's generated response.
- **Context window** = the maximum combined input + output tokens the model can handle in one request.
- **Cost** is typically billed per 1,000 (or per million) tokens, separately for input and output.

## How Tokenization Works

- A word like "cat" might be one token; a longer or rarer word like "unbelievable" might split into multiple tokens (`un`, `believ`, `able`).
- As a rough rule of thumb in English: **1 token ≈ 4 characters ≈ ¾ of a word**.

```archify
diagrams/ai-tokenization-example.html
```

## Input, Output, and Context Window

```archify
diagrams/ai-context-window.html
```

- The **context window** is a hard limit — input tokens + output tokens together cannot exceed it.
- If your prompt (input) is very long (e.g., a large document pasted in), fewer tokens remain available for the model's response.
- Exceeding the context window means older messages must be truncated/summarized, or the request fails.

## Relationship to Cost

- Most providers (OpenAI, Azure OpenAI) price input and output tokens **separately**, with output tokens usually costing more than input tokens (generation is more compute-intensive than reading).
- Cost formula (simplified):

$$\text{Total Cost} = (\text{input tokens} \times \text{price}_{\text{input}}) + (\text{output tokens} \times \text{price}_{\text{output}})$$

- Larger context windows let you send more history/documents per call, but every extra token — even unused chat history — adds to cost and latency.

## Practical Implications

- **Long chat histories** accumulate input tokens on every turn (the whole conversation is usually re-sent), so costs grow as a conversation continues.
- **RAG systems** add retrieved document chunks as input tokens — more chunks = more accurate context but higher cost and risk of hitting the context window limit.
- **Verbose prompts/responses** directly increase cost; concise system prompts and `max_tokens` limits help control spend.
- Providers often expose `prompt_tokens`, `completion_tokens`, and `total_tokens` in the API response so you can monitor usage per call.

## Real-World Example

A support chatbot with a 20-turn conversation and a 2,000-token system prompt: by turn 20, the input tokens sent on every call include the system prompt + all prior turns, which can silently balloon into thousands of tokens per request — increasing both cost and the risk of exceeding the context window, unless older turns are summarized or trimmed.

## Summary

Tokens are the unit of measurement for everything an LLM processes: your input (prompt + context) and its output (response) both consume tokens, both count against the model's fixed context window, and both are billed — usually at different rates — making token-awareness essential for both correctness and cost control.
