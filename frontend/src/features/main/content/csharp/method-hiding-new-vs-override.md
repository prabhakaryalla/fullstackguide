# Method Hiding with new vs override in C#

Both `new` and `override` let a derived class provide a different implementation of a base member, but they resolve very differently depending on the reference type used to call them.

## Quick Difference

- `override` participates in polymorphism — the actual (runtime) object type decides which method runs, regardless of the variable's declared type.
- `new` hides the base member instead of overriding it — which method runs depends on the variable's declared (compile-time) type, not the runtime object.

## override in C#

```csharp
public class Animal
{
    public virtual string Speak() => "...";
}

public class Dog : Animal
{
    public override string Speak() => "Woof";
}

Animal a = new Dog();
Console.WriteLine(a.Speak()); // "Woof" - runtime type (Dog) decides
```

Key points:

- requires the base member to be `virtual` (or `abstract`/another `override`)
- calls are dispatched based on the actual object type at runtime (a virtual method table lookup)

## new in C#

```csharp
public class Animal
{
    public string Speak() => "..."; // not virtual
}

public class Dog : Animal
{
    public new string Speak() => "Woof"; // hides, does not override
}

Animal a = new Dog();
Console.WriteLine(a.Speak()); // "..." - declared type (Animal) decides, NOT "Woof"!

Dog d = new Dog();
Console.WriteLine(d.Speak()); // "Woof" - declared type is Dog here
```

Key points:

- `new` creates a completely separate method that happens to share a name — it does not participate in polymorphism at all
- calling through a base-typed reference always uses the base implementation, even if the actual object is a derived type

## Real-World Example

```csharp
List<Animal> zoo = new() { new Dog(), new Cat() };

foreach (var animal in zoo)
{
    Console.WriteLine(animal.Speak());
    // with override: "Woof", "Meow" (correct polymorphic behavior)
    // with new:      "...", "..."  (bug! base implementation always runs)
}
```

This is a common source of confusing bugs: a derived class "overrides" a method using `new` (sometimes because the base method wasn't marked `virtual`, and the compiler only warns rather than errors), and any code working through a base-class reference or collection silently ignores the derived behavior.

## Summary

- Use `override` (with a `virtual`/`abstract` base member) whenever you want derived-class behavior to run regardless of the reference type used to call it.
- `new` hides rather than overrides — it's rarely what you actually want, and the compiler only emits a warning (not an error) if you accidentally use it instead of `override`.
