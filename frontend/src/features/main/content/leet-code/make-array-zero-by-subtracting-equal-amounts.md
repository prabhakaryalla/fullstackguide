# 2403. Make Array Zero by Subtracting Equal Amounts

**Difficulty:** Easy
**Category:** Array, Hash Table, Simulation

## Problem

You are given a non-negative integer array `nums`. In one operation, you must:

- Choose a positive integer `x` such that `x` is less than or equal to the smallest non-zero element in `nums`.
- Subtract `x` from every positive element in `nums`.

Return the minimum number of operations to make every element in `nums` equal to 0.

### Example

```
Input: nums = [1,5,0,3,5]
Output: 3
Explanation:
- First operation: choose x = 1, nums becomes [0,4,0,2,4]
- Second operation: choose x = 2, nums becomes [0,2,0,0,2]
- Third operation: choose x = 2, nums becomes [0,0,0,0,0]
```

## Approach

The minimum number of operations equals the count of distinct positive values in the array. Each distinct positive value requires one operation to be reduced to the next smaller distinct value or to zero.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(int[] nums)
    {
        var distinct = new HashSet<int>();
        
        foreach (int num in nums)
        {
            if (num > 0)
            {
                distinct.Add(num);
            }
        }
        
        return distinct.Count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(k) where k is the number of distinct positive elements
