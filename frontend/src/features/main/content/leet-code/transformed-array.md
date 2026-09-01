# 3379. Transformed Array

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given a circular array `nums`, build a `result` array where `result[i]` equals the element found by moving `nums[i]` steps (forward if positive, backward if negative) from index `i`, wrapping around the array. All jumps are computed using the **original** array.

### Example

Input: `nums = [3,-2,1,1]`
Output: `[1,1,1,3]` — e.g., index 0 jumps 3 steps forward (wrapping) to index 3, whose value is 1.

## Approach

For each index `i`, compute the destination index as `((i + nums[i]) % n + n) % n` to correctly handle negative wraps, then read the value from the original array at that destination.

## C# Solution

```csharp
public class Solution 
{
    public int[] ConstructTransformedArray(int[] nums) 
    {
        int n = nums.Length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) 
        {
            int dest = ((i + nums[i]) % n + n) % n;
            result[i] = nums[dest];
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
