# 3259. Maximum Energy Boost From Two Drinks

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem
Over `n` hours, you must drink exactly one energy drink per hour, choosing between drink A or drink B, each providing a known energy boost for that hour. However, switching from one drink type to the other requires skipping a full hour immediately afterward (losing that hour's potential boost from either drink) as a "cooldown." Maximize the total energy boost over the `n` hours.

## Approach
Use dynamic programming tracking two running states: `dpA`, the maximum total boost achievable if you end the current hour having just had drink A, and `dpB`, the equivalent for drink B. For each hour, the new `dpA` is the maximum of either continuing with A (`dpA + energyDrinkA[i]`) or switching from B (paying the implicit cooldown penalty by using the previous `dpB` value, which already accounts for the hour before the switch), and similarly for `dpB`. This formulation naturally encodes the "switch costs a skipped hour" rule because using the other drink's prior value effectively means the current hour's contribution from the other type isn't being added twice. The final answer is the maximum of `dpA` and `dpB` after processing all hours.

## C# Solution
```csharp
public class Solution {
    public long MaxEnergyBoost(int[] energyDrinkA, int[] energyDrinkB) {
        long dpA = 0;
        long dpB = 0;

        for (int i = 0; i < energyDrinkA.Length; i++) {
            long newDpA = Math.Max(dpB, dpA + energyDrinkA[i]);
            long newDpB = Math.Max(dpA, dpB + energyDrinkB[i]);
            dpA = newDpA;
            dpB = newDpB;
        }

        return Math.Max(dpA, dpB);
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
