# float/double vs decimal Precision in C#

`float` and `double` use binary floating-point representation, which cannot exactly represent most decimal fractions — `decimal` uses a base-10 representation designed to avoid exactly this problem.

## Quick Difference

- `float`/`double` store numbers in binary (base 2), so many decimal fractions (like `0.1`) have no exact binary representation and are stored as the closest approximation.
- `decimal` stores numbers in base 10 internally, so common decimal fractions used in money/business calculations are represented exactly (within its range and 28-29 significant digits).

## The Classic Bug

```csharp
double a = 0.1;
double b = 0.2;

Console.WriteLine(a + b == 0.3); // false!
Console.WriteLine(a + b);        // 0.30000000000000004
```

Key points:

- `0.1` and `0.2` cannot be represented exactly in binary floating point, so tiny rounding errors accumulate
- comparing floating-point numbers with `==` is inherently unreliable for values derived from arithmetic

## decimal Avoids This for Base-10 Fractions

```csharp
decimal a = 0.1m;
decimal b = 0.2m;

Console.WriteLine(a + b == 0.3m); // true - decimal represents these exactly
Console.WriteLine(a + b);          // 0.3
```

Key points:

- the `m` suffix creates a `decimal` literal
- ideal for money and other values where "what you write is what you get" matters

## Real-World Example: Money Calculations

```csharp
double priceDouble = 19.99;
double total = 0;
for (int i = 0; i < 10; i++) total += priceDouble;
Console.WriteLine(total); // 199.90000000000006 - visibly wrong for an invoice

decimal priceDecimal = 19.99m;
decimal totalDecimal = 0;
for (int i = 0; i < 10; i++) totalDecimal += priceDecimal;
Console.WriteLine(totalDecimal); // 199.90 - exact
```

A shopping cart or invoicing system using `double` for prices can accumulate visible rounding errors over many additions — exactly the kind of bug that shows up as "off by a cent" complaints in production. This is why `decimal` is the standard recommendation for currency in .NET.

## Trade-offs

- `decimal` is slower and uses more memory (16 bytes) than `double` (8 bytes) — not ideal for large-scale scientific/graphics computation.
- `double`/`float` are faster and better suited for scientific, graphics, or performance-sensitive numeric work where small representable error is acceptable.

## Summary

- `double`/`float` trade exactness for speed and range — never compare them with `==` after arithmetic, and avoid them for money.
- `decimal` trades some speed/memory for exact base-10 precision — use it for currency, financial totals, and anywhere exact decimal fractions matter.
