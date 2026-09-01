# 2615. Sum of Distances

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums`. There exists an array `arr` of length `nums.length`, where `arr[i]` is the sum of `|i - j|` for all `j` such that `nums[j] == nums[i]` and `j != i`. If there is no such `j`, set `arr[i]` to be `0`.

Return the array `arr`.

### Example

```
Input: nums = [1,3,1,1,2]
Output: [5,0,3,4,0]
Explanation: For i = 0: arr[0] = |0 - 2| + |0 - 3| = 5.
For i = 2: arr[2] = |2 - 0| + |2 - 3| = 3.
For i = 3: arr[3] = |3 - 0| + |3 - 2| = 4.
```

## Approach

Group indices by their values. For each group, compute the sum of distances using two passes: one from left to right accumulating indices and counts, and one from right to left. The distance sum at position `i` is `i * left_count - left_sum + right_sum - i * right_count`.

## C# Solution

```csharp
public class Solution
{
    public long[] Distance(int[] nums)
    {
        int n = nums.Length;
        var groups = new Dictionary<int, List<int>>();
        
        for (int i = 0; i < n; i++)
        {
            if (!groups.ContainsKey(nums[i]))
                groups[nums[i]] = new List<int>();
            groups[nums[i]].Add(i);
        }
        
        var result = new long[n];
        
        foreach (var indices in groups.Values)
        {
            if (indices.Count == 1)
                continue;
            
            long leftSum = 0;
            long rightSum = 0;
            
            foreach (int idx in indices)
                rightSum += idx;
            
            for (int i = 0; i < indices.Count; i++)
            {
                int idx = indices[i];
                rightSum -= idx;
                
                result[idx] = (long)idx * i - leftSum + rightSum - (long)idx * (indices.Count - i - 1);
                
                leftSum += idx;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) — grouping and computing distances
- **Space:** O(n) — for grouping indices
