# 2815. Max Pair Sum in an Array

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

You are given a 0-indexed integer array `nums`. Find the maximum value of `nums[i] + nums[j]` where the maximum digit of `nums[i]` is equal to the maximum digit of `nums[j]` and `i != j`.

Return the maximum sum, or `-1` if no such pair exists.

### Example

```
Input: nums = [51,71,17,24,42]
Output: 88
Explanation: 
- Max digit of 51 is 5
- Max digit of 71 is 7
- Max digit of 17 is 7
- Max digit of 24 is 4
- Max digit of 42 is 4
Pairs with same max digit: (71,17) = 88, (24,42) = 66
Maximum is 88.
```

## Approach

1. For each number, find its maximum digit
2. Group numbers by their maximum digit using a hash map
3. For each group with at least 2 numbers, find the two largest numbers
4. Calculate their sum and track the global maximum

## C# Solution

```csharp
public class Solution
{
    public int MaxSum(int[] nums)
    {
        var maxDigitGroups = new Dictionary<int, List<int>>();
        
        foreach (int num in nums)
        {
            int maxDigit = GetMaxDigit(num);
            if (!maxDigitGroups.ContainsKey(maxDigit))
            {
                maxDigitGroups[maxDigit] = new List<int>();
            }
            maxDigitGroups[maxDigit].Add(num);
        }
        
        int result = -1;
        
        foreach (var group in maxDigitGroups.Values)
        {
            if (group.Count < 2)
                continue;
            
            group.Sort((a, b) => b.CompareTo(a));
            int sum = group[0] + group[1];
            result = Math.Max(result, sum);
        }
        
        return result;
    }
    
    private int GetMaxDigit(int num)
    {
        int maxDigit = 0;
        while (num > 0)
        {
            maxDigit = Math.Max(maxDigit, num % 10);
            num /= 10;
        }
        return maxDigit;
    }
}
```

## Complexity

- **Time:** O(n log n) in worst case (if all numbers have the same max digit and need sorting)
- **Space:** O(n) for the hash map
