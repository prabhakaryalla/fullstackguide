# 2654. Minimum Number of Operations to Make All Array Elements Equal to 1

**Difficulty:** Medium
**Category:** Array, Math, Number Theory, Greedy

## Problem

You are given a positive integer array `nums`. You can perform the following operation any number of times:

Choose two adjacent elements and replace them with their greatest common divisor (GCD).

Return the minimum number of operations needed to make all elements in the array equal to 1. If it is impossible to make all elements equal to 1, return -1.

### Example

```
Input: nums = [2,6,3,4]
Output: 4
Explanation: One sequence of operations: [2,6,3,4] -> [2,3,3,4] -> [1,3,4] -> [1,1,4] -> [1,1,1].

Input: nums = [2,10,6,14]
Output: -1
Explanation: It is impossible to make all elements equal to 1 because GCD of any subset will always be even.
```

## Approach

First, check if the array already contains any 1s. If so, the answer is the count of non-1 elements.

If no 1s exist, check if it's possible to create a 1 by finding the shortest subarray whose GCD is 1. If such a subarray exists, we can create a 1, then propagate it to all other elements.

If the GCD of the entire array is greater than 1, it's impossible.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums)
    {
        int n = nums.Length;
        int onesCount = nums.Count(x => x == 1);
        
        if (onesCount > 0)
        {
            return n - onesCount;
        }
        
        int minOps = int.MaxValue;
        
        for (int i = 0; i < n; i++)
        {
            int gcd = nums[i];
            for (int j = i + 1; j < n; j++)
            {
                gcd = GCD(gcd, nums[j]);
                if (gcd == 1)
                {
                    minOps = Math.Min(minOps, j - i);
                    break;
                }
            }
        }
        
        if (minOps == int.MaxValue)
        {
            return -1;
        }
        
        return minOps + n - 1;
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

- **Time:** O(n^2 * log(max(nums)))
- **Space:** O(1)
