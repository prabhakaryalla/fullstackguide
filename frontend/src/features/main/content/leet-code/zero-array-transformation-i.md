# 3355. Zero Array Transformation I

**Difficulty:** Medium
**Category:** Array, Difference Array, Prefix Sum

## Problem

Given `nums` and a list of `queries` where each query `[l, r]` decrements every element in `nums[l..r]` by at most 1, determine if it is possible to apply all queries (each once, decrementing by 1) so that every element of `nums` becomes zero or less (i.e., can be reduced to exactly 0).

### Example

Input: `nums = [1,0,1]`, `queries = [[0,2]]`
Output: `true` — applying the single query decrements index 0 and 2 by 1, zeroing the array.

## Approach

Build a difference array over the queries to compute, for each index, the maximum possible total decrement (number of queries covering it). The transformation is possible iff every index's coverage count is `>= nums[i]`.

## C# Solution

```csharp
public class Solution 
{
    public bool IsZeroArray(int[] nums, int[][] queries) 
    {
        int n = nums.Length;
        int[] diff = new int[n + 1];
        foreach (var q in queries) 
        {
            diff[q[0]]++;
            diff[q[1] + 1]--;
        }

        int running = 0;
        for (int i = 0; i < n; i++) 
        {
            running += diff[i];
            if (running < nums[i]) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n + q)
- **Space:** O(n)
