# S3 Storage Classes and Lifecycle Policies

Not all S3 data needs the same speed of access or the same price — S3 storage classes let you pay less for data accessed rarely, and lifecycle policies automate moving (or deleting) objects between classes as they age, without any manual intervention.

## Short Answer

S3 offers a range of storage classes trading retrieval speed/availability for cost — from **S3 Standard** (frequent access, millisecond retrieval) down to **Glacier Deep Archive** (cheapest, but retrieval takes hours). A **lifecycle policy** automatically transitions objects between classes (or deletes them) based on age, so you don't have to manually manage where data lives as it becomes less frequently accessed.

## Storage Classes, Cheapest-Access-Speed to Slowest

| Class | Best For | Retrieval Time | Relative Cost |
|---|---|---|---|
| **S3 Standard** | Frequently accessed, active data | Milliseconds | Highest |
| **S3 Intelligent-Tiering** | Unknown/changing access patterns | Milliseconds | Auto-optimizes between tiers |
| **S3 Standard-IA** (Infrequent Access) | Backups, older data accessed occasionally | Milliseconds | Lower storage, cost per retrieval |
| **S3 One Zone-IA** | Infrequent, re-creatable data (no need for multi-AZ durability) | Milliseconds | Lower than Standard-IA |
| **S3 Glacier Instant Retrieval** | Archival data needing occasional instant access | Milliseconds | Very low |
| **S3 Glacier Flexible Retrieval** | Archival, access a few times a year | Minutes to hours | Very low |
| **S3 Glacier Deep Archive** | Long-term compliance/regulatory archives | Up to ~12 hours | Lowest |

- **Intelligent-Tiering** monitors access patterns and automatically moves objects between frequent/infrequent tiers for you — the right default when you genuinely don't know (or it varies) how often an object will be accessed.
- **One Zone-IA** stores data in only a single Availability Zone (cheaper), so it's only appropriate for data you can regenerate/re-download if that AZ is lost.

## Lifecycle Policies: Automating the Transition

```json
{
  "Rules": [
    {
      "ID": "Archive old logs",
      "Filter": { "Prefix": "logs/" },
      "Status": "Enabled",
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER" }
      ],
      "Expiration": { "Days": 365 }
    }
  ]
}
```

- Objects under the `logs/` prefix move to Standard-IA after 30 days, Glacier after 90 days, and are deleted entirely after a year — all automatically, with no manual process needed.
- Lifecycle rules can also target incomplete multipart uploads (cleaning up abandoned uploads that would otherwise silently accrue storage cost forever) and previous object versions in a versioned bucket.

## Common Mistake

Leaving every object in S3 Standard indefinitely "because it's simple," when a large fraction of stored data (old logs, backups, completed job outputs) is rarely if ever accessed again. This is one of the most common, easiest-to-fix sources of unnecessary AWS cost — a lifecycle policy targeting old/infrequently-accessed prefixes typically pays for itself immediately with no application changes required.

## Real-World Example

An application writes daily log files to S3. Logs from the last 30 days are queried regularly for debugging (Standard). Logs from 30–90 days old are occasionally needed for audits (Standard-IA is cheaper and still fast). Anything older than 90 days is legally required to be retained for 7 years but is essentially never accessed (Glacier Deep Archive, at a fraction of Standard's cost) — with automatic expiration configured once the 7-year retention requirement is met.

## Summary

S3 storage classes let you pay less for data that's accessed less often, ranging from millisecond Standard access down to hours-long Glacier Deep Archive retrieval at the lowest cost. Lifecycle policies automate the movement (and eventual deletion) of objects between classes based on age, turning a manual cost-optimization chore into a one-time configuration that keeps working indefinitely.
