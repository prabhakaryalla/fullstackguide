# 3773. Maximum Number of Equal-Length Runs

**Difficulty:** Medium
**Category:** Array, String, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a string `s`. A **run** is a maximal substring of identical consecutive characters. You may delete at most one character from `s` (or delete none). After the deletion, partition the remaining string into its runs of identical characters, and let the answer be the number of runs that share the **most common run length** (i.e., among all distinct run lengths present, take the length that occurs most frequently as a run length, and count how many runs have that length). Return the maximum possible value of this count over all choices of which single character (or none) to delete.

## Approach
First compute the baseline runs of `s` (without any deletion) as a list of `(character, length)` pairs. For the "no deletion" case, tally how many runs share each length and take the best count. Then, for each possible single-character deletion, simulate its effect efficiently: deleting one character from the middle of a run of length `L > 1` shortens that run to `L - 1` and does not affect any other run. Deleting the single character of a run of length `1` located between two runs of the *same* character merges the two neighboring runs into one combined run, removing three entries and inserting one merged entry; deleting a length-1 run between two runs of *different* characters just removes that run entirely with no merge. Since runs are processed independently for each deletion candidate, iterate once over the run list; for each run, apply the corresponding transformation to a copy of the run-length frequency multiset (adjusting counts for removed/modified/merged lengths), and track the best "max frequency of any run length" achieved. Because each run is considered independently and the transformation from the baseline multiset is O(1) with a hash map of length→count, this runs in linear time overall.

## C# Solution

```csharp
public class Solution 
{
    public int MaxEqualLengthRuns(string s)
    {
        var runs = new List<(char ch, int len)>();
        int i = 0;
        while (i < s.Length)
        {
            int j = i;
            while (j < s.Length && s[j] == s[i]) j++;
            runs.Add((s[i], j - i));
            i = j;
        }

        var baseFreq = new Dictionary<int, int>();
        foreach (var (_, len) in runs)
        {
            baseFreq[len] = baseFreq.GetValueOrDefault(len) + 1;
        }

        int best = 0;
        foreach (var kv in baseFreq)
        {
            best = Math.Max(best, kv.Value);
        }

        for (int idx = 0; idx < runs.Count; idx++)
        {
            var (ch, len) = runs[idx];
            var freq = new Dictionary<int, int>(baseFreq);

            if (len > 1)
            {
                // shorten this run by one
                Decrement(freq, len);
                Increment(freq, len - 1);
            }
            else
            {
                // len == 1, removing the whole run
                Decrement(freq, 1);

                bool hasLeft = idx > 0;
                bool hasRight = idx < runs.Count - 1;

                if (hasLeft && hasRight && runs[idx - 1].ch == runs[idx + 1].ch)
                {
                    int leftLen = runs[idx - 1].len;
                    int rightLen = runs[idx + 1].len;
                    Decrement(freq, leftLen);
                    Decrement(freq, rightLen);
                    Increment(freq, leftLen + rightLen);
                }
                // if neighbors differ (or run is at an edge), no merge needed
            }

            foreach (var kv in freq)
            {
                if (kv.Value > best) best = kv.Value;
            }
        }

        return best;
    }

    private void Increment(Dictionary<int, int> freq, int key)
    {
        freq[key] = freq.GetValueOrDefault(key) + 1;
    }

    private void Decrement(Dictionary<int, int> freq, int key)
    {
        if (freq.TryGetValue(key, out int v))
        {
            if (v <= 1) freq.Remove(key);
            else freq[key] = v - 1;
        }
    }
}
```

## Complexity

- **Time:** O(n * d) where n is the number of runs and d is the number of distinct run lengths (from copying the frequency map per candidate deletion)
- **Space:** O(n)
