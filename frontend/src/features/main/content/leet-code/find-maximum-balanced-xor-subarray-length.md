# 3755. Find Maximum Balanced XOR Subarray Length

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation, Prefix Sum

## Problem

Given an integer array `nums`, return the length of the longest subarray whose bitwise XOR is `0` and which contains an equal number of even and odd numbers. If no such subarray exists, return `0`.

### Example

Input: `nums = [3,1,3,2,0]`
Output: `4`

The subarray `[1,3,2,0]` has XOR `1^3^2^0 = 0` and contains 2 even and 2 odd numbers.

## Approach

Track a running prefix XOR and a running "balance" (`+1` for odd, `-1` for even). Record in a hash map the earliest index where each `(xor, balance)` pair first occurs (starting with `(0,0)` at index `-1`). Whenever the same pair reappears, the subarray between the two indices has XOR `0` and equal even/odd counts; track the maximum such length.

## C# Solution

```csharp
public class Solution 
{
    public int MaxBalancedSubarrayLength(int[] nums) 
    {
        var first = new Dictionary<(int, int), int>();
        first[(0, 0)] = -1;
        int xorVal = 0, balance = 0, best = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            xorVal ^= nums[i];
            balance += (nums[i] % 2 != 0) ? 1 : -1;
            var key = (xorVal, balance);
            if (first.TryGetValue(key, out int idx))
            {
                best = Math.Max(best, i - idx);
            }
            else
            {
                first[key] = i;
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
