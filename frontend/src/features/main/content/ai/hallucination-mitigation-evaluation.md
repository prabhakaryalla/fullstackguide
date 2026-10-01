# How Do You Detect and Mitigate Hallucinations, and Evaluate LLM/RAG Output Quality?

Even with RAG grounding a model in real data, LLMs can still confidently generate plausible-sounding but incorrect or unsupported statements — "hallucinations" — and a production AI system needs deliberate detection, mitigation, and evaluation strategies, not just hope.

## Short Answer

Hallucination is when a model generates content that's fluent and confident but factually wrong or unsupported by any real source. RAG reduces (but doesn't eliminate) hallucination by grounding answers in retrieved content. Mitigation combines prompt-level constraints (explicitly instructing the model to only use provided context, and to say "I don't know" when the context doesn't answer the question), architectural checks (a separate "groundedness" check comparing the answer against the retrieved sources), and systematic evaluation (metrics like faithfulness/groundedness, answer relevance, and context precision/recall, often via frameworks like RAGAS).

## Why RAG Doesn't Fully Eliminate Hallucination

```
RAG reduces hallucination by grounding the model in retrieved passages -
but the model can still:
  1. Ignore the retrieved context and answer from its own (possibly wrong) training knowledge
  2. Misread or misinterpret the retrieved context
  3. "Fill in gaps" plausibly when the retrieved context is incomplete or ambiguous
  4. Blend information from multiple retrieved chunks in a way that creates a new,
     unsupported combined claim not actually present in any single source
```

RAG changes *what information is available* to the model — it doesn't force the model to only use that information, or guarantee it interprets that information correctly.

## Prompt-Level Mitigation: Explicit Grounding Instructions

```
System: "Answer ONLY using the information in the provided context below.
If the context does not contain enough information to answer the question,
respond exactly with: 'I don't have enough information to answer that.'
Do not use any outside knowledge."

Context: {retrieved_chunks}
Question: {user_question}
```

- Explicitly instructing the model to refuse to answer when the context is insufficient (rather than letting it fall back on its own possibly-outdated or incorrect training knowledge) meaningfully reduces one common hallucination pattern — but it's a mitigation, not a guarantee; a sufficiently leading question can still sometimes cause a model to answer beyond what the context actually supports.

## Architectural Mitigation: A Separate Groundedness Check

```
1. Generate an answer from the retrieved context (as usual)
2. Run a SEPARATE call: "Does the following answer contain ONLY claims that are
   directly supported by this context? Answer Yes/No and list any unsupported claims."
3. If unsupported claims are flagged, either regenerate the answer, remove the
   unsupported portion, or surface a warning to the user.
```

- This "generate, then verify" pattern catches hallucinations *after* generation, using a second, focused check rather than relying entirely on the first generation being correct — at the cost of extra latency and cost (a second model call per response).
- Azure AI Content Safety's **Groundedness Detection** feature implements exactly this pattern as a managed service, specifically for RAG-grounded applications.

## Evaluating Quality Systematically

```
Faithfulness / Groundedness: Does the generated answer only contain claims
  actually supported by the retrieved context? (catches hallucination directly)

Answer Relevance: Does the answer actually address the user's question?
  (a factually-grounded but off-topic answer still fails the user)

Context Precision/Recall: Did retrieval actually surface the RIGHT passages?
  (a hallucination-free but wrong answer often traces back to bad retrieval,
   not a generation problem at all - see the RAG architecture topic)
```

- Frameworks like **RAGAS** compute these metrics systematically against a test set of question/expected-answer pairs, letting you track RAG quality quantitatively across changes (a new chunking strategy, a different embedding model, a prompt tweak) instead of relying purely on spot-checking a handful of examples by eye.
- Running these evaluations as part of a CI/CD pipeline — the same way you'd run unit tests — catches regressions in answer quality before they reach production, rather than discovering them from user complaints.

## Common Mistake

Treating "we added RAG" as equivalent to "we solved hallucination." RAG is a significant mitigation, not a guarantee — production systems handling anything with real consequences (medical, legal, financial guidance) typically need additional groundedness checks and systematic evaluation on top of RAG, not RAG alone.

## Summary

Hallucination is inherent to how LLMs generate text — RAG substantially reduces it by grounding answers in real content, but doesn't eliminate it, since the model can still ignore, misread, or over-extrapolate from that context. Effective mitigation combines explicit grounding instructions in the prompt, a separate architectural groundedness check after generation, and systematic evaluation (faithfulness, relevance, retrieval precision/recall via frameworks like RAGAS) run continuously, not just spot-checked occasionally by eye.
