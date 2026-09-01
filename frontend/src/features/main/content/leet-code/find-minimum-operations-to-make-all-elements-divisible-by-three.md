# 3190. Find Minimum Operations to Make All Elements Divisible by Three

**Difficulty:** Easy
**Category:** Array, Math

## Problem
Given an integer array `nums`, in one operation you may add 1 or subtract 1 from any single element. Return the minimum total number of operations required to make every element in the array divisible by 3.

## Approach
Each element only ever needs at most one operation to become a multiple of 3: if its remainder mod 3 is 1, subtracting 1 makes it divisible; if its remainder is 2, adding 1 makes it divisible; if its remainder is already 0, no operation is needed. So the answer is simply the count of elements whose value is not already a multiple of 3.

## C# Solution
```csharp
public class Solution {
    public int MinimumOperations(int[] nums) {
        int count = 0;
        foreach (int num in nums)
            if (num % 3 != 0)
                count++;
        return count;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
