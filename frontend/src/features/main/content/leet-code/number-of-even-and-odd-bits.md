# 2595. Number of Even and Odd Bits

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

You are given a positive integer `n`. Let `even` denote the number of even indices in the binary representation of `n` (0-indexed) where the bit is 1. Let `odd` denote the number of odd indices where the bit is 1.

Return an integer array `answer` where `answer = [even, odd]`.

### Example

```
Input: n = 17
Output: [2,0]
Explanation: 
Binary of 17 is 10001
Index 0 (even): 1
Index 4 (even): 1
Even count = 2, odd count = 0
```

## Approach

Iterate through the bits of `n` from right to left. Track whether the current index is even or odd, and if the bit is 1, increment the corresponding counter.

## C# Solution

```csharp
public class Solution
{
    public int[] EvenOddBit(int n)
    {
        int even = 0;
        int odd = 0;
        int index = 0;
        
        while (n > 0)
        {
            if ((n & 1) == 1)
            {
                if (index % 2 == 0)
                {
                    even++;
                }
                else
                {
                    odd++;
                }
            }
            
            n >>= 1;
            index++;
        }
        
        return new int[] { even, odd };
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
