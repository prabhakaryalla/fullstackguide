# 2342. Max Sum of a Pair With Equal Sum of Digits

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting, Heap (Priority Queue)

## Problem

You are given a 0-indexed array `nums` consisting of positive integers. You can choose two indices `i` and `j` such that `i != j`, and the sum of digits of `nums[i]` is equal to that of `nums[j]`.

Return the maximum value of `nums[i] + nums[j]` that you can obtain over all possible indices `i` and `j` that satisfy the conditions. If no such pair exists, return `-1`.

### Example

```
Input: nums = [18,43,36,13,7]
Output: 54
Explanation: 
18 has digit sum 9, 43 has digit sum 7, 36 has digit sum 9, 13 has digit sum 4, 7 has digit sum 7.
The maximum pair is (18, 36) with sum 54 where both have digit sum 9.
```

## Approach

Calculate the digit sum for each number. Use a hash table to group numbers by their digit sum. For each digit sum group, if there are at least 2 numbers, find the two largest values and compute their sum. Track the maximum across all groups.

## C# Solution

```csharp
public class Solution
{
    public int MaximumSum(int[] nums)
    {
        Dictionary<int, List<int>> digitSumMap = new Dictionary<int, List<int>>();
        
        foreach (int num in nums)
        {
            int digitSum = GetDigitSum(num);
            if (!digitSumMap.ContainsKey(digitSum))
            {
                digitSumMap[digitSum] = new List<int>();
            }
            digitSumMap[digitSum].Add(num);
        }
        
        int maxSum = -1;
        
        foreach (var list in digitSumMap.Values)
        {
            if (list.Count >= 2)
            {
                list.Sort((a, b) => b - a);
                maxSum = Math.Max(maxSum, list[0] + list[1]);
            }
        }
        
        return maxSum;
    }
    
    private int GetDigitSum(int num)
    {
        int sum = 0;
        while (num > 0)
        {
            sum += num % 10;
            num /= 10;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n log n) in worst case if all numbers have same digit sum
- **Space:** O(n) for the hash table
