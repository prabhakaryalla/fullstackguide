# 1894. Find the Student that Will Replace the Chalk

**Difficulty:** Medium
**Category:** Array, Binary Search, Prefix Sum, Simulation

## Problem

`n` students sit in a circle, each with `chalk[i]` chalk needed to give their turn's lecture, starting with student `0` and repeatedly cycling. Given a total of `k` chalk available at the start, return the index of the student who is the first to be unable to fully use their required chalk (i.e., the current chalk runs out during their turn).

### Example

```
Input: chalk = [5,1,5], k = 22
Output: 0
```

## Approach

Since students cycle repeatedly, reduce `k` modulo the total chalk consumed per full cycle (`sum(chalk)`) to skip all the full cycles that don't matter. Then walk through students in order, subtracting each one's requirement from the remaining chalk; the first student whose requirement exceeds the remaining chalk is the answer.

## C# Solution

```csharp
public class Solution
{
    public int ChalkReplacer(int[] chalk, int k)
    {
        long total = 0;
        foreach (int c in chalk) total += c;

        long remainder = k % total;

        for (int i = 0; i < chalk.Length; i++)
        {
            if (remainder < chalk[i]) return i;
            remainder -= chalk[i];
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
