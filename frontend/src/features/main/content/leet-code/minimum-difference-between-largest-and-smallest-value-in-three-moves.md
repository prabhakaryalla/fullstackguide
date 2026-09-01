# 1509. Minimum Difference Between Largest and Smallest Value in Three Moves

**Difficulty:** Medium
**Category:** Array, Sorting, Greedy

## Problem

Given an integer array `nums`, you can choose one element and change it to any value, up to three times. Return the minimum difference between the largest and smallest value of `nums` after performing at most three such moves.

### Example

```
Input: nums = [5,3,2,4]
Output: 0
```

## Approach

Sort the array. If it has 4 or fewer elements, the answer is always `0` (every element can be forced equal). Otherwise, since each move can neutralize one extreme value (either the smallest or the largest), the optimal strategy removes some combination of the 3 smallest and 3 largest values from consideration (0 smallest + 3 largest, 1 + 2, 2 + 1, or 3 + 0), and the answer is the minimum resulting `max - min` window among those four options.

## C# Solution

```csharp
public class Solution
{
    public int MinDifference(int[] nums)
    {
        int n = nums.Length;
        if (n <= 4)
        {
            return 0;
        }

        Array.Sort(nums);
        int best = int.MaxValue;

        for (int i = 0; i <= 3; i++)
        {
            int diff = nums[n - 1 - (3 - i)] - nums[i];
            best = Math.Min(best, diff);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(log n)` for the sort.
