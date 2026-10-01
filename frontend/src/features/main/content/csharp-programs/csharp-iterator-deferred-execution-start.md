# Iterator Execution Timing

Calling a method that uses `yield return` doesn't run any of its body — it just hands back an enumerator object. None of your code inside actually executes until something starts pulling values out via `MoveNext()`.

## The Question

```csharp
IEnumerable<int> Foo()
{
    Console.Write("Start");
    yield return 1;
}

var result = Foo(); // Output?
```

**Output:** *(nothing)*

- Calling `Foo()` does not print `"Start"` — it only constructs a state machine object and returns it as `result`. No statement inside `Foo` has run yet.

## When It Actually Runs

```csharp
var result = Foo();              // still no output
Console.WriteLine("Got result"); // prints "Got result"

foreach (var x in result)        // NOW "Start" prints, right before the first value is produced
{
    Console.WriteLine(x);
}
// Output:
// Got result
// Start
// 1
```

- The compiler transforms an iterator method (any method containing `yield return`) into a hidden state-machine class. Calling the method just instantiates that class — it doesn't execute any of the method's statements.
- The body only starts running when the enumerator's `MoveNext()` is called for the first time, which happens as soon as a `foreach` (or manual `GetEnumerator()`/`MoveNext()` calls) begins iterating.

## Common Mistake

Assuming any code at the top of an iterator method — logging, validation, side effects — runs immediately when the method is called, the same way it would in a normal method. It doesn't: everything inside is deferred until enumeration actually starts, and running the same iterator through a second, separate enumeration re-executes the body again from scratch.

## Summary

`yield return` methods are lazy end-to-end: calling them produces an enumerator with zero side effects executed, and the method body only runs incrementally as the caller iterates. This is the same underlying mechanism that makes exceptions inside an iterator surface late — the code simply hasn't run yet at the point the method was called.
