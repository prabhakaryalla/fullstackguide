# 3164. Find the Number of Good Pairs II

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem
Given two integer arrays `nums1` and `nums2` and an integer `k`, count the number of pairs `(i, j)` such that `nums1[i]` is divisible by `nums2[j] * k`. This is the larger-constraints version of the problem, requiring a more efficient approach than brute force.

## Approach
Precompute a frequency map of `nums2[j] * k` values. Then, for each number in `nums1`, find all of its divisors by iterating up to its square root, and for each divisor pair `(d, num/d)`, check if either value exists as a key in the frequency map, and accumulate counts accordingly (taking care not to double count when `d == num/d`).

## C# Solution
```csharp
public class Solution {
    public long NumberOfPairs(int[] nums1, int[] nums2, int k) {
        Dictionary<long, int> count = new Dictionary<long, int>();
        foreach (int num in nums2) {
            long key = (long)num * k;
            count[key] = count.GetValueOrDefault(key, 0) + 1;
        }

        long ans = 0;
        foreach (int num in nums1) {
            for (int divisor = 1; (long)divisor * divisor <= num; divisor++) {
                if (num % divisor != 0)
                    continue;
                ans += count.GetValueOrDefault(divisor, 0);
                int other = num / divisor;
                if (other != divisor)
                    ans += count.GetValueOrDefault(other, 0);
            }
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n * sqrt(m) + m), where n and m are the array lengths
- Space: O(m)
