# Unit of Work Pattern in .NET

The Unit of Work pattern coordinates multiple repository operations into a single, atomic save — ensuring that a business operation touching several entities either commits all its changes together or none at all.

## Short Answer

A Unit of Work wraps one or more repositories and exposes a single `SaveChangesAsync()`/`CommitAsync()` that persists all pending changes in one transaction — instead of each repository saving independently and risking partial updates if something fails midway.

## The Problem It Solves

```csharp
// Without Unit of Work — two independent saves, no atomicity
await _orderRepository.AddAsync(order);
await _orderRepository.SaveChangesAsync(); // saved

await _inventoryRepository.DecrementStockAsync(order.ProductId, order.Quantity);
await _inventoryRepository.SaveChangesAsync(); // if this fails, the order was already saved — inconsistent state
```

## Implementation

```csharp
public interface IUnitOfWork : IDisposable
{
    IRepository<Order> Orders { get; }
    IRepository<Product> Products { get; }
    Task<int> SaveChangesAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Orders = new Repository<Order>(context);
        Products = new Repository<Product>(context);
    }

    public IRepository<Order> Orders { get; }
    public IRepository<Product> Products { get; }

    public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();

    public void Dispose() => _context.Dispose();
}
```

```csharp
public class OrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

    public async Task PlaceOrderAsync(Order order)
    {
        await _unitOfWork.Orders.AddAsync(order);

        var product = await _unitOfWork.Products.GetByIdAsync(order.ProductId);
        product!.Stock -= order.Quantity;
        _unitOfWork.Products.Update(product);

        await _unitOfWork.SaveChangesAsync(); // both changes commit together, in one transaction
    }
}
```

## How It Relates to EF Core's DbContext

```archify
diagrams/unit-of-work-dbcontext.html
```

- In EF Core, a single `DbContext` instance **already behaves like a Unit of Work** — all repositories built on top of the *same* `DbContext` instance share its change tracker, so calling `SaveChangesAsync()` once commits every tracked change across all of them in one transaction.
- The explicit `IUnitOfWork` wrapper mostly adds a clearer, more intention-revealing API (`_unitOfWork.SaveChangesAsync()` at the end of a business operation) and makes it easy to swap/mock in tests.

## Sequence: Coordinated Save

```archify
diagrams/unit-of-work-sequence.html
```

## Why Combine It With Repository

- Repository alone doesn't guarantee atomicity across multiple repositories — Unit of Work adds the missing "commit everything together" boundary.
- Keeps transaction boundaries explicit and visible at the service layer, rather than implicit inside individual repository methods.

## Real-World Example

Placing an order needs to both create the order record and decrement product inventory — wrapping both operations under one `IUnitOfWork.SaveChangesAsync()` call ensures that if the database write fails partway, neither the order nor the inventory change is persisted, avoiding a scenario where inventory is decremented but no order exists (or vice versa).

## Summary

Unit of Work groups multiple repository changes into a single atomic commit, preventing partial updates when a business operation spans multiple entities. In EF Core specifically, a shared `DbContext` already provides most of this behavior — the explicit pattern mainly adds a clearer API and testing seam on top of it.
