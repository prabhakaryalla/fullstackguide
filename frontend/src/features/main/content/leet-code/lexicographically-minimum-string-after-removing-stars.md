# 3170. Lexicographically Minimum String After Removing Stars

**Difficulty:** Medium
**Category:** Greedy, Hash Table, Heap (Priority Queue), Stack, String

## Problem
Given a string containing lowercase letters and `'*'` characters, repeatedly perform the following operation for each `'*'` encountered (in left-to-right order): remove the `'*'` itself and also remove the smallest lexicographic character among all characters to its left that haven't yet been removed (if there's a tie, remove the rightmost occurrence of that smallest character). Return the resulting string after processing all stars.

## Approach
Maintain 26 buckets (one per lowercase letter), each storing the indices (in increasing order) of unprocessed occurrences of that letter seen so far. For every regular character, push its index into the corresponding bucket. For every `'*'`, mark that position as removed, then find the smallest letter that has a non-empty bucket, pop the last (most recent / rightmost) index from that bucket, and mark that position as removed too. Finally, build the answer by keeping only the positions that were never marked removed.

## C# Solution
```csharp
public class Solution {
    public string ClearStars(string s) {
        char[] ans = s.ToCharArray();
        List<int>[] buckets = new List<int>[26];
        for (int i = 0; i < 26; i++)
            buckets[i] = new List<int>();

        for (int i = 0; i < s.Length; i++) {
            if (s[i] == '*') {
                ans[i] = ' ';
                int j = 0;
                while (buckets[j].Count == 0)
                    j++;
                int idx = buckets[j][buckets[j].Count - 1];
                buckets[j].RemoveAt(buckets[j].Count - 1);
                ans[idx] = ' ';
            } else {
                buckets[s[i] - 'a'].Add(i);
            }
        }

        var sb = new System.Text.StringBuilder();
        foreach (char c in ans)
            if (c != ' ')
                sb.Append(c);

        return sb.ToString();
    }
}
```

## Complexity
- Time: O(n * 26) in the worst case, effectively O(n)
- Space: O(n)
