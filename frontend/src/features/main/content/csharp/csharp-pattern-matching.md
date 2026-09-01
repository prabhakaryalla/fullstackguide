# C# Pattern Matching

Pattern matching enables concise type-checking and data extraction.

## Switch Expressions

```csharp
string Describe(object obj) => obj switch
{
    int n when n > 0 => "positive",
    int n when n < 0 => "negative",
    int => "zero",
    string s => $"string: {s}",
    _ => "unknown"
};
```

## Property Patterns

```csharp
static bool IsAdult(Person p) => p is { Age: >= 18 };
```
