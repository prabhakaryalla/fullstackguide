# 2237. Count Positions on Street With Required Brightness

**Difficulty:** Medium
**Category:** Array, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer `n` representing the number of positions on a street numbered from 0 to `n - 1`. You are also given a 2D array `lights` where `lights[i] = [position[i], range[i]]` indicates that there is a street light at position `position[i]` that lights up the area from `[max(0, position[i] - range[i]), min(n - 1, position[i] + range[i])]` (inclusive).

You are also given an integer array `requirement` where `requirement[i]` is the minimum brightness required at position `i`.

Return the number of positions on the street where the brightness is at least `requirement[i]`.

### Example

```
Input: n = 5, lights = [[0,1],[2,1],[3,2]], requirement = [0,2,1,4,1]
Output: 4
Explanation:
- Position 0: brightness = 1 (from light 0), requirement = 0 ✓
- Position 1: brightness = 2 (from lights 0 and 2), requirement = 2 ✓
- Position 2: brightness = 3, requirement = 1 ✓
- Position 3: brightness = 2, requirement = 4 ✗
- Position 4: brightness = 1, requirement = 1 ✓
Answer: 4 positions meet requirements
```

## Approach

Use a difference array to efficiently compute brightness at each position. For each light covering `[l, r]`, increment `diff[l]` and decrement `diff[r+1]`. Then compute prefix sums to get actual brightness values and count how many positions meet their requirements.

## C# Solution

```csharp
public class Solution
{
    public int MeetRequirement(int n, int[][] lights, int[] requirement)
    {
        int[] diff = new int[n + 1];
        
        foreach (var light in lights)
        {
            int pos = light[0], range = light[1];
            int left = Math.Max(0, pos - range);
            int right = Math.Min(n - 1, pos + range);
            diff[left]++;
            diff[right + 1]--;
        }
        
        int count = 0;
        int brightness = 0;
        
        for (int i = 0; i < n; i++)
        {
            brightness += diff[i];
            if (brightness >= requirement[i]) count++;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n + m) where m is the number of lights.
- **Space:** O(n) for the difference array.
