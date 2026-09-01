# 2398. Maximum Number of Robots Within Budget

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window, Heap (Priority Queue), Prefix Sum

## Problem

You have `n` robots. You are given two 0-indexed integer arrays, `chargeTimes` and `runningCosts`, both of length `n`. The `i-th` robot costs `chargeTimes[i]` units to charge and costs `runningCosts[i]` units to run. You are also given an integer `budget`.

The total cost of running `k` chosen robots is equal to `max(chargeTimes) + k * sum(runningCosts)` for the chosen robots.

Return the maximum number of consecutive robots you can run such that the total cost does not exceed `budget`.

### Example

```
Input: chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
Output: 3
Explanation: Choose robots at indices 1, 2, and 3.
Total cost = max(6, 1, 3) + 3 * (1 + 3 + 4) = 6 + 3 * 8 = 30 > 25 (doesn't work)
Try indices 0, 1, 2: max(3,6,1) + 3 * (2+1+3) = 6 + 18 = 24 ≤ 25 ✓
```

## Approach

Use a sliding window with a monotonic deque to efficiently track the maximum charge time in the current window. Maintain a running sum of costs. Expand the window when possible, and shrink from the left when the budget is exceeded.

## C# Solution

```csharp
public class Solution
{
    public int MaximumRobots(int[] chargeTimes, int[] runningCosts, long budget)
    {
        int n = chargeTimes.Length;
        int maxRobots = 0;
        LinkedList<int> deque = new LinkedList<int>(); // Indices in decreasing order of chargeTimes
        long runningSum = 0;
        int left = 0;
        
        for (int right = 0; right < n; right++)
        {
            // Maintain monotonic deque for max chargeTimes
            while (deque.Count > 0 && chargeTimes[deque.Last.Value] <= chargeTimes[right])
            {
                deque.RemoveLast();
            }
            deque.AddLast(right);
            
            runningSum += runningCosts[right];
            
            // Shrink window if budget exceeded
            while (deque.Count > 0 && 
                   chargeTimes[deque.First.Value] + (long)(right - left + 1) * runningSum > budget)
            {
                if (deque.First.Value == left)
                {
                    deque.RemoveFirst();
                }
                runningSum -= runningCosts[left];
                left++;
            }
            
            maxRobots = Math.Max(maxRobots, right - left + 1);
        }
        
        return maxRobots;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of robots
- **Space:** O(n) for the deque
