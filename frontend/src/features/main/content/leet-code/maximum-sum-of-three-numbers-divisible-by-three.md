# 3780. Maximum Sum of Three Numbers Divisible by Three

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given an integer array `nums`, choose exactly three integers whose sum is divisible by 3. Return the maximum possible sum of such a triplet, or `0` if none exists.

### Example

Input: `nums = [4,2,3,1]`
Output: `9`

`(4,2,3)` sums to `9`, which is divisible by 3.

## Approach

Group numbers by `value % 3` and sort each group descending. A sum divisible by 3 only comes from combinations `(0,0,0)`, `(1,1,1)`, `(2,2,2)`, or `(0,1,2)`. Evaluate each valid combination using the largest available elements from the required groups and take the maximum.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumSum(int[] nums) 
    {
        var groups = new List<int>[3];
        for (int i = 0; i < 3; i++) groups[i] = new List<int>();
        foreach (int v in nums) groups[v % 3].Add(v);
        for (int i = 0; i < 3; i++) groups[i].Sort((a, b) => b.CompareTo(a));

        long best = 0;
        for (int r = 0; r < 3; r++)
        {
            if (groups[r].Count >= 3)
            {
                long sum = groups[r][0] + groups[r][1] + groups[r][2];
                best = Math.Max(best, sum);
            }
        }
        if (groups[0].Count >= 1 && groups[1].Count >= 1 && groups[2].Count >= 1)
        {
            long sum = groups[0][0] + groups[1][0] + groups[2][0];
            best = Math.Max(best, sum);
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
