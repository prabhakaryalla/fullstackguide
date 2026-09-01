# 1502. Can Make Arithmetic Progression From Sequence

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an array of numbers `arr`, return `true` if the array can be rearranged to form an arithmetic progression, otherwise return `false`.

### Example

```
Input: arr = [3,5,1]
Output: true
Explanation: Rearranged as [1,3,5], the differences between consecutive elements are all 2.
```

## Approach

Sort the array. An arithmetic progression requires the difference between every pair of consecutive elements to be identical, so after sorting we only need to compare each gap against the first gap.

## C# Solution

```csharp
public class Solution
{
    public bool CanMakeArithmeticProgression(int[] arr)
    {
        Array.Sort(arr);
        int diff = arr[1] - arr[0];

        for (int i = 2; i < arr.Length; i++)
        {
            if (arr[i] - arr[i - 1] != diff)
            {
                return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(log n)` — sort's internal recursion (or `O(1)` extra beyond that).
