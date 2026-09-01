# 2137. Pour Water Between Buckets to Make Water Levels Equal

**Difficulty:** Medium
**Category:** Array, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an array `buckets` where `buckets[i]` is the amount of water in the `i-th` bucket. You are also given an integer `loss`.

In one second, you can choose any two buckets and pour water from one to the other. When water is poured from bucket `i` to bucket `j`, the amount of water that arrives at bucket `j` is `(1 - loss / 100)` times the amount poured.

Return the maximum amount of water that can be in any single bucket after performing the operations optimally for infinitely many seconds.

### Example

```
Input: buckets = [1,2,3,4], loss = 50
Output: 6.0
Explanation: We can pour all water into bucket 3 to get approximately 6 units.
```

## Approach

Use binary search to find the maximum water level achievable in a single bucket. For each candidate level, check if it's possible to achieve that level by pouring water from other buckets while accounting for loss.

The check function verifies if a target water level is achievable by calculating how much water can be collected from buckets with more than the target amount.

## C# Solution

```csharp
public class Solution
{
    public double MaxWater(int[] buckets, int loss)
    {
        double lossRate = 1.0 - loss / 100.0;
        double left = 0;
        double right = buckets.Sum();
        
        for (int iter = 0; iter < 100; iter++)
        {
            double mid = (left + right) / 2.0;
            
            if (CanAchieve(buckets, mid, lossRate))
                left = mid;
            else
                right = mid;
        }
        
        return left;
    }
    
    private bool CanAchieve(int[] buckets, double target, double lossRate)
    {
        double surplus = 0;
        double deficit = 0;
        
        foreach (int bucket in buckets)
        {
            if (bucket > target)
                surplus += (bucket - target) * lossRate;
            else
                deficit += target - bucket;
        }
        
        return surplus >= deficit;
    }
}
```

## Complexity

- **Time:** O(n * log(maxWater)) where n is number of buckets
- **Space:** O(1)
