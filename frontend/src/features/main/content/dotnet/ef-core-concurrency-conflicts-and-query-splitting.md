# EF Core: Optimistic Concurrency Conflicts and Query Splitting

Two EF Core features that matter once an application scales beyond trivial CRUD: detecting when two users edit the same row simultaneously, and avoiding a performance trap when eagerly loading multiple collections at once.

## Short Answer

EF Core detects concurrent edit conflicts via a concurrency token (typically a `[Timestamp]`/`RowVersion` column), throwing `DbUpdateConcurrencyException` when a save would silently overwrite someone else's changes. Query splitting (`AsSplitQuery()`) avoids the "cartesian explosion" problem that happens when `Include`-ing multiple collections produces one enormous, duplicated-row SQL join.

## Optimistic Concurrency Conflicts

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }

    [Timestamp] // EF Core includes this in the WHERE clause of UPDATE/DELETE statements
    public byte[] RowVersion { get; set; }
}
```

- EF Core adds `RowVersion` to the `WHERE` clause of generated `UPDATE`/`DELETE` statements: `WHERE Id = @id AND RowVersion = @originalRowVersion`.
- If another process already changed the row (and thus its `RowVersion`), the `WHERE` clause matches zero rows — EF Core detects this as a conflict, since it expected exactly one row to be affected.

```archify
diagrams/efcore-concurrency-conflict.html
```

```csharp
try
{
    var product = await context.Products.FindAsync(1);
    product.Name = "Updated Name";
    await context.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException ex)
{
    foreach (var entry in ex.Entries)
    {
        var databaseValues = await entry.GetDatabaseValuesAsync();
        if (databaseValues == null)
        {
            // The row was deleted by someone else
        }
        else
        {
            // "Client wins": force-save the in-memory values as the new original values, then retry
            entry.OriginalValues.SetValues(databaseValues);
            await context.SaveChangesAsync();

            // Or "store wins": discard local changes and refresh from the database instead
            // entry.CurrentValues.SetValues(databaseValues);
        }
    }
}
```

## Conflict Resolution Strategies

| Strategy | Behavior |
|---|---|
| **Client Wins** | The current user's changes overwrite what's in the database |
| **Store Wins** | Discard the current user's changes, reload the database's current values |
| **Merge** | Manually combine both sets of changes (field by field) |
| **Retry** | Re-attempt the operation after resolving the conflict |

## Query Splitting

```csharp
// Single query — joins Blogs, Posts, and Authors together, producing a duplicated-row result set
var blogs = context.Blogs
    .Include(b => b.Posts)
    .Include(b => b.Authors)
    .ToList();
```

```archify
diagrams/efcore-cartesian-vs-split.html
```

- Including two separate collections (`Posts` and `Authors`) in **one** SQL query forces a join across both, producing a row for every combination — a "cartesian explosion" that duplicates the parent row data many times over and can be a serious performance/memory problem as collection sizes grow.

```csharp
var blogs = context.Blogs
    .Include(b => b.Posts)
    .Include(b => b.Authors)
    .AsSplitQuery() // executes 3 separate, simpler queries instead of 1 large join
    .ToList();
```

- EF Core combines the results of the separate queries back into the object graph in memory — trading multiple round-trips for avoiding the duplicated-row explosion.

## When to Use AsSplitQuery

- Multiple `Include`s of collection navigations on the same query, especially when collection sizes are non-trivial.
- When profiling reveals the single-query join is transferring far more data than necessary due to duplication.
- Not needed for single collection includes, or includes of single-valued (reference) navigations — the cartesian problem only arises when multiple **collections** are joined together in one query.

## Common Mistake

Defaulting to `AsSplitQuery()` everywhere without profiling — multiple round-trips have their own overhead (network latency × N queries), and for small collections, a single joined query can still be faster. Use it deliberately where the cartesian explosion is a measured problem, not universally.

## Summary

A `[Timestamp]`/`RowVersion` concurrency token lets EF Core detect (via `DbUpdateConcurrencyException`) when two processes tried to modify the same row concurrently, enabling explicit conflict-resolution logic instead of silently losing one user's changes. `AsSplitQuery()` avoids the row-duplication performance trap that occurs when eagerly loading multiple collection navigations in a single SQL join, at the cost of executing multiple separate database round-trips.
