# 2100. Find Good Days to Rob the Bank

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

You are given an integer array `security`, where `security[i]` is the number of guards on duty on day `i`, and an integer `time`. Day `i` is a **good day to rob the bank** if there exist at least `time` days before `i` where the guard count is **non-increasing**, and at least `time` days after `i` (inclusive of day `i` in both directions conceptually, per the exact non-increasing/non-decreasing streak definitions) where the guard count is **non-decreasing** — informally, day `i` sits at the bottom of a "valley" of length at least `time` on both sides. Return an array of all such good days.

## Approach

Precompute, for every day `i`, `nonIncreasingRun[i]`: the length of the streak of consecutive days ending at `i` (going backward) where the guard count never increases. Similarly precompute `nonDecreasingRun[i]`: the streak of consecutive days starting at `i` (going forward) where the guard count never decreases. Both are computed with a simple linear scan, comparing each day to the previous one.

Day `i` qualifies as a good day exactly when `nonIncreasingRun[i] >= time` and `nonDecreasingRun[i] >= time` (both streaks include day `i` itself, so day `i` needs `time` calm days including itself on each side).

## C# Solution

```csharp
public class Solution
{
    public IList<int> GoodDaysToRobBank(int[] security, int time)
    {
        int n = security.Length;
        var nonIncreasingRun = new int[n];
        var nonDecreasingRun = new int[n];

        nonIncreasingRun[0] = 1;
        for (int i = 1; i < n; i++)
            nonIncreasingRun[i] = security[i] <= security[i - 1] ? nonIncreasingRun[i - 1] + 1 : 1;

        nonDecreasingRun[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--)
            nonDecreasingRun[i] = security[i] <= security[i + 1] ? nonDecreasingRun[i + 1] + 1 : 1;

        var result = new List<int>();
        for (int i = 0; i < n; i++)
        {
            if (nonIncreasingRun[i] >= time + 1 && nonDecreasingRun[i] >= time + 1)
                result.Add(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the two streak arrays.
