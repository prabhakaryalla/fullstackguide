# 1611. Minimum One Bit Operations to Make Integers Zero

**Difficulty:** Hard
**Category:** Dynamic Programming, Bit Manipulation, Memoization

## Problem

Given an integer `n`, you may repeatedly: (1) change the rightmost (`0th`) bit, or (2) change the `i`-th bit if the `(i-1)`-th bit is `1` and all bits below `i-1` are `0`. Return the minimum number of such operations to turn `n` into `0`.

### Example

```
Input: n = 3
Output: 2
Explanation: 3 = "11" -> "01" -> "00".
```

## Approach

The set of reachable values, indexed by the number of operations performed starting from `0`, follows the standard reflected Gray code sequence (`grayCode(i) = i ^ (i >> 1)`). Therefore the answer is the inverse Gray code of `n`, computed by repeatedly XOR-ing `n` with its right shifts.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOneBitOperations(int n)
    {
        int result = 0;

        while (n != 0)
        {
            result ^= n;
            n >>= 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
