# 3480. Maximize Subarrays After Removing One Conflicting Pair

**Difficulty:** Hard
**Category:** Array, Segment Tree, Enumeration, Prefix Sum

## Problem
You are given an integer `n` representing an array `nums = [1, 2, ..., n]`, and a 2D array `conflictingPairs` where `conflictingPairs[i] = [a, b]` means `a` and `b` form a conflicting pair.

Remove exactly one element from `conflictingPairs`. Afterward, count the number of non-empty subarrays of `nums` that do not contain both `a` and `b` of any remaining conflicting pair. Return the maximum number of such subarrays achievable over all choices of which pair to remove.

### Example
Input: `n = 4`, `conflictingPairs = [[2, 3], [1, 4]]`
Output: `9`
Explanation: Removing `[2, 3]` leaves only `[1, 4]` as a restriction. Only the subarray `[1, 4]` (the whole array) contains both 1 and 4, so `10 - 1 = 9` subarrays are valid, which is the best possible.

## Approach
For each right endpoint `r`, maintain the largest and second-largest left endpoint `l` among all conflicting pairs `(l, r')` with `r' <= r` (using `max(a, b)` as the pair's binding right endpoint). Without removing any pair, the number of valid subarrays ending at `r` is `r - maxLeft` (subarrays `[maxLeft + 1 .. r]` through `[r .. r]`).

If we could remove the restriction contributed by `maxLeft`, the gain at this `r` becomes `maxLeft - secondMaxLeft` additional valid subarrays. Accumulate this gain, keyed by the value of `maxLeft`, across all right endpoints (since removing one specific conflicting pair benefits every `r` where it was the binding constraint). The final answer is the total valid-subarray count (with no pair removed) plus the maximum accumulated gain over all possible removed pairs.

## C# Solution

```csharp
public class Solution {
    public long MaxSubarrays(int n, int[][] conflictingPairs) {
        long validSubarrays = 0;
        int maxLeft = 0, secondMaxLeft = 0;
        long[] gains = new long[n + 1];
        List<int>[] conflicts = new List<int>[n + 1];
        for (int i = 0; i <= n; i++) conflicts[i] = new List<int>();

        foreach (var pair in conflictingPairs) {
            int a = pair[0], b = pair[1];
            conflicts[Math.Max(a, b)].Add(Math.Min(a, b));
        }

        for (int right = 1; right <= n; right++) {
            foreach (int left in conflicts[right]) {
                if (left > maxLeft) {
                    secondMaxLeft = maxLeft;
                    maxLeft = left;
                } else if (left > secondMaxLeft) {
                    secondMaxLeft = left;
                }
            }
            validSubarrays += right - maxLeft;
            gains[maxLeft] += maxLeft - secondMaxLeft;
        }

        long maxGain = 0;
        foreach (long gain in gains) maxGain = Math.Max(maxGain, gain);

        return validSubarrays + maxGain;
    }
}
```

## Complexity

- **Time:** O(n + p), where p is the number of conflicting pairs
- **Space:** O(n + p)
