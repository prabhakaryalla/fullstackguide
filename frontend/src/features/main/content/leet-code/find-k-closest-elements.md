# 658. Find K Closest Elements

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Sorting, Heap

## Problem

Given a sorted integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array, sorted in ascending order (ties broken by smaller value).

### Example

```
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]
```

### Constraints

- `1 <= k <= arr.length`
- `1 <= arr.length <= 10^4`

## Approach

Binary search for the optimal starting index of the length-`k` result window. At each candidate window `[mid, mid + k]`, compare the distance from `x` to the window's left edge versus its element just past the right edge (`arr[mid + k]`): if the left edge is farther from `x`, the window should shift right (excluding that left edge); otherwise, shrink the search to the left half. This converges to the window that minimizes maximum distance while preferring smaller values on ties.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindClosestElements(int[] arr, int k, int x)
    {
        int left = 0, right = arr.Length - k;

        while (left < right)
        {
            int mid = left + (right - left) / 2;

            if (x - arr[mid] > arr[mid + k] - x)
                left = mid + 1;
            else
                right = mid;
        }

        return arr.Skip(left).Take(k).ToList();
    }
}
```

## Complexity

- **Time:** `O(log(n - k) + k)`.
- **Space:** `O(k)` for the result list.
