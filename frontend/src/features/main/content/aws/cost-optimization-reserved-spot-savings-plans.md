# Cost Optimization: Reserved Instances, Spot Instances, Savings Plans

On-Demand pricing is the most flexible but most expensive way to pay for AWS compute — Reserved Instances, Savings Plans, and Spot Instances each trade away some flexibility for significant discounts, and picking the right one for a given workload is one of the most practical, commonly-asked AWS cost questions.

## Short Answer

**On-Demand** — pay per second/hour with no commitment, most expensive, most flexible. **Reserved Instances (RIs)** — commit to a specific instance type/region for 1 or 3 years for a significant discount (up to ~72%), best for steady, predictable workloads. **Savings Plans** — similar discount model to RIs, but commit to a dollar amount of compute usage per hour rather than a specific instance type, giving more flexibility to change instance families/regions while keeping the discount. **Spot Instances** — bid on AWS's spare capacity for the deepest discounts (up to ~90% off On-Demand), but AWS can reclaim the instance with only a 2-minute warning, making them suitable only for interruption-tolerant workloads.

## On-Demand

```
Pay exactly for what you use, per second, no upfront commitment, no discount.
```

- Maximum flexibility — start and stop instances freely with zero long-term obligation.
- The right default for unpredictable, short-term, or early-stage workloads where committing to a specific usage pattern isn't yet justified by real usage data.

## Reserved Instances

```
Commit: t3.large, us-east-1, 1-year term, "All Upfront" payment
Discount: up to ~40% (1-year) or ~72% (3-year, all upfront) vs On-Demand
```

- You commit to a **specific instance family/size in a specific region** (Standard RIs) for a discount — Convertible RIs allow changing the instance family later, at a somewhat lower discount than Standard.
- Best fit for workloads with well-understood, steady, long-term capacity needs (a production database that's been running at a stable size for months, with no planned change).
- The main risk: committing to capacity you end up not needing (e.g. after a workload is redesigned or decommissioned) wastes the unused commitment — RIs aren't automatically refunded if your needs change.

## Savings Plans

```
Commit: $10/hour of compute usage, 1-year term
Applies automatically across: any instance family, size, OS, region, AND across EC2/Fargate/Lambda
```

- Instead of committing to a specific instance type, you commit to a **dollar amount of usage per hour** — the discount then applies automatically to whatever compute you actually use, up to that committed spend, across instance families and even across EC2/Fargate/Lambda (for Compute Savings Plans).
- More flexible than RIs for workloads expected to change instance types or shift between compute services over the commitment period, at a similar discount level.

## Spot Instances

```
Bid for AWS's unused EC2 capacity at a steep discount (up to ~90% off On-Demand).
AWS can reclaim a Spot Instance with only a 2-minute interruption warning.
```

- Ideal for workloads that are **interruption-tolerant and stateless/resumable**: batch processing, CI/CD build agents, big data/analytics jobs, and stateless web tier capacity behind an Auto Scaling Group that can simply relaunch elsewhere if interrupted.
- **Not** suitable for stateful, always-must-be-running workloads (a primary database, a single-instance critical service with no failover) — the 2-minute reclaim warning isn't enough time to gracefully migrate state-sensitive work without prior design for interruption.
- Often combined with On-Demand/Reserved capacity in the same Auto Scaling Group (a mixed instances policy) — a baseline of guaranteed capacity via On-Demand/Reserved, with additional burst capacity via cheaper Spot Instances.

## Choosing the Right Model

| Workload Characteristic | Best Fit |
|---|---|
| Unpredictable, short-term, or still being sized | On-Demand |
| Steady, well-understood, long-term, same instance type | Reserved Instances |
| Steady long-term spend, but instance types/services may change | Savings Plans |
| Interruption-tolerant, stateless, flexible timing (batch, CI/CD) | Spot Instances |

## Common Mistake

Buying Reserved Instances for a workload whose actual size/instance type is still uncertain or actively changing — locking in a 1-3 year commitment to a specific instance type before usage patterns have stabilized often leads to paying for unused or mismatched reserved capacity. It's generally safer to start on On-Demand, gather real usage data, and only commit to RIs/Savings Plans once a steady-state pattern is clearly established.

## Summary

On-Demand offers maximum flexibility at the highest price; Reserved Instances and Savings Plans trade a long-term commitment for a significant discount (RIs locking in a specific instance type, Savings Plans locking in a dollar spend with more flexibility); Spot Instances offer the deepest discounts in exchange for accepting that AWS can reclaim the instance with minimal warning — appropriate only for interruption-tolerant workloads.
