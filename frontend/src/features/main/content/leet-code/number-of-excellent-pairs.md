# 2354. Number of Excellent Pairs

**Difficulty:** Hard
**Category:** Array, Hash Table, Binary Search, Bit Manipulation

## Problem

You are given a 0-indexed positive integer array `nums` and a positive integer `k`.

A pair of numbers `(num1, num2)` is called excellent if the following conditions are satisfied:
- Both the numbers `num1` and `num2` exist in the array `nums`.
- The sum of the number of set bits in `num1 OR num2` and `num1 AND num2` is greater than or equal to `k`, where `OR` is the bitwise OR operation and `AND` is the bitwise AND operation.

Return the number of distinct excellent pairs.

Two pairs `(a, b)` and `(c, d)` are considered distinct if either `a != c` or `b != d`.

### Example

```
Input: nums = [1,2,3,1], k = 3
Output: 5
Explanation: The excellent pairs are:
- (3, 3): (3 AND 3) has 2 set bits, (3 OR 3) has 2 set bits. Sum = 4 >= 3.
- (2, 3) and (3, 2): (2 AND 3) has 1 set bit, (2 OR 3) has 2 set bits. Sum = 3 >= 3.
- (1, 3) and (3, 1): (1 AND 3) has 1 set bit, (1 OR 3) has 2 set bits. Sum = 3 >= 3.
```

## Approach

Key insight: for any two numbers a and b, `bits(a OR b) + bits(a AND b) = bits(a) + bits(b)`. So we need pairs where `bits(a) + bits(b) >= k`. Count bit counts for each unique number, then for each pair of bit counts, multiply their frequencies if the sum meets the threshold.

## C# Solution

```csharp
public class Solution
{
    public long CountExcellentPairs(int[] nums, int k)
    {
        HashSet<int> uniqueNums = new HashSet<int>(nums);
        Dictionary<int, int> bitCountFreq = new Dictionary<int, int>();
        
        foreach (int num in uniqueNums)
        {
            int bitCount = CountBits(num);
            if (!bitCountFreq.ContainsKey(bitCount))
            {
                bitCountFreq[bitCount] = 0;
            }
            bitCountFreq[bitCount]++;
        }
        
        List<int> bitCounts = new List<int>(bitCountFreq.Keys);
        bitCounts.Sort();
        
        long result = 0;
        
        foreach (int bc1 in bitCounts)
        {
            foreach (int bc2 in bitCounts)
            {
                if (bc1 + bc2 >= k)
                {
                    result += (long)bitCountFreq[bc1] * bitCountFreq[bc2];
                }
            }
        }
        
        return result;
    }
    
    private int CountBits(int num)
    {
        int count = 0;
        while (num > 0)
        {
            count += num & 1;
            num >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n + m^2) where n is unique numbers count and m is max bit count (≤ 32)
- **Space:** O(m) for the bit count frequency map
