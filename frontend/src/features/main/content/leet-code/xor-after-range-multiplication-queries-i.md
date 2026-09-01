# 3653. XOR After Range Multiplication Queries I

**Difficulty:** Medium
**Category:** Array, Simulation, Bit Manipulation

## Problem
You are given an integer array `nums` and a 2D array `queries`, where each query is `[l, r, k, mod]`. For each query, multiply every element `nums[i]` for `l <= i <= r` by `k`, taking the result modulo `mod` (applying multiplication and modulo in the order the elements appear, potentially sequentially affecting a rolling computation), then continue to the next query using the updated array. After processing all queries in order, return the bitwise XOR of all elements in the final array.

## Approach
Since the constraints for this "easy/medium" variant are small, directly simulate: for each query `[l, r, k, mod]`, iterate `i` from `l` to `r` and update `nums[i] = (nums[i] * k) % mod`. After all queries have been applied, compute the XOR of every element in `nums` and return it.

## C# Solution

```csharp
public class Solution 
{
    public int XorAfterQueries(int[] nums, int[][] queries) 
    {
        foreach (var q in queries)
        {
            int l = q[0], r = q[1], k = q[2], mod = q[3];
            for (int i = l; i <= r; i++)
            {
                nums[i] = (int)(((long)nums[i] * k) % mod);
            }
        }

        int result = 0;
        foreach (var num in nums) result ^= num;
        return result;
    }
}
```

## Complexity

- **Time:** O(q * n) where q is the number of queries and n is the range length per query
- **Space:** O(1) extra (in-place updates)
