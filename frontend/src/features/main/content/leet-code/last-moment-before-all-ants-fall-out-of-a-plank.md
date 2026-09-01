# 1503. Last Moment Before All Ants Fall Out of a Plank

**Difficulty:** Medium
**Category:** Array, Simulation, Brainteaser

## Problem

We have a wooden plank of length `n` units. Some ants are walking on the plank, each moving with speed 1 unit per second, either to the left or right. When two ants moving in opposite directions meet at some point, they change their directions and continue moving. Return the moment when the last ant(s) fall out of the plank.

### Example

```
Input: n = 4, left = [4,3], right = [0,1]
Output: 4
```

## Approach

Two ants that collide and reverse direction are equivalent (in terms of *when* the plank becomes empty) to the ants passing through each other, since the ants are indistinguishable. So the last moment any ant falls off equals the maximum of: every left-moving ant's own position (time to reach 0), and every right-moving ant's distance to `n` (time to reach `n`).

## C# Solution

```csharp
public class Solution
{
    public int GetLastMoment(int n, int[] left, int[] right)
    {
        int result = 0;

        foreach (int position in left)
        {
            result = Math.Max(result, position);
        }

        foreach (int position in right)
        {
            result = Math.Max(result, n - position);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(l + r)` — one pass over each ant array.
- **Space:** `O(1)`.
