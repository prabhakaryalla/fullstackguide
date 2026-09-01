# 989. Add to Array-Form of Integer

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given the array-form of a non-negative integer `num` (each element a single digit, most significant first) and an integer `k`, return the array-form of `num + k`.

### Example

```
Input: num = [1,2,0,0], k = 34
Output: [1,2,3,4]
```

## Approach

Process digits from the least significant end, adding `k` as an initial carry. At each step, add the carry to the current digit (if any digits remain), append `digit % 10` to the result, and carry `digit / 10` forward. Continue until both the array and the carry are exhausted, then reverse the collected digits.

## C# Solution

```csharp
public class Solution
{
    public IList<int> AddToArrayForm(int[] num, int k)
    {
        var result = new List<int>();
        int i = num.Length - 1;
        int carry = k;

        while (i >= 0 || carry > 0)
        {
            int digit = carry;
            if (i >= 0) digit += num[i--];

            result.Add(digit % 10);
            carry = digit / 10;
        }

        result.Reverse();
        return result;
    }
}
```

## Complexity

- **Time:** `O(max(n, log k))`.
- **Space:** `O(max(n, log k))` for the output.
