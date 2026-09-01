# 1013. Partition Array Into Three Parts With Equal Sum

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array of integers `arr`, return `true` if it's possible to partition it into three non-empty contiguous parts with equal sums.

### Example

```
Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]
Output: true
Explanation: [0,2,1], [-6,6,-7], [9,1,2,0,1] each sum to 3.
```

## Approach

The total sum must be divisible by `3`; otherwise no equal-thirds split can exist. Walk the array accumulating a running sum, and every time it reaches `total / 3`, count that as a completed partition and reset the running sum to `0`. If at least three such partitions are found, the remaining elements (if any) simply belong to the last partition, so the array can be split.

## C# Solution

```csharp
public class Solution
{
    public bool CanThreePartsEqualSum(int[] arr)
    {
        int total = arr.Sum();
        if (total % 3 != 0) return false;

        int target = total / 3;
        int count = 0;
        int runningSum = 0;

        foreach (var num in arr)
        {
            runningSum += num;
            if (runningSum == target)
            {
                count++;
                runningSum = 0;
            }
        }

        return count >= 3;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass to sum and a single pass to partition.
- **Space:** `O(1)`.
