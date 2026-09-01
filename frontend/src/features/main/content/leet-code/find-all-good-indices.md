# 2420. Find All Good Indices

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` of size `n` and a positive integer `k`.

We call an index `i` in the range `k <= i < n - k` good if the following conditions are satisfied:
- The `k` elements that are just before the index `i` are in non-increasing order.
- The `k` elements that are just after the index `i` are in non-decreasing order.

Return an array of all good indices sorted in increasing order.

### Example

```
Input: nums = [2,1,1,1,3,4,1], k = 2
Output: [2,3]
Explanation:
- Index 2 is good: [2,1] are non-increasing and [1,3] are non-decreasing.
- Index 3 is good: [1,1] are non-increasing and [3,4] are non-decreasing.
```

## Approach

Precompute two arrays:
1. `left[i]`: length of non-increasing sequence ending at index i
2. `right[i]`: length of non-decreasing sequence starting at index i

For each valid index i, check if `left[i-1] >= k` and `right[i+1] >= k`.

## C# Solution

```csharp
public class Solution
{
    public IList<int> GoodIndices(int[] nums, int k)
    {
        int n = nums.Length;
        int[] left = new int[n];
        int[] right = new int[n];
        
        // Compute left array (non-increasing lengths)
        left[0] = 1;
        for (int i = 1; i < n; i++)
        {
            if (nums[i] <= nums[i - 1])
                left[i] = left[i - 1] + 1;
            else
                left[i] = 1;
        }
        
        // Compute right array (non-decreasing lengths)
        right[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--)
        {
            if (nums[i] <= nums[i + 1])
                right[i] = right[i + 1] + 1;
            else
                right[i] = 1;
        }
        
        List<int> result = new List<int>();
        for (int i = k; i < n - k; i++)
        {
            if (left[i - 1] >= k && right[i + 1] >= k)
            {
                result.Add(i);
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(n) for the prefix and suffix arrays
