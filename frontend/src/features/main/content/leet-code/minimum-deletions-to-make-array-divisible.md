# 2344. Minimum Deletions to Make Array Divisible

**Difficulty:** Hard
**Category:** Array, Math, Number Theory, Sorting, Heap (Priority Queue)

## Problem

You are given two positive integer arrays `nums` and `numsDivide`. You can delete any number of elements from `nums`.

Return the minimum number of deletions such that the smallest element in `nums` divides all the elements of `numsDivide`. If this is not possible, return `-1`.

Note that an integer `x` divides `y` if `y % x == 0`.

### Example

```
Input: nums = [2,3,2,4,3], numsDivide = [9,6,9,3,15]
Output: 2
Explanation: Delete 2 and 4 from nums. The smallest element is 3, which divides all elements in numsDivide.
```

## Approach

Find the GCD of all elements in numsDivide — the answer must divide this GCD. Sort nums and iterate to find the first element that divides the GCD. The number of deletions is the count of elements before this element. If no such element exists, return -1.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums, int[] numsDivide)
    {
        int gcd = numsDivide[0];
        foreach (int num in numsDivide)
        {
            gcd = GCD(gcd, num);
        }
        
        Array.Sort(nums);
        
        for (int i = 0; i < nums.Length; i++)
        {
            if (gcd % nums[i] == 0)
            {
                return i;
            }
        }
        
        return -1;
    }
    
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n log n + m * log(max)) where n is nums length, m is numsDivide length
- **Space:** O(1) excluding sort space
