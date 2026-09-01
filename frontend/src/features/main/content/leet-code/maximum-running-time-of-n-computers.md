# 2141. Maximum Running Time of N Computers

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Sorting

## Problem

You have `n` computers and an array `batteries` where `batteries[i]` is the number of minutes the `i-th` battery can run a computer. You can use multiple batteries for one computer, inserting a new battery when one runs out.

However, you cannot use the same battery in more than one computer at a time. Return the maximum number of minutes you can run all `n` computers simultaneously.

### Example

```
Input: n = 2, batteries = [3,3,3]
Output: 4
Explanation: Initially run both computers on battery 0 and 1. After 3 minutes, battery 0 is depleted, replace with battery 2. One more minute passes before both batteries are depleted.
```

## Approach

Use binary search on the answer (running time). For a given time `t`, check if we can run all `n` computers for `t` minutes:
- Total power needed: `n * t`
- Available power: sum of `min(battery, t)` for each battery

The key insight: if a battery has more than `t` minutes, we can only use `t` from it (since we can't save surplus for later). The greedy strategy is to cap each battery at `t` and check if the total meets our needs.

## C# Solution

```csharp
public class Solution
{
    public long MaxRunTime(int n, int[] batteries)
    {
        long left = 1;
        long right = (long)batteries.Sum() / n;
        
        while (left < right)
        {
            long mid = (left + right + 1) / 2;
            
            if (CanRun(n, batteries, mid))
                left = mid;
            else
                right = mid - 1;
        }
        
        return left;
    }
    
    private bool CanRun(int n, int[] batteries, long time)
    {
        long totalPower = 0;
        
        foreach (int battery in batteries)
        {
            totalPower += Math.Min(battery, time);
        }
        
        return totalPower >= (long)n * time;
    }
}
```

## Complexity

- **Time:** O(m * log(sum/n)) where m is number of batteries
- **Space:** O(1)
