# Implicit vs Explicit Casting

Converting a floating-point value to an integer type in C# always truncates toward zero — it never rounds to the nearest whole number, which trips up developers expecting typical rounding behavior.

## The Question

```csharp
double d = 10.9;
int i = (int)d;
Console.WriteLine(i); // Output?
```

**Output:** `10`

- `(int)d` chops off everything after the decimal point — it doesn't check whether the fractional part is `.5` or higher to decide whether to round up.

## Truncation Is Toward Zero, Not "Downward"

```csharp
double d2 = -10.9;
int i2 = (int)d2;
Console.WriteLine(i2); // Output?
```

**Output:** `-10`

- Truncation always moves toward zero: `10.9 → 10` and `-10.9 → -10`, not `-11`.

## Implicit vs Explicit Direction

```csharp
int whole = 10;
double d3 = whole;  // implicit - int to double never loses information

double d4 = 10.9;
int i3 = d4;         // Compile error - requires an explicit cast, data can be lost
int i4 = (int)d4;    // OK - 10, explicitly acknowledging possible data loss
```

- Widening conversions (`int` to `double`) are implicit because no data can be lost. Narrowing conversions (`double` to `int`) require an explicit cast precisely because they can lose information — here, the fractional part.

## Common Mistake

Assuming `(int)someDouble` rounds to the nearest whole number. It doesn't — use `Math.Round(d)` (or `Math.Ceiling`/`Math.Floor`) explicitly before casting if you need rounding semantics:

```csharp
int rounded = (int)Math.Round(10.9); // 11
```

## Real-World Example: Off-by-One in Pagination

```csharp
int totalItems = 105;
int pageSize = 10;

double pagesExact = (double)totalItems / pageSize; // 10.5
int totalPages = (int)pagesExact;                  // 10 - WRONG, drops the partial last page

int totalPagesCorrect = (int)Math.Ceiling(pagesExact); // 11
```

## Summary

`(int)someDouble` always truncates toward zero, never rounds — use `Math.Round`, `Math.Ceiling`, or `Math.Floor` explicitly first if different rounding semantics are needed, and remember the compiler requiring an explicit cast here is itself the signal that data loss is possible.
