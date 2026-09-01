# 1520. Maximum Number of Non-Overlapping Substrings

**Difficulty:** Hard
**Category:** String, Greedy

## Problem

Given a string `s`, return the maximum number of non-overlapping substrings such that every occurrence of every character in a chosen substring appears only within that substring (i.e., no character in the substring appears anywhere else in `s` outside of it).

### Example

```
Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
```

## Approach

For each character, record its first and last occurrence index. Starting only from positions that are the **first** occurrence of their character (to avoid redundant candidates), expand a window `[start, end]` by repeatedly extending `end` to the last occurrence of every character seen so far within the window, until the window stabilizes. This yields the minimal valid, self-contained substring starting at that position (or discards it if a character inside requires expanding before `start`, which cannot happen since we begin at a first occurrence). Collect all valid candidate intervals, sort them by their end index, and greedily select non-overlapping intervals (classic activity-selection).

## C# Solution

```csharp
public class Solution
{
    public IList<string> MaxNumOfSubstrings(string s)
    {
        int n = s.Length;
        int[] first = new int[26];
        int[] last = new int[26];
        Array.Fill(first, -1);

        for (int i = 0; i < n; i++)
        {
            int c = s[i] - 'a';
            if (first[c] == -1)
            {
                first[c] = i;
            }
            last[c] = i;
        }

        var candidates = new List<(int Start, int End)>();

        for (int i = 0; i < n; i++)
        {
            int c = s[i] - 'a';
            if (first[c] != i)
            {
                continue;
            }

            int end = last[c];
            int j = i;
            bool valid = true;

            while (j <= end)
            {
                int cj = s[j] - 'a';
                if (first[cj] < i)
                {
                    valid = false;
                    break;
                }
                end = Math.Max(end, last[cj]);
                j++;
            }

            if (valid)
            {
                candidates.Add((i, end));
            }
        }

        candidates.Sort((a, b) => a.End.CompareTo(b.End));

        var result = new List<string>();
        int lastEnd = -1;

        foreach ((int start, int end) in candidates)
        {
            if (start > lastEnd)
            {
                result.Add(s.Substring(start, end - start + 1));
                lastEnd = end;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n * 26)` — each candidate window expansion is bounded by re-scanning characters, and there are at most 26 distinct starting characters producing valid candidates in the worst realistic case; overall bounded close to `O(n)` amortized.
- **Space:** `O(n)` for the candidate list and result.
