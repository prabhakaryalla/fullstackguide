# 2731. Movement of Robots

**Difficulty:** Medium
**Category:** Array, Math, Sorting, Prefix Sum

## Problem

Some robots are standing on an infinite number line with their initial coordinates given by a 0-indexed integer array `nums` and will start moving once given the command to move. The robots will move a unit distance each second.

You are given a string `s` denoting the direction in which robots will move on command. `'L'` means the robot will move towards the left side or negative side of the number line, whereas `'R'` means the robot will move towards the right side or positive side of the number line.

If two robots collide, they will start moving in opposite directions.

Return the sum of distances between all pairs of robots `d` seconds after the command.

### Example

```
Input: nums = [-2,0,2], s = "RLL", d = 3
Output: 8
```

## Approach

Key insight: robots pass through each other, so treat them as if they don't collide. After `d` seconds, each robot's position is `nums[i] + d * direction[i]`. Sort positions and calculate pairwise distances using prefix sums.

## C# Solution

```csharp
public class Solution
{
    public int SumDistance(int[] nums, string s, int d)
    {
        const int MOD = 1000000007;
        int n = nums.Length;
        var positions = new long[n];
        
        for (int i = 0; i < n; i++)
        {
            long dir = s[i] == 'R' ? 1 : -1;
            positions[i] = nums[i] + dir * d;
        }
        
        Array.Sort(positions);
        
        long result = 0;
        long prefixSum = 0;
        
        for (int i = 0; i < n; i++)
        {
            result = (result + (long)i * positions[i] - prefixSum) % MOD;
            prefixSum = (prefixSum + positions[i]) % MOD;
        }
        
        return (int)((result + MOD) % MOD);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
