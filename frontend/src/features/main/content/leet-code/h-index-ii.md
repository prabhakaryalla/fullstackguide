# 275. H-Index II

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given an array of integers `citations` sorted in ascending order, where `citations[i]` is the number of citations for the `i`-th paper, return the researcher's h-index. Solve it in `O(log n)` time by exploiting the sorted order.

### Example

```
Input: citations = [0,1,3,5,6]
Output: 3
```

### Constraints

- `n == citations.length`
- `1 <= n <= 10^5`
- `citations` is sorted in ascending order.

## Approach

Binary search for the smallest index `mid` where the number of papers from `mid` to the end (`n - mid`) is less than or equal to `citations[mid]` — that count is a candidate h-index. If `citations[mid] >= n - mid`, the h-index could be `n - mid` or larger, so search the left half; otherwise search the right half. The answer is `n - left` once the search converges.

## C# Solution

```csharp
public class Solution
{
    public int HIndex(int[] citations)
    {
        int n = citations.Length;
        int left = 0, right = n - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            int papersFromMid = n - mid;

            if (citations[mid] >= papersFromMid) right = mid - 1;
            else left = mid + 1;
        }

        return n - left;
    }
}
```

## Complexity

- **Time:** `O(log n)` — binary search over the sorted array.
- **Space:** `O(1)`.
