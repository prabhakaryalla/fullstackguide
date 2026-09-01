# 2446. Maximum Sum Score of Array

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` of length `n`. The sum score of `nums` at an index `i` is the maximum of:

- The sum of the first `i + 1` elements of `nums`.
- The sum of the last `n - i` elements of `nums`.

Return the maximum sum score of `nums` at any index.

### Example

```
Input: nums = [4,3,-2,5]
Output: 10
Explanation: The sum score at index 3 is max(4+3-2+5, 5) = max(10, 5) = 10.
```

## Approach

Calculate prefix sums and suffix sums. For each index, compute the sum score as the maximum of the prefix sum up to that index and the suffix sum from that index. Return the overall maximum.

## C# Solution

```csharp
public class Solution
{
    public long MaximumSumScore(int[] nums)
    {
        int n = nums.Length;
        long[] prefix = new long[n];
        long[] suffix = new long[n];
        
        prefix[0] = nums[0];
        for (int i = 1; i < n; i++)
        {
            prefix[i] = prefix[i - 1] + nums[i];
        }
        
        suffix[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--)
        {
            suffix[i] = suffix[i + 1] + nums[i];
        }
        
        long maxScore = long.MinValue;
        
        for (int i = 0; i < n; i++)
        {
            long score = Math.Max(prefix[i], suffix[i]);
            maxScore = Math.Max(maxScore, score);
        }
        
        return maxScore;
    }
}
```

## Complexity

- **Time:** O(n) where n is the array length
- **Space:** O(n) for prefix and suffix arrays
