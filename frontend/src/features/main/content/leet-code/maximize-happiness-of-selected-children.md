# 3075. Maximize Happiness of Selected Children

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You are given an array `happiness` of `n` non-negative integers and an integer `k`. You will select `k` children one at a time; each time you select a child, every **not-yet-selected** child's happiness value decreases by `1` (down to a minimum of `0`), and the selected child contributes their **current** happiness value to the total. Return the maximum possible sum after selecting `k` children.

### Example

```
Input: happiness = [1,2,3], k = 2
Output: 4
Explanation: Select the child with happiness 3 first (contributes 3); the remaining values become [0,1];
select the child with happiness 1 (contributes 1). Total = 3 + 1 = 4.
```

## Approach

Selecting the currently-largest value first is always optimal, since delaying a large value only lets it decay further while gaining nothing. Sort `happiness` descending; the child selected at step `i` (0-indexed) has decayed by `i` from all the prior selections, so its contribution is `max(0, happiness[i] - i)`. Sum the first `k` such contributions.

## C# Solution

```csharp
public class Solution {
    public long MaximumHappinessSum(int[] happiness, int k) {
        long ans = 0;
        int decremented = 0;
        Array.Sort(happiness);
        Array.Reverse(happiness);

        for (int i = 0; i < k; i++) {
            ans += Math.Max(0, happiness[i] - decremented);
            decremented++;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting.
- Space: O(1) — beyond the input array.
