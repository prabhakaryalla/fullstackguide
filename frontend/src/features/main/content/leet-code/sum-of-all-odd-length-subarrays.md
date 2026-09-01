# 1588. Sum of All Odd Length Subarrays

**Difficulty:** Easy
**Category:** Array, Math, Prefix Sum

## Problem

Given an array of positive integers `arr`, return the sum of all possible odd-length subarrays.

### Example

```
Input: arr = [1,4,2,5,3]
Output: 58
```

## Approach

Rather than generating every subarray, compute how many odd-length subarrays each element `arr[i]` participates in, and weight `arr[i]` by that count. For index `i` (0-indexed) in an array of length `n`, the number of subarrays starting at or before `i` and ending at or after `i` is `(i + 1) * (n - i)`; exactly half of those (rounded appropriately) have odd length. A simple closed-form for the odd-length count is `((i + 1) * (n - i) + 1) / 2` using integer arithmetic. Sum `arr[i]` times this count over all indices.

## C# Solution

```csharp
public class Solution
{
    public int SumOddLengthSubarrays(int[] arr)
    {
        int n = arr.Length;
        int total = 0;

        for (int i = 0; i < n; i++)
        {
            int totalSubarrays = (i + 1) * (n - i);
            int oddSubarrays = (totalSubarrays + 1) / 2;
            total += arr[i] * oddSubarrays;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
