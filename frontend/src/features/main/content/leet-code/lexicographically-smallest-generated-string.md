# 3474. Lexicographically Smallest Generated String

**Difficulty:** Hard
**Category:** String, Greedy, String Matching

## Problem
You are given two strings `str1` and `str2`, of lengths `n` and `m` respectively.

A string `word` of length `n + m - 1` is said to be **generated** by `str1` and `str2` if, for every index `0 <= i <= n - 1`:
- If `str1[i] == 'T'`, the length-`m` substring of `word` starting at index `i` must equal `str2`.
- If `str1[i] == 'F'`, that same length-`m` substring must **not** equal `str2`.

Return the lexicographically smallest string that can be generated, or `""` if none can be generated.

### Example
Input: `str1 = "TF"`, `str2 = "ab"`
Output: `"aba"`
Explanation: Index 0 is `'T'`, so `word[0..1]` must equal `"ab"`, giving `word = "ab?"`. Filling the remaining position with `'a'` gives `"aba"`. Index 1 is `'F'` and requires `word[1..2] = "ba"` to differ from `"ab"`, which it already does, so no change is needed. The result `"aba"` is valid and lexicographically smallest.

## Approach
1. For every index `i` with `str1[i] == 'T'`, force the corresponding window of the answer to equal `str2`. If two `'T'` windows disagree on an overlapping character, no answer exists.
2. Fill every still-undetermined position with `'a'` (the smallest possible letter) to keep the result lexicographically minimal.
3. For every index `i` with `str1[i] == 'F'`, check whether the current window accidentally equals `str2`. If it does, find the **last** modifiable (not forced by a `'T'` window) position within that window and change it to `'b'`, which is the smallest change that breaks the match. If no modifiable position exists in that window, no answer exists.

## C# Solution

```csharp
public class Solution {
    public string GenerateString(string str1, string str2) {
        int n = str1.Length, m = str2.Length;
        int size = n + m - 1;
        char[] ans = new char[size];
        bool[] modifiable = new bool[size];
        Array.Fill(modifiable, true);

        for (int i = 0; i < n; i++) {
            if (str1[i] == 'T') {
                for (int j = 0; j < m; j++) {
                    int pos = i + j;
                    if (ans[pos] != '\0' && ans[pos] != str2[j]) return "";
                    ans[pos] = str2[j];
                    modifiable[pos] = false;
                }
            }
        }

        for (int i = 0; i < size; i++)
            if (ans[i] == '\0') ans[i] = 'a';

        for (int i = 0; i < n; i++) {
            if (str1[i] == 'F' && Matches(ans, i, str2)) {
                int pos = LastModifiablePosition(i, m, modifiable);
                if (pos == -1) return "";
                ans[pos] = 'b';
                modifiable[pos] = false;
            }
        }

        return new string(ans);
    }

    private bool Matches(char[] ans, int start, string str2) {
        for (int j = 0; j < str2.Length; j++)
            if (ans[start + j] != str2[j]) return false;
        return true;
    }

    private int LastModifiablePosition(int i, int m, bool[] modifiable) {
        int result = -1;
        for (int j = 0; j < m; j++) {
            int pos = i + j;
            if (modifiable[pos]) result = pos;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n * m)
- **Space:** O(n + m)
