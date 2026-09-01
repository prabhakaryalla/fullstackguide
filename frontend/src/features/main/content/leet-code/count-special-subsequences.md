# 3404. Count Special Subsequences

**Difficulty:** Medium
**Category:** Array, Math, Number Theory, Hash Table

## Problem
You are given an array `nums` of positive integers. A special subsequence is a set of four indices `(p, q, r, s)` with `p < q < r < s` such that:
- `nums[p] * nums[r] == nums[q] * nums[s]`
- There is at least one element strictly between each chosen pair of indices, i.e. `q - p > 1`, `r - q > 1`, and `s - r > 1`.

Return the number of different special subsequences in `nums`.

## Approach
Rearranging the equation gives `nums[p] / nums[q] == nums[s] / nums[r]`, so `(p, q)` and `(s, r)` must represent equal ratios. Represent each ratio as a reduced fraction `(a / gcd, b / gcd)` to avoid floating point error.

Scan `r` from left to right. Before processing a given `r`, insert every valid pair `(p, q)` for the newly eligible `q = r - 2` (i.e. all `p` with `p <= q - 2`) into a hash map keyed by the reduced fraction `(nums[p], nums[q])`, accumulating counts. Then, for the current `r`, iterate over every valid `s > r + 1`, reduce the fraction `(nums[s], nums[r])`, and add the matching count already stored in the map. Because the map only grows and is never rebuilt from scratch, every valid `q <= r - 2` accumulated so far is already present when `r` is processed.

## C# Solution

```csharp
public class Solution 
{
    public long NumberOfSubsequences(int[] nums) 
    {
        int n = nums.Length;
        long ans = 0;
        var left = new Dictionary<(int, int), int>();

        for (int r = 3; r < n; r++)
        {
            int q = r - 2;
            for (int p = 0; p <= q - 2; p++)
            {
                int g = Gcd(nums[p], nums[q]);
                var key = (nums[p] / g, nums[q] / g);
                left[key] = left.GetValueOrDefault(key, 0) + 1;
            }

            for (int s = r + 2; s < n; s++)
            {
                int g = Gcd(nums[s], nums[r]);
                var key = (nums[s] / g, nums[r] / g);
                if (left.TryGetValue(key, out int cnt))
                {
                    ans += cnt;
                }
            }
        }

        return ans;
    }

    private int Gcd(int a, int b)
    {
        while (b != 0)
        {
            (a, b) = (b, a % b);
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n^2) for the hash map in the worst case
