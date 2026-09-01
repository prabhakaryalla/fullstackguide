# 674. Longest Continuous Increasing Subsequence

**Difficulty:** Easy
**Category:** Array

## Problem

Given an unsorted array of integers `nums`, return the length of the longest contiguous strictly increasing subsequence.

### Example

```
Input: nums = [1,3,5,4,7]
Output: 3
```

### Constraints

- `1 <= nums.length <= 10^4`

## Approach

Scan the array while tracking the length of the current increasing run, resetting it to 1 whenever the sequence stops increasing, and keeping a running maximum of the run length seen so far.

## C# Solution

```csharp
public class Solution
{
    public int FindLengthOfLCIS(int[] nums)
    {
        int maxLength = 1, currentLength = 1;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] > nums[i - 1])
            {
                currentLength++;
                maxLength = Math.Max(maxLength, currentLength);
            }
            else
            {
                currentLength = 1;
            }
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
