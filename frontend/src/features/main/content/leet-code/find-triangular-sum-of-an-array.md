# 2221. Find Triangular Sum of an Array

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

You are given a 0-indexed integer array `nums`, where `nums[i]` is a digit between 0 and 9 (inclusive).

The triangular sum of `nums` is the value of the only element present in `nums` after the following process terminates:
1. Let `nums` comprise of `n` elements. If `n == 1`, end the process. Otherwise, create a new array `newNums` of length `n - 1`
2. For each index `i`, where `0 <= i < n - 1`, assign `newNums[i] = (nums[i] + nums[i+1]) % 10`
3. Replace `nums` with `newNums`
4. Repeat the entire process starting from step 1

Return the triangular sum of `nums`.

### Example

```
Input: nums = [1,2,3,4,5]
Output: 8
Explanation:
[1,2,3,4,5]
[3,5,7,9]
[8,2,6]
[0,8]
[8]
```

## Approach

Simulate the process: repeatedly create new arrays by summing adjacent elements modulo 10, until only one element remains.

## C# Solution

```csharp
public class Solution
{
    public int TriangularSum(int[] nums)
    {
        int[] current = nums;
        
        while (current.Length > 1)
        {
            int[] next = new int[current.Length - 1];
            
            for (int i = 0; i < next.Length; i++)
            {
                next[i] = (current[i] + current[i + 1]) % 10;
            }
            
            current = next;
        }
        
        return current[0];
    }
}
```

## Complexity

- **Time:** O(n^2), where n is the length of the array
- **Space:** O(n), for the intermediate arrays
