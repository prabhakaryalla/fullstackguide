# 2214. Minimum Health to Beat Game

**Difficulty:** Medium
**Category:** Array, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are playing a game with `n` levels. Each level `i` has a damage value `damage[i]`. You have an `armor` that can reduce the damage of one hit by its armor value (can only be used once).

Your health starts at `h`. To beat the game, you must survive all levels. Return the minimum starting health `h` needed to beat the game.

### Example

```
Input: damage = [2,7,4,3], armor = 4
Output: 13
Explanation: Use armor on level 1 (reduces 7 to 3).
Total damage = 2 + 3 + 4 + 3 = 12.
Minimum health = 12 + 1 = 13.
```

## Approach

Greedy strategy: Use the armor on the level with maximum damage (up to the armor value).

1. Calculate total damage
2. Find the maximum damage level
3. Reduce total by min(max_damage, armor)
4. Minimum health = total_damage + 1

## C# Solution

```csharp
public class Solution
{
    public long MinimumHealth(int[] damage, int armor)
    {
        long totalDamage = 0;
        int maxDamage = 0;
        
        foreach (int d in damage)
        {
            totalDamage += d;
            maxDamage = Math.Max(maxDamage, d);
        }
        
        // Use armor on the level with maximum damage
        long damageReduced = Math.Min(maxDamage, armor);
        
        return totalDamage - damageReduced + 1;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of levels
- **Space:** O(1)
