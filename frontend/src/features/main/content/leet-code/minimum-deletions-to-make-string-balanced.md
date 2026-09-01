# 1653. Minimum Deletions to Make String Balanced

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Stack

## Problem

Given a string `s` of only `'a'` and `'b'`, return the minimum number of deletions so that no `'a'` appears after a `'b'`.

### Example

```
Input: s = "aababbab"
Output: 2
```

## Approach

Scan left to right tracking how many `'b'` characters have been seen so far (`countB`). Whenever an `'a'` is encountered, there are two options: delete this `'a'` (cost increases by 1), or (conceptually) delete all `countB` prior `'b'` characters instead so this `'a'` no longer violates order — take whichever is cheaper via `deletions = min(deletions + 1, countB)`. When a `'b'` is seen, just increment `countB` (no immediate cost).

## C# Solution

```csharp
public class Solution
{
    public int MinimumDeletions(string s)
    {
        int countB = 0;
        int deletions = 0;

        foreach (char c in s)
        {
            if (c == 'b')
            {
                countB++;
            }
            else
            {
                deletions = Math.Min(deletions + 1, countB);
            }
        }

        return deletions;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
