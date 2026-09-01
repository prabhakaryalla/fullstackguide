# How yield return Defers Exceptions Until Iteration

An iterator method's body doesn't actually run when you call it — it only runs as the caller enumerates, which means exceptions surface much later than expected.

## Quick Difference

- A normal method runs its full body (and can throw) the moment you call it.
- A `yield return` iterator method runs none of its body when called — calling it only returns an enumerator object; the body executes incrementally as `MoveNext()` is called during enumeration.
- Any exception inside the iterator body is only thrown when enumeration reaches that point, not when the method was originally invoked.

## Normal Method

```csharp
public List<int> GetNumbers(int divisor)
{
    if (divisor == 0) throw new DivideByZeroException();
    return new List<int> { 10 / divisor };
}

var list = GetNumbers(0); // throws immediately, right here
```

## Iterator Method with yield return

```csharp
public IEnumerable<int> GetNumbers(int divisor)
{
    if (divisor == 0) throw new DivideByZeroException(); // NOT thrown yet!
    yield return 10 / divisor;
}

var sequence = GetNumbers(0); // no exception here - nothing has run yet
Console.WriteLine("Got the sequence, no error so far");

foreach (var n in sequence) // exception is thrown HERE, when MoveNext() runs the body
{
    Console.WriteLine(n);
}
```

Key points:

- the compiler transforms a `yield return` method into a state machine; calling it just constructs that state machine object
- none of your code (including validation you expect to run "up front") executes until the first `MoveNext()` call
- this means a `try/catch` around the *call* to the iterator method will not catch exceptions from inside it — you must wrap the *enumeration* instead

## Real-World Example: The Misplaced try/catch

```csharp
public IEnumerable<int> ParseLines(string[] lines)
{
    foreach (var line in lines)
    {
        yield return int.Parse(line); // can throw FormatException
    }
}

try
{
    var numbers = ParseLines(input); // no exception here, even for bad input!
}
catch (FormatException)
{
    Console.WriteLine("This catch block never runs");
}

foreach (var n in numbers) // FormatException actually happens here, uncaught
{
    Console.WriteLine(n);
}
```

## Fix: Validate Eagerly, Wrap the Right Scope

```csharp
public IEnumerable<int> ParseLines(string[] lines)
{
    // Split validation into an eager part (runs immediately) and a lazy part
    ArgumentNullException.ThrowIfNull(lines); // throws immediately, as expected
    return ParseLinesCore(lines);
}

private IEnumerable<int> ParseLinesCore(string[] lines)
{
    foreach (var line in lines)
    {
        yield return int.Parse(line);
    }
}
```

Splitting the eager (up-front) checks into a regular non-iterator wrapper method, while keeping the actual `yield return` logic in a private helper, ensures argument validation still throws immediately when the method is called, while the per-item parsing still defers as expected.

## Summary

- Calling an iterator method (`yield return`) never runs its body immediately — it only builds an enumerator.
- Exceptions inside the body surface during enumeration (`foreach`, `MoveNext()`), not at the call site — wrap the `foreach` in `try/catch`, not the initial method call, and consider splitting eager validation into a separate non-iterator wrapper method.
