# 1121. Divide Array Into Increasing Sequences

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Counting

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a sorted array `nums` and an integer `k`, determine whether it's possible to split `nums` into one or more disjoint strictly-increasing subsequences, each of length at least `k`.

### Example

```
Input: nums = [1,2,2,3,3,4,4], k = 3
Output: true
```

## Approach

Because `nums` is sorted, every occurrence of the most frequent value must end up in a different increasing subsequence (duplicates can never share a subsequence). So the maximum number of subsequences we're forced to create equals the highest frequency `maxFreq` of any value. Splitting is possible exactly when the array is long enough to give each of those subsequences at least `k` elements, i.e. `nums.Length / maxFreq >= k`.

## C# Solution

```csharp
public class Solution
{
    public bool CanDivideIntoSubsequences(int[] nums, int k)
    {
        int maxFreq = 1, count = 1;

        for (int i = 1; i < nums.Length; i++)
        {
            count = nums[i] == nums[i - 1] ? count + 1 : 1;
            maxFreq = Math.Max(maxFreq, count);
        }

        return nums.Length / maxFreq >= k;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
