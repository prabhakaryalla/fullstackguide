# 1953. Maximum Number of Weeks for Which You Can Work

**Difficulty:** Medium
**Category:** Array, Math, Greedy

## Problem

Given `milestones[i]`, the number of milestones for project `i`, you complete exactly one milestone per week, and cannot work on the same project two weeks in a row. Return the maximum number of weeks you can work in total before you are forced to stop (because all remaining milestones belong to the same project and there's no other project to alternate with).

### Example

```
Input: milestones = [1,2,3]
Output: 6
Explanation: One optimal order is project 2 (largest), then 1, then 2, then 1, then 2, then 0.
```

### Constraints

- `n == milestones.length`
- `1 <= n <= 10^5`
- `1 <= milestones[i] <= 10^9`

## Approach

Let `sum` be the total milestones and `maxVal` the largest single project's milestone count, and `rest = sum - maxVal`. If `maxVal > rest + 1`, the largest project cannot be fully interleaved with the others (there aren't enough "other" weeks to separate its occurrences), so you can only work `2 * rest + 1` weeks (alternate as much as possible, then stop). Otherwise, every milestone can be scheduled without ever repeating a project on consecutive weeks, so the answer is simply `sum`.

## C# Solution

```csharp
public class Solution
{
    public long NumberOfWeeks(int[] milestones)
    {
        long sum = 0;
        long maxVal = 0;

        foreach (int m in milestones)
        {
            sum += m;
            maxVal = Math.Max(maxVal, m);
        }

        long rest = sum - maxVal;

        if (maxVal > rest + 1)
        {
            return 2 * rest + 1;
        }

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass to find the sum and maximum.
- **Space:** `O(1)`.
