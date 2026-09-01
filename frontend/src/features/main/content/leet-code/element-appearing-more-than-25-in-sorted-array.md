# 1287. Element Appearing More Than 25% In Sorted Array

**Difficulty:** Easy
**Category:** Array, Binary Search

## Problem

Given an integer array sorted in non-decreasing order, return the one element that appears more than `25%` of the time (such an element is guaranteed to exist).

### Example

```
Input: arr = [1,2,2,6,6,6,6,7,10]
Output: 6
```

## Approach

If an element occupies more than a quarter of the array, then in a sorted array it must span at least `n/4 + 1` consecutive positions somewhere. So it's enough to check, for every starting index `i`, whether `arr[i]` equals the element a quarter-length away at `arr[i + n/4]` — if so, this run of equal values is long enough to be the answer, since the array is sorted and thus that whole stretch is identical.

## C# Solution

```csharp
public class Solution
{
    public int FindSpecialInteger(int[] arr)
    {
        int n = arr.Length;
        int quarter = n / 4;

        for (int i = 0; i + quarter < n; i++)
        {
            if (arr[i] == arr[i + quarter])
                return arr[i];
        }

        return arr[0];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
