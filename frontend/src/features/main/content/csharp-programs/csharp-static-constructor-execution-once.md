# Static Constructor Execution

A static constructor initializes a type's static state, and the CLR guarantees it runs at most once per type per application domain — no matter how many instances you create afterward.

## The Question

```csharp
class A
{
    static A() { Console.Write("Static"); }
}

A a1 = new A();
A a2 = new A(); // How many times will "Static" print?
```

**Output:** `Static` (once)

- The runtime tracks, per type, whether the static constructor has already run — the second `new A()` doesn't trigger it again.
- Static constructors have no parameters, no access modifier, and can't be called explicitly — the CLR invokes them automatically, before the type's first use.

## Static Field Initializers Run as Part of It Too

```csharp
class Logger
{
    static readonly string StartupTime;

    static Logger()
    {
        StartupTime = DateTime.UtcNow.ToString("O");
        Console.WriteLine("Logger initialized once at " + StartupTime);
    }
}
```

- inline static field initializers and the static constructor body both execute as part of that single, guaranteed one-time initialization.

## Contrast With Instance Constructors

```csharp
class Counter
{
    static Counter() => Console.WriteLine("Static ctor ran");
    public Counter() => Console.WriteLine("Instance ctor ran"); // runs every time `new` executes
}

new Counter();
new Counter();
new Counter();
// Output: "Static ctor ran" once, "Instance ctor ran" three times
```

## Common Mistake

Assuming a static constructor re-runs its logic for every new instance, like an instance constructor does. It doesn't — it's a one-time, per-type initialization hook, regardless of instance count.

## Summary

Static constructors give a guaranteed, thread-safe, exactly-once initialization per type — a classic interview trick is asking how many times output prints across multiple `new` calls, and the answer is always one.
