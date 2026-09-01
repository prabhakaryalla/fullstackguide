# 1785. Minimum Elements to Add to Form a Given Sum

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Given an integer array `nums`, and integers `limit` and `goal`, you may add elements (each with an absolute value at most `limit`) to `nums`. Return the minimum number of elements to add so that the sum of the array equals `goal`.

### Example

```
Input: nums = [1,-1,1], limit = 3, goal = -4
Output: 2
```

## Approach

Compute the current sum and the absolute gap to `goal`. Since each added element can close at most `limit` of that gap, the minimum count needed is the gap divided by `limit`, rounded up.

## C# Solution

```csharp
public class Solution
{
    public int MinElements(int[] nums, int limit, int goal)
    {
        long sum = 0;
        foreach (int x in nums) sum += x;

        long diff = Math.Abs(goal - sum);
        return (int)((diff + limit - 1) / limit);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
