# Prompt Engineering Techniques: Few-Shot, Chain-of-Thought, and System Prompt Design

How you phrase a prompt measurably changes an LLM's output quality — prompt engineering is the practice of deliberately structuring instructions, examples, and reasoning steps to reliably get better, more consistent results, rather than treating the model as a black box you poke at randomly.

## Short Answer

**Zero-shot** prompting gives the model just an instruction, with no examples. **Few-shot** prompting includes a handful of example input/output pairs directly in the prompt, showing the model the exact pattern you want. **Chain-of-thought (CoT)** prompting explicitly asks the model to reason step by step before giving a final answer, which measurably improves accuracy on multi-step reasoning tasks. **System prompt design** is about setting the model's persistent role, constraints, and behavior for the entire conversation, separate from the user's actual per-turn requests.

## Zero-Shot vs Few-Shot

```
Zero-shot:
"Classify the sentiment of this review as Positive, Negative, or Neutral: {review}"

Few-shot:
"Classify the sentiment of each review.

Review: 'This product broke after one day.' → Negative
Review: 'Works exactly as described, very happy.' → Positive
Review: 'It's okay, does the job.' → Neutral

Review: '{review}' → "
```

- Few-shot examples show the model the *exact* expected output format and boundary cases (what counts as "Neutral" vs "Negative"), which is often far more reliable than describing the classification rule in prose alone — especially for tasks where the desired output format is specific or unusual.
- The trade-off: every example consumes tokens on every single call, adding cost and using up context window space that could otherwise hold more actual content (like retrieved RAG context).

## Chain-of-Thought Prompting

```
Without CoT:
"A store had 23 apples. They sold 15 and then received a shipment of 8 more. How many apples do they have now?"
→ (the model may jump straight to an answer, sometimes getting arithmetic wrong)

With CoT:
"...Think through this step by step before giving your final answer."
→ "23 - 15 = 8 remaining. 8 + 8 = 16. Final answer: 16"
```

- Explicitly instructing the model to reason step-by-step (or providing few-shot examples that themselves show step-by-step reasoning) measurably improves accuracy on arithmetic, logic, and multi-step reasoning tasks — the model effectively "shows its work," and generating that intermediate reasoning changes (and generally improves) the final answer compared to jumping straight to a conclusion.
- Modern "reasoning" models (like OpenAI's o-series) build this step-by-step reasoning into the model's own generation process internally — but for standard chat models, explicitly asking for step-by-step reasoning in the prompt remains a simple, effective, and very commonly used technique.

## System Prompt Design

```
System: "You are a customer support assistant for Acme Corp. Only answer questions about
Acme products and orders. If asked about anything else, politely decline and redirect
to the topic. Never reveal internal pricing formulas. Always respond in a professional,
friendly tone. Cite the specific policy/document when providing return/refund information."

User: "What's your return policy?"
```

- The system prompt sets **persistent** behavior, scope, tone, and constraints that apply across the entire conversation — separate from the user's specific per-turn question, and generally given more "weight" by well-aligned models than user-provided instructions attempting to override it.
- Good system prompt design is explicit about **boundaries** (what NOT to do — reveal pricing formulas, discuss unrelated topics) as much as what TO do — vague, purely positive instructions ("be helpful") leave more room for the model to drift off-scope than explicit constraints do.

## Common Mistake

Treating prompt engineering as a one-time task rather than an iterative, testable process — small wording changes can meaningfully shift output quality, so production prompts should be evaluated against a real test set of representative inputs (and regression-tested when the prompt or underlying model changes), not just "written once and assumed to work."

## Summary

Few-shot prompting shows the model exactly the pattern you want via concrete examples, at the cost of extra tokens per call. Chain-of-thought prompting measurably improves multi-step reasoning accuracy by having the model reason explicitly before answering. System prompt design sets the model's persistent role, scope, and hard constraints for an entire conversation, separate from individual user turns. All three are practical, evaluable techniques — not vague "prompt magic" — and should be tested against real inputs like any other part of the application.
