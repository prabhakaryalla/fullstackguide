# Capturing Loop Variables in Closures (foreach vs for)

Closures capture variables, not values. Modern C# changed `foreach` to make this safer, but `for` loops can still trap the unwary.

## Quick Difference

- In C# 5 and later, `foreach` creates a **new** loop variable for each iteration, so closures capturing it each get their own value.
- A `for` loop's counter variable is a **single** variable reused across iterations, so closures capturing it all see the final value after the loop ends (unless you copy it into a local first).

## foreach in C# (Safe Since C# 5)

```csharp
var actions = new List<Action>();

foreach (var item in new[] { 1, 2, 3 })
{
    actions.Add(() => Console.WriteLine(item));
}

foreach (var action in actions) action();
// prints: 1, 2, 3 (each closure captured its own "item")
```

Key points:

- before C# 5, `foreach` reused one variable too, and this would have printed `3, 3, 3`
- current C# compilers give each iteration its own variable instance automatically

## for Loop (Still a Trap)

```csharp
var actions = new List<Action>();

for (int i = 0; i < 3; i++)
{
    actions.Add(() => Console.WriteLine(i));
}

foreach (var action in actions) action();
// prints: 3, 3, 3 - all closures share the same "i", which is 3 after the loop
```

Key points:

- `i` is declared once, outside the loop body's per-iteration scope, and mutated in place
- every lambda captures the same variable, so they all observe its final value once the loop completes

## Fix: Copy Into a Local Inside the Loop

```csharp
var actions = new List<Action>();

for (int i = 0; i < 3; i++)
{
    int captured = i; // new variable per iteration
    actions.Add(() => Console.WriteLine(captured));
}

foreach (var action in actions) action();
// prints: 0, 1, 2
```

## Real-World Example

```csharp
var buttons = GetButtons(); // 3 buttons
for (int i = 0; i < buttons.Count; i++)
{
    buttons[i].Click += (s, e) => Console.WriteLine($"Button {i} clicked");
    // BUG: every button prints the same final index
}
```

This is a classic UI bug — every button reports the same (last) index when clicked, because all the event handlers captured the same loop variable `i`. Copying `i` into a local variable inside the loop body fixes it.

## Summary

- `foreach` is safe by default in modern C# — each iteration gets its own variable.
- `for` loops still share one counter variable across iterations; copy it into a local variable inside the loop body before capturing it in a closure.
