# 2778. Sum of Squares of Special Elements

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 1-indexed integer array `nums` of length `n`. An element `nums[i]` of `nums` is called special if `i` divides `n`, i.e. `n % i == 0`.

Return the sum of the squares of all special elements of `nums`.

### Example

```
Input: nums = [1,2,3,4]
Output: 21
Explanation: Special indices are 1, 2, 4. Sum = 1² + 2² + 4² = 1 + 4 + 16 = 21
```

## Approach

Iterate through all indices from 1 to n. Check if `n % i == 0`, and if so, add the square of `nums[i-1]` to the result (converting to 0-indexed).

## C# Solution

```csharp
public class Solution
{
    public int SumOfSquares(int[] nums)
    {
        int n = nums.Length;
        int sum = 0;
        
        for (int i = 1; i <= n; i++)
        {
            if (n % i == 0)
            {
                sum += nums[i - 1] * nums[i - 1];
            }
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
