# 477. Total Hamming Distance

**Difficulty:** Medium
**Category:** Array, Math, Bit Manipulation

## Problem

Given an integer array `nums`, return the sum of the Hamming distances between all pairs of the integers in the array.

### Example

```
Input: nums = [4,14,2]
Output: 6
```

### Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^9`

## Approach

Instead of comparing every pair directly, process one bit position at a time. For a given bit, if `k` numbers have that bit set and `n - k` don't, every set/unset pair contributes exactly one differing bit, giving `k * (n - k)` pairs at that position. Summing this over all 32 bit positions gives the total Hamming distance across all pairs.

## C# Solution

```csharp
public class Solution
{
    public int TotalHammingDistance(int[] nums)
    {
        int total = 0;
        int n = nums.Length;

        for (int bit = 0; bit < 32; bit++)
        {
            int onesCount = 0;
            foreach (var num in nums)
                onesCount += (num >> bit) & 1;

            total += onesCount * (n - onesCount);
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(32n)`.
- **Space:** `O(1)`.
