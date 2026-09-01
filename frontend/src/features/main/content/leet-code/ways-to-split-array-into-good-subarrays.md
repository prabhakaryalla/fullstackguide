# 2750. Ways to Split Array Into Good Subarrays

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming

## Problem

You are given a binary array `nums`. A subarray is called good if it contains exactly one element with value 1.

Return the number of ways to split `nums` into good subarrays. Since the answer may be large, return it modulo 10^9 + 7.

### Example

```
Input: nums = [0,1,0,0,1]
Output: 3
Explanation: There are 3 ways to split nums:
- [0,1] [0,0,1]
- [0,1,0] [0,1]
- [0,1,0,0] [1]

Input: nums = [0,1,0]
Output: 1
Explanation: Only one way: [0,1,0]

Input: nums = [1,0,0,1,0]
Output: 3
```

## Approach

Key insight: Each "1" must be in exactly one subarray. The split points can only occur between consecutive 1s.

If there are no 1s, return 0 (impossible to create good subarrays).

For each pair of consecutive 1s at positions i and j, we can place the split at any of the (j - i) positions between them. The total number of ways is the product of all these choices.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfGoodSubarraySplits(int[] nums) 
    {
        const int MOD = 1000000007;
        
        var onePositions = new List<int>();
        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] == 1)
            {
                onePositions.Add(i);
            }
        }
        
        if (onePositions.Count == 0)
        {
            return 0;
        }
        
        long result = 1;
        
        for (int i = 0; i < onePositions.Count - 1; i++)
        {
            int gap = onePositions[i + 1] - onePositions[i];
            result = (result * gap) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(k) where k is the number of 1s in nums
