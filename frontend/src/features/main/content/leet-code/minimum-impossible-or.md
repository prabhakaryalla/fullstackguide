# 2568. Minimum Impossible OR

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

You are given a 0-indexed integer array `nums`.

We say that an integer `x` is expressible from `nums` if there exist some integers `0 <= index_1 < index_2 < ... < index_k < nums.length` such that `nums[index_1] | nums[index_2] | ... | nums[index_k] == x`. In other words, an integer is expressible if it can be obtained by taking the bitwise OR of some subsequence of `nums`.

Return the minimum positive non-zero integer that is not expressible from `nums`.

### Example

```
Input: nums = [2,1]
Output: 4
Explanation:
1 is expressible (nums[1])
2 is expressible (nums[0])
3 is expressible (nums[0] | nums[1] = 3)
4 is not expressible

Input: nums = [5,3,2]
Output: 1
Explanation: 1 is not expressible from any OR combination
```

## Approach

The key insight: The minimum impossible OR value must be a power of 2 (i.e., a single bit set).

This is because:
- If all powers of 2 up to `2^k` are present in nums, we can form any number up to `2^(k+1) - 1` using OR
- The first power of 2 missing from nums is the answer

Algorithm:
1. Put all numbers from nums into a set
2. Check powers of 2 starting from 1: 1, 2, 4, 8, 16, ...
3. Return the first power of 2 not in the set

## C# Solution

```csharp
public class Solution
{
    public int MinImpossibleOR(int[] nums)
    {
        var set = new HashSet<int>(nums);
        
        for (int power = 1; power <= 1_000_000_000; power <<= 1)
        {
            if (!set.Contains(power))
                return power;
        }
        
        return 1 << 30; // Should never reach here given constraints
    }
}
```

## Complexity

- **Time:** O(n + log(max_value))
- **Space:** O(n) for the hash set
