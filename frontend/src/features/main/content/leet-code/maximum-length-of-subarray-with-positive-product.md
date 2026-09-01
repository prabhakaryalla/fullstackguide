# 1567. Maximum Length of Subarray With Positive Product

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem

Given an integer array `nums`, return the maximum length of a subarray whose product of all elements is positive.

### Example

```
Input: nums = [1,-2,-3,4]
Output: 4
```

## Approach

Track two running lengths while scanning: `positiveLength`, the length of the longest subarray ending at the current position with a positive product, and `negativeLength`, the corresponding length for a negative product. For a positive number, extending both lengths simply adds 1 (a zero-length negative streak stays zero). For a negative number, the two roles swap (positive and negative lengths trade places) before adding 1. A zero resets both to zero. Track the maximum `positiveLength` seen throughout.

## C# Solution

```csharp
public class Solution
{
    public int GetMaxLen(int[] nums)
    {
        int positiveLength = 0;
        int negativeLength = 0;
        int best = 0;

        foreach (int num in nums)
        {
            if (num == 0)
            {
                positiveLength = 0;
                negativeLength = 0;
            }
            else if (num > 0)
            {
                positiveLength++;
                negativeLength = negativeLength > 0 ? negativeLength + 1 : 0;
            }
            else
            {
                int newPositive = negativeLength > 0 ? negativeLength + 1 : 0;
                int newNegative = positiveLength + 1;
                positiveLength = newPositive;
                negativeLength = newNegative;
            }

            best = Math.Max(best, positiveLength);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
