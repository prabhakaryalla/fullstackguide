# 3028. Ant on the Boundary

**Difficulty:** Easy
**Category:** Array, Prefix Sum, Simulation

## Problem

An ant starts at the boundary point `0` on a number line. You are given an array `nums` where each element is the ant's displacement for that step (positive means move right, negative means move left). Excluding the starting position, return the number of times the ant returns to the boundary (position `0`) after each step.

### Example

```
Input: nums = [2,3,-5,4]
Output: 1
Explanation: Positions after each step: 2, 5, 0, 4. The ant returns to 0 exactly once (after the third step).
```

## Approach

Maintain a running prefix sum representing the ant's current position, updating it after each step; every time the prefix sum equals `0`, increment the answer.

## C# Solution

```csharp
public class Solution {
    public int ReturnToBoundaryCount(int[] nums) {
        int ans = 0;
        int prefix = 0;
        foreach (int num in nums) {
            prefix += num;
            if (prefix == 0)
                ans++;
        }
        return ans;
    }
}
```

## Complexity

- Time: O(n) — a single pass through the array.
- Space: O(1).
