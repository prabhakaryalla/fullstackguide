# 1405. Longest Happy String

**Difficulty:** Medium
**Category:** String, Greedy, Heap (Priority Queue)

## Problem

A string is "happy" if it contains no three consecutive identical characters. Given counts `a`, `b`, `c` of how many `'a'`, `'b'`, `'c'` characters may be used respectively, return the longest possible happy string built from at most those counts. If there are multiple answers, return any; return an empty string if none can be built.

### Example

```
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
```

## Approach

Greedily append the character with the largest remaining count. If using it would create three-in-a-row, use the next largest available character instead (which is always safe since at most one other character can also be "blocked"). Repeat, tracking remaining counts, until no character can be legally appended.

## C# Solution

```csharp
public class Solution
{
    public string LongestDiverseString(int a, int b, int c)
    {
        var counts = new List<(int Count, char Ch)>();
        if (a > 0) counts.Add((a, 'a'));
        if (b > 0) counts.Add((b, 'b'));
        if (c > 0) counts.Add((c, 'c'));

        var sb = new StringBuilder();

        while (counts.Count > 0)
        {
            counts.Sort((x, y) => y.Count.CompareTo(x.Count));

            int len = sb.Length;
            bool wouldRepeat = len >= 2 && sb[len - 1] == counts[0].Ch && sb[len - 2] == counts[0].Ch;

            int useIndex = wouldRepeat ? 1 : 0;
            if (useIndex >= counts.Count) break;

            var (count, ch) = counts[useIndex];
            sb.Append(ch);
            counts[useIndex] = (count - 1, ch);
            counts.RemoveAll(x => x.Count <= 0);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O((a + b + c) log 3)`, effectively linear since there are at most 3 characters.
- **Space:** `O(a + b + c)` for the output string.
