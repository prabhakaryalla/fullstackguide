# 673. Number of Longest Increasing Subsequence

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Binary Indexed Tree, Segment Tree

## Problem

Given an integer array `nums`, return the number of longest strictly increasing subsequences.

### Example

```
Input: nums = [1,3,5,4,7]
Output: 2
```

### Constraints

- `1 <= nums.length <= 2000`
- `-10^6 <= nums[i] <= 10^6`

## Approach

Use dynamic programming tracking both the longest increasing subsequence length ending at each index (`lengths[i]`) and the number of such longest subsequences ending there (`counts[i]`). For each pair `j < i` with `nums[j] < nums[i]`, if extending the subsequence ending at `j` gives a strictly longer result than currently known at `i`, reset `counts[i]` to `counts[j]`; if it ties the current best length at `i`, add `counts[j]` to `counts[i]` (multiple ways to reach the same length). Sum `counts[i]` over every index achieving the overall maximum length.

## C# Solution

```csharp
public class Solution
{
    public int FindNumberOfLIS(int[] nums)
    {
        int n = nums.Length;
        var lengths = new int[n];
        var counts = new int[n];
        Array.Fill(lengths, 1);
        Array.Fill(counts, 1);

        int maxLength = 1;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (nums[j] < nums[i])
                {
                    if (lengths[j] + 1 > lengths[i])
                    {
                        lengths[i] = lengths[j] + 1;
                        counts[i] = counts[j];
                    }
                    else if (lengths[j] + 1 == lengths[i])
                    {
                        counts[i] += counts[j];
                    }
                }
            }

            maxLength = Math.Max(maxLength, lengths[i]);
        }

        int result = 0;
        for (int i = 0; i < n; i++)
            if (lengths[i] == maxLength)
                result += counts[i];

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the length and count arrays.
