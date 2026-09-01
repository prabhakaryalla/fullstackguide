# 2491. Divide Players Into Teams of Equal Skill

**Difficulty:** Medium
**Category:** Array, Hash Table, Two Pointers, Sorting

## Problem

You are given a positive integer array `skill` of even length `n` where `skill[i]` denotes the skill of the ith player.

Divide the players into `n / 2` teams of size 2 such that the total skill of each team is equal.

The chemistry of a team is the product of the skills of the two players on that team.

Return the sum of the chemistry of all the teams, or return -1 if there is no way to divide the players into teams such that the total skill of each team is equal.

### Example

```
Input: skill = [3,2,5,1,3,4]
Output: 22
Explanation: Divide into teams: (1,5), (2,4), (3,3)
Each has total skill 6
Chemistry: 1*5 + 2*4 + 3*3 = 5 + 8 + 9 = 22

Input: skill = [3,4]
Output: 12

Input: skill = [1,1,2,3]
Output: -1
```

## Approach

Sort the array and use two pointers - one at the start and one at the end. Pair the smallest with the largest.

If all pairs have the same sum, compute the chemistry (product) of each pair. Otherwise, return -1.

This greedy approach works because if a valid pairing exists, matching extremes maintains the required equal sum.

## C# Solution

```csharp
public class Solution
{
    public long DividePlayers(int[] skill)
    {
        Array.Sort(skill);
        int n = skill.Length;
        int targetSum = skill[0] + skill[n - 1];
        long totalChemistry = 0;
        
        for (int i = 0; i < n / 2; i++)
        {
            int left = skill[i];
            int right = skill[n - 1 - i];
            
            if (left + right != targetSum)
            {
                return -1;
            }
            
            totalChemistry += (long)left * right;
        }
        
        return totalChemistry;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1) if we ignore the space used by the sorting algorithm
