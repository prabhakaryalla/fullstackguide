# 359. Logger Rate Limiter

**Difficulty:** Easy
**Category:** Hash Table, Design
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a logger system that receives a stream of messages along with their timestamps. Implement `ShouldPrintMessage(timestamp, message)`, which returns `true` if the message should be printed (i.e., it hasn't been printed in the last 10 seconds).

### Example

```
Input:
["Logger", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage"]
[[], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]]
Output:
[null, true, true, false, false, false, true]
```

### Constraints

- `0 <= timestamp <= 10^9`
- Every `timestamp` passed to `ShouldPrintMessage` is greater than or equal to the previous one.
- At most `10^4` calls will be made.

## Approach

Maintain a hash map from message text to the timestamp it was last printed. A message can be printed if it has never been seen before, or if the current timestamp is at least 10 seconds after its last printed timestamp; whenever a message is allowed through, update its stored timestamp.

## C# Solution

```csharp
public class Logger
{
    private readonly Dictionary<string, int> lastPrintedAt = new();

    public bool ShouldPrintMessage(int timestamp, string message)
    {
        if (lastPrintedAt.TryGetValue(message, out var lastTime) && timestamp - lastTime < 10)
            return false;

        lastPrintedAt[message] = timestamp;
        return true;
    }
}
```

## Complexity

- **Time:** `O(1)` per call.
- **Space:** `O(n)` for the stored messages.
