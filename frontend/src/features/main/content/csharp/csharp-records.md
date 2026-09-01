# C# Records

Records are immutable reference types with value-based equality.

## Declaring a Record

```csharp
public record Person(string FirstName, string LastName);
```

## With-expressions

```csharp
var alice = new Person("Alice", "Smith");
var bob = alice with { FirstName = "Bob" };
```

## Positional Deconstruction

```csharp
var (first, last) = alice;
```
