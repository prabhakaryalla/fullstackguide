# Clean Architecture (Onion / Hexagonal Architecture)

Clean Architecture — also known as Onion Architecture, Hexagonal Architecture, or Ports and Adapters — organizes a codebase so that business logic sits at the center, completely unaware of and unaffected by infrastructure details like databases, frameworks, or UI technology.

## Short Answer

All dependencies point **inward**, toward a Core project containing pure business logic (entities, domain services, interfaces). Outer layers (Infrastructure, API/UI) implement the interfaces the Core defines — the Core never references them directly. This keeps business rules testable and framework-agnostic.

## The Core Rule

```archify
diagrams/clean-architecture-layers.html
```

1. **Model all business rules and entities in the Core project.**
2. **All dependencies flow toward the Core** — outer layers depend on inner layers, never the reverse.
3. **Inner projects define interfaces; outer projects implement them** — this is the Dependency Inversion Principle applied at the architectural level.

## What Belongs in the Core Project

- **Entities/Aggregates** — core domain objects and the relationships that group them (e.g., a `PurchaseOrder` aggregate grouping several entities).
- **Value Objects** — immutable properties of entities (e.g., a `Money` or `Address` value object).
- **Domain Services** — business logic that doesn't naturally belong to a single entity.
- **Domain Events & Event Handlers** — things that happened in the domain that other parts of the system may react to.
- **Interfaces** — e.g., `IOrderRepository`, `IEmailSender` — defined here, implemented in outer layers.
- **Specifications, Validators, Custom Guards, Enums** — domain rule enforcement, kept framework-free.

## What Belongs Outside the Core

```csharp
// Core project — defines the contract, has zero knowledge of EF Core
public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(int id);
    Task AddAsync(Order order);
}

// Infrastructure project — implements the contract using a specific technology
public class EfOrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;
    public EfOrderRepository(AppDbContext context) => _context = context;

    public async Task<Order?> GetByIdAsync(int id) => await _context.Orders.FindAsync(id);
    public async Task AddAsync(Order order) => await _context.Orders.AddAsync(order);
}
```

- The Core's `IOrderRepository` interface has no reference to Entity Framework, SQL, or any specific storage technology — swapping EF Core for Dapper, or SQL Server for Cosmos DB, only requires changing the Infrastructure project, not the business logic.

## When Should You Use Clean Architecture

- You're practicing Domain-Driven Design and want the focus to stay on the domain model, not infrastructure.
- The business logic is complex enough to warrant a highly testable, framework-independent architecture.
- You want the architecture itself to **enforce** good practices (dependency direction), rather than relying on every contributor consistently doing the right thing — similar to how strong typing enforces correctness at compile time rather than by convention.

## When It's Overkill

- Simple CRUD apps with minimal business logic — the extra layering and interface indirection adds ceremony without a corresponding benefit.
- Short-lived prototypes or throwaway tools where long-term maintainability isn't a priority.

## Real-World Example

An insurance claims processing system keeps all claim validation rules, eligibility calculations, and claim state transitions in the Core project — completely unaware of whether claims are stored in SQL Server or Cosmos DB, or whether they arrive via a REST API or a message queue. When the company later migrates from a monolithic API to a queue-triggered Azure Function for claim ingestion, only the outer Infrastructure/API layer changes — the core claims-processing logic, and its extensive unit test suite, remain untouched.

## Summary

Clean Architecture (Onion/Hexagonal) inverts the typical dependency direction: instead of business logic depending on data access frameworks, the Core defines interfaces that outer Infrastructure layers implement. This keeps business rules pure, framework-agnostic, and easily unit-testable, at the cost of additional structural layering that's only worth it for genuinely complex, long-lived business logic.
