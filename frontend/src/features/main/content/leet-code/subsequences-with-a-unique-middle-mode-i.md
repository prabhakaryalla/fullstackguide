# 3395. Subsequences with a Unique Middle Mode I

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Combinatorics

## Problem
Given an integer array `nums`, find the number of subsequences of size 5 with a unique middle mode. Since the answer may be very large, return it modulo `10^9 + 7`.

A mode of a sequence is the element that appears the most times in it. A sequence has a *unique mode* if only one value achieves that maximum frequency. A subsequence `seq` of size 5 has a **unique middle mode** if `seq[2]` (the middle element) is a unique mode of the whole subsequence.

### Example
```
Input: nums = [1,1,1,1,1,1]
Output: 6
Explanation: The only possible subsequence is [1,1,1,1,1]; it can be chosen in
C(6,5) = 6 ways, and its unique middle mode is 1.
```
```
Input: nums = [1,2,2,3,3,4]
Output: 4
Explanation: [1,2,2,3,4] and [1,2,3,3,4] both have a unique middle mode (2 and
3 respectively). [1,2,2,3,3] does not, since 2 and 3 tie for the mode.
```

## Approach
Fix the middle position `i` and count subsequences where `nums[i]` is the unique middle mode, summing over all valid `i` (from index 2 to `n - 3`).

Maintain two frequency maps: `left` for elements strictly before `i` (already chosen among the two required left picks tracked implicitly) and `right` for elements strictly after `i`. Let `a = nums[i]`, `leftCount`/`rightCount` be `a`'s frequency in the left/right maps, and `leftOther`/`rightOther` be the count of everything else on each side.

Case-split on how many of the 4 non-middle picks equal `a` (2, 1, or 0 extra occurrences of `a`, split between the two sides), using combinatorics (`C(n, 2)` for "choose 2 identical picks from a group") for the cases where `a` appears twice more on one side, and a helper `Calc` that enumerates every other distinct value `b` to exclude subsequences where some other value `b` ties or beats `a`'s frequency, for the cases where `a` only appears once more. Summing all these mutually exclusive cases over every middle index gives the total (all arithmetic performed modulo `10^9 + 7`).

## C# Solution

```csharp
public class Solution 
{
    private const int Mod = 1_000_000_007;

    public int SubsequencesWithMiddleMode(int[] nums)
    {
        int n = nums.Length;
        long ans = 0;
        var left = new Dictionary<int, int>();
        var right = new Dictionary<int, int>();

        for (int i = 0; i < 2; i++)
            Increment(left, nums[i]);
        for (int i = 2; i < n; i++)
            Increment(right, nums[i]);

        for (int i = 2; i < n - 2; i++)
        {
            int num = nums[i];
            Decrement(right, num);

            long leftCount = left.TryGetValue(num, out var lc) ? lc : 0;
            long rightCount = right.TryGetValue(num, out var rc) ? rc : 0;
            long leftOther = i - leftCount;
            long rightOther = n - 1 - i - rightCount;

            // count[mode] = 5 -- [a a] a [a a]
            ans += NC2(leftCount) * NC2(rightCount) % Mod;
            ans %= Mod;

            // count[mode] = 4 -- [a a] a [a ?]
            ans += NC2(leftCount) * rightCount % Mod * rightOther % Mod;
            ans %= Mod;

            // count[mode] = 4 -- [a ?] a [a a]
            ans += leftCount * leftOther % Mod * NC2(rightCount) % Mod;
            ans %= Mod;

            // count[mode] = 3 -- [a a] a [? ?]
            ans += NC2(leftCount) * NC2(rightOther) % Mod;
            ans %= Mod;

            // count[mode] = 3 -- [? ?] a [a a]
            ans += NC2(leftOther) * NC2(rightCount) % Mod;
            ans %= Mod;

            // count[mode] = 3 -- [a ?] a [a ?]
            ans += leftCount * leftOther % Mod * rightCount % Mod * rightOther % Mod;
            ans %= Mod;

            // count[mode] = 2 -- [a ?] a [? ?]
            ans += leftCount * Calc(num, leftOther, rightOther, left, right) % Mod;
            ans %= Mod;

            // count[mode] = 2 -- [? ?] a [a ?]
            ans += rightCount * Calc(num, rightOther, leftOther, right, left) % Mod;
            ans %= Mod;

            Increment(left, num);
        }

        return (int)((ans % Mod + Mod) % Mod);
    }

    private static void Increment(Dictionary<int, int> map, int key)
    {
        map[key] = map.TryGetValue(key, out var v) ? v + 1 : 1;
    }

    private static void Decrement(Dictionary<int, int> map, int key)
    {
        if (--map[key] == 0)
            map.Remove(key);
    }

    private long NC2(long value) => value * (value - 1) / 2 % Mod;

    // Returns the count of subsequences with `a` as the unique middle mode when `a` appears
    // exactly once more on the "other1" side and zero more times on the "other2" side.
    private long Calc(int a, long other1, long other2, Dictionary<int, int> count1, Dictionary<int, int> count2)
    {
        long res = other1 * NC2(other2) % Mod;

        foreach (var (b, b1) in count1)
        {
            if (b == a)
                continue;
            long b2 = count2.TryGetValue(b, out var v2) ? v2 : 0;
            // Exclude triples -- [a b] a [b b].
            res = (res - b1 * NC2(b2) % Mod + Mod) % Mod;
            // Exclude doubles -- [a b] a [b ?].
            res = (res - b1 * b2 % Mod * ((other2 - b2 + Mod) % Mod) % Mod + Mod) % Mod;
        }

        foreach (var (b, b2) in count2)
        {
            if (b == a)
                continue;
            long b1 = count1.TryGetValue(b, out var v1) ? v1 : 0;
            // Exclude doubles -- [a ?] a [b b].
            res = (res - (other1 - b1) * NC2(b2) % Mod + Mod) % Mod;
        }

        return res;
    }
}
```

## Complexity

- **Time:** O(n^2) worst case (each middle index enumerates the distinct values seen so far).
- **Space:** O(n) for the left/right frequency maps.
