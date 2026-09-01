# 2917. Find the K-or of an Array

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

Given an integer array `nums` and an integer `k`, return the K-or of the array. The K-or is a number whose i-th bit is 1 if and only if at least `k` numbers in `nums` have their i-th bit set to 1.

### Example

```
Input: nums = [7,12,9,8,9,15], k = 4
Output: 9
Explanation: 
Bit 0: 5 numbers have it (7,9,9,15) - included (>=4)
Bit 1: 2 numbers have it - not included (<4)
Bit 2: 3 numbers have it - not included (<4)
Bit 3: 4 numbers have it (8,9,9,15) - included (>=4)
Result: bit 0 and bit 3 set = 1001 binary = 9
```

## Approach

For each bit position (0 to 31), count how many numbers in the array have that bit set. If the count is at least `k`, set that bit in the result.

## C# Solution

```csharp
public class Solution 
{
    public int FindKOr(int[] nums, int k) 
    {
        int result = 0;
        
        for (int bit = 0; bit < 31; bit++) 
        {
            int count = 0;
            int mask = 1 << bit;
            
            foreach (int num in nums) 
            {
                if ((num & mask) != 0) 
                {
                    count++;
                }
            }
            
            if (count >= k) 
            {
                result |= mask;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * 31) = O(n)
- **Space:** O(1)
