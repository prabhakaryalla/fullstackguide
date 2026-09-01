# 1053. Previous Permutation With One Swap

**Difficulty:** Medium
**Category:** Array, Greedy

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `arr` of positive integers (not necessarily distinct), swap exactly two elements to produce the largest permutation that is still smaller than `arr` (its previous permutation). Return `arr` unchanged if no such permutation exists.

### Example

```
Input: arr = [3,2,1]
Output: [3,1,2]
```

## Approach

Scan from the right to find the first index `i` where `arr[i] > arr[i+1]` — beyond this point the suffix is already non-decreasing, so no swap within it can decrease the number. If no such `i` exists, `arr` is already the smallest permutation. Otherwise, since the suffix after `i` is non-decreasing, scan from the right again to find the rightmost value strictly less than `arr[i]` — that's the largest usable replacement. Among duplicates of that value, prefer the leftmost occurrence so the swap disturbs the trailing (larger) values as little as possible, then swap it with `arr[i]`.

## C# Solution

```csharp
public class Solution
{
    public int[] PrevPermOpt1(int[] arr)
    {
        int n = arr.Length;
        int i = n - 2;

        while (i >= 0 && arr[i] <= arr[i + 1]) i--;

        if (i < 0) return arr;

        int j = n - 1;
        while (j > i && arr[j] >= arr[i]) j--;

        while (j > 0 && arr[j - 1] == arr[j] && arr[j - 1] < arr[i]) j--;

        (arr[i], arr[j]) = (arr[j], arr[i]);

        return arr;
    }
}
```

## Complexity

- **Time:** `O(n)` — a constant number of linear scans.
- **Space:** `O(1)` extra.
