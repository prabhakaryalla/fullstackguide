# 3020. Find the Maximum Number of Elements in Subset

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Enumeration

## Problem

You are given an array of positive integers `nums`. Choose a subset of `nums` (allowing you to reuse each distinct value as many times as it appears) that can be arranged, after sorting, as `[x, x^2, x^4, ..., x^(k/2), x^k, x^(k/2), ..., x^4, x^2, x]` for some positive integer `x` and non-negative integer `k` — i.e., a palindrome-like sequence of repeated squarings that goes up to `x^k` and back down. Return the maximum possible size of such a subset. A single element (`k = 0`, just `[x]`) is always a valid subset of size 1.

### Example

```
Input: nums = [5,4,1,2,2]
Output: 3
Explanation: Choose the subset [2,2,4]: sorted and arranged it forms the pattern [2,4,2] (x = 2, x^2 = 4).
```

## Approach

The special case is `x = 1`: since `1` squared is always `1`, any number of `1`s can be arranged as a palindrome. If there are `c` occurrences of `1`, the best palindrome length is `c` if `c` is odd, or `c - 1` if `c` is even (a valid mirrored palindrome must have an odd total length when built purely from repeats of the same value, since the "peak" value needs to be unpaired). This gives a baseline answer.

For every other candidate base `x`, greedily square while there are still **two** remaining copies of the current power (`x`, then `x^2`, then `x^4`, ...) — each successful step adds two elements (one for each side of the palindrome) and moves to the next power. Once squaring runs out of pairs (either the value exceeds the max in `nums`, or fewer than two copies remain), check whether **one** more copy of that final power exists to serve as the unpaired center of the palindrome (`+1`); if not, the last *pair* added was wasted since a palindrome must have a strict center, so back off by one (`-1`).

Take the maximum over the `1`-baseline and every other candidate base found while scanning `nums`.

## C# Solution

```csharp
public class Solution {
    public int MaximumLength(int[] nums) {
        int maxNum = nums.Max();
        var count = new Dictionary<int, int>();
        foreach (int num in nums)
            count[num] = count.GetValueOrDefault(num) + 1;

        int ans = count.TryGetValue(1, out int onesCount)
            ? (onesCount % 2 == 0 ? onesCount - 1 : onesCount)
            : 1;

        foreach (int num in nums) {
            if (num == 1)
                continue;

            int length = 0;
            long x = num;
            while (x <= maxNum && count.TryGetValue((int)x, out int c) && c >= 2) {
                length += 2;
                x *= x;
            }

            // x is now the final power reached; see if it can be the unpaired center.
            bool middleAvailable = x <= maxNum && count.ContainsKey((int)x);
            ans = Math.Max(ans, length + (middleAvailable ? 1 : -1));
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n log(max)) — each starting value squares itself a logarithmic number of times before exceeding the maximum.
- Space: O(n) — the frequency map.
