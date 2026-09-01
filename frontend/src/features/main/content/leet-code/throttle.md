# 2676. Throttle

**Difficulty:** Medium
**Category:** Design, Function, Concurrency
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a function `fn` and a delay `t` in milliseconds, return a throttled version of `fn`:

- The throttled function invokes `fn` immediately the first time it is called (leading edge).
- While inside the `t`-millisecond cooldown window following that invocation, further calls do not invoke `fn` immediately; instead, the most recent set of arguments passed during the window is remembered.
- Once the cooldown window ends, if at least one call was made during it, `fn` is invoked one final time (trailing edge) with the most recently remembered arguments, and a new cooldown window begins.

### Example

```
Input: t = 50, calls = [{ t: 50, inputs: [1] }, { t: 75, inputs: [2] }]
Output: [{ t: 50, inputs: [1] }, { t: 100, inputs: [2] }]
Explanation: The call at t=50 executes immediately. The call at t=75 falls inside the
cooldown window opened at t=50, so it is queued and executes at the trailing edge, t=100.
```

## Approach

JavaScript's `setTimeout`-based throttle is adapted using `System.Threading.Timer` plus a lock to coordinate state: a boolean tracks whether we're inside a cooldown window, and a pending-argument slot records the most recent call received during that window. On the leading edge, `fn` runs immediately and a timer for `t` milliseconds is started. When that timer fires, if a call arrived during the window, `fn` runs again with the latest arguments and another `t`-millisecond window begins (trailing edge); otherwise the cooldown simply ends.

## C# Solution

```csharp
using System.Threading;

public class Solution
{
    public static Action<T> Throttle<T>(Action<T> fn, int t)
    {
        object gate = new object();
        bool isWaiting = false;
        bool hasPending = false;
        T pendingArg = default;

        void Trailing(object state)
        {
            lock (gate)
            {
                if (hasPending)
                {
                    fn(pendingArg);
                    hasPending = false;
                    var _ = new Timer(Trailing, null, t, Timeout.Infinite);
                }
                else
                {
                    isWaiting = false;
                }
            }
        }

        return arg =>
        {
            lock (gate)
            {
                if (!isWaiting)
                {
                    isWaiting = true;
                    fn(arg);
                    var _ = new Timer(Trailing, null, t, Timeout.Infinite);
                }
                else
                {
                    hasPending = true;
                    pendingArg = arg;
                }
            }
        };
    }
}
```

## Complexity

- **Time:** O(1) per call, excluding the cost of `fn` itself.
- **Space:** O(1).
