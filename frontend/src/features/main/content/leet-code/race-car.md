# 818. Race Car

**Difficulty:** Hard
**Category:** Dynamic Programming, Breadth-First Search

## Problem

Starting at position `0` with speed `+1`, a car can either accelerate (`A`: position += speed, speed *= 2) or reverse (`R`: speed becomes `-1` if positive, or `+1` if negative, position unchanged). Given a `target` position, return the minimum number of instructions needed to reach exactly `target`.

### Example

```
Input: target = 3
Output: 2
```

## Approach

Use memoized recursion based on the observation that optimal solutions consist of runs of `A`s followed by a single `R`. Find the smallest `n` such that `2^n - 1 >= target` (the position reached after `n` consecutive accelerations). If `2^n - 1` exactly equals `target`, the answer is `n`. Otherwise, consider two strategies: overshoot past the target with `n` accelerations, reverse, and recursively solve for the remaining (smaller) distance back; or stop one power short, reverse, accelerate partway (`m` steps), reverse again, and recursively solve the remaining distance — trying every possible partial acceleration count `m` and taking the best result.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<int, int> memo = new();

    public int RaceCar(int target)
    {
        return Helper(target);
    }

    private int Helper(int target)
    {
        if (memo.TryGetValue(target, out var cached)) return cached;

        int n = 1;
        while ((1 << n) - 1 < target) n++;

        int result;

        if ((1 << n) - 1 == target)
        {
            result = n;
        }
        else
        {
            result = n + 1 + Helper((1 << n) - 1 - target);

            for (int m = 0; m < n - 1; m++)
            {
                int remaining = target - (1 << (n - 1)) + (1 << m);
                result = Math.Min(result, n - 1 + m + 1 + Helper(remaining));
            }
        }

        memo[target] = result;
        return result;
    }
}
```

## Complexity

- **Time:** `O(target * log(target))` amortized, due to memoization.
- **Space:** `O(target)` for the memoization table.
