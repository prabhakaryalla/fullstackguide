# 1198. Find Smallest Common Element in All Rows

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Counting, Matrix

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `m x n` matrix where every row is sorted in strictly increasing order, return the smallest value that appears in every row. Return `-1` if no such value exists.

### Example

```
Input: mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
Output: 5
```

## Approach

Since each row has distinct values, count how many rows contain each value using a hash map (a value can be incremented at most once per row because rows are strictly increasing). Any value whose count equals the number of rows is common to all rows; scanning for the smallest such value gives the answer.

## C# Solution

```csharp
public class Solution
{
    public int SmallestCommonElement(int[][] mat)
    {
        var count = new Dictionary<int, int>();
        int rows = mat.Length;

        foreach (var row in mat)
        {
            foreach (int value in row)
            {
                count[value] = count.GetValueOrDefault(value) + 1;
            }
        }

        int best = int.MaxValue;
        bool found = false;

        foreach (var kv in count)
        {
            if (kv.Value == rows && kv.Key < best)
            {
                best = kv.Key;
                found = true;
            }
        }

        return found ? best : -1;
    }
}
```

## Complexity

- **Time:** `O(m·n)`.
- **Space:** `O(m·n)` for the counting map.
