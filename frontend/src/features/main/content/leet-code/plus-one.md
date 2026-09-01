# 66. Plus One

**Difficulty:** Easy
**Category:** Array, Math

## Problem

You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the `i`-th digit of the integer (most significant digit first). Increment the large integer by one and return the resulting array of digits.

### Example 1

```
Input: digits = [1,2,3]
Output: [1,2,4]
```

### Example 2

```
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
```

### Example 3

```
Input: digits = [9,9,9]
Output: [1,0,0,0]
```

### Constraints

- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`

## Approach

Walk from the last digit backward. If a digit is less than 9, incrementing it alone finishes the job. If it's a 9, it rolls over to 0 and the carry propagates to the previous digit. If every digit was a 9 (all rolled over to 0), an extra leading `1` must be prepended.

## C# Solution

```csharp
public class Solution
{
    public int[] PlusOne(int[] digits)
    {
        for (int i = digits.Length - 1; i >= 0; i--)
        {
            if (digits[i] < 9)
            {
                digits[i]++;
                return digits;
            }

            digits[i] = 0;
        }

        var result = new int[digits.Length + 1];
        result[0] = 1;
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — worst case (all 9's) touches every digit.
- **Space:** `O(1)` extra, or `O(n)` only in the all-9's edge case that allocates a new array.
