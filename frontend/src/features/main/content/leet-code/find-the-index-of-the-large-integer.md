# 1533. Find the Index of the Large Integer

**Difficulty:** Medium
**Category:** Binary Search, Interactive

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

There is an integer array of length `n` where every element is the same except for exactly one element that is larger than the rest. Using only the interactive `ArrayReader.compareSub(l, r, x, y)` API (which compares the sum of `arr[l..r]` to the sum of `arr[x..y]` for equal-length ranges), find and return the index of that larger element.

### Example

```
Input: arr = [7,7,7,7,10,7,7,7]
Output: 4
```

## Approach

Binary search on the range `[lo, hi]`. Split the current range into two equal halves (dropping the middle element if the length is odd, since it cannot be compared evenly). Use `compareSub` to compare the sums of the two halves — the half producing the strictly larger sum contains the larger element (or, if both halves are equal, the odd middle element out is the answer).

## C# Solution

```csharp
public class Solution
{
    public int GetIndex(ArrayReader reader)
    {
        int lo = 0;
        int hi = reader.Length() - 1;

        while (lo < hi)
        {
            int length = hi - lo + 1;

            if (length % 2 != 0)
            {
                int mid = lo + (length - 1) / 2;
                int cmp = reader.CompareSub(lo, mid - 1, mid + 1, hi);
                if (cmp == 0)
                {
                    return mid;
                }
                if (cmp > 0)
                {
                    hi = mid - 1;
                }
                else
                {
                    lo = mid + 1;
                }
            }
            else
            {
                int half = length / 2;
                int cmp = reader.CompareSub(lo, lo + half - 1, lo + half, hi);
                if (cmp > 0)
                {
                    hi = lo + half - 1;
                }
                else
                {
                    lo = lo + half;
                }
            }
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)` interactive comparisons — halving the search range each step.
- **Space:** `O(1)`.
