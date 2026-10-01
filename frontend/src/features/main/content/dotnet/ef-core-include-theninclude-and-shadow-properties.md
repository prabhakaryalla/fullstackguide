# EF Core: Include/ThenInclude and Shadow Properties

Two practical EF Core techniques that show up constantly in real applications: eagerly loading nested related data correctly, and storing extra columns that don't need to clutter your domain entity classes.

## Short Answer

`Include()` eagerly loads a directly related navigation property; `ThenInclude()` loads a further level of relation from whatever the previous `Include`/`ThenInclude` loaded. Shadow properties are columns that exist in the database and EF Core's model, but have no corresponding property on the CLR entity class — useful for audit/metadata fields you don't want polluting your domain model.

## Include and ThenInclude

```csharp
public class Order
{
    public int Id { get; set; }
    public Customer Customer { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public Address Address { get; set; }
}

public class OrderItem
{
    public int Id { get; set; }
    public Product Product { get; set; }
}
```

```csharp
var orders = context.Orders
    .Include(o => o.Customer)              // first level: Order -> Customer
        .ThenInclude(c => c.Address)       // second level: Customer -> Address
    .Include(o => o.OrderItems)            // first level: Order -> OrderItems
        .ThenInclude(oi => oi.Product)     // second level: OrderItem -> Product
    .ToList();
```

```archify
diagrams/efcore-include-theninclude.html
```

- `Include()` always starts a **new** navigation chain from the root entity (`Order`); `ThenInclude()` continues from whatever the immediately preceding `Include`/`ThenInclude` returned.
- Without `Include`, accessing `order.Customer.Address` on a lazy-loading-disabled context would return `null` (or throw, if lazy loading is off) — `Include`/`ThenInclude` ensure the data is fetched as part of the initial query.

## Shadow Properties

```csharp
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    // no "LastUpdated" property here at all
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().Property<DateTime>("LastUpdated"); // exists only in the EF model
}
```

```csharp
var blog = new Blog { Url = "https://example.com" };
context.Blogs.Add(blog);
context.Entry(blog).Property("LastUpdated").CurrentValue = DateTime.UtcNow; // set via the Entry API
context.SaveChanges();

var recent = context.Blogs
    .Where(b => EF.Property<DateTime>(b, "LastUpdated") > DateTime.UtcNow.AddDays(-7)) // query via EF.Property<T>
    .ToList();
```

- The `LastUpdated` column exists in the database and is tracked by EF Core's change tracker, but there's no `Blog.LastUpdated` property in code — it's invisible to anything using the `Blog` class directly.

## Why Use Shadow Properties

- Store audit metadata (`CreatedBy`, `CreatedDate`, `ModifiedBy`, `ModifiedDate`) without adding these fields to every domain entity class.
- Keep the domain model focused purely on business concerns, free of persistence-only concerns.
- Retrofit a column onto an existing table/entity without touching the entity's public API (useful when the entity class is shared/reused elsewhere and shouldn't change shape).

```archify
diagrams/efcore-shadow-properties.html
```

## Common Mistake

Forgetting that shadow properties can't be accessed through normal C# property syntax (`blog.LastUpdated` doesn't compile) — you must always go through `context.Entry(entity).Property("Name")` or `EF.Property<T>(entity, "Name")`, which is easy to forget when refactoring code that assumes every mapped column has a matching CLR property.

## Real-World Example

A multi-tenant SaaS application adds `CreatedAt`, `CreatedBy`, `ModifiedAt`, and `ModifiedBy` as shadow properties across dozens of entities via a loop in `OnModelCreating` that checks for a marker interface — auditing every entity's history without adding four repetitive properties to every single domain class, and without any domain code needing to know these columns exist.

## Summary

`Include`/`ThenInclude` build up multi-level eager-loading chains, starting a new branch with each `Include` and continuing that branch with `ThenInclude`. Shadow properties let EF Core track and persist columns that exist only in the database/model layer, keeping domain classes clean of persistence-only metadata — accessed exclusively through the `Entry()`/`EF.Property<T>()` APIs rather than normal property syntax.
