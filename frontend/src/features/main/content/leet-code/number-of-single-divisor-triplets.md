# 2198. Number of Single Divisor Triplets

**Difficulty:** Medium
**Category:** Array, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer array `nums`. A triplet `(i, j, k)` is called a single divisor triplet if:
- `0 <= i < j < k < nums.length`
- The sum `nums[i] + nums[j] + nums[k]` is divisible by exactly one of `nums[i]`, `nums[j]`, or `nums[k]`

Return the number of single divisor triplets.

### Example

```
Input: nums = [4,6,7,3,2]
Output: 12
```

## Approach

Brute force: Check all triplets and for each triplet, check how many of the three numbers divide the sum.

For each triplet (i, j, k):
1. Calculate sum = nums[i] + nums[j] + nums[k]
2. Count how many of nums[i], nums[j], nums[k] divide sum
3. If count == 1, increment result

## C# Solution

```csharp
public class Solution
{
    public long SingleDivisorTriplet(int[] nums)
    {
        long count = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                for (int k = j + 1; k < n; k++)
                {
                    int sum = nums[i] + nums[j] + nums[k];
                    int divisors = 0;
                    
                    if (sum % nums[i] == 0) divisors++;
                    if (sum % nums[j] == 0) divisors++;
                    if (sum % nums[k] == 0) divisors++;
                    
                    if (divisors == 1)
                    {
                        count++;
                    }
                }
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n^3), checking all triplets
- **Space:** O(1)
