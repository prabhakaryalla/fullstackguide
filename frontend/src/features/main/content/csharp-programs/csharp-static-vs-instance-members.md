# Static vs Instance Members

Static members belong to the type itself and are shared across every use of that type; instance members belong to a specific object created with `new` — mixing the two up is a common source of "why is my counter shared?" bugs.

## Question 1: Is This Valid?

```csharp
class A { public static int Count = 0; }
A.Count++;
```

**Answer:** Valid. Static members belong to the class, not any instance, and are accessed through the type name.

## Question 2: The Shared-State Trap

```csharp
class Counter
{
    static int total; // shared across ALL Counter instances
    public void Increment() => total++;
    public int Total => total;
}

var c1 = new Counter();
var c2 = new Counter();
c1.Increment();
c2.Increment();
Console.WriteLine(c1.Total); // Output?
```

**Output:** `2`

- `total` is `static`, so there's only one shared value — incrementing through `c2` also affects what `c1.Total` reports, because both instances read and write the exact same field.
- If per-instance counting was intended, the fix is simply to drop `static` from the field.

## Static Methods Can't Access Instance Members Directly

```csharp
class B
{
    int instanceField;
    static int staticField;

    static void StaticMethod()
    {
        // Console.WriteLine(instanceField); // Compile error - no implicit `this` in a static context
        Console.WriteLine(staticField);      // OK
    }
}
```

- a `static` method has no `this` reference, so it can't read or write instance members unless given an explicit instance to operate on.

## Common Mistake

Expecting each object to track its own count/state independently when the backing field is actually `static` — the field is shared by every instance of the type, not scoped per object.

## Summary

Use `static` for state or behavior genuinely shared across the whole type (constants, caches, utility methods), and instance members for anything that should vary independently per object. The classic interview trap is the "shared counter": incrementing a `static` field through one instance is visible through every other instance of the same type.
