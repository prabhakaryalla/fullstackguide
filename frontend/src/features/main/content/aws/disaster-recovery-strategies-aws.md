# Disaster Recovery Strategies in AWS

Disaster recovery planning is fundamentally a trade-off between cost and how quickly (and completely) you can recover from a major failure — AWS commonly categorizes DR strategies into four tiers, each with a different cost/recovery-time balance.

## Short Answer

The four common DR strategies, from cheapest/slowest to most expensive/fastest: **Backup and Restore** (cheapest, slowest — restore from backups after a disaster), **Pilot Light** (minimal core infrastructure always running, scaled up during a disaster), **Warm Standby** (a scaled-down but fully functional copy always running, scaled up during a disaster), and **Multi-Site Active/Active** (full-scale production running in multiple regions simultaneously, most expensive, fastest/near-zero recovery time).

## The Two Key Metrics: RTO and RPO

- **RTO (Recovery Time Objective)** — how long can the system be down before it must be back up? A lower RTO requires more infrastructure standing by, ready to take over quickly.
- **RPO (Recovery Point Objective)** — how much data can you afford to lose, measured in time? A lower RPO requires more frequent (or continuous) data replication to the DR site.

Every DR strategy is really a decision about where on the cost-vs-RTO/RPO spectrum a given workload needs to sit — not every system needs (or can justify the cost of) the lowest possible RTO/RPO.

## Backup and Restore

```
Regularly back up data (e.g. RDS snapshots, S3 cross-region replication) to a DR region.
On disaster: provision infrastructure from scratch, restore data from the latest backup.
```

- **RTO/RPO:** Hours (provisioning + restore time) / hours (time since last backup).
- **Cost:** Lowest — you're paying for backup storage only, no standing compute in the DR region.
- Appropriate for non-critical workloads where extended downtime is an acceptable business trade-off for lower ongoing cost.

## Pilot Light

```
Core infrastructure (e.g. a database, kept continuously replicated) runs minimally in the DR region.
Application/compute layer is NOT running — only provisioned/scaled up when a disaster is declared.
```

- **RTO/RPO:** Tens of minutes (spin up the app layer against already-replicated data) / minutes (near-continuous data replication).
- **Cost:** Low-to-moderate — you pay for a small, continuously-running core (typically the database), but not the full application fleet.
- Named after a gas pilot light: the small flame (core data replication) is always on, ready to ignite the full system (application layer) quickly when needed.

## Warm Standby

```
A scaled-down but fully functional copy of the entire stack runs continuously in the DR region.
On disaster: scale it up to full production capacity and redirect traffic.
```

- **RTO/RPO:** Minutes (scale up already-running infrastructure) / seconds-to-minutes (near-real-time replication).
- **Cost:** Moderate-to-high — a full copy of the application stack is always running, just at reduced capacity, so there's meaningful ongoing cost even when no disaster is occurring.
- The middle ground: significantly faster recovery than Pilot Light, without the full cost of running two complete production-scale environments simultaneously.

## Multi-Site Active/Active

```
Full-scale production infrastructure runs simultaneously in two (or more) regions,
actively serving live traffic in both, at all times.
```

- **RTO/RPO:** Near-zero (the "DR site" is already serving production traffic; failover is just redirecting more traffic to it) / near-zero (continuous, real-time data synchronization).
- **Cost:** Highest — you're running (and paying for) full production capacity in multiple regions simultaneously, all the time, whether or not a disaster ever occurs.
- Requires the most architectural sophistication — genuinely active-active data replication with conflict resolution, not just one-way backup replication, since both regions are accepting writes simultaneously.

## Choosing the Right Strategy

| Workload | Likely Fit |
|---|---|
| Internal tool, low criticality, cost-sensitive | Backup and Restore |
| Important but not mission-critical, moderate budget | Pilot Light |
| Business-critical, needs fast recovery, meaningful budget | Warm Standby |
| Mission-critical, cannot tolerate meaningful downtime, budget is secondary | Multi-Site Active/Active |

## Common Mistake

Choosing a DR strategy based on what "sounds impressive" (defaulting to Multi-Site Active/Active) rather than the workload's actual, business-justified RTO/RPO requirements — over-investing in disaster recovery for a non-critical system wastes significant ongoing budget that could be better spent elsewhere, while under-investing for a genuinely critical system risks real business damage during an actual disaster.

## Summary

DR strategy selection is fundamentally about matching cost to the business's actual tolerance for downtime (RTO) and data loss (RPO) — Backup and Restore is cheapest but slowest, Multi-Site Active/Active is fastest but most expensive, with Pilot Light and Warm Standby occupying the middle ground. The right choice depends entirely on a specific workload's real business requirements, not a one-size-fits-all default.
