# 2293. Min Max Game

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given a 0-indexed integer array `nums` whose length is a power of 2. Apply the following algorithm until `nums` has length 1:
1. Create a new array of length `n/2`.
2. For every even index `i`, set `newNums[i/2] = min(nums[i], nums[i+1])`.
3. For every odd index `i`, set `newNums[i/2] = max(nums[i], nums[i+1])`.
4. Replace `nums` with `newNums`.

Return the last remaining number.

### Example

```
Input: nums = [1,3,5,2,4,8,2,2]
Output: 1
Explanation:
Round 1: [min(1,3), max(5,2), min(4,8), max(2,2)] = [1,5,4,2]
Round 2: [min(1,5), max(4,2)] = [1,4]
Round 3: [min(1,4)] = [1]
```

## Approach

Simulate the process: repeatedly create a new array half the size, alternating between min and max operations based on the index.

## C# Solution

```csharp
public class Solution
{
    public int MinMaxGame(int[] nums)
    {
        while (nums.Length > 1)
        {
            int n = nums.Length;
            int[] newNums = new int[n / 2];
            
            for (int i = 0; i < n / 2; i++)
            {
                if (i % 2 == 0)
                {
                    newNums[i] = Math.Min(nums[2 * i], nums[2 * i + 1]);
                }
                else
                {
                    newNums[i] = Math.Max(nums[2 * i], nums[2 * i + 1]);
                }
            }
            
            nums = newNums;
        }
        
        return nums[0];
    }
}
```

## Complexity

- **Time:** O(n) since we process n + n/2 + n/4 + ... = O(n) elements total.
- **Space:** O(n) for the new arrays.
