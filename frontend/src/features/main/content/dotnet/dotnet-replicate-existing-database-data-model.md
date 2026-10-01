# Implementing a Similar Data Model From an Existing Database in Your .NET Application

When an existing database already defines the shape of your data, you don't hand-write your entity classes from scratch — you either **scaffold** them from the database (Database-First) or carefully **mirror** the schema in code while keeping both in sync going forward.

## Short Answer

Use EF Core's reverse-engineering (scaffolding) tooling to generate entity classes and a `DbContext` directly from the existing database schema, then refine the generated code (naming, relationships, value objects) to match your application's conventions.

## 1. Scaffold From the Existing Database

```bash
dotnet tool install --global dotnet-ef

dotnet ef dbcontext scaffold "Server=.;Database=LegacyDb;Trusted_Connection=True;" \
    Microsoft.EntityFrameworkCore.SqlServer \
    --output-dir Models \
    --context-dir Data \
    --context LegacyDbContext \
    --no-onconfiguring
```

This generates:

- POCO entity classes matching each table's columns and types.
- Navigation properties for foreign keys (one-to-many, many-to-many).
- A `DbContext` with `DbSet<T>` properties and Fluent API configuration reflecting the schema (keys, indexes, constraints).

```archify
diagrams/dotnet-scaffold-database.html
```

## 2. Refine the Generated Model

Scaffolded code is a starting point, not a final product:

- Rename entities/properties to match your application's naming conventions (scaffolding often keeps raw DB column names).
- Extract DTOs/view models so the database schema isn't leaked directly to API consumers.
- Add data annotations or Fluent API configuration for validation rules not enforced at the DB level.
- Split overly wide tables into smaller, purpose-specific models if the raw table doesn't map cleanly to your domain.

```csharp
// Generated (raw)
public partial class TblCustomerMaster
{
    public int CustId { get; set; }
    public string CustNm { get; set; } = null!;
}

// Refined for the application
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
```

## 3. Keep the Model in Sync Going Forward

- If the existing database is the **source of truth** and changes independently, re-run scaffolding periodically (or on schema change) rather than hand-editing generated files — keep customizations in partial classes or separate mapping profiles.
- If your application will now **own** schema evolution going forward, switch to **Code-First migrations** after the initial scaffold: treat the scaffolded model as the migration baseline, then use `dotnet ef migrations add` for all future changes.

```bash
# After scaffolding once, establish a baseline for future Code-First migrations
dotnet ef migrations add InitialBaseline --context LegacyDbContext
```

## 4. Handle Schema Mismatches

- Use Fluent API (`OnModelCreating`) to map awkward legacy structures (composite keys, non-standard naming, computed columns) that don't scaffold cleanly.
- For read-heavy legacy tables you don't want EF tracking overhead on, consider `AsNoTracking()` queries or a lightweight Dapper mapping instead of full entity tracking.

```csharp
modelBuilder.Entity<Customer>(entity =>
{
    entity.ToTable("TblCustomerMaster");
    entity.HasKey(e => e.Id);
    entity.Property(e => e.Id).HasColumnName("CustId");
    entity.Property(e => e.Name).HasColumnName("CustNm");
});
```

## Real-World Example

A company migrating a legacy VB6 application's SQL Server database to a new .NET API: they scaffold the existing 40-table schema into EF Core entities, rename cryptic columns (`CustNm` → `Name`) via Fluent API mapping, introduce clean DTOs for the API surface, and establish an `InitialBaseline` migration so all future schema changes flow through EF Core migrations instead of manual SQL scripts.

## Summary

Don't hand-write a data model to match an existing database — scaffold it with EF Core's reverse-engineering tools, refine the generated code to fit your application's conventions, and establish a migration baseline so future schema evolution is managed consistently going forward.
