# EF Core: Soft Delete with Global Query Filters, and Stored Procedures with Multiple Result Sets

Two practical EF Core patterns for real-world applications: never physically deleting rows (soft delete), and calling a legacy stored procedure that returns more than one result set — something EF Core doesn't support out of the box.

## Short Answer

Implement soft delete with an `IsDeleted` flag, a global query filter that automatically excludes deleted rows from every query, and an overridden `SaveChanges` that converts delete operations into updates. For multi-result-set stored procedures, drop down to the raw ADO.NET `DbDataReader` via the `DbContext`'s underlying connection, since EF Core's LINQ/`FromSqlRaw` APIs only support a single result set.

## Soft Delete with Global Query Filters

```csharp
public interface ISoftDelete
{
    bool IsDeleted { get; set; }
}

public class Product : ISoftDelete
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }
}
```

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Apply the filter to every entity implementing ISoftDelete, without repeating it per entity
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDelete).IsAssignableFrom(entityType.ClrType))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .HasQueryFilter(BuildIsNotDeletedExpression(entityType.ClrType));
            }
        }
    }

    public override int SaveChanges()
    {
        SoftDeleteEntities();
        return base.SaveChanges();
    }

    private void SoftDeleteEntities()
    {
        foreach (var entry in ChangeTracker.Entries().Where(e => e.State == EntityState.Deleted && e.Entity is ISoftDelete))
        {
            entry.State = EntityState.Modified; // convert the delete into an update
            ((ISoftDelete)entry.Entity).IsDeleted = true;
        }
    }
}
```

```archify
diagrams/efcore-soft-delete.html
```

- Every query against `Products` automatically excludes soft-deleted rows — callers don't need to remember to add `WHERE IsDeleted = false` manually.
- To intentionally include soft-deleted rows (e.g., an admin "recover deleted item" screen), bypass the filter explicitly: `context.Products.IgnoreQueryFilters()`.

## Multiple Result Sets from a Stored Procedure

EF Core's LINQ and `FromSqlRaw`/`FromSqlInterpolated` APIs are designed around mapping **one** result set to **one** entity type — a stored procedure returning two result sets (e.g., customers, then their orders) needs manual ADO.NET handling.

```csharp
using var connection = context.Database.GetDbConnection();
await connection.OpenAsync();

using var command = connection.CreateCommand();
command.CommandText = "GetCustomersAndOrders";
command.CommandType = System.Data.CommandType.StoredProcedure;

using var reader = await command.ExecuteReaderAsync();

// First result set
var customers = new List<Customer>();
while (await reader.ReadAsync())
{
    customers.Add(new Customer
    {
        CustomerId = reader.GetInt32(0),
        CustomerName = reader.GetString(1),
    });
}

// Move to the second result set
await reader.NextResultAsync();

var orders = new List<Order>();
while (await reader.ReadAsync())
{
    orders.Add(new Order
    {
        OrderId = reader.GetInt32(0),
        CustomerId = reader.GetInt32(1),
        OrderDate = reader.GetDateTime(2),
    });
}
```

- `connection.OpenAsync()` reuses the `DbContext`'s already-configured connection string — no separate connection management needed.
- `reader.NextResultAsync()` is the key API: it advances the same `DbDataReader` to the next result set returned by the stored procedure, exactly mirroring how you'd consume multiple result sets with plain ADO.NET.
- Mapping remains manual (`reader.GetInt32(0)`, etc.) — EF Core provides no automatic entity materialization for this scenario.

## Common Mistake

Trying to call a multi-result-set stored procedure with `context.Database.SqlQuery<T>()` or `FromSqlRaw<T>()` and being confused when only the first result set's shape seems relevant — these APIs are documented to only support single result sets; anything beyond that requires the manual `DbDataReader` approach shown above.

## Real-World Example

A reporting dashboard calls a single stored procedure (`GetDashboardData`) that returns three result sets — summary KPIs, a trend chart's data points, and a recent-activity list — in one round-trip to the database (faster than three separate queries), manually reading and mapping each result set in sequence using `NextResultAsync()`.

## Summary

Soft delete combines an `IsDeleted` flag, a global query filter (transparently excluding deleted rows from all queries), and a `SaveChanges` override (converting deletes into flag updates) — implementable once via a shared interface rather than per-entity. Multi-result-set stored procedures fall outside EF Core's LINQ capabilities entirely; handling them requires dropping to the underlying ADO.NET `DbDataReader` and manually advancing through result sets with `NextResultAsync()`.
