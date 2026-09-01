# 1558. Minimum Numbers of Function Calls to Make Target Array

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Greedy

## Problem

Starting from an array of zeros the same length as `nums`, you may repeatedly perform either of these operations on any single element: increment it by 1, or double every element in the entire array. Return the minimum total number of operations to turn the zero array into `nums`.

### Example

```
Input: nums = [1,5]
Output: 5
```

## Approach

Build each target value in binary, from the least significant bit up: every `1` bit requires an individual increment operation, and moving to the next bit position (for every number simultaneously) requires one global doubling operation. So for each number, count its set bits (each contributes one increment), and separately track the highest bit position across all numbers (each such "doubling round" contributes one global double operation, shared across all numbers at once).

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums)
    {
        int increments = 0;
        int maxBitLength = 0;

        foreach (int num in nums)
        {
            int value = num;
            int bitLength = 0;

            while (value > 0)
            {
                increments += value & 1;
                value >>= 1;
                bitLength++;
            }

            maxBitLength = Math.Max(maxBitLength, bitLength);
        }

        int doublings = maxBitLength > 0 ? maxBitLength - 1 : 0;
        return increments + doublings;
    }
}
```

## Complexity

- **Time:** `O(n log(maxValue))` — extracting bits from every number.
- **Space:** `O(1)`.
