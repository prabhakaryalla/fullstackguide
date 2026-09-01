# 2842. Count K-Subsequences of a String With Maximum Beauty

**Difficulty:** Hard
**Category:** Hash Table, String, Greedy, Sorting, Combinatorics, Counting

## Problem

You are given a string `s` and an integer `k`. A k-subsequence is formed by choosing `k` distinct characters that appear in `s`, then taking a subsequence of `s` consisting of every occurrence of each chosen character. The beauty of a k-subsequence is the sum, over its chosen characters, of how many times each one occurs in `s`. Return the number of k-subsequences with the maximum possible beauty, modulo `10^9 + 7`. If fewer than `k` distinct characters exist in `s`, return `0`.

### Example

Input: s = "bcca", k = 2
Output: 2
Explanation: Character frequencies are a:1, b:1, c:2. To maximize beauty with 2 characters, 'c' (frequency 2) must be included, and either 'a' or 'b' (both frequency 1) can be the second choice — giving 2 ways.

## Approach

Count the frequency of each of the 26 letters that actually appear in `s`. If fewer than `k` distinct letters exist, return 0. Sort the frequencies in descending order; the threshold is the k-th largest frequency. Every letter with a frequency strictly greater than the threshold must be included in any maximum-beauty selection (excluding one would strictly reduce the sum). The remaining slots must be filled from the letters whose frequency exactly equals the threshold — any subset of the required size among them yields the same maximum beauty, so the answer is the binomial coefficient choosing that many slots from the tied group.

## C# Solution

```csharp
public class Solution 
{
    public int CountKSubsequencesWithMaxBeauty(string s, int k) 
    {
        const int MOD = 1_000_000_007;
        var freq = new int[26];
        foreach (char c in s) freq[c - 'a']++;

        var counts = new List<int>();
        foreach (int f in freq) if (f > 0) counts.Add(f);

        if (counts.Count < k) return 0;

        counts.Sort((a, b) => b.CompareTo(a));

        int threshold = counts[k - 1];
        int aboveCount = 0;
        int atThreshold = 0;

        foreach (int f in counts) 
        {
            if (f > threshold) aboveCount++;
            else if (f == threshold) atThreshold++;
        }

        int neededFromThreshold = k - aboveCount;
        long ways = Combination(atThreshold, neededFromThreshold);

        return (int)(ways % MOD);
    }

    private long Combination(int n, int r) 
    {
        if (r < 0 || r > n) return 0;
        long result = 1;
        for (int i = 0; i < r; i++) 
        {
            result = result * (n - i) / (i + 1);
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n + 26 log 26)
- **Space:** O(26)
