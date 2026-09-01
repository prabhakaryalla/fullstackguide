# 2014. Longest Subsequence Repeated k Times

**Difficulty:** Hard
**Category:** String, Backtracking, Greedy, Counting

## Problem

Given a string `s` of lowercase letters and an integer `k`, find the longest subsequence `t` of `s` such that `t` repeated `k` times (i.e. `t + t + ... + t`, `k` times) is also a subsequence of `s`. If multiple such subsequences of the same maximal length exist, return the lexicographically largest one. If none exists, return an empty string.

## Approach

Only characters that appear at least `k` times in `s` can possibly be part of the answer (since the answer used `k` times would need at least `k` of each of its characters). Collect these candidate characters.

Perform a breadth-first search over candidate strings, starting from the empty string: at each step, try appending every candidate character (in ascending order) to strings from the current BFS level, and check whether the resulting string repeated `k` times is a subsequence of `s`. If it is, it becomes a new candidate for the next level. Track the best (longest, then lexicographically largest) string seen. The BFS naturally terminates once no valid extension exists — LeetCode's constraints guarantee the answer is short in practice.

Checking "is `t` repeated `k` times a subsequence of `s`" is done with a simple linear greedy match: walk through `s`, and every time we finish matching one copy of `t`, increment a counter and reset the matching pointer; if the counter reaches `k`, the check succeeds.

## C# Solution

```csharp
public class Solution
{
    public string LongestSubsequenceRepeatedK(string s, int k)
    {
        var freq = new int[26];
        foreach (var c in s) freq[c - 'a']++;

        var candidates = new List<char>();
        for (int c = 0; c < 26; c++)
            if (freq[c] >= k)
                candidates.Add((char)('a' + c));

        var queue = new Queue<string>();
        queue.Enqueue("");
        string answer = "";

        while (queue.Count > 0)
        {
            var cur = queue.Dequeue();
            foreach (var c in candidates)
            {
                var next = cur + c;
                if (IsKSubsequence(s, next, k))
                {
                    if (next.Length > answer.Length ||
                        (next.Length == answer.Length && string.CompareOrdinal(next, answer) > 0))
                        answer = next;

                    queue.Enqueue(next);
                }
            }
        }

        return answer;
    }

    private bool IsKSubsequence(string s, string t, int k)
    {
        int matched = 0;
        int j = 0;

        foreach (var ch in s)
        {
            if (ch == t[j])
            {
                j++;
                if (j == t.Length)
                {
                    j = 0;
                    matched++;
                    if (matched == k) return true;
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** Bounded by the number of valid candidate extensions explored times `O(|s|)` per subsequence check; in practice small since valid answer lengths stay short.
- **Space:** `O(|s|)` for the recursion/queue and candidate strings.
