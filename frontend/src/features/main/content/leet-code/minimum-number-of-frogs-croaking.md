# 1419. Minimum Number of Frogs Croaking

**Difficulty:** Medium
**Category:** String, Counting

## Problem

Frogs can only croak the string `"croak"`. Given a string `croakOfFrogs` representing overlapping croaks from possibly multiple frogs, return the minimum number of distinct frogs required to produce it, or `-1` if the string is not a valid combination of `"croak"` sequences.

### Example

```
Input: croakOfFrogs = "crcoakroak"
Output: 2
```

## Approach

Track, for each stage of the word `"croak"` (`c`, `r`, `o`, `a`, `k`), how many frogs are currently waiting at that stage. On seeing `'c'`, a frog either starts fresh (increasing the active frog count) — record the running maximum as a candidate answer. On seeing any later letter, a frog must be available at the previous stage to advance; if not, the string is invalid. When a frog completes with `'k'`, it becomes free again, decreasing the active frog count without needing further tracking. At the end, every stage count except the (implicitly completed) final one must be zero, and there should be no frogs still mid-croak.

## C# Solution

```csharp
public class Solution
{
    public int MinNumberOfFrogs(string croakOfFrogs)
    {
        const string Order = "croak";
        int[] counts = new int[4]; // waiting frogs at stages c, r, o, a
        int frogs = 0, maxFrogs = 0;

        foreach (var ch in croakOfFrogs)
        {
            int i = Order.IndexOf(ch);
            if (i == -1) return -1;

            if (i == 0)
            {
                counts[0]++;
                frogs++;
                maxFrogs = Math.Max(maxFrogs, frogs);
            }
            else
            {
                if (counts[i - 1] == 0) return -1;
                counts[i - 1]--;

                if (i == 4) frogs--;
                else counts[i]++;
            }
        }

        if (frogs != 0) return -1;
        foreach (var c in counts) if (c != 0) return -1;

        return maxFrogs;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
