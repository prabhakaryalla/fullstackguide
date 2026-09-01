# 2681. Power of Heroes

**Difficulty:** Hard
**Category:** Array, Math, Sorting, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` representing the strength of heroes.

The power of a group of heroes is defined as:

- Let `maxStrength` be the maximum strength among the group.
- Let `minStrength` be the minimum strength among the group.
- The power of the group is `maxStrength * maxStrength * minStrength`.

Return the sum of the power of all possible non-empty groups. Since the answer may be very large, return it modulo `10^9 + 7`.

### Example

```
Input: nums = [2,1,4]
Output: 141
Explanation: All possible groups and their power:
[2]: 2 * 2 * 2 = 8
[1]: 1 * 1 * 1 = 1
[4]: 4 * 4 * 4 = 64
[2,1]: 2 * 2 * 1 = 4
[2,4]: 4 * 4 * 2 = 32
[1,4]: 4 * 4 * 1 = 16
[2,1,4]: 4 * 4 * 1 = 16
Sum = 8 + 1 + 64 + 4 + 32 + 16 + 16 = 141

Input: nums = [1,1,1]
Output: 7
```

## Approach

Sort the array so we can efficiently compute contributions. For each element as the maximum, calculate how many subsets include it and sum their contributions based on minimum values. Use prefix sums to optimize the calculation.

## C# Solution

```csharp
public class Solution
{
    public int SumOfPower(int[] nums)
    {
        const int MOD = 1000000007;
        Array.Sort(nums);
        int n = nums.Length;
        
        long result = 0;
        long prefixSum = 0;
        
        for (int i = 0; i < n; i++)
        {
            long num = nums[i];
            long contribution = (num * num % MOD) * ((num + prefixSum) % MOD) % MOD;
            result = (result + contribution) % MOD;
            prefixSum = (prefixSum * 2 + num) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1) excluding the input
