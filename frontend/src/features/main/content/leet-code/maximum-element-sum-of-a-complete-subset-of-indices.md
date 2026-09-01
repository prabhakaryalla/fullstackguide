# 2862. Maximum Element-Sum of a Complete Subset of Indices

**Difficulty:** Hard
**Category:** Array, Math, Number Theory

## Problem

You are given a 1-indexed array `nums` of `n` positive integers. A set of 1-indexed numbers `{i1, i2, ..., ik}` is called **complete** if for every pair of indices `ix` and `iy` in the set, `ix * iy` is a perfect square. Find the maximum possible sum of `nums[i]` over all complete subsets of indices.

### Example

`nums = [8,7,3,5,7,2,4,9]` → answer `16` (indices `2` and `8`, since `2*8=16` is a perfect square, and `nums[2]+nums[8] = 7+9 = 16`).

## Approach

Two indices `i` and `j` satisfy "`i*j` is a perfect square" exactly when their **square-free parts** are equal (the square-free part of a number is what remains after repeatedly dividing out any factor `p^2`). So group indices `1..n` by their square-free part, sum `nums` within each group, and the answer is the maximum group sum (any single index also forms a valid complete subset of size 1).

To compute the square-free part of `i`, repeatedly divide out `p*p` for every prime factor `p` while it still divides evenly.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumSum(int[] nums) 
    {
        int n = nums.Length;
        var groupSums = new Dictionary<int, long>();
        for (int i = 1; i <= n; i++)
        {
            int core = i;
            for (int p = 2; (long)p * p <= core; p++)
            {
                while (core % (p * p) == 0)
                {
                    core /= (p * p);
                }
            }
            groupSums[core] = groupSums.TryGetValue(core, out long sum) ? sum + nums[i - 1] : nums[i - 1];
        }

        long best = 0;
        foreach (long sum in groupSums.Values)
        {
            if (sum > best)
            {
                best = sum;
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n * sqrt(n))
- **Space:** O(n)
