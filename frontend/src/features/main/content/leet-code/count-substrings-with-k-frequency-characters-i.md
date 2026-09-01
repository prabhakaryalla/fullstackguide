# 3325. Count Substrings With K-Frequency Characters I

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

Given a string `s` and an integer `k`, return the total number of substrings of `s` where at least one character appears at least `k` times.

### Example

Input: `s = "abacb", k = 2`

Output: `4`

Explanation: The valid substrings are `"aba"`, `"abac"`, `"abacb"`, and `"bacb"`.

## Approach

Fix the left endpoint of the substring and find, via a two-pointer sweep, the first right endpoint at which some character's count in the window reaches `k`. Every substring that starts at `left` and extends to any position at or beyond that first valid `right` also satisfies the condition (since extending further only keeps counts at least as large). So for that `left`, the count of valid substrings is `n - right`.

Maintain a running frequency array as `left` increases (only ever removing the character at the old `left`), and re-extend `right` using another two-pointer as needed — overall this is a standard sliding window with both pointers moving forward monotonically.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfSubstrings(string s, int k) 
    {
        int n = s.Length;
        int[] count = new int[26];
        long ans = 0;
        int right = 0;
        int maxCount = 0;

        for (int left = 0; left < n; left++)
        {
            if (right < left)
            {
                right = left;
                maxCount = 0;
            }

            while (right < n && maxCount < k)
            {
                int idx = s[right] - 'a';
                count[idx]++;
                maxCount = Math.Max(maxCount, count[idx]);
                right++;
            }

            if (maxCount >= k)
            {
                ans += n - right + 1;
            }

            int leftIdx = s[left] - 'a';
            count[leftIdx]--;
            if (count[leftIdx] == maxCount - 1)
            {
                // Recompute maxCount lazily; safe because count only decreased for this letter.
                maxCount = 0;
                for (int c = 0; c < 26; c++) maxCount = Math.Max(maxCount, count[c]);
            }
        }

        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(n * 26) — the alphabet rescan happens at most once per left-pointer advance.
- **Space:** O(1) extra space (fixed 26-size array).
