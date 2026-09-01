# Boxing and Unboxing in C#

Boxing and unboxing happen when C# converts between value types and object references.

## Quick Meaning

- Boxing: value type to object
- Unboxing: object back to value type

## Simple Example

```csharp
int number = 42;
object boxed = number;   // Boxing
int unboxed = (int)boxed; // Unboxing
```

## What Is Boxing?

Boxing copies a value type like int, bool, or struct into a new object on the heap.

```csharp
int age = 30;
object data = age; // boxing
```

Why it happens:

- APIs that accept object
- Non-generic collections
- Interface conversion for value types

## What Is Unboxing?

Unboxing extracts the value type from an object reference.

```csharp
object data = 30;
int age = (int)data; // unboxing
```

Important rule:

The runtime type must match. Otherwise, you get an exception.

```csharp
object data = 30;
long value = (long)data; // InvalidCastException
```

## Where Beginners Usually See It

### 1. Non-generic collections

```csharp
ArrayList list = new ArrayList();
list.Add(10); // boxing

int x = (int)list[0]; // unboxing
```

### 2. Generic collections avoid it

```csharp
List<int> numbers = new List<int>();
numbers.Add(10); // no boxing

int x = numbers[0]; // no unboxing cast needed
```

## Performance Note

Frequent boxing/unboxing can:

- Create extra heap allocations
- Increase garbage collection work
- Slow hot code paths

Tip: prefer generic types such as List<int>, Dictionary<string, int>, and generic methods.

## Real-World Analogy

Boxing is like putting a small item into a shipping box so a courier can handle it as a standard package.

Unboxing is opening that package and taking the original item back out.
