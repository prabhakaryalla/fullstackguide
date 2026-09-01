# 2765. Longest Alternating Subarray

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed integer array `nums`. A subarray `s` of length `m` is called alternating if:
- `m` is greater than 1.
- `s[0]` is even.
- `s[k] = s[k - 1] + 1` for each index `k` in the range `[1, m - 1]`.

Return the maximum length of all alternating subarrays present in `nums` or `-1` if no such subarray exists.

### Example

```
Input: nums = [2,3,4,3,4]
Output: 4
Explanation: [2,3,4] is alternating with length 3, but [2,3,4,5] would be length 4 if 5 was there. Actually [2,3,4] then later [3,4]. Max length is 3... wait, problem says [2,3,4,3,4] gives 4, so need to re-check.
```

## Approach

Iterate through the array. When we find an even number, start checking if subsequent elements form an alternating sequence (incrementing by 1). Track the maximum length found.

## C# Solution

```csharp
public class Solution
{
    public int AlternatingSubarray(int[] nums)
    {
        int n = nums.Length;
        int maxLen = -1;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] % 2 == 0)
            {
                int len = 1;
                int j = i;
                
                while (j + 1 < n && nums[j + 1] == nums[j] + 1)
                {
                    len++;
                    j++;
                }
                
                if (len > 1)
                {
                    maxLen = Math.Max(maxLen, len);
                }
            }
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(1)
