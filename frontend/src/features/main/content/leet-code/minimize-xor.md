# 2429. Minimize XOR

**Difficulty:** Medium
**Category:** Bit Manipulation, Greedy

## Problem

Given two positive integers `num1` and `num2`, find the positive integer `x` such that:

- `x` has the same number of set bits as `num2`, and
- The value `x XOR num1` is minimal.

If there are multiple possibilities for `x`, return the smallest one.

### Example

```
Input: num1 = 3, num2 = 5
Output: 3
Explanation: num1 = 011, num2 = 101 (2 set bits). x = 011 = 3 has 2 set bits and 3 XOR 3 = 0 is minimal.
```

## Approach

Count the set bits in `num2`. To minimize XOR with `num1`, we want `x` to match as many set bits of `num1` as possible. Start by setting bits in `x` at positions where `num1` has set bits (from most significant to least). If we need more set bits, add them at the least significant positions where `num1` has unset bits.

## C# Solution

```csharp
public class Solution
{
    public int MinimizeXor(int num1, int num2)
    {
        int targetBits = CountSetBits(num2);
        int x = 0;
        
        // First, set bits where num1 has bits (from MSB to LSB)
        for (int i = 31; i >= 0 && targetBits > 0; i--)
        {
            if ((num1 & (1 << i)) != 0)
            {
                x |= (1 << i);
                targetBits--;
            }
        }
        
        // If we still need more bits, set from LSB upward where num1 doesn't have bits
        for (int i = 0; i <= 31 && targetBits > 0; i++)
        {
            if ((num1 & (1 << i)) == 0 && (x & (1 << i)) == 0)
            {
                x |= (1 << i);
                targetBits--;
            }
        }
        
        return x;
    }
    
    private int CountSetBits(int n)
    {
        int count = 0;
        while (n > 0)
        {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(log n) where n is the maximum value of num1 or num2
- **Space:** O(1)
