# Extension Methods on null

Extension methods look like instance methods at the call site, but they're actually static methods in disguise — which means they can be called on a `null` reference without throwing.

## The Question

```csharp
public static class StringExtensions
{
    public static bool IsNullOrEmpty(this string value) => string.IsNullOrEmpty(value);
}

string s = null;
Console.WriteLine(s.IsNullOrEmpty()); // Output?
```

**Output:** `True` — no `NullReferenceException`.

## Why This Happens

- `s.IsNullOrEmpty()` is pure compiler syntax sugar for `StringExtensions.IsNullOrEmpty(s)` — a regular static method call with `s` passed as an ordinary argument.
- Calling a static method with a `null` argument is completely normal; nothing is ever dereferenced just to make the call happen. The extension method only fails if *it itself* tries to call an instance member on the (possibly null) parameter without checking first.
- Compare this to a real instance method: `s.ToUpper()` *does* throw on `null`, because that call requires an actual object to dereference and invoke a method on — there's no such requirement for a static method just because it's written with dot syntax.

## Where This Actually Helps

```csharp
public static class EnumerableExtensions
{
    public static IEnumerable<T> OrEmpty<T>(this IEnumerable<T> source) => source ?? Enumerable.Empty<T>();
}

IEnumerable<int> items = null;
foreach (var item in items.OrEmpty()) // safe - no NullReferenceException
{
    Console.WriteLine(item);
}
```

This is a deliberate, common pattern: extension methods like `IsNullOrEmpty`, `OrEmpty`, or a custom `IsNull()` helper are written specifically to be null-tolerant, giving you a fluent null-check without an explicit `if` at every call site.

## Where This Bites People

```csharp
public static class OrderExtensions
{
    public static decimal Total(this Order order) => order.Items.Sum(i => i.Price); // assumes order is never null
}

Order order = null;
var total = order.Total(); // throws NullReferenceException - but only INSIDE the method body, on order.Items
```

The call itself (`order.Total()`) never throws just because `order` is `null` — but the moment the method body tries to use `order` as if it's guaranteed non-null (`order.Items`), it throws exactly like any other code would. Extension methods don't automatically make your code null-safe; they just don't add an *extra*, implicit null-check on the receiver the way a true instance method call does.

## Common Mistake

Assuming an extension method call on a `null` variable will always throw (because it "looks like" `obj.Method()`), or conversely assuming it will always be safe just because it didn't throw immediately. Whether it's safe depends entirely on whether the extension method's own body handles a `null` parameter — the language guarantees nothing here either way.

## Summary

Extension method syntax hides the fact that you're calling a static method with the receiver as a plain parameter. That's why calling one on a `null` reference never throws by itself — the extension method has to explicitly check for `null` if it wants to be null-safe, and equally, it can still throw internally the moment it dereferences a null parameter without checking.
