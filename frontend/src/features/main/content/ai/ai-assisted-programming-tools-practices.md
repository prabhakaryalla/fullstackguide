# AI-Assisted Programming: Tools, Use Cases, and Best Practices

AI coding assistants (GitHub Copilot, Cursor, Claude, ChatGPT, Amazon Q) have become a standard part of the modern development workflow — not as a replacement for engineering judgment, but as an accelerator for well-scoped, verifiable tasks.

## Short Answer

Use AI assistants to speed up code generation, test writing, refactoring, SQL generation, and documentation — but always validate the output yourself and run a security review before anything reaches production. AI accelerates typing and pattern application; it does not replace understanding what the code does.

## Common Tools

| Tool | Typical Strength |
|---|---|
| GitHub Copilot | In-editor inline completions and chat, deeply integrated with VS Code/JetBrains |
| Microsoft Copilot | Cross-app assistant (Office, Windows) with some coding capability |
| ChatGPT | General-purpose reasoning, explanation, brainstorming |
| Cursor | AI-native editor built around multi-file, agentic code changes |
| Claude | Strong at longer-context reasoning and following detailed instructions |
| Amazon Q | AWS-integrated assistant, strong for AWS-specific code/infra |

## Practical Use Cases

### 1. Code Generation

```csharp
// Prompt: "Generate a method that paginates a list of orders by page index and size"
public IEnumerable<Order> GetPagedOrders(List<Order> orders, int pageIndex, int pageSize)
{
    return orders.Skip(pageIndex * pageSize).Take(pageSize);
}
```

- Fastest win for boilerplate: DTOs, CRUD scaffolding, repetitive mapping code.

### 2. Unit Test Generation

```csharp
// AI-generated starting point — still needs review for edge cases and assertions
[Fact]
public void GetPagedOrders_ReturnsCorrectPage()
{
    var orders = Enumerable.Range(1, 25).Select(i => new Order { Id = i }).ToList();
    var result = _service.GetPagedOrders(orders, pageIndex: 1, pageSize: 10);
    Assert.Equal(10, result.Count());
    Assert.Equal(11, result.First().Id);
}
```

- AI is good at generating the *shape* of test coverage quickly — a developer still needs to verify it tests the right behavior and edge cases (nulls, empty collections, boundary values).

### 3. Refactoring

- "Extract this method," "convert this callback chain to async/await," "simplify this nested conditional" — AI assistants handle mechanical refactors quickly, especially across a single file or a well-defined scope.

### 4. SQL Generation

```sql
-- Prompt: "Write a query to find customers with more than 5 orders in the last 30 days"
SELECT c.CustomerId, COUNT(o.Id) AS OrderCount
FROM Customers c
JOIN Orders o ON o.CustomerId = c.CustomerId
WHERE o.CreatedAt >= DATEADD(day, -30, GETUTCDATE())
GROUP BY c.CustomerId
HAVING COUNT(o.Id) > 5;
```

- Useful for quickly drafting a query from a plain-English description — always verify against the actual schema and check the execution plan before running it against production data.

### 5. Documentation

- Generating docstrings, README sections, and API documentation from existing code is one of the highest-value, lowest-risk uses — the code itself is the source of truth, so the AI has concrete material to summarize accurately.

### 6. Code Reviews

- AI can flag obvious issues (missing null checks, inconsistent naming, potential race conditions) as a first pass before a human reviewer — it's a supplement to review, not a replacement for it.

## The Non-Negotiable: Human Validation

```archify
diagrams/ai-assisted-coding-review.html
```

- AI-generated code can be subtly wrong, use outdated APIs, or miss business-specific edge cases the model has no way of knowing about.
- **Security review is mandatory before deployment** — AI-suggested code can inadvertently introduce injection vulnerabilities, hardcoded secrets, or missing authorization checks if not carefully reviewed.

## A Tiered Security Review Framework

Not every line of AI-suggested code needs the same scrutiny — a practical tiering approach:

| Tier | Code paths | Review depth |
|---|---|---|
| **Tier 1 — Critical** | AuthN/authZ, payment processing, cryptography, direct SQL construction, anything handling secrets | Mandatory line-by-line human review + security-focused review (a second reviewer or a security champion), never merged on AI output alone |
| **Tier 2 — Business logic** | Core domain rules, data validation, workflow orchestration | Standard PR review — a human must understand and agree with the logic, but a single reviewer is normal |
| **Tier 3 — Low-risk** | UI formatting, non-sensitive DTOs/mappers, test scaffolding, documentation | Lighter review — verify it compiles/passes tests and reads sensibly, but doesn't need the same scrutiny as Tier 1 |

## When NOT to Use AI-Generated Code Directly

- **Cryptographic implementations** — hand-rolled or AI-suggested crypto code is a common source of subtle, exploitable bugs (weak randomness, incorrect padding, timing side-channels); use vetted, audited libraries instead of AI-generated cryptographic primitives, full stop.
- **Real-time/hard-latency systems** — AI-suggested code isn't tuned for your specific performance envelope (allocation patterns, GC pressure, lock contention); performance-critical hot paths need profiling-driven decisions, not just "does it look right."
- **Regulatory/compliance-sensitive logic** (e.g. tax calculations, medical dosage logic, financial reporting rules) — these need traceable, explainable reasoning tied to an authoritative source (a regulation, a documented business rule), not a plausible-looking AI guess.

## Common Mistake

Accepting AI-generated code/tests without running them or reading them carefully, especially for security-sensitive paths (auth, payment, data access) — the productivity gain from AI assistance only holds if the human reviewing it actually understands what was generated.

## Real-World Example

A developer uses GitHub Copilot to scaffold a new API endpoint and its DTOs (fast, low-risk), asks Cursor to refactor a messy service class across multiple files, and uses ChatGPT to draft a complex SQL report query — but before merging, reviews every AI suggestion line-by-line, runs the full test suite, and has a teammate specifically check the new endpoint's authorization logic, since that's the part AI is least likely to get exactly right for their specific business rules.

## Summary

AI-assisted programming meaningfully speeds up code generation, test scaffolding, refactoring, SQL drafting, and documentation — but it's an accelerant for a developer who still understands and validates the output, not an autopilot. Human review and a dedicated security check before deployment remain essential regardless of how the code was produced.
