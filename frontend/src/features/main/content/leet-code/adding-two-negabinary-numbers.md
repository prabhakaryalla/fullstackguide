# 1073. Adding Two Negabinary Numbers

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given two numbers `arr1` and `arr2` represented in base `-2` (negabinary) as arrays of `0`s and `1`s (most significant digit first), return their sum, also represented in base `-2`, with no leading zeros (except a single `0` for the value zero).

### Example

```
Input: arr1 = [1,1,1,1,1,1], arr2 = [1,0,1]
Output: [1,0,0,0,0,0]
```

## Approach

Add the two numbers digit by digit from the least significant end, carrying a running `carry` value into each step's `sum`. Unlike base 2, the resulting digit must still be normalized into `{0, 1}` via `sum mod 2` (adjusted to stay non-negative), but the carry propagated to the next (more significant) position is `-floor(sum / 2)`, since each higher position carries weight `-2` instead of `2`. Continue until both arrays and the carry are exhausted, then reverse the collected digits and trim any leading zeros.

## C# Solution

```csharp
public class Solution
{
    public int[] AddNegabinary(int[] arr1, int[] arr2)
    {
        var result = new List<int>();
        int i = arr1.Length - 1, j = arr2.Length - 1;
        int carry = 0;

        while (i >= 0 || j >= 0 || carry != 0)
        {
            int sum = carry;
            if (i >= 0) sum += arr1[i--];
            if (j >= 0) sum += arr2[j--];

            result.Add(((sum % 2) + 2) % 2);
            carry = -(int)Math.Floor(sum / 2.0);
        }

        result.Reverse();

        int start = 0;
        while (start < result.Count - 1 && result[start] == 0) start++;

        return result.Skip(start).ToArray();
    }
}
```

## Complexity

- **Time:** `O(max(n, m))`.
- **Space:** `O(max(n, m))` for the result buffer.
