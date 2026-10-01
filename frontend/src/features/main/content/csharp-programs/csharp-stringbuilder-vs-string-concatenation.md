# StringBuilder vs String Concatenation

Strings in .NET are immutable, so every `+=` concatenation inside a loop silently allocates a brand-new string and discards the old one — `StringBuilder` avoids that by mutating an internal buffer instead.

## The Problem

```csharp
string s = "";
for (int i = 0; i < 1000; i++)
{
    s += i.ToString(); // each += allocates a NEW string and discards the old one
}
```

- `string` is immutable — no operation ever modifies an existing `string` instance in place.
- `s += i.ToString()` really means `s = s + i.ToString()`: it allocates a new string containing the combined characters, then reassigns `s`.
- Over 1000 iterations this allocates roughly 1000 intermediate strings of increasing size — O(n²) total character copying.

## The Fix

```csharp
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
{
    sb.Append(i.ToString()); // mutates an internal char buffer, no new string per iteration
}
string result = sb.ToString(); // one final string allocation at the end
```

- `StringBuilder` keeps a resizable internal buffer; `Append` writes into it directly, resizing only occasionally.
- The final `string` is materialized once, via `ToString()`, after all appends are done.

## When It Actually Matters

```csharp
// Fine - fixed, small number of concatenations, no loop
string message = "Hello, " + name + "! You have " + count + " messages.";

// Problematic - unbounded or large-count loop
string csv = "";
foreach (var row in millionRows)
    csv += row.ToCsvLine() + "\n"; // O(n^2) behavior on a million-row loop
```

- For a small, fixed number of concatenations the difference is negligible — the problem is specifically concatenation **inside a loop** with a large iteration count.

## Common Mistake

Reaching for `StringBuilder` everywhere out of habit, even for a handful of fixed concatenations, or conversely using `+=` inside a large loop because "it looks simpler."

## Summary

`+=` on strings inside a loop is a classic performance smell because every iteration allocates and copies a new string. `StringBuilder` (or `string.Join`/`string.Concat` for a known, finite set of pieces) avoids the repeated allocations by mutating a single growable buffer.
