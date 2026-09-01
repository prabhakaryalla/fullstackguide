# 3349. Adjacent Increasing Subarrays Detection I

**Difficulty:** Easy
**Category:** Array, Sliding Window

## Problem

Given an integer array `nums` and integer `k`, determine if there exist two adjacent subarrays of length `k` each, such that both subarrays are strictly increasing.

### Example

Input: `nums = [2,5,7,8,9,2,3,4,3,1]`, `k = 3`
Output: `true` — subarrays `[7,8,9]` and `[2,3,4]` (indices 2-4 and 5-7) are both strictly increasing and adjacent.

## Approach

Precompute for each index the length of the strictly increasing run ending at that index. Then for each split point `i`, check if the increasing run ending at `i-1` has length `>= k` and the run ending at `i-1+k` also covers `k` elements starting at `i`.

## C# Solution

```csharp
public class Solution 
{
    public bool HasIncreasingSubarrays(IList<int> nums, int k) 
    {
        int n = nums.Count;
        int[] inc = new int[n];
        inc[0] = 1;
        for (int i = 1; i < n; i++)
            inc[i] = nums[i] > nums[i - 1] ? inc[i - 1] + 1 : 1;

        for (int i = 0; i + 2 * k - 1 < n; i++) 
        {
            int end1 = i + k - 1;
            int end2 = i + 2 * k - 1;
            if (inc[end1] >= k && inc[end2] >= k)
                return true;
        }
        return false;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
