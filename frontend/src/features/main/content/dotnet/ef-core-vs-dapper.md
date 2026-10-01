# EF Core vs Dapper

Entity Framework Core and Dapper are both ways to talk to a database from .NET, but they sit at opposite ends of the ORM spectrum: EF Core is a full-featured ORM with change tracking and migrations; Dapper is a lightweight "micro-ORM" focused purely on fast, simple object mapping over raw SQL.

## Short Answer

- **EF Core** — full ORM: LINQ queries, automatic change tracking, migrations, relationship navigation — trades some raw performance for developer productivity and less hand-written SQL.
- **Dapper** — micro-ORM: you write the SQL yourself, Dapper just maps the results to objects — trades convenience for speed and control.

## EF Core

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Order> Orders => Set<Order>();
}

var recentOrders = await _dbContext.Orders
    .Where(o => o.CreatedAt >= DateTime.UtcNow.AddDays(-7))
    .Include(o => o.Customer)
    .ToListAsync();

// Change tracking — EF detects and persists this modification automatically
var order = await _dbContext.Orders.FindAsync(orderId);
order!.Status = OrderStatus.Shipped;
await _dbContext.SaveChangesAsync();
```

- **`DbSet<T>`** represents a queryable, trackable collection of entities.
- **Change tracking** means EF Core automatically knows what changed since the entity was loaded and generates the correct `UPDATE` statement.
- **Migrations** (`dotnet ef migrations add`) let schema evolve alongside your C# model.
- **LINQ** lets you write queries in C# that EF translates to SQL.

## Dapper

```csharp
public async Task<IEnumerable<Order>> GetRecentOrdersAsync()
{
    using var connection = new SqlConnection(_connectionString);
    return await connection.QueryAsync<Order>(
        "SELECT * FROM Orders WHERE CreatedAt >= @Since",
        new { Since = DateTime.UtcNow.AddDays(-7) });
}

public async Task UpdateOrderStatusAsync(int orderId, string status)
{
    using var connection = new SqlConnection(_connectionString);
    await connection.ExecuteAsync(
        "UPDATE Orders SET Status = @Status WHERE Id = @Id",
        new { Id = orderId, Status = status });
}
```

- No change tracking — you write the exact SQL and Dapper maps rows to objects (or vice versa for parameters).
- No migrations — schema management is entirely manual (raw SQL scripts or a separate tool).
- Extremely thin layer over `ADO.NET`, so overhead is minimal — often noticeably faster than EF Core for simple, well-known queries.

## Comparison

| | EF Core | Dapper |
|---|---|---|
| Type | Full ORM | Micro-ORM |
| Query style | LINQ (translated to SQL) | Raw SQL you write |
| Change tracking | Automatic | None (manual UPDATE statements) |
| Migrations | Built-in (`dotnet ef migrations`) | None — manage schema separately |
| Performance | Good, but tracking/translation adds overhead | Very fast — close to raw ADO.NET |
| Development speed | Faster for typical CRUD (less SQL to write) | Slower — every query is hand-written SQL |
| Best for | Most applications; complex object graphs, evolving schema | High-throughput read paths, reporting queries, performance-critical hot paths |

```archify
diagrams/efcore-vs-dapper.html
```

## Using Both Together

Many real applications use **both**: EF Core for the bulk of CRUD operations and schema management, and Dapper for specific hot-path or reporting queries where EF Core's translation/tracking overhead is measurably too costly.

```csharp
public class OrderRepository
{
    private readonly AppDbContext _context; // EF Core for standard CRUD
    private readonly IDbConnection _dapperConnection; // Dapper for the heavy reporting query

    public async Task<OrderSummaryDto[]> GetDashboardSummaryAsync() =>
        (await _dapperConnection.QueryAsync<OrderSummaryDto>(
            "SELECT ... FROM OrderSummaryView ...")).ToArray();
}
```

## Real-World Example

An order management system uses EF Core for creating/updating orders (benefiting from change tracking, migrations, and readable LINQ), but the analytics dashboard's "top 100 products this month" query — run thousands of times per day — is written directly with Dapper against a hand-tuned SQL query, avoiding EF's query-translation and tracking overhead for that specific hot path.

## Summary

EF Core trades some raw performance for productivity: LINQ, automatic change tracking, and migrations make everyday CRUD faster to write and schema evolution easier. Dapper trades that convenience for speed and control: you write the SQL, it just maps results to objects. Choose based on whether you need EF Core's productivity features or Dapper's raw performance for a specific query path — many apps use both.
