# SQL Injection Prevention

SQL injection happens when user input is accidentally treated as part of a SQL command instead of as a value — an attacker crafts input that changes the query's logic, letting them read, modify, or delete data they shouldn't have access to.

## The Attack, Concretely

```sql
-- Vulnerable: building SQL by string concatenation
-- query = "SELECT * FROM users WHERE email = '" + userInput + "'"

-- Attacker enters this as the "email":
' OR '1'='1

-- The query the database actually executes:
SELECT * FROM users WHERE email = '' OR '1'='1'
```

`'1'='1'` is always true, so the `WHERE` clause matches **every row** — a login-check query like this would return the first user in the table (often an admin) and let the attacker log in as them without knowing any password. A more dangerous input like `'; DROP TABLE users; --` can terminate the original statement and append a destructive one, if the driver allows multiple statements per call.

## The Fix: Parameterized Queries

```sql
SELECT customer_id, customer_name
FROM customers
WHERE email = :email;
```

```csharp
// The value is sent to the database separately from the SQL text —
// the database never parses userInput as part of the command grammar.
using var cmd = new SqlCommand("SELECT customer_id, customer_name FROM customers WHERE email = @email", connection);
cmd.Parameters.AddWithValue("@email", userInput);
```

The application sends `:email`/`@email` as a **value** in a separate channel from the query **text**. The database's SQL parser has already fixed the query's structure before your input is ever substituted in — so no matter what the user types, it can only ever be compared *as a string value*, never interpreted as SQL syntax. Use prepared statements or a trusted, parameterized query builder/ORM; never build SQL by concatenating raw user input into a string.

## Why Escaping Alone Isn't Enough

A common but weaker defense is manually escaping special characters (e.g., turning `'` into `\'` or `''`). This is fragile:

- **Character-set/encoding tricks**: some historical MySQL configurations with certain multi-byte character sets allowed an attacker to craft a byte sequence that, combined with an escaping backslash, produced a valid multi-byte character that "consumed" the escape and left a real unescaped quote behind.
- **Context-dependent escaping rules differ per database** — what correctly escapes a value for MySQL may not correctly escape it for the same value used inside a `LIKE` pattern, an `ORDER BY` clause, or a different database entirely. It's easy to get subtly wrong.
- **It doesn't help at all for SQL identifiers** (table/column names) — see below.

Escaping is a stop-gap for cases where parameterization genuinely isn't possible; parameterized queries avoid the entire class of problem instead of trying to neutralize every dangerous character.

## Dynamic Table/Column Names: Allow-Lists

Parameters protect **values**, not SQL identifiers like table or column names — you cannot parameterize `ORDER BY @columnName`. If the sort column, table name, or direction comes from user input, validate it against a fixed **allow-list** rather than passing it through:

```csharp
private static readonly HashSet<string> AllowedSortColumns = new() { "name", "created_at", "price" };

public string BuildOrderClause(string requestedColumn)
{
    if (!AllowedSortColumns.Contains(requestedColumn))
        throw new ArgumentException("Invalid sort column");

    return $"ORDER BY {requestedColumn}"; // safe: value is one of a known-fixed set, never raw user text
}
```

## Second-Order Injection

Not all injection happens at the point data is first entered. **Second-order injection**: an attacker submits a value (e.g. a username containing `'; DROP TABLE users; --`) that is safely parameterized and stored as-is. Later, a *different* part of the application reads that stored value and uses it to build a new SQL string **without** parameterizing it (e.g. generating a report or an audit log query by concatenation) — the payload only detonates the second time it's used. The lesson: every place a value is used in a query needs parameterization, not just the original entry point; "it was already safely stored" doesn't mean it's safe to concatenate later.

## Defense in Depth

- **Least privilege**: the application's database account should have only the permissions it needs (no `DROP`/`ALTER` rights for a read-mostly web app account) — this limits blast radius even if injection succeeds.
- **Input validation** as a secondary layer (reject obviously malformed input early), not a replacement for parameterization.
- **Automated testing**: include SQLi payloads (`' OR '1'='1`, `'; --`, `' UNION SELECT ...`) in security test suites / run a SAST or dynamic scanner (e.g. sqlmap in a controlled test environment) against endpoints that accept user input feeding into queries.
- **ORMs help but don't guarantee safety** — raw SQL fragments or string-built `LIKE`/dynamic sorting inside an ORM query can reintroduce the vulnerability; the safety comes from parameterization, not from "using an ORM" as a label.

## Tricky Interview Questions

**Q: Do parameters protect a dynamic table or column name?**

**A:** Usually no. Parameters protect values, not SQL identifiers. Use an allow-list for table names, column names, and sort directions.

**Q: If input is safely parameterized when a user submits it, can it still cause an injection later?**

**A:** Yes — second-order injection. If that stored value is later read and concatenated into a *different* query without parameterization, the original payload can still execute at that later point.
