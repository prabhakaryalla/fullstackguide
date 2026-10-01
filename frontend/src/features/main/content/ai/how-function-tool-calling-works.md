# How Does Function/Tool Calling Actually Work Under the Hood?

Agents, MCP servers, and frameworks like LangChain/Semantic Kernel all rely on the same underlying capability: an LLM's ability to decide, based on a natural-language request, that it should call a specific function with specific arguments — this is "function calling" (or "tool calling"), and understanding the actual mechanism demystifies what otherwise looks like magic.

## Short Answer

The model itself never directly executes any code. Instead, you describe available functions (name, description, parameter schema) to the model alongside the user's prompt; the model, based purely on next-token prediction, generates a structured output indicating "call this function with these arguments" instead of a normal text reply; **your application code** parses that structured output, actually invokes the real function, and sends the result back to the model so it can produce a final, natural-language response incorporating that result.

## The Actual Round Trip

```
1. You send the model: the user's prompt + a list of available function definitions
   (name, description, JSON schema for parameters) - e.g. "get_weather(city: string)"

2. The model decides (based on the prompt) that calling get_weather is relevant,
   and returns a structured response like:
   { "function_call": { "name": "get_weather", "arguments": "{\"city\": \"Seattle\"}" } }
   - NOT actual text output to show the user - this is a special, structured signal

3. YOUR CODE parses this response, sees it's a function call request,
   and actually executes: get_weather(city="Seattle") → "62°F, cloudy"

4. You send the model a NEW message containing that function's result

5. The model generates a final, natural-language response incorporating the result:
   "It's currently 62°F and cloudy in Seattle."
```

- The model never runs `get_weather` itself — it has no ability to execute code at all. It only ever produces text/structured output; **every actual function execution happens in your own application code**, which you fully control (and are responsible for securing).
- This means function calling is really a **structured output format convention**, agreed upon between the model provider's API and your code — the model is trained to recognize when a described function is relevant and to emit its "I want to call this" signal in a predictable, parseable shape (typically JSON) instead of free text.

## Why the Function Description Matters So Much

```json
{
  "name": "search_orders",
  "description": "Look up a customer's order history by customer ID. Use this when the user asks about their past orders, order status, or purchase history.",
  "parameters": {
    "type": "object",
    "properties": {
      "customer_id": { "type": "string", "description": "The customer's unique ID" }
    },
    "required": ["customer_id"]
  }
}
```

- The model decides *whether* and *when* to call a function almost entirely based on the quality of its `description` — a vague or ambiguous description leads to the model either never calling a genuinely relevant function, or calling an irrelevant one at the wrong time.
- This is why well-designed tool descriptions (clear purpose, explicit "use this when...") are as important to a working agent as the function's actual implementation — poor descriptions are one of the most common real causes of "the agent isn't using my tools correctly."

## Multiple/Parallel Tool Calls

```
User: "What's the weather in Seattle, and what's my order status for order #4821?"

Model can return TWO function calls in one response:
  1. get_weather(city="Seattle")
  2. get_order_status(order_id="4821")

Your code executes both, sends both results back, model combines them into one final answer.
```

Modern models can request multiple tool calls in a single turn when a request genuinely needs several independent pieces of information — your application code is responsible for executing all of them (potentially in parallel) and returning all their results together before the model produces its final combined response.

## Common Mistake

Assuming function calling means the model has some direct capability to "reach out" and run code. It has none — every actual execution is entirely your application's responsibility, which means **you** are responsible for validating arguments the model provides (never trust them blindly, exactly like validating any other untrusted input) before executing anything with real side effects (a database write, an API call that charges money, a file deletion).

## Summary

Function/tool calling works by describing available functions to the model, letting it emit a structured "call this function with these arguments" signal instead of plain text, having your own application code actually execute that function and feed the result back, and letting the model produce a final natural-language answer incorporating that result. The model never executes anything itself — every real action, and every security/validation responsibility for that action, belongs entirely to your application code.
