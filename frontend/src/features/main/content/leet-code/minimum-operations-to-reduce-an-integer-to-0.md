# 2571. Minimum Operations to Reduce an Integer to 0

**Difficulty:** Medium
**Category:** Dynamic Programming, Greedy, Bit Manipulation

## Problem

You are given a positive integer `n`. You can apply the following operation any number of times:

- Choose any integer `i` such that `1 <= i <= n` and `n - i` is a power of 2 (i.e., `n - i == 2^x` for some `x >= 0`)

Return the minimum number of operations needed to make `n` equal to 0.

### Example

```
Input: n = 39
Output: 3
Explanation:
39 - 32 = 7 (2^5)
7 - 8 = -1, so use 7 - 4 = 3
3 - 4 = -1, so use 3 - 2 = 1
1 - 1 = 0
Total: 3 operations

Input: n = 54
Output: 3
Explanation: 54 - 32 = 22, 22 - 16 = 6, 6 - 4 = 2, 2 - 2 = 0
Actually optimal: 54 + 2 = 56, 56 - 32 = 24, 24 - 16 = 8, 8 - 8 = 0... wait that's 4
Better: 54 - 32 = 22, 22 - 16 = 6, 6 - 8 = -2 (invalid)
Actually: work with binary representation
```

## Approach

Work with the binary representation of `n`. The operation allows adding or subtracting powers of 2.

The minimum operations equals the number of "blocks" of consecutive 1s in binary, plus adjustments:
- A block of consecutive 1s can be replaced by subtracting a power of 2 and adding a higher power (reducing operations)
- Example: 111 (binary) = 1000 - 1 (one operation instead of three)

Count: Start from rightmost bit, count groups of consecutive 1s, treating each isolated 1 and each block of consecutive 1s as needing operations.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int n)
    {
        int operations = 0;
        
        while (n > 0)
        {
            if ((n & 1) == 1)
            {
                // Found a 1 bit
                if ((n & 2) == 2)
                {
                    // Consecutive 1s - add to get carry
                    while ((n & 1) == 1)
                        n >>= 1;
                }
                else
                {
                    // Isolated 1 - subtract
                    n >>= 1;
                }
                operations++;
            }
            else
            {
                n >>= 1;
            }
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(log n) - number of bits in n
- **Space:** O(1)
