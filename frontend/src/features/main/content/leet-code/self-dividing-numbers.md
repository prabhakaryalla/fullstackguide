# 728. Self Dividing Numbers

**Difficulty:** Easy
**Category:** Math

## Problem

A self-dividing number is a number that is divisible by every digit it contains (and contains no zero digit). Given a range `[left, right]`, return a list of every self-dividing number within it.

### Example

```
Input: left = 1, right = 22
Output: [1,2,3,4,5,6,7,8,9,11,12,15,22]
```

## Approach

For each number in the range, extract its digits one at a time via repeated modulo/division. Reject the number immediately if any digit is `0` (division by zero is undefined) or doesn't evenly divide the original number.

## C# Solution

```csharp
public class Solution
{
    public IList<int> SelfDividingNumbers(int left, int right)
    {
        var result = new List<int>();

        for (int num = left; num <= right; num++)
        {
            if (IsSelfDividing(num))
                result.Add(num);
        }

        return result;
    }

    private bool IsSelfDividing(int num)
    {
        int n = num;
        while (n > 0)
        {
            int digit = n % 10;
            if (digit == 0 || num % digit != 0) return false;

            n /= 10;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O((right - left) * log(right))`.
- **Space:** `O(1)` extra, excluding the output list.
