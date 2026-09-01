# 1524. Number of Sub-arrays With Odd Sum

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Prefix Sum

## Problem

Given an array of integers `arr`, return the number of subarrays with an odd sum, modulo `10^9 + 7`.

### Example

```
Input: arr = [1,3,5]
Output: 4
```

## Approach

Track the running prefix sum's parity while scanning. Maintain two counters: how many prefix sums seen so far (including the empty prefix) are even, and how many are odd. At each position, the number of subarrays ending here with an odd sum equals the count of *opposite-parity* prefixes seen before — if the current prefix is even, pair it with previous odd prefixes, and vice versa. Accumulate this over the array.

## C# Solution

```csharp
public class Solution
{
    public int NumOfSubarrays(int[] arr)
    {
        const int Mod = 1_000_000_007;
        int evenCount = 1;
        int oddCount = 0;
        int prefixSum = 0;
        long result = 0;

        foreach (int num in arr)
        {
            prefixSum += num;

            if (prefixSum % 2 == 0)
            {
                result = (result + oddCount) % Mod;
                evenCount++;
            }
            else
            {
                result = (result + evenCount) % Mod;
                oddCount++;
            }
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
