# 1846. Maximum Element After Decreasing and Rearranging

**Difficulty:** Medium
**Category:** Array, Sorting, Greedy

## Problem

Given a positive integer array `arr`, you may decrease any element to any smaller positive value and rearrange the array in any order. After such operations, the array must satisfy: `arr[0] == 1`, and every adjacent pair differs by at most `1`. Return the maximum possible value of the last (largest) element.

### Example

```
Input: arr = [2,2,1,2,1]
Output: 2
```

## Approach

Sort the array ascending, then force `arr[0] = 1`. Walk left to right, capping each subsequent element at `min(arr[i], arr[i-1] + 1)` — this greedily keeps every value as large as legally possible while respecting the "increase by at most 1" rule from the previous (already finalized) element. The last element after this pass is the maximum achievable value.

## C# Solution

```csharp
public class Solution
{
    public int MaximumElementAfterDecrementingAndRearranging(int[] arr)
    {
        Array.Sort(arr);
        arr[0] = 1;

        for (int i = 1; i < arr.Length; i++)
        {
            arr[i] = Math.Min(arr[i], arr[i - 1] + 1);
        }

        return arr[^1];
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
