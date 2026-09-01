# Difference Between string == and ReferenceEquals in C#

`==` on strings compares content, while `ReferenceEquals` compares object identity. String interning makes this distinction easy to miss.

## Quick Difference

- `str1 == str2` performs a value (content) comparison for strings, because `string` overloads `==`.
- `ReferenceEquals(str1, str2)` checks whether both variables point to the exact same object in memory.

## == in C#

```csharp
string a = "hello";
string b = "hello";

Console.WriteLine(a == b); // true - same content
```

Key points:

- `string` overrides `==` to compare characters, not references
- works correctly even if the strings come from different sources (concatenation, `Substring`, user input)

## ReferenceEquals in C#

```csharp
string a = "hello";
string b = "hello";
string c = new string("hello".ToCharArray());

Console.WriteLine(ReferenceEquals(a, b)); // true - both are interned literals
Console.WriteLine(ReferenceEquals(a, c)); // false - c is a distinct heap object
```

Key points:

- literal strings are interned by the compiler/runtime, so identical literals often share one object
- strings built at runtime (`new string(...)`, concatenation, `StringBuilder.ToString()`) are separate objects even with identical content
- `ReferenceEquals` is rarely what you want for strings; it exists mainly to explain surprising interning behavior

## Real-World Example

```csharp
string input = Console.ReadLine() ?? "";
string expected = "admin";

if (ReferenceEquals(input, expected)) // almost always false, even if input is "admin"
{
    Console.WriteLine("Never reliably reached");
}

if (input == expected) // correct way to compare user input
{
    Console.WriteLine("Matched");
}
```

A developer who mistakenly uses `ReferenceEquals` to validate user input will see it fail even when the text matches, because runtime-built strings are not interned by default.

## Summary

- Use `==` (or `.Equals`) to compare string content — this is what you want almost every time.
- `ReferenceEquals` only tells you whether two references point to the same object, which is an implementation detail affected by string interning.
