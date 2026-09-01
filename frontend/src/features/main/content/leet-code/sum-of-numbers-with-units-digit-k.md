# 2310. Sum of Numbers With Units Digit K

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

Given two integers `num` and `k`, return the minimum number of positive integers that add up to `num` where every integer has a units digit of `k`. Return `-1` if no such numbers exist.

Note that:
- The units digit of a number is the rightmost digit.
- `num` and `k` are positive integers.

### Example

```
Input: num = 58, k = 9
Output: 2
Explanation: 49 + 9 = 58 (both end in 9)
```

## Approach

We need to find the minimum count `c` such that `c * k ≡ num (mod 10)` and `c * k <= num`. Try values of c from 0 to 10 (since after 10, the units digit pattern repeats). For each valid c, check if `(num - c * k) % 10 == 0`, meaning we can form the rest with numbers ending in 0 (i.e., multiples of 10 ending in k like 10+k, 20+k, etc.).

## C# Solution

```csharp
public class Solution
{
    public int MinimumNumbers(int num, int k)
    {
        if (num == 0) return 0;
        
        for (int c = 1; c <= 10; c++)
        {
            int total = c * k;
            if (total > num) break;
            if (total % 10 == num % 10)
            {
                return c;
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(1) as we check at most 10 values
- **Space:** O(1)
