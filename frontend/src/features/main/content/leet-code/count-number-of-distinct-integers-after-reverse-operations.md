# 2442. Count Number of Distinct Integers After Reverse Operations

**Difficulty:** Medium
**Category:** Array, Hash Table, Math

## Problem

You are given an array `nums` consisting of positive integers. You have to:

1. Take each integer in the array and reverse its digits
2. Add the reversed integers to the array
3. Return the number of distinct integers in the resulting array

Note: The leading zeros in reversed integers are removed.

### Example

```
Input: nums = [1,13,10,12,31]
Output: 6
Explanation: After reversing: [1,13,10,12,31,1,31,01,21,13]
Simplified: [1,13,10,12,31,1,31,1,21,13]
Distinct: {1,13,10,12,31,21} = 6 distinct integers
```

## Approach

Use a hash set to track distinct numbers. Add all original numbers, then reverse each number and add the reversed version. The set automatically handles duplicates.

## C# Solution

```csharp
public class Solution
{
    public int CountDistinctIntegers(int[] nums)
    {
        var set = new HashSet<int>();
        
        foreach (int num in nums)
        {
            set.Add(num);
            set.Add(Reverse(num));
        }
        
        return set.Count;
    }
    
    private int Reverse(int num)
    {
        int result = 0;
        while (num > 0)
        {
            result = result * 10 + (num % 10);
            num /= 10;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n * log m) where n is array length and m is the maximum number value (for digit reversal)
- **Space:** O(n) for the hash set
