# 2694. Event Emitter

**Difficulty:** Medium
**Category:** Design, Hash Table

## Problem

Design an `EventEmitter` class:

- `subscribe(eventName, callback)` subscribes `callback` to the event named `eventName`, and returns a subscription object with an `unsubscribe()` method that removes `callback` from that event's listener list when invoked.
- `emit(eventName, args)` synchronously invokes every callback currently subscribed to `eventName`, in the order they were subscribed, each with `args` as its arguments, and returns an array of their results in that same order. If no callbacks are subscribed to `eventName`, `emit` returns an empty array.

### Example

```
const emitter = new EventEmitter();
const sub = emitter.subscribe("firstEvent", x => x + 1);
emitter.emit("firstEvent", [5]); // [6]
sub.unsubscribe();
emitter.emit("firstEvent", [5]); // []
```

## Approach

Maintain a dictionary mapping event names to an ordered list of listener delegates. `Subscribe` appends the callback to that event's list and returns a small `Subscription` object capturing the list and the callback so `Unsubscribe` can remove it later. `Emit` looks up the listener list for the event and invokes each callback in order, collecting the results.

## C# Solution

```csharp
public class EventEmitter
{
    private readonly Dictionary<string, List<Func<object[], object>>> listeners = new();

    public class Subscription
    {
        private readonly List<Func<object[], object>> list;
        private readonly Func<object[], object> callback;

        public Subscription(List<Func<object[], object>> list, Func<object[], object> callback)
        {
            this.list = list;
            this.callback = callback;
        }

        public void Unsubscribe() => list.Remove(callback);
    }

    public Subscription Subscribe(string eventName, Func<object[], object> callback)
    {
        if (!listeners.ContainsKey(eventName))
        {
            listeners[eventName] = new List<Func<object[], object>>();
        }

        listeners[eventName].Add(callback);
        return new Subscription(listeners[eventName], callback);
    }

    public List<object> Emit(string eventName, params object[] args)
    {
        var results = new List<object>();

        if (listeners.TryGetValue(eventName, out var callbacks))
        {
            foreach (var callback in new List<Func<object[], object>>(callbacks))
            {
                results.Add(callback(args));
            }
        }

        return results;
    }
}

public class Solution
{
    public static EventEmitter CreateEventEmitter() => new EventEmitter();
}
```

## Complexity

- **Time:** O(1) for `Subscribe`/`Unsubscribe`, O(k) for `Emit`, where k is the number of listeners for the event.
- **Space:** O(k) for the listener list of each event.
