# 2951. Find the Peaks

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed array `mountain`. An index `i` is a peak if:
- `i > 0` and `i < mountain.length - 1`
- `mountain[i - 1] < mountain[i]` and `mountain[i] > mountain[i + 1]`

Return an array of all peak indices in ascending order.

### Example

```
Input: mountain = [2,4,4]
Output: []
Explanation: No index satisfies the peak condition.
```

## Approach

Iterate through the array from index 1 to n-2 (excluding first and last). For each index, check if it's strictly greater than both neighbors. If so, add it to the result.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindPeaks(int[] mountain)
    {
        var peaks = new List<int>();
        
        for (int i = 1; i < mountain.Length - 1; i++)
        {
            if (mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1])
            {
                peaks.Add(i);
            }
        }
        
        return peaks;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1) excluding the output array
