# Differences Between Hot, Cool, and Archive Access Tiers in Azure Blob Storage

Azure Blob Storage access tiers help you optimize storage cost based on how often data is accessed.

## Quick Summary

- Hot tier: for frequently accessed data.
- Cool tier: for infrequently accessed data, but still available quickly.
- Archive tier: for rarely accessed long-term data with higher retrieval delay.

## Core Differences

| Area | Hot | Cool | Archive |
| :--- | :--- | :--- | :--- |
| Access frequency | Frequent | Infrequent | Rare |
| Storage cost per GB | Highest | Lower than Hot | Lowest |
| Data access/read cost | Lowest | Higher than Hot | Highest retrieval cost |
| Availability latency | Immediate | Immediate | Rehydration required before read |
| Typical retention expectation | Short or active lifecycle | Medium-term retention | Long-term retention |

## What Each Tier Is Best For

## Hot Tier

Use when data is read or updated often.

Typical scenarios:

- active website images and documents
- daily application logs under analysis
- frequently downloaded files

Why:

- lowest access cost
- immediate retrieval

## Cool Tier

Use when data is stored for at least around 30 days and accessed less frequently.

Typical scenarios:

- monthly reports
- backup files occasionally restored
- older user uploads that are still sometimes requested

Why:

- lower storage cost than Hot
- still online and quickly accessible

Tradeoff:

- higher read/access and early deletion considerations compared to Hot

## Archive Tier

Use for long-term data that is almost never read.

Typical scenarios:

- compliance records
- audit/history snapshots
- historical backups kept for years

Why:

- lowest storage price

Tradeoffs:

- data is offline
- must rehydrate before reading
- retrieval can take time depending on priority option
- highest access/retrieval cost

## Practical Decision Rule

Choose by this question: "How often will I read this data?"

- Often: Hot
- Sometimes, but not often: Cool
- Almost never, but must retain: Archive

## Lifecycle Management Pattern

A common cost-optimization flow:

1. New data starts in Hot.
2. After N days, move to Cool.
3. After N months, move to Archive.

This is usually automated using Blob lifecycle management rules.

## Real-World Example

For an e-commerce platform:

- Product images: Hot
- Order exports from last quarter: Cool
- 7-year tax and compliance records: Archive

## Common Mistakes

- putting actively queried data in Archive
- keeping old inactive data in Hot for too long
- ignoring retrieval and rehydration time in disaster recovery planning

## Summary

Hot, Cool, and Archive tiers are cost-versus-access tradeoffs. Hot is for active data, Cool is for less-frequent access, and Archive is for long-term retention with delayed retrieval.
