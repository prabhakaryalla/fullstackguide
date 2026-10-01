# Repository Pattern in .NET

The Repository pattern puts a data-access abstraction between your business logic and the underlying persistence technology (EF Core, Dapper, a remote API), so business code depends on an interface like `IRepository<T>` instead of `DbContext` directly.

## Short Answer

A repository exposes methods like `GetById`, `GetAll`, `Add`, `Update`, `Delete` for a given entity, hiding the actual query/ORM details behind an interface — making the data layer swappable and the business logic unit-testable without a real database.

## Basic Implementation

```csharp
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    void Update(T entity);
    void Remove(T entity);
}

public class Repository<T> : IRepository<T> where T : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);
    public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
    public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
    public void Update(T entity) => _dbSet.Update(entity);
    public void Remove(T entity) => _dbSet.Remove(entity);
}
```

```csharp
public class OrderService
{
    private readonly IRepository<Order> _orderRepository;

    public OrderService(IRepository<Order> orderRepository) => _orderRepository = orderRepository;

    public async Task<Order?> GetOrderAsync(int id) => await _orderRepository.GetByIdAsync(id);
}
```

## Architecture

```archify
diagrams/repository-pattern.html
```

- `OrderService` depends only on `IRepository<Order>` — swapping the underlying implementation (EF Core to Dapper, or a real DB to an in-memory fake for tests) doesn't require touching business logic.

## Why Use It

- **Testability** — mock `IRepository<T>` in unit tests instead of needing a real database.
- **Decoupling** — business logic doesn't know or care whether data comes from SQL Server, Dapper, or a remote API.
- **Consistency** — centralizes query patterns (e.g., soft-delete filtering, tenant scoping) in one place instead of scattering `DbContext` queries across services.

## Specification Pattern (Avoiding a Bloated Repository Interface)

A generic repository can become a dumping ground for every possible query method. The Specification pattern keeps it clean:

```csharp
public interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; }
}

public class ActiveCustomersSpec : ISpecification<Customer>
{
    public Expression<Func<Customer, bool>> Criteria => c => c.IsActive;
}

// Repository accepts a specification instead of growing new methods per query shape
Task<IEnumerable<T>> FindAsync(ISpecification<T> spec);
```

## Common Criticism (Know Both Sides for Interviews)

- EF Core's `DbSet<T>` **already is** a repository + unit of work abstraction — wrapping it in a custom generic repository can be seen as a redundant layer for simple CRUD apps.
- A generic `IRepository<T>` often leaks EF-specific concerns (e.g., `IQueryable` for filtering) or becomes overloaded with one method per possible query.
- It's most valuable when you genuinely need to swap persistence technology, isolate business logic for testing, or centralize cross-cutting query logic (multi-tenancy, soft deletes) — not automatically for every project.

## Real-World Example

A multi-tenant SaaS app wraps all entity access behind `IRepository<T>` implementations that automatically filter by the current tenant ID — business services never write `WHERE TenantId = ...` themselves, and unit tests substitute an in-memory fake repository, keeping tests fast and independent of a real database.

## Summary

The Repository pattern abstracts data access behind an interface, decoupling business logic from the specific persistence technology and enabling easier unit testing — but it's a deliberate trade-off (extra layer, potential redundancy with EF Core's own abstractions) rather than a default best practice for every application.
