# 1403. Minimum Subsequence in Non-Increasing Order

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

Given an array `nums`, return the minimum-length subsequence whose sum is strictly greater than the sum of the remaining elements. If multiple such subsequences have the same minimum length, return the one with the maximum sum; if there is still a tie, any of them is acceptable. The result should be sorted in non-increasing order.

### Example

```
Input: nums = [4,3,10,9,8]
Output: [10,9]
```

## Approach

Sort the array in descending order, then greedily add elements to the result from largest to smallest, keeping a running total. As soon as the running total exceeds the sum of the remaining (unpicked) elements, stop — this greedy choice is optimal because picking the largest available values always minimizes the count needed to exceed the rest.

## C# Solution

```csharp
public class Solution
{
    public IList<int> MinSubsequence(int[] nums)
    {
        Array.Sort(nums);
        Array.Reverse(nums);

        int total = 0;
        foreach (var n in nums) total += n;

        var result = new List<int>();
        int running = 0;

        foreach (var n in nums)
        {
            running += n;
            result.Add(n);
            if (running > total - running) break;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(n)` for the result list.
