# Azure Storage Redundancy: LRS vs ZRS vs GRS vs RA-GRS

Azure Storage accounts let you choose how many copies of your data exist, and where — trading cost against how much physical failure (a disk, a datacenter, or an entire region) the data can survive.

## Short Answer

**LRS** (Locally Redundant Storage) keeps 3 copies within a single datacenter — the cheapest option, protecting only against individual disk/node failure. **ZRS** (Zone-Redundant Storage) spreads 3 copies across different Availability Zones within one region, surviving a single datacenter/zone outage. **GRS** (Geo-Redundant Storage) replicates asynchronously to a second, geographically distant paired region, surviving a full regional disaster (at the cost of eventual, not immediate, consistency in the secondary region). **RA-GRS** (Read-Access Geo-Redundant Storage) is GRS plus the ability to actually read from that secondary region directly, even while the primary region is healthy.

## LRS: Locally Redundant Storage

```
3 synchronous copies, all within ONE datacenter (one physical location)
```

- Cheapest redundancy option — protects against individual disk or server-node failure within a datacenter, but **not** against the loss of the datacenter itself (a fire, a major power outage, a natural disaster affecting that specific building).
- Appropriate for data that's easily reconstructible, non-critical, or already has its durability handled elsewhere (e.g. a cache that can simply be rebuilt).

## ZRS: Zone-Redundant Storage

```
3 synchronous copies, spread across DIFFERENT Availability Zones within the SAME region
```

- Availability Zones are physically separate datacenters within one Azure region (separate power, cooling, networking) — ZRS survives the loss of one entire zone/datacenter, something LRS cannot.
- Still **synchronous** replication — a write is acknowledged only once it's durably stored across the zones, so there's no data-loss window on zone failure, unlike GRS's asynchronous cross-region replication.
- Doesn't protect against a disaster affecting the entire region (all zones in that region failing simultaneously) — for that, you need GRS/RA-GRS.

## GRS: Geo-Redundant Storage

```
Primary region: 3 synchronous copies (like LRS)
   │
   └── asynchronous replication ──► Secondary (paired) region: 3 more copies
```

- Adds a second copy of your data in Azure's predefined **paired region** (e.g. East US pairs with West US) — surviving even a complete regional outage, something neither LRS nor ZRS can.
- Replication to the secondary region is **asynchronous** — there's a real (typically small, but non-zero) window where a very recent write might not yet have reached the secondary region if a disaster strikes at exactly the wrong moment. This is GRS's actual RPO (Recovery Point Objective) — not necessarily zero.
- Under normal operation, the secondary region's data is **not directly accessible** — it exists purely as a failover target; accessing it requires either an explicit Microsoft-initiated failover, or choosing RA-GRS instead.

## RA-GRS: Read-Access Geo-Redundant Storage

```
Same as GRS, but the secondary region's data can be READ directly at any time,
via a distinct secondary endpoint - even while the primary region is fully healthy.
```

- Useful for serving read traffic closer to geographically distant users, or as a way to verify/monitor that geo-replication is actually keeping up, without needing to trigger an actual failover.
- Reads from the secondary endpoint reflect the same asynchronous replication lag as GRS — they may be slightly behind the primary region's most recent writes.

## Choosing the Right Option

| Need | Best Fit |
|---|---|
| Cheapest option, non-critical/reconstructible data | LRS |
| Survive a single datacenter/zone failure, stay in-region | ZRS |
| Survive a full regional disaster | GRS |
| Survive a full regional disaster, AND want to read from the secondary directly | RA-GRS |

## Common Mistake

Assuming GRS alone means "my data is instantly, perfectly safe across regions" — the asynchronous replication means there's a real (if usually small) RPO, and under normal circumstances you can't even read the secondary copy directly (that requires RA-GRS, or an actual failover event). GRS/RA-GRS protect against regional disasters, but they don't eliminate the need to understand your actual RPO/RTO requirements for a given workload.

## Summary

LRS, ZRS, GRS, and RA-GRS trade cost for progressively wider failure-domain protection: LRS survives disk/node failure only, ZRS survives a datacenter/zone failure while staying in-region (with synchronous, zero-data-loss replication), and GRS/RA-GRS survive a full regional disaster via asynchronous cross-region replication (with RA-GRS additionally allowing direct reads from the secondary region at any time).
