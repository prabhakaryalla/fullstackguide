# 1299. Replace Elements with Greatest Element on Right Side

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array `arr`, replace every element with the greatest element among the elements to its right, and replace the last element with `-1`.

### Example

```
Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
```

## Approach

Scan the array from right to left while tracking the maximum value seen so far. At each position, first record the current running maximum as that position's answer (this is the greatest element strictly to the right, since the running max hasn't yet incorporated the current element), then update the running maximum to include the current element for the next iteration to the left.

## C# Solution

```csharp
public class Solution
{
    public int[] ReplaceElements(int[] arr)
    {
        int n = arr.Length;
        var result = new int[n];
        int maxSoFar = -1;

        for (int i = n - 1; i >= 0; i--)
        {
            result[i] = maxSoFar;
            maxSoFar = Math.Max(maxSoFar, arr[i]);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `arr`.
- **Space:** `O(n)` for the output (`O(1)` if the input may be overwritten in place).
