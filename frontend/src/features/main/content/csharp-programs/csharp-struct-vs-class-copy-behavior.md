# Struct vs Class Copy Behavior

Assigning one variable to another copies all fields for a `struct` (value type), but only copies the reference for a `class` — the two behave very differently once you start mutating through the copy.

## Setup

```csharp
struct MyStruct { public int Value; }
class MyClass { public int Value; }
```

## Question 1: Struct Assignment

```csharp
MyStruct s1 = new MyStruct { Value = 5 };
MyStruct s2 = s1;
s2.Value = 10;
Console.WriteLine(s1.Value); // Output?
```

**Output:** `5`

- `s2 = s1` performs a full memberwise copy — `s1` and `s2` are independent after that point. Mutating `s2` never touches `s1`.

## Question 2: Class Assignment

```csharp
MyClass c1 = new MyClass { Value = 5 };
MyClass c2 = c1;
c2.Value = 10;
Console.WriteLine(c1.Value); // Output?
```

**Output:** `10`

- `c2 = c1` only copies the reference — both variables point to the exact same object on the heap. Mutating through `c2` is visible through `c1` because there's only one object.

## The Same Trap With Method Parameters

```csharp
void Modify(MyStruct s) => s.Value = 999; // modifies a local copy, caller unaffected
void Modify(MyClass c) => c.Value = 999;  // modifies the shared object, caller sees it

var s1 = new MyStruct { Value = 1 };
Modify(s1);
Console.WriteLine(s1.Value); // 1 - struct passed by value

var c1 = new MyClass { Value = 1 };
Modify(c1);
Console.WriteLine(c1.Value); // 999 - class reference points to the shared object
```

## Common Mistake

Reading a struct out of a `List<T>`, mutating the local copy, and expecting the list to reflect the change:

```csharp
struct Point { public int X, Y; }
var points = new List<Point> { new Point { X = 1, Y = 1 } };

Point p = points[0];
p.X = 100;
Console.WriteLine(points[0].X); // still 1 - p is a copy, not a reference into the list
```

## Summary

Structs are value types: assignment, passing to a method, and reading out of a collection all copy the data. Classes are reference types: assignment and passing only copy the reference, so every alias observes the same object's mutations. Choose `struct` vs `class` based on whether that copy-vs-share behavior is actually what you want.
