# 2501. Longest Square Streak in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Dynamic Programming, Sorting

## Problem

You are given an integer array `nums`. A subsequence of `nums` is called a square streak if:
- The length of the subsequence is at least 2, and
- After sorting the subsequence, each element (except the first element) is the square of the previous number

Return the length of the longest square streak in `nums`, or return -1 if there is no square streak.

### Example

```
Input: nums = [4,3,6,16,8,2]
Output: 3
Explanation: The square streak is [2, 4, 16] because 4 = 2^2 and 16 = 4^2.
```

## Approach

Use a hash set for O(1) lookups. For each number, try to build a square streak by repeatedly squaring and checking if the result exists in the set. Track the maximum streak length found. To avoid counting the same streak multiple times, ensure we start from the smallest number in each potential streak.

## C# Solution

```csharp
public class Solution
{
    public int LongestSquareStreak(int[] nums)
    {
        HashSet<long> set = new HashSet<long>();
        foreach (int num in nums)
        {
            set.Add(num);
        }
        
        int maxStreak = -1;
        
        foreach (int num in nums)
        {
            long current = num;
            int streak = 0;
            
            while (set.Contains(current))
            {
                streak++;
                if (current > 100000) break;
                current = current * current;
            }
            
            if (streak >= 2)
            {
                maxStreak = Math.Max(maxStreak, streak);
            }
        }
        
        return maxStreak;
    }
}
```

## Complexity

- **Time:** O(n × log(max_value)) where n is the length of nums
- **Space:** O(n) for the hash set
