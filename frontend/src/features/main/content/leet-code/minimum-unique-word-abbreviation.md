# 411. Minimum Unique Word Abbreviation

**Difficulty:** Hard
**Category:** String, Backtracking, Bit Manipulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `target` string and an array of strings `dictionary`, return the shortest possible abbreviation of `target` that does not match any word in `dictionary` under the standard abbreviation rules (runs of skipped characters collapse into digit counts).

### Example

```
Input: target = "apple", dictionary = ["blade"]
Output: "a4"
```

### Constraints

- `1 <= target.length <= 15`
- `0 <= dictionary.length <= 100`
- Dictionary words have the same length as `target` where relevant; others can be ignored.

## Approach

Represent which character positions of `target` are kept "literal" (not abbreviated) as a bitmask. For each same-length dictionary word, compute a "conflict mask" of positions where it differs from `target` — keeping at least one of those positions literal in the abbreviation guarantees the abbreviation can't match that dictionary word. Try every candidate keep-mask from `0` to `2^n - 1`, and accept it only if it intersects every dictionary word's conflict mask; among valid masks, keep the one producing the shortest abbreviation string.

## C# Solution

```csharp
public class Solution
{
    public string MinAbbreviation(string target, string[] dictionary)
    {
        int n = target.Length;
        var conflictMasks = new List<int>();

        foreach (var word in dictionary)
        {
            if (word.Length != n) continue;

            int mask = 0;
            for (int i = 0; i < n; i++)
                if (word[i] != target[i])
                    mask |= 1 << i;

            conflictMasks.Add(mask);
        }

        if (conflictMasks.Count == 0) return n.ToString();

        string best = target;
        int bestLength = int.MaxValue;

        for (int candidateMask = 0; candidateMask < (1 << n); candidateMask++)
        {
            bool isValid = conflictMasks.All(conflict => (candidateMask & conflict) != 0);
            if (!isValid) continue;

            var abbreviation = BuildAbbreviation(target, candidateMask);
            if (abbreviation.Length < bestLength)
            {
                bestLength = abbreviation.Length;
                best = abbreviation;
            }
        }

        return best;
    }

    private string BuildAbbreviation(string target, int keepMask)
    {
        var sb = new StringBuilder();
        int i = 0;

        while (i < target.Length)
        {
            if ((keepMask & (1 << i)) != 0)
            {
                sb.Append(target[i]);
                i++;
            }
            else
            {
                int count = 0;
                while (i < target.Length && (keepMask & (1 << i)) == 0)
                {
                    count++;
                    i++;
                }

                sb.Append(count);
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(2^n * (n + d))`, where `d` is the number of relevant dictionary words.
- **Space:** `O(d)` for the conflict masks.
