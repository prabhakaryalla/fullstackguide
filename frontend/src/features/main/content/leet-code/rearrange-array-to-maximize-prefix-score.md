# 2587. Rearrange Array to Maximize Prefix Score

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums`. You can rearrange the elements of `nums` to any order (including keeping the original order).

Let `prefix` be the array containing the prefix sums of `nums` after rearranging. The prefix score of `nums` is the number of positive integers in the array `prefix`. Return the maximum prefix score you can achieve.

### Example

```
Input: nums = [2,-1,0,1,-3,3,-3]
Output: 6
Explanation: 
Rearrange to [2,3,1,0,-1,-3,-3]
Prefix sums: [2,5,6,6,5,2,-1]
6 positive prefix sums
```

## Approach

To maximize the number of positive prefix sums, we should arrange larger (more positive) numbers first. Sort the array in descending order and compute prefix sums. Count how many prefix sums remain positive.

The key insight is that placing larger values early maximizes the cumulative sum, keeping it positive for as long as possible.

## C# Solution

```csharp
public class Solution
{
    public int MaxScore(int[] nums)
    {
        Array.Sort(nums, (a, b) => b.CompareTo(a));
        
        long prefixSum = 0;
        int count = 0;
        
        foreach (int num in nums)
        {
            prefixSum += num;
            if (prefixSum > 0)
            {
                count++;
            }
            else
            {
                break;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1)
