# What is Vector Database? How do you store data as Vectors?

A vector database stores and searches data as high-dimensional numeric arrays (vectors), so you can find items by **meaning/similarity** instead of exact keyword matches.

## Short Answer

- Traditional databases search by exact values (`WHERE name = 'John'`).
- Vector databases search by **similarity** (`find items closest in meaning to this query`).
- Data is converted into vectors (embeddings) first, then indexed for fast nearest-neighbor search.

## Why We Need It

Keyword search fails when the words differ but the meaning is the same:

- "car" vs "automobile"
- "How to reset my password" vs "I forgot my login credentials"

Vector databases capture semantic meaning, so semantically similar items are stored close together in vector space, regardless of exact wording.

## How Data Is Stored as Vectors

1. **Raw data** (text, image, audio) is passed through an embedding model.
2. The model outputs a fixed-length array of numbers (e.g., 768 or 1536 floats), called an **embedding vector**.
3. This vector is stored in the vector database along with the original content and metadata (id, source, tags).
4. The database builds an index over these vectors for fast similarity search.

```archify
diagrams/ai-vector-db-ingestion.html
```

## How Similarity Search Works

- A query is also converted into a vector using the same embedding model.
- The database compares the query vector against stored vectors using a distance metric:
  - **Cosine similarity** — angle between vectors (most common for text).
  - **Euclidean distance** — straight-line distance.
  - **Dot product** — used when vectors are normalized.
- Because comparing against every vector (brute force) is slow at scale, vector databases use **Approximate Nearest Neighbor (ANN)** indexes like HNSW, IVF, or PQ to find the closest matches quickly.

```archify
diagrams/ai-vector-db-query-sequence.html
```

## Real-World Example

A support chatbot with a knowledge base:

1. Every help article is embedded once and stored in a vector database.
2. When a user asks "why is my payment failing?", the question is embedded too.
3. The database returns the top-K most semantically similar articles — even if they don't share the exact same words.
4. Those articles are fed to an LLM as context to generate a grounded answer (this is the core of **RAG — Retrieval-Augmented Generation**).

## Popular Vector Databases

- Pinecone, Weaviate, Milvus, Qdrant — dedicated vector databases.
- pgvector — vector extension for PostgreSQL.
- Redis, Elasticsearch, Azure AI Search — added vector search on top of existing engines.

## Summary

A vector database stores data as embeddings (numeric representations of meaning) and uses approximate nearest-neighbor search to retrieve semantically similar items quickly — this is the foundation of modern semantic search and RAG systems.
