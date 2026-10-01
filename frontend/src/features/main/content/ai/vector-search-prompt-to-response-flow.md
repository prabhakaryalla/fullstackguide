# How does Vector Search work when a user sends a prompt? Explain Complete flow from the user prompt to final response?

This describes the full **RAG (Retrieval-Augmented Generation)** pipeline: how a user's question travels through embedding, vector search, and an LLM to produce a grounded final answer.

## Short Answer

1. User's prompt is converted into a vector (embedding).
2. That vector is compared against a vector database of pre-embedded documents.
3. The most similar chunks are retrieved and injected into the LLM's context.
4. The LLM generates a final answer grounded in that retrieved content.

## Complete End-to-End Flow

```archify
diagrams/ai-rag-sequence.html
```

## Step-by-Step Breakdown

### 1. Ingestion (happens before any user query)

- Source documents (docs, PDFs, tickets, wiki pages) are split into chunks.
- Each chunk is passed through an embedding model to produce a vector.
- Vectors + original text + metadata (source, title, page) are stored in a vector database.

### 2. User Sends a Prompt

- The raw prompt text is captured by the application layer.

### 3. Prompt Embedding

- The **same embedding model** used during ingestion converts the prompt into a query vector. Using a different model here would make the vectors incomparable.

### 4. Vector Similarity Search

- The vector database computes similarity (cosine similarity, dot product, etc.) between the query vector and stored vectors.
- An ANN index (HNSW/IVF) returns the top-K closest chunks quickly, even across millions of vectors.

### 5. Context Assembly (Augmentation)

- The application builds a final prompt: the user's question + the retrieved chunks + system instructions (e.g., "answer only using the provided context").

### 6. LLM Generation

- The LLM reads the augmented prompt and generates a response, drawing on both its trained knowledge and the retrieved context.

### 7. Response Returned to User

- The application may also return citations/source links alongside the generated answer for transparency.

```archify
diagrams/ai-rag-prompt-flow.html
```

## Real-World Example

An internal HR chatbot:

1. All HR policy documents are chunked and embedded once, stored in a vector database.
2. An employee asks: "How many sick days do I get after 2 years?"
3. The question is embedded and matched against policy chunks — the "leave policy" section is retrieved.
4. That section is added to the LLM prompt, and the model answers using the actual policy text instead of guessing — reducing hallucination and keeping answers current without retraining the model.

## Common Pitfalls

- Using different embedding models for ingestion vs. query time (vectors become incomparable).
- Chunking documents too large (dilutes relevance) or too small (loses context).
- Not returning source citations, making answers hard to verify.
- Skipping re-ranking — sometimes a lightweight re-ranker improves the top-K results before sending them to the LLM.

## Summary

Vector search bridges a user's natural-language prompt and a knowledge base by comparing embeddings, not keywords. The complete flow — embed, search, augment, generate — is the backbone of RAG systems that let LLMs answer questions grounded in your own data.
