# 2749. Minimum Operations to Make the Integer Zero

**Difficulty:** Medium
**Category:** Math, Bit Manipulation, Greedy

## Problem

You are given two integers `num1` and `num2`. In one operation, you can choose integer `i` in the range `[0, 60]` and subtract `2^i + num2` from `num1`.

Return the minimum number of operations needed to make `num1` equal to 0. If it is impossible, return `-1`.

### Example

```
Input: num1 = 3, num2 = -2
Output: 3
Explanation: Operation 1: choose i=0, num1 = 3 - (1 - 2) = 4
Operation 2: choose i=0, num1 = 4 - (1 - 2) = 5  
Operation 3: choose i=2, num1 = 5 - (4 - 2) = 3... need to recalculate.
```

## Approach

For each possible number of operations `k`, check if we can make `num1` equal to 0. After `k` operations, `num1 - k * num2 = sum of k powers of 2`. Check if this sum is achievable: it needs at least `popcount` bits set and at most `k` bits (since sum of k powers ≥ k).

## C# Solution

```csharp
public class Solution
{
    public int MakeTheIntegerZero(int num1, int num2)
    {
        for (long k = 1; k <= 60; k++)
        {
            long target = num1 - k * num2;
            
            if (target < 0) continue;
            
            int popcount = CountBits(target);
            
            if (popcount <= k && k <= target)
            {
                return (int)k;
            }
        }
        
        return -1;
    }
    
    private int CountBits(long n)
    {
        int count = 0;
        while (n > 0)
        {
            count += (int)(n & 1);
            n >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(60 × log(num1))
- **Space:** O(1)
