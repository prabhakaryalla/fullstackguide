# 1574. Shortest Subarray to be Removed to Make Array Sorted

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Stack

## Problem

Given an integer array `arr`, remove the shortest contiguous subarray such that the remaining elements are non-decreasing. Return the length of that shortest subarray.

### Example

```
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
```

## Approach

Find the longest non-decreasing prefix (ending at index `left`) and the longest non-decreasing suffix (starting at index `right`). If the entire array is already non-decreasing, the answer is `0`. Otherwise, consider two baseline options: removing everything after the prefix, or removing everything before the suffix. Then try merging: for every valid prefix end `i` and suffix start `j`, if `arr[i] <= arr[j]`, the middle section `(i, j)` can be removed entirely — use a two-pointer sweep (since both the prefix and suffix are sorted) to efficiently find, for each prefix end, the smallest valid suffix start satisfying this condition, tracking the minimum removed length.

## C# Solution

```csharp
public class Solution
{
    public int FindLengthOfShortestSubarray(int[] arr)
    {
        int n = arr.Length;
        int left = 0;
        while (left + 1 < n && arr[left] <= arr[left + 1])
        {
            left++;
        }

        if (left == n - 1)
        {
            return 0;
        }

        int right = n - 1;
        while (right > 0 && arr[right - 1] <= arr[right])
        {
            right--;
        }

        int best = Math.Min(n - left - 1, right);

        int i = 0;
        int j = right;

        while (i <= left && j < n)
        {
            if (arr[i] <= arr[j])
            {
                best = Math.Min(best, j - i - 1);
                i++;
            }
            else
            {
                j++;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)` — two pointers each traverse the array once.
- **Space:** `O(1)`.
