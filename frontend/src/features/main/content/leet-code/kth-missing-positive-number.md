# 1539. Kth Missing Positive Number

**Difficulty:** Easy
**Category:** Array, Binary Search

## Problem

Given a strictly increasing sorted array of positive integers `arr` and an integer `k`, return the `k`-th positive integer that is missing from `arr`.

### Example

```
Input: arr = [2,3,4,7,11], k = 5
Output: 9
```

## Approach

For any index `i` (0-indexed), the number of missing positive integers up to `arr[i]` equals `arr[i] - (i + 1)`, since in a "complete" sequence with no gaps, `arr[i]` would equal `i + 1`. Binary search for the smallest index where this missing-count is `>= k`; the answer is then `k` plus the index found (adjusted to account for the elements already present before that point).

## C# Solution

```csharp
public class Solution
{
    public int FindKthPositive(int[] arr, int k)
    {
        int lo = 0;
        int hi = arr.Length - 1;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            int missingBefore = arr[mid] - (mid + 1);

            if (missingBefore < k)
            {
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return k + lo;
    }
}
```

## Complexity

- **Time:** `O(log n)` — binary search over the array.
- **Space:** `O(1)`.
