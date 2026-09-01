# 3207. Maximum Points After Enemy Battles

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem
You have a starting amount of energy and face a list of enemies, each requiring a certain amount of energy to defeat. Defeating an enemy whose energy requirement is at most your current energy earns you 1 point and reduces your energy by that enemy's requirement; alternatively, if you have already earned at least 1 point, you may choose to "mark" an already-defeated (in spirit, previously available) enemy to instead gain back their energy value without earning additional points, effectively allowing you to recharge using the weakest enemy repeatedly. Determine the maximum number of points achievable.

## Approach
The key insight is that once you've earned your first point (by defeating the weakest enemy), you can indefinitely recharge using that same weakest enemy's energy value to defeat more enemies, effectively making the total usable energy equal to your starting energy plus the sum of all enemy energies, minus the minimum enemy energy (which must be "sacrificed" once as the recharge source, or handled via the formula given below). If the current energy is already less than the minimum enemy energy required, you cannot even score the first point, so the answer is 0. Otherwise, the maximum points achievable is the total combined usable energy divided by the minimum enemy energy (integer division), since each point costs at least that minimum amount once you're in "recharge mode."

## C# Solution
```csharp
public class Solution {
    public long MaximumPoints(int[] enemyEnergies, int currentEnergy) {
        int minEnergy = enemyEnergies.Min();
        if (currentEnergy < minEnergy)
            return 0;

        long total = currentEnergy;
        foreach (int e in enemyEnergies)
            total += e;

        return (total - minEnergy) / minEnergy;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
