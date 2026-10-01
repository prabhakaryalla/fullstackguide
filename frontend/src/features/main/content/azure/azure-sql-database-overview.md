# Azure SQL Database Overview

Azure SQL Database is Microsoft's fully managed relational database service built on the SQL Server engine — you get a SQL Server-compatible database without managing the underlying VM, OS patching, or backups yourself.

## Short Answer

Azure SQL Database provides the SQL Server engine as a managed PaaS offering: automatic backups, patching, high availability, and elastic scaling — you focus on schema and queries, Azure handles the infrastructure.

## Deployment Options

| Option | Best For |
|---|---|
| **Single Database** | One database per app, simplest model, independent scaling |
| **Elastic Pool** | Many databases (e.g., one per tenant) sharing a pool of resources, cost-efficient for variable per-database load |
| **Managed Instance** | Near-full SQL Server compatibility (cross-database queries, SQL Agent, linked servers) for lift-and-shift migrations |

```archify
diagrams/azure-sql-deployment-options.html
```

## Scaling Model (DTU vs vCore)

- **DTU (Database Transaction Unit)** — a bundled measure of CPU/memory/IO, simpler to reason about for smaller workloads.
- **vCore** — lets you independently choose compute (vCores) and storage, and (with the Hyperscale tier) scale storage far beyond traditional limits — better for predictable, larger workloads and matches on-prem SQL Server licensing models (helpful for Azure Hybrid Benefit).

### Choosing DTU vs. vCore: A Workload-Profiling Framework

- **Start with vCore for anything beyond a small/simple app** — it's the model Microsoft is actively investing in (Hyperscale, serverless compute tier, more granular resource control), and DTU is largely a legacy simplification.
- **Profile before picking a size**: use Query Performance Insight or `sys.dm_db_resource_stats` on an existing workload (or a load test against a new one) to see actual CPU/IO/log-write utilization over time — undersizing causes throttling, oversizing wastes budget.
- **vCore serverless tier** is worth considering for dev/test or intermittent workloads specifically — it auto-pauses during inactivity (no compute charge while paused) and auto-resumes on the next connection, trading a cold-start delay for meaningfully lower cost on spiky/idle-heavy workloads.
- **Azure Hybrid Benefit** (reusing existing on-prem SQL Server licenses for a discount) is only available under the vCore model — a concrete reason to prefer vCore if your organization already owns SQL Server licenses.

## Backup, RPO, and RTO

- **Automatic backups** happen continuously (full weekly, differential every ~12 hours, transaction log every 5-10 minutes, approximately) — giving point-in-time restore to **any point within the retention window** (7 days by default, configurable up to 35 days on most tiers, longer with long-term retention policies).
- **RPO (Recovery Point Objective)** — how much data you could lose — is typically minutes (bounded by the transaction log backup frequency) for a point-in-time restore within the same region.
- **RTO (Recovery Time Objective)** — how long recovery takes — depends on database size and the specific restore operation; a point-in-time restore of a large database can take a meaningful amount of time (not instant), which matters when setting realistic disaster-recovery expectations with stakeholders. For faster failover (lower RTO), geo-replication with an already-running secondary is the mechanism to use instead of restoring from backup.

## Built-In Resilience Features

- **Automatic backups** — point-in-time restore within a configurable retention window, with no manual backup job needed.
- **Built-in high availability** — the service automatically replicates and fails over within a region without manual intervention.
- **Geo-replication** — asynchronous replicas in other regions for disaster recovery and read scale-out.
- **Automatic tuning** — Azure SQL can automatically create/drop indexes and fix regressed query plans based on observed workload.

```archify
diagrams/azure-sql-replication.html
```

## Security Features

- **Azure AD/Entra ID authentication** — connect using Azure identities instead of only SQL logins.
- **Managed Identity integration** — apps authenticate to the database without storing credentials (see the Managed Identity topic).
- **Transparent Data Encryption (TDE)** — data encrypted at rest by default.
- **Firewall rules / VNet integration** — restrict which networks can even reach the database endpoint.

## Azure SQL vs Self-Managed SQL Server on a VM

| | Azure SQL Database (PaaS) | SQL Server on Azure VM (IaaS) |
|---|---|---|
| Patching/backups | Automatic | Manual (your responsibility) |
| OS access | None (fully managed) | Full OS access |
| Compatibility | High, but not 100% feature parity | Full SQL Server feature set |
| Best for | New apps, standard workloads | Lift-and-shift needing full compatibility (SQL Agent jobs, CLR, linked servers) |

## Real-World Example

A SaaS company runs one Azure SQL **Elastic Pool** shared across hundreds of small tenant databases — most tenants have light, bursty usage, so pooling resources is far more cost-efficient than provisioning a dedicated database per tenant, while automatic backups and built-in HA mean the team spends no operational time on database maintenance.

## Summary

Azure SQL Database delivers the SQL Server engine as a managed service — automatic backups, patching, high availability, and flexible scaling (DTU or vCore, single database, elastic pool, or managed instance) — letting teams focus on schema and query design instead of database infrastructure operations.
