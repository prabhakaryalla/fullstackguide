# Multi-Tenancy Design Strategies

A multi-tenant application serves multiple customers (tenants) from a single deployment — the central architectural question is how much tenants' data and infrastructure are isolated from each other, and that answer usually comes down to three concrete database strategies.

## Short Answer

There are three common approaches, in order of increasing isolation (and increasing operational cost): a **shared database, shared schema** (tenants distinguished by a `TenantId` column), a **shared database, separate schema per tenant**, and a **separate database per tenant**. Most systems start with the first and only move toward more isolation when a specific tenant demands it (compliance, noisy-neighbor performance, or a contractual data-residency requirement).

## Shared Database, Shared Schema

```csharp
public class Order
{
    public int Id { get; set; }
    public Guid TenantId { get; set; } // every tenant-scoped table carries this
    public decimal Total { get; set; }
}

// EF Core global query filter - automatically scopes every query to the current tenant
modelBuilder.Entity<Order>().HasQueryFilter(o => o.TenantId == _tenantContext.CurrentTenantId);
```

- **Isolation:** Lowest — all tenants' rows live in the same tables, distinguished only by `TenantId`. A missing/bugged filter is a real data-leak risk between tenants — this is the single biggest danger of this approach, so `TenantId` filtering should be enforced globally (e.g. EF Core global query filters), never left to each query author to remember.
- **Cost/operational overhead:** Lowest — one schema to migrate, one database to back up and scale, works well for a large number of small tenants.
- **Best for:** SaaS products with many small-to-medium tenants where per-tenant customization and isolation needs are similar across the board.

## Shared Database, Separate Schema per Tenant

```sql
-- tenant_acme.orders, tenant_globex.orders — same table shape, different schema per tenant
CREATE SCHEMA tenant_acme;
CREATE TABLE tenant_acme.orders (id INT PRIMARY KEY, total DECIMAL(12,2));
```

- **Isolation:** Medium — a bug can't accidentally leak rows between tenants (they're in different schemas entirely), but all tenants still share the same physical database server's resources (CPU, I/O, connections).
- **Cost/operational overhead:** Medium — one schema migration has to run once per tenant schema, which gets unwieldy well before hundreds of tenants.
- **Best for:** A moderate number of tenants where "no accidental cross-tenant query" matters more than in the shared-schema model, but a fully separate database per tenant isn't justified.

## Separate Database per Tenant

```csharp
public class TenantDbContextFactory
{
    public AppDbContext CreateForTenant(string tenantId)
    {
        var connectionString = _tenantConfig.GetConnectionString(tenantId); // each tenant has its own DB
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(connectionString).Options;
        return new AppDbContext(options);
    }
}
```

- **Isolation:** Highest — a noisy or misbehaving tenant's load, a runaway query, or a backup/restore operation never touches another tenant's data or performance at all.
- **Cost/operational overhead:** Highest — migrations, backups, monitoring, and scaling all happen per tenant database; this doesn't scale to thousands of tenants without significant automation investment.
- **Best for:** A small number of large, high-value tenants (often enterprise customers) with strict compliance/data-residency requirements (e.g. "our data must be in its own database, in this specific region").

## Deciding: The Real Drivers

- **Compliance and data residency** almost always push toward more isolation — some contracts/regulations (finance, healthcare, government) legally require a tenant's data to be physically separated or region-pinned.
- **Noisy-neighbor risk** — one tenant running a huge report shouldn't slow down every other tenant's checkout flow. Shared-schema systems need careful resource governance (connection pool limits, query timeouts) to manage this; separate databases sidestep it entirely.
- **Number of tenants** — an approach that's fine for 20 enterprise tenants (separate DB each) falls apart operationally for 20,000 small tenants (you'd need per-tenant DB automation at a scale most teams can't justify).
- **Customization needs** — if some tenants need genuinely different schemas/features, per-tenant schemas or databases make that far easier than cramming optional columns into one shared table for everyone.

## Common Mistake

Choosing separate databases per tenant "to be safe" for a product that will have thousands of small tenants, without the operational automation (migrations, monitoring, backups) to run that many databases sanely — or the opposite: choosing shared-schema for a handful of large enterprise tenants with strict compliance requirements that genuinely need physical separation.

## Summary

Shared schema (with `TenantId` + enforced query filters) is the default starting point for most SaaS products; move to separate schemas or separate databases per tenant only when a specific, real requirement (compliance, noisy-neighbor isolation, per-tenant customization) demands it — and be honest about the operational cost that added isolation brings at scale.
