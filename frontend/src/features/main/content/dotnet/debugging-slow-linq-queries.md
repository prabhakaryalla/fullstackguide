# Debugging Slow LINQ Queries

A slow endpoint backed by EF Core is rarely "LINQ is slow" — it's almost always one of a handful of well-known root causes: an N+1 query pattern, an unnecessary `Include`, a missing index, or tracking overhead on a read-only query. Diagnosing it is a systematic process, not guesswork.

## Short Answer

1. See the actual generated SQL (`ToQueryString()` or query logging).
2. Check for N+1 queries and unnecessary `Include`s.
3. Check for missing indexes on filtered/joined columns.
4. Use a profiler to see real execution time and query counts.
5. Apply targeted fixes: `AsNoTracking()`, `Select()` projections, pagination, compiled queries.

## 1. View the Generated SQL

```csharp
var query = _dbContext.Orders.Where(o => o.CustomerId == customerId);
string sql = query.ToQueryString(); // prints the exact SQL EF Core will run
Console.WriteLine(sql);
```

- Confirms EF is generating the query you expect — sometimes a seemingly simple LINQ expression translates into a surprisingly expensive SQL query (or worse, can't be translated at all and silently falls back to client-side evaluation).

## 2. Enable Query Logging

```csharp
optionsBuilder.UseSqlServer(connectionString)
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging(); // only in development — logs parameter values too
```

- Shows every query EF Core executes, in order — this is how you actually *see* an N+1 pattern happening (dozens of near-identical queries instead of one).

## 3. Detect N+1 Queries

```csharp
// N+1 anti-pattern — one query for orders, then one extra query PER order for its items
var orders = await _dbContext.Orders.ToListAsync();
foreach (var order in orders)
{
    var items = order.Items.ToList(); // lazy-loads a separate query per order!
}
```

```csharp
// Fixed — a single query with Include loads everything upfront
var orders = await _dbContext.Orders
    .Include(o => o.Items)
    .ToListAsync();
```

```archify
diagrams/dotnet-nplus1-vs-single-query.html
```

## 4. Avoid Unnecessary Includes

```csharp
// Loads far more data than needed if only the total is displayed
var order = await _dbContext.Orders
    .Include(o => o.Items)
    .Include(o => o.Customer)
    .Include(o => o.ShippingAddress)
    .FirstAsync(o => o.Id == id);

// Project only what's actually needed
var summary = await _dbContext.Orders
    .Where(o => o.Id == id)
    .Select(o => new OrderSummaryDto { Id = o.Id, Total = o.Total, CustomerName = o.Customer.Name })
    .FirstAsync();
```

- `Select()` projections let EF Core generate a SQL query that only fetches the needed columns — often dramatically less data transferred than loading full entity graphs.

## 5. Check for Missing Indexes

- If `ToQueryString()` shows a `WHERE` clause filtering on a column with no index, that's a prime suspect for a slow query on a large table.
- Use SQL Server's execution plan (or `EXPLAIN` on other databases) to confirm a table scan is happening instead of an index seek.

## 6. Use AsNoTracking for Read-Only Queries

```csharp
var products = await _dbContext.Products
    .AsNoTracking() // skips change-tracking overhead entirely
    .Where(p => p.Category == category)
    .ToListAsync();
```

- Change tracking has real overhead — for queries whose results are never updated and saved back, `AsNoTracking()` avoids that cost entirely.

## 7. Pagination for Large Result Sets

```csharp
var page = await _dbContext.Orders
    .OrderBy(o => o.Id)
    .Skip(pageIndex * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

- Never load an entire large table into memory when only a page of results will be displayed.

## 8. Compiled Queries for Hot Paths

```csharp
private static readonly Func<AppDbContext, int, Task<Order?>> GetOrderByIdCompiled =
    EF.CompileAsyncQuery((AppDbContext ctx, int id) => ctx.Orders.FirstOrDefault(o => o.Id == id));

var order = await GetOrderByIdCompiled(_dbContext, orderId);
```

- Skips EF's query-translation/caching overhead on every call for queries executed extremely frequently — a micro-optimization worth it only for genuinely hot paths.

## 9. Use Profilers for Real Evidence

- **SQL Server Profiler / Extended Events** — see exact queries and durations hitting the database.
- **Azure Application Insights** — end-to-end request tracing, including DB call durations, in production.
- **MiniProfiler** — lightweight in-app profiling overlay showing query counts/durations per request during development.

## Summary Checklist

```archify
diagrams/dotnet-diagnose-slow-linq.html
```

## Real-World Example

An order list page was taking 4 seconds to load. Enabling `LogTo` revealed one query for orders followed by 200 additional queries — one per order — to lazily load each order's items (a classic N+1). Adding `.Include(o => o.Items)` collapsed it to a single query, combined with `.AsNoTracking()` (since the page is read-only) and a `.Select()` projection to avoid loading unused columns, bringing load time down to under 200ms.

## Summary

Debugging slow LINQ/EF Core queries starts with seeing the actual generated SQL and query count (`ToQueryString`, `LogTo`), then checking for the usual suspects: N+1 queries, unnecessary `Include`s, missing indexes, and unnecessary change tracking — fixed respectively with proper `Include`/projections, execution-plan-guided indexing, `AsNoTracking()`, and pagination.
