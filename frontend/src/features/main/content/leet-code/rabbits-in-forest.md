# 781. Rabbits in Forest

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Greedy

## Problem

In a forest, each rabbit tells you how many other rabbits have the same color as itself, given as an array `answers`. Return the minimum number of rabbits that could be in the forest.

### Example

```
Input: answers = [1,1,2]
Output: 5
```

## Approach

If a rabbit answers `x`, its color group has exactly `x + 1` rabbits, and every rabbit in that group would give the same answer. Group the given answers by value and count occurrences of each. For an answer value `x` appearing `count` times, those rabbits fill up groups of size `x + 1`; the number of full groups needed is `ceil(count / (x + 1))`, each contributing `x + 1` rabbits (even if the last group isn't entirely filled by the observed rabbits, it must still exist as a complete group of that color). Sum these contributions across all distinct answers.

## C# Solution

```csharp
public class Solution
{
    public int NumRabbits(int[] answers)
    {
        var countByAnswer = new Dictionary<int, int>();
        foreach (var answer in answers)
            countByAnswer[answer] = countByAnswer.GetValueOrDefault(answer) + 1;

        int total = 0;

        foreach (var kvp in countByAnswer)
        {
            int answer = kvp.Key, count = kvp.Value;
            int groupSize = answer + 1;
            int groups = (count + groupSize - 1) / groupSize;
            total += groups * groupSize;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the answer-count map.
