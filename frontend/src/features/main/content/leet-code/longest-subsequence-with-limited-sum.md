# 2389. Longest Subsequence With Limited Sum

**Difficulty:** Easy
**Category:** Array, Binary Search, Greedy, Sorting, Prefix Sum

## Problem

You are given an integer array `nums` of length `n`, and an integer array `queries` of length `m`.

Return an array `answer` of length `m` where `answer[i]` is the maximum size of a subsequence that you can take from `nums` such that the sum of its elements is less than or equal to `queries[i]`.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

### Example

```
Input: nums = [4,5,2,1], queries = [3,10,21]
Output: [2,3,4]
```

## Approach

Sort nums in ascending order. Compute prefix sums. For each query, binary search to find the largest index where prefix sum <= query value.

## C# Solution

```csharp
public class Solution
{
    public int[] AnswerQueries(int[] nums, int[] queries)
    {
        Array.Sort(nums);
        
        for (int i = 1; i < nums.Length; i++)
        {
            nums[i] += nums[i - 1];
        }
        
        var result = new int[queries.Length];
        
        for (int i = 0; i < queries.Length; i++)
        {
            int left = 0, right = nums.Length - 1, answer = 0;
            
            while (left <= right)
            {
                int mid = left + (right - left) / 2;
                if (nums[mid] <= queries[i])
                {
                    answer = mid + 1;
                    left = mid + 1;
                }
                else
                {
                    right = mid - 1;
                }
            }
            
            result[i] = answer;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n + m log n)
- **Space:** O(1) excluding output
