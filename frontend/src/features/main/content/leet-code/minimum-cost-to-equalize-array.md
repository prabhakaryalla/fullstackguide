# 3139. Minimum Cost to Equalize Array

**Difficulty:** Hard
**Category:** Array, Math, Enumeration, Greedy

## Problem

You are given an integer array `nums` and costs `cost1` (increase any single element by 1) and `cost2` (increase any two **distinct** elements by 1 each, simultaneously). Return the minimum total cost to make every element in `nums` equal, modulo `10^9 + 7`.

## Approach

If pairing two increments together (`cost2`) is never cheaper per unit than doing them separately (`cost1 * 2 <= cost2`), or if there are fewer than 3 elements (pairing needs at least 2 elements to combine, and with only 2 elements the "leftover imbalance" argument doesn't help), it's optimal to just raise everything to the array maximum using only single increments — cost is `cost1 * (n * max - sum)`.

Otherwise, try every candidate target value from `max` up to `2 * max - 1` (past this range, using single increments only is always favorable). For each target, compute the total number of "increment units" needed (`target * n - sum`) and the largest single element's own required increments (`target - min`, the tightest constraint on how many pair-operations one element can absorb). Greedily pair as many increments together as possible (bounded by both half the total and by not exceeding what the "max gap" element can support), and pay `cost2` per pair plus `cost1` for the leftover unpaired units. Track the minimum cost across all candidate targets.

## C# Solution

```csharp
public class Solution {
    private const int Mod = 1_000_000_007;

    public int MinCostToEqualizeArray(int[] nums, int cost1, int cost2) {
        int n = nums.Length;
        int minNum = nums.Min();
        int maxNum = nums.Max();
        long sum = 0;
        foreach (int num in nums)
            sum += num;

        if ((long)cost1 * 2 <= cost2 || n < 3) {
            long totalGap = (long)maxNum * n - sum;
            return (int)((cost1 * totalGap) % Mod);
        }

        long ans = long.MaxValue;
        for (int target = maxNum; target < 2 * maxNum; target++) {
            long maxGap = target - minNum;
            long totalGap = (long)target * n - sum;
            long pairs = Math.Min(totalGap / 2, totalGap - maxGap);
            ans = Math.Min(ans, cost1 * (totalGap - 2 * pairs) + (long)cost2 * pairs);
        }

        return (int)(ans % Mod);
    }
}
```

## Complexity

- Time: O(max(nums)) — trying each candidate target value.
- Space: O(1).
