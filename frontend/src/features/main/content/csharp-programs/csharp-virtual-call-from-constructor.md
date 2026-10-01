# Virtual Call From a Constructor

Calling a `virtual` method from a base class constructor dispatches to the *derived* class's override — even though the derived class's own fields haven't been initialized yet.

## The Question

```csharp
class Base
{
    public Base()
    {
        Show(); // calls the virtual method during construction
    }

    protected virtual void Show() => Console.WriteLine("Base.Show");
}

class Derived : Base
{
    private readonly string _name = "Derived";

    protected override void Show() => Console.WriteLine($"Derived.Show, name = '{_name}'");
}

new Derived();
```

**Output:** `Derived.Show, name = ''`

Not `Base.Show`, and not `Derived.Show, name = 'Derived'` — the override runs, but `_name` is still its default value.

## Why This Happens

- Construction order in C# is: base class constructor body runs completely first, *then* derived class field initializers run, *then* the derived class constructor body runs.
- Virtual dispatch is based on the object's actual runtime type, which is already `Derived` from the moment the object exists — even while `Base`'s constructor is still executing. So `Show()` correctly calls `Derived.Show`, following the normal virtual dispatch rule.
- The catch: `Derived`'s field initializers (`_name = "Derived"`) haven't run yet at that point, because they're scheduled to run *after* the base constructor finishes. So `Derived.Show` executes against an object where `_name` is still `null` (or `default` for a value type) — not the value you'd expect from reading the class top-to-bottom.

## Why This Is Dangerous

```csharp
class ReportBase
{
    public ReportBase()
    {
        Initialize(); // virtual call - looks harmless
    }

    protected virtual void Initialize() { }
}

class SalesReport : ReportBase
{
    private readonly List<string> _lines = new(); // NOT yet assigned when Initialize() runs from the base ctor

    protected override void Initialize()
    {
        _lines.Add("header"); // NullReferenceException! _lines is still null here
    }
}
```

This is a real, reproducible bug pattern — not just a trivia question. Any derived class that relies on its own field initializers having run before an overridden method executes will fail unpredictably, because the base constructor calls that method too early in the object's lifetime.

## Common Mistake

Assuming an object is "fully constructed" the instant any of its code starts running. Virtual dispatch doesn't know or care whether initialization has finished — it only cares about the runtime type, which is fixed as soon as the object is allocated, well before any constructor body (base or derived) has finished running.

## The Fix

Avoid calling virtual (or overridable) members from a constructor entirely. If a "post-construction" hook is genuinely needed, use a separate, explicitly-called initialization method (or a factory method / `Init()` step) instead of a virtual call from within the constructor itself.

## Summary

A base constructor calling a `virtual` method always dispatches to the derived override, because the object's runtime type is fixed at allocation — but the derived class's own field initializers and constructor body haven't run yet at that point. This is one of the most cited reasons in C# style guides for the rule "never call virtual members from a constructor."
