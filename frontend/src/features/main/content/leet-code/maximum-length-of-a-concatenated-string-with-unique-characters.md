# 1239. Maximum Length of a Concatenated String with Unique Characters

**Difficulty:** Medium
**Category:** Array, String, Backtracking, Bit Manipulation

## Problem

Given an array of strings `arr`, choose a subset of the strings whose concatenation contains no duplicate characters, and return the maximum possible length of that concatenation.

### Example

```
Input: arr = ["un","iq","ue"]
Output: 4
```

## Approach

First discard any string that already has repeated characters internally, and represent each remaining string as a 26-bit mask of the letters it contains. Then backtrack over the candidate masks: at each string, either skip it, or — if it shares no bits with the characters already used — include it by OR-ing its mask into the running total. Track the best population count (number of set bits) seen across all valid combinations.

## C# Solution

```csharp
public class Solution
{
    public int MaxLength(IList<string> arr)
    {
        var masks = new List<int>();

        foreach (var s in arr)
        {
            int mask = 0;
            bool valid = true;

            foreach (char c in s)
            {
                int bit = 1 << (c - 'a');
                if ((mask & bit) != 0) { valid = false; break; }
                mask |= bit;
            }

            if (valid) masks.Add(mask);
        }

        return Backtrack(masks, 0, 0);
    }

    private int Backtrack(List<int> masks, int index, int usedMask)
    {
        if (index == masks.Count) return CountBits(usedMask);

        int best = Backtrack(masks, index + 1, usedMask);

        if ((usedMask & masks[index]) == 0)
            best = Math.Max(best, Backtrack(masks, index + 1, usedMask | masks[index]));

        return best;
    }

    private int CountBits(int mask)
    {
        int count = 0;
        while (mask != 0)
        {
            count += mask & 1;
            mask >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** `O(2^n)`, where `n` is the number of strings.
- **Space:** `O(n)` for the recursion stack.
