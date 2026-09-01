# 175. Combine Two Tables

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Person` table (`personId`, `firstName`, `lastName`) and an `Address` table (`addressId`, `personId`, `city`, `state`), write a query to report each person's first name, last name, city, and state. If a person has no address on file, the address fields should be `null`.

### Schema

```
Person: personId (PK), firstName, lastName
Address: addressId (PK), personId (FK), city, state
```

## Approach

Because every person must appear even without a matching address row, use a `LEFT JOIN` from `Person` to `Address` (rather than an inner join, which would silently drop addressless people) on the shared `personId` column.

## SQL Solution

```sql
SELECT
    p.firstName,
    p.lastName,
    a.city,
    a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;
```

## Complexity

- **Time:** `O(n + m)` with an index on `Address.personId`, where `n` and `m` are the row counts of `Person` and `Address`.
- **Space:** `O(n)` for the result set.
