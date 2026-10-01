# How does RAG work on Azure using Azure AI Search and Azure OpenAI?

Retrieval-Augmented Generation (RAG) grounds a language model's answers in your own private data — on Azure, this almost always means pairing **Azure AI Search** (retrieval) with **Azure OpenAI** (generation), rather than relying on the model's built-in training data alone.

## Short Answer

RAG works by retrieving the most relevant chunks of your own content for a given user question, then injecting those chunks into the prompt sent to the language model — so the model answers using your actual, current data instead of (or in addition to) whatever it happened to learn during training. On Azure, **Azure AI Search** (formerly Cognitive Search) handles the retrieval step — indexing your documents and finding the most relevant ones via vector, keyword, or hybrid search — while **Azure OpenAI** generates the final answer from the retrieved context.

## The End-to-End Flow

```
1. Ingestion (offline, ahead of time):
   Documents → chunked into passages → each chunk embedded into a vector →
   stored in an Azure AI Search index (vector field + regular searchable fields)

2. At query time:
   User question → embedded into a vector (same embedding model used for ingestion)
                 → Azure AI Search finds the most relevant chunks (vector/hybrid search)
                 → top N relevant chunks are retrieved

3. Generation:
   Retrieved chunks + user question → assembled into a prompt →
   sent to Azure OpenAI (e.g. GPT-4o) → model generates an answer grounded in the retrieved context
```

- The critical design decision is **chunking strategy** — how documents are split before embedding. Chunks too large dilute relevance (a chunk about three different topics rarely matches any one query well); chunks too small lose surrounding context the model would need to answer correctly.
- The **same embedding model** must be used for both ingestion (indexing documents) and query time (embedding the user's question) — embeddings from two different models aren't comparable, and mixing them silently breaks retrieval quality without throwing any error.

## Vector Search vs Hybrid Search in Azure AI Search

```
Vector search:    matches by semantic similarity (embedding distance) - great for
                   "find conceptually similar content," even with different wording

Keyword search:   matches by exact/fuzzy text terms - great for exact product codes,
                   names, or acronyms a vector search might miss

Hybrid search:    combines both, then re-ranks the combined results using
                   Semantic Ranker (a secondary, more precise relevance model)
```

- Pure vector search can miss exact-match needs (a specific SKU number, an acronym) that a user's embedding-based similarity might not surface strongly.
- **Hybrid search** (vector + keyword, combined and re-ranked) is generally the recommended default for production RAG on Azure — it captures both semantic similarity and exact-term matching, then uses Azure AI Search's **Semantic Ranker** to reorder results by deeper contextual relevance before they're sent to the model.

## Why RAG Instead of Just Asking the Model Directly

- The model's training data has a cutoff date and doesn't include your private, proprietary, or frequently-changing data (internal documentation, current pricing, live inventory).
- RAG lets you update the underlying data (re-index documents) without retraining or fine-tuning the model at all — the model itself never changes, only what's retrieved and injected into its prompt.
- Retrieved passages can be cited back to the user (which source document/section an answer came from) — something a model's own trained-in knowledge can't provide, since it has no memory of which specific document a fact came from.

## Common Mistake

Treating chunking and retrieval quality as an afterthought, and blaming "the model" when a RAG answer is wrong or hallucinated. In practice, the majority of poor RAG answers trace back to the retrieval step surfacing the wrong (or no) relevant chunks — the model can only ground its answer in whatever content actually made it into the prompt; it has no way to compensate for retrieval that missed the genuinely relevant passage.

## Summary

RAG on Azure pairs Azure AI Search (indexing, chunking, and retrieving relevant content via vector/hybrid search with Semantic Ranker) with Azure OpenAI (generating an answer grounded in the retrieved context) — letting an application answer questions using current, private data without retraining the underlying model. Retrieval quality (chunking strategy, hybrid search, re-ranking) is usually the actual bottleneck in RAG answer quality, far more often than the generation model itself.
