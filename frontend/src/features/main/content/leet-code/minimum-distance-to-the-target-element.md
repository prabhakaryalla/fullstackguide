# 1848. Minimum Distance to the Target Element

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array `nums`, an integer `target`, and a starting index `start`, return the minimum absolute difference between `start` and any index `i` such that `nums[i] == target`.

### Example

```
Input: nums = [1,2,3,4,5], target = 5, start = 3
Output: 1
```

## Approach

Scan every index, and whenever the value matches `target`, track the minimum absolute distance from `start` to that index.

## C# Solution

```csharp
public class Solution
{
    public int GetMinDistance(int[] nums, int target, int start)
    {
        int best = int.MaxValue;

        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] == target) best = Math.Min(best, Math.Abs(i - start));
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
