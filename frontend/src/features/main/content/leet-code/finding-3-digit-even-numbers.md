# 2094. Finding 3-Digit Even Numbers

**Difficulty:** Easy
**Category:** Array, Hash Table, Enumeration, Sorting

## Problem

Given an array of digits `digits`, return all distinct 3-digit even numbers that can be formed by choosing three different array elements (by index, not necessarily by value) and arranging them in some order, such that the number has no leading zero. Return the results sorted in ascending order.

## Approach

Count the available quantity of each digit `0`-`9`. For every candidate 3-digit even number from `100` to `998` (stepping by `2`), extract its three digits and check whether the available digit counts (after accounting for repeats within the candidate itself) are sufficient. Since candidates are generated in increasing order, valid ones are automatically collected in sorted order.

## C# Solution

```csharp
public class Solution
{
    public int[] FindEvenNumbers(int[] digits)
    {
        var available = new int[10];
        foreach (var d in digits) available[d]++;

        var result = new List<int>();

        for (int num = 100; num <= 998; num += 2)
        {
            int hundreds = num / 100;
            int tens = (num / 10) % 10;
            int ones = num % 10;

            var needed = new int[10];
            needed[hundreds]++;
            needed[tens]++;
            needed[ones]++;

            bool valid = true;
            for (int d = 0; d < 10; d++)
            {
                if (needed[d] > available[d])
                {
                    valid = false;
                    break;
                }
            }

            if (valid) result.Add(num);
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by the fixed range of 3-digit even numbers and 10 possible digits.
- **Space:** `O(1)` for the digit-count arrays.
