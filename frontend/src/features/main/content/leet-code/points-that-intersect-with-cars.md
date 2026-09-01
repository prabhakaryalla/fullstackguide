# 2848. Points That Intersect With Cars

**Difficulty:** Easy
**Category:** Array, Hash Table, Prefix Sum

## Problem

You are given a 0-indexed 2D integer array nums representing the coordinates of cars on a number line. For each index i, nums[i] = [starti, endi] where starti is the starting point of the ith car and endi is the ending point of the ith car.

Return the number of integer points on the line that are covered by at least one car.

### Example

```
Input: nums = [[3,6],[1,5],[4,7]]
Output: 7
Explanation: Points 1, 2, 3, 4, 5, 6, 7 are covered. All points from 1 to 7 are covered by at least one car.
```

## Approach

This is a simple range coverage problem. We need to count distinct integer points that are covered by at least one interval.

We can use several approaches:
1. HashSet approach: For each car interval, add all points to a set, then return the set size
2. Sweep line approach: Mark covered points using an array or set
3. For small ranges: Use a boolean array to mark covered positions

Since the problem constraints are typically small, a HashSet approach is straightforward and efficient.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfPoints(List<List<int>> nums)
    {
        HashSet<int> covered = new HashSet<int>();
        
        foreach (var car in nums)
        {
            int start = car[0];
            int end = car[1];
            
            for (int point = start; point <= end; point++)
            {
                covered.Add(point);
            }
        }
        
        return covered.Count;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is the number of cars and m is the average length of intervals
- **Space:** O(k) where k is the number of distinct covered points
