# 1015. Smallest Integer Divisible by K

**Difficulty:** Medium
**Category:** Math, Hash Table

## Problem

Given a positive integer `k`, return the length of the smallest positive integer `n` such that `n` consists only of the digit `1` (a repunit) and is divisible by `k`. Return `-1` if no such `n` exists.

### Example

```
Input: k = 1
Output: 1

Input: k = 2
Output: -1
```

## Approach

If `k` is divisible by `2` or `5`, a repunit (which always ends in `1`) can never be divisible by `k`, so the answer is `-1`. Otherwise, build the repunit digit by digit while tracking only its remainder modulo `k`: each new digit updates the remainder as `remainder = (remainder * 10 + 1) % k`. By the pigeonhole principle, if a zero remainder exists it must appear within the first `k` digits, so stop and return `-1` if it isn't found by then.

## C# Solution

```csharp
public class Solution
{
    public int SmallestRepunitDivByK(int k)
    {
        if (k % 2 == 0 || k % 5 == 0) return -1;

        int remainder = 0;
        for (int length = 1; length <= k; length++)
        {
            remainder = (remainder * 10 + 1) % k;
            if (remainder == 0) return length;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(k)` in the worst case.
- **Space:** `O(1)`.
