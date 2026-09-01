# 2383. Minimum Hours of Training to Win a Competition

**Difficulty:** Easy
**Category:** Array, Greedy

## Problem

You are entering a competition, and are given two positive integers `initialEnergy` and `initialExperience` denoting your initial energy and initial experience respectively.

You are also given two 0-indexed integer arrays `energy` and `experience`, both of length `n`.

You will face `n` opponents in order. The energy and experience of the `i-th` opponent is denoted by `energy[i]` and `experience[i]` respectively. When you face an opponent, you need to have both strictly greater experience and strictly greater energy to defeat them and move to the next opponent if available.

Defeating the `i-th` opponent increases your experience by `experience[i]`, but decreases your energy by `energy[i]`.

Before starting the competition, you can train for some number of hours. After each hour of training, you can either choose to increase your initial experience by one, or increase your initial energy by one.

Return the minimum number of training hours required to defeat all `n` opponents.

### Example

```
Input: initialEnergy = 5, initialExperience = 3, energy = [1,4,3,2], experience = [2,6,3,1]
Output: 8
```

## Approach

Calculate required energy (must exceed sum of all energy values). For experience, simulate the battles and track when we need more experience to stay ahead of each opponent.

## C# Solution

```csharp
public class Solution
{
    public int MinNumberOfHours(int initialEnergy, int initialExperience, int[] energy, int[] experience)
    {
        int trainingHours = 0;
        
        int totalEnergy = energy.Sum();
        if (initialEnergy <= totalEnergy)
        {
            trainingHours += totalEnergy - initialEnergy + 1;
        }
        
        int currentExp = initialExperience;
        foreach (int oppExp in experience)
        {
            if (currentExp <= oppExp)
            {
                int needed = oppExp - currentExp + 1;
                trainingHours += needed;
                currentExp += needed;
            }
            currentExp += oppExp;
        }
        
        return trainingHours;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
