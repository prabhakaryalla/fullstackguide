# 2616. Minimize the Maximum Difference of Pairs

**Difficulty:** Medium
**Category:** Array, Binary Search, Greedy

## Problem

You are given a 0-indexed integer array `nums` and an integer `p`. Find `p` pairs of indices of `nums` such that the maximum difference amongst all the pairs is minimized. Also, ensure no index appears more than once amongst the `p` pairs.

Note that for a pair of elements at the index `i` and `j`, the difference of this pair is `|nums[i] - nums[j]|`, where `|x|` represents the absolute value of `x`.

Return the minimum maximum difference among all `p` pairs.

### Example

```
Input: nums = [10,1,2,7,1,3], p = 2
Output: 1
Explanation: The pairs (1,4) and (2,5) have differences of 0 and 1 respectively.
The maximum difference is 1.
```

## Approach

Sort the array, then binary search on the answer (the maximum difference). For a candidate maximum difference `mid`, greedily check if we can form `p` pairs where each pair's difference is at most `mid`. Pair consecutive elements greedily from left to right.

## C# Solution

```csharp
public class Solution
{
    public int MinimizeMax(int[] nums, int p)
    {
        Array.Sort(nums);
        int left = 0;
        int right = nums[nums.Length - 1] - nums[0];
        
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            
            if (CanFormPairs(nums, p, mid))
                right = mid;
            else
                left = mid + 1;
        }
        
        return left;
    }
    
    private bool CanFormPairs(int[] nums, int p, int maxDiff)
    {
        int count = 0;
        int i = 0;
        
        while (i < nums.Length - 1)
        {
            if (nums[i + 1] - nums[i] <= maxDiff)
            {
                count++;
                i += 2;
            }
            else
            {
                i++;
            }
        }
        
        return count >= p;
    }
}
```

## Complexity

- **Time:** O(n log n + n log(max - min)) — sorting plus binary search with linear validation
- **Space:** O(1) — constant extra space
