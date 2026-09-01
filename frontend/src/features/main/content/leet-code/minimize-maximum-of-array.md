# 2439. Minimize Maximum of Array

**Difficulty:** Medium
**Category:** Array, Binary Search, Dynamic Programming, Greedy, Prefix Sum

## Problem

You are given a 0-indexed array `nums` of `n` non-negative integers. In one operation, you can:

- Choose an integer `i` where `1 <= i < n` and `nums[i] > 0`
- Decrease `nums[i]` by 1
- Increase `nums[i - 1]` by 1

Return the minimum possible value of the maximum integer in `nums` after performing any number of operations.

### Example

```
Input: nums = [3,7,1,6]
Output: 5
Explanation: 
One set of operations: [3,7,1,6] -> [4,6,1,6] -> [5,5,1,6] -> [5,5,2,5] -> [5,5,3,4] -> [5,5,4,3] -> [5,5,5,2]
The maximum becomes 5.
```

## Approach

The key insight is that values can only flow leftward. For each position `i`, the maximum achievable value is limited by the average of the prefix sum up to that position (since we can distribute values evenly). Use binary search on the answer: for a candidate maximum `mid`, check if it's achievable by simulating leftward transfers.

Alternatively, iterate from left to right tracking cumulative sums and ensuring each position doesn't exceed the running average ceiling.

## C# Solution

```csharp
public class Solution
{
    public int MinimizeArrayValue(int[] nums)
    {
        long sum = 0;
        long result = 0;
        
        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
            long avg = (sum + i) / (i + 1); // ceiling of sum/(i+1)
            result = Math.Max(result, avg);
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(1)
