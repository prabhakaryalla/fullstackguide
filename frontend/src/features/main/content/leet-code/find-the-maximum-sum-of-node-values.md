# 3068. Find the Maximum Sum of Node Values

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Dynamic Programming, Greedy, Tree

## Problem

You are given a tree with `n` nodes (edges given separately, but irrelevant to the answer's structure) with 0-indexed values `nums`, and an integer `k`. You may perform any number of operations: pick any edge `(u, v)` and replace both `nums[u]` and `nums[v]` with `nums[u] XOR k` and `nums[v] XOR k` respectively. Return the maximum possible sum of `nums` achievable.

## Approach

Every edge operation XORs **two** node values with `k` simultaneously, so the total number of nodes that end up XORed (across all operations, counting parity) is always even — any node can be flipped an even or odd number of times as long as the total flipped count stays even, since the tree is connected. For each node, greedily take `max(num, num ^ k)`; track how many nodes prefer the flipped value and the minimum cost of "un-flipping" one if the parity comes out odd. If the count of flipped nodes is even, the greedy sum is achievable; otherwise, sacrifice the cheapest flip (smallest `|num - (num^k)|`) to fix parity.

## C# Solution

```csharp
public class Solution {
    public long MaximumValueSum(int[] nums, int k, int[][] edges) {
        long maxSum = 0;
        int changedCount = 0;
        int minChangeDiff = int.MaxValue;

        foreach (int num in nums) {
            maxSum += Math.Max(num, num ^ k);
            if ((num ^ k) > num)
                changedCount++;
            minChangeDiff = Math.Min(minChangeDiff, Math.Abs(num - (num ^ k)));
        }

        return changedCount % 2 == 0 ? maxSum : maxSum - minChangeDiff;
    }
}
```

## Complexity

- Time: O(n) — a single pass over `nums` (edges don't affect the result).
- Space: O(1).
