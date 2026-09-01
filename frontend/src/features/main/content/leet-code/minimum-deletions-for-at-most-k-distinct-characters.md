# 3545. Minimum Deletions for At Most K Distinct Characters

**Difficulty:** Easy
**Category:** String, Hash Table, Greedy, Sorting

## Problem

You are given a string `s` and an integer `k`. In one operation, you can delete one character from `s`. Return the minimum number of deletions required so that `s` contains at most `k` distinct characters.

### Example

`s = "aabbcc"`, `k = 1`. Frequencies are `a=2, b=2, c=2` (3 distinct characters). To keep only 1 distinct character, delete two entire groups (`4` characters total), keeping the remaining group. The answer is `4`.

## Approach

Count the frequency of every distinct character in `s`. If the number of distinct characters is already at most `k`, no deletions are needed. Otherwise, repeatedly remove the entire group with the smallest frequency (deleting all of its occurrences) until only `k` distinct groups remain, summing up the number of characters deleted along the way.

## C# Solution

```csharp
public class Solution 
{
    public int MinDeletion(string s, int k) 
    {
        Dictionary<char, int> freq = new Dictionary<char, int>();
        foreach (char c in s)
        {
            if (freq.ContainsKey(c)) freq[c]++;
            else freq[c] = 1;
        }

        List<int> counts = new List<int>(freq.Values);
        counts.Sort();

        int distinct = counts.Count;
        int deletions = 0;
        int idx = 0;

        while (distinct > k)
        {
            deletions += counts[idx];
            idx++;
            distinct--;
        }

        return deletions;
    }
}
```

## Complexity

- **Time:** O(n + d log d), where `d` is the number of distinct characters
- **Space:** O(d)
