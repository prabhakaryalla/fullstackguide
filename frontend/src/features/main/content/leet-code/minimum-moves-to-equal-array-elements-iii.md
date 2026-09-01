# 3736. Minimum Moves to Equal Array Elements III

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an integer array `nums`, in one move you may pick two different indices and increment one of them by 1 while decrementing the other by 1. Return the minimum number of moves required to make all elements equal, or -1 if it's impossible.

### Example

nums = [1,2,3] → average is 2; move 1 unit from index 2 to index 0: [2,2,2] using 1 move.

## Approach

Every move preserves the total sum, so equal elements are only reachable if `sum(nums)` is divisible by `n`; if not, return -1. Otherwise the target value is `avg = sum / n`, and since each move transfers exactly one unit from a surplus element to a deficit element, the minimum number of moves equals half the total absolute deviation from the average: `sum(|nums[i] - avg|) / 2`.

## C# Solution

```csharp
public class Solution 
{
    public long MinMoves(int[] nums) 
    {
        long sum = nums.Sum(x => (long)x);
        int n = nums.Length;
        if (sum % n != 0) return -1;

        long avg = sum / n;
        long totalDeviation = 0;
        foreach (int x in nums) 
        {
            totalDeviation += Math.Abs(x - avg);
        }
        return totalDeviation / 2;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
