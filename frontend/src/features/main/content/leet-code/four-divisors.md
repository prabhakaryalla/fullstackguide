# 1390. Four Divisors

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given an integer array `nums`, return the sum, over every element with exactly four divisors, of the sum of those divisors. Return `0` if no such element exists.

### Example

```
Input: nums = [21,4,7]
Output: 32
```

## Approach

For each number, find its divisors by scanning up to its square root, pairing each divisor `i` with `num / i`. Track the running divisor sum and count as they're found, stopping early (skipping the number) if more than four divisors are discovered. If exactly four divisors are found, add their sum to the total.

## C# Solution

```csharp
public class Solution
{
    public int SumFourDivisors(int[] nums)
    {
        long total = 0;

        foreach (int num in nums)
        {
            var divisors = new List<int>();
            for (int i = 1; (long)i * i <= num; i++)
            {
                if (num % i == 0)
                {
                    divisors.Add(i);
                    if (i != num / i) divisors.Add(num / i);
                    if (divisors.Count > 4) break;
                }
            }

            if (divisors.Count == 4) total += divisors.Sum();
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n * sqrt(max(nums)))`.
- **Space:** `O(1)` extra beyond the small divisor list.
