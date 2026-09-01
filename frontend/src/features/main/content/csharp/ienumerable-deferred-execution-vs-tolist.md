# Deferred Execution: IEnumerable vs ToList() in LINQ

A LINQ query built on `IEnumerable<T>` doesn't run until you enumerate it — and it re-runs every single time you enumerate it again, which surprises many developers.

## Quick Difference

- An `IEnumerable<T>` LINQ query (no `.ToList()`/`.ToArray()`) is **deferred** — the query logic only executes when you iterate it (`foreach`, `.Count()`, `.ToList()`, etc.).
- Calling `.ToList()` (or `.ToArray()`) **materializes** the results immediately into a fixed, in-memory snapshot — further enumeration just reads that snapshot, no re-execution.

## Deferred Execution in C#

```csharp
IEnumerable<int> query = numbers.Where(n => n > 10);

numbers.Add(20); // modify the source AFTER building the query, but BEFORE enumerating

foreach (var n in query)
{
    Console.WriteLine(n); // includes 20! the query re-evaluates the source right now
}
```

Key points:

- building the query with `.Where()` does not run any filtering logic yet — it just stores the query definition
- each enumeration re-runs the full query against the current state of the source

## Materialized Execution with ToList()

```csharp
List<int> results = numbers.Where(n => n > 10).ToList(); // runs immediately, once

numbers.Add(20); // has no effect on "results" anymore

foreach (var n in results)
{
    Console.WriteLine(n); // does NOT include 20 - results is a frozen snapshot
}
```

Key points:

- `.ToList()` forces immediate execution and copies the results into a new list
- later changes to the original source have no effect on the already-materialized list

## Real-World Example: The Double-Query Database Bug

```csharp
IQueryable<Order> pendingOrders = db.Orders.Where(o => o.Status == "Pending");

int count = pendingOrders.Count();       // runs a SQL query: SELECT COUNT(*)...
List<Order> orders = pendingOrders.ToList(); // runs ANOTHER SQL query: SELECT * ...
```

Because `pendingOrders` is deferred, every LINQ terminal operation (`.Count()`, `.ToList()`, `foreach`) triggers its own trip to the database. If you need both a count and the actual list, call `.ToList()` once and derive the count from the in-memory list (`orders.Count`) to avoid a second round trip.

## Real-World Example: Iterating Twice Unexpectedly

```csharp
IEnumerable<int> randomNumbers = Enumerable.Range(1, 5).Select(_ => new Random().Next());

Console.WriteLine(string.Join(",", randomNumbers)); // e.g. 3,7,1,9,2
Console.WriteLine(string.Join(",", randomNumbers)); // DIFFERENT numbers! re-executed
```

## Summary

- `IEnumerable<T>` LINQ queries are lazy: they re-run their logic (and, for `IQueryable`, re-hit the database) every time you enumerate them.
- Call `.ToList()`/`.ToArray()` once you're ready to "lock in" the results — especially before enumerating multiple times or mixing `.Count()` with a later `foreach`/`.ToList()`.
