# 3706. Maximum Distance Between Unequal Words in Array II

**Difficulty:** Medium
**Category:** Array, String, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an array of strings `words`. For any pair of indices `i < j` such that `words[i] != words[j]`, the distance of the pair is `j - i`.

Return the maximum distance among all such pairs. It is guaranteed that `words` contains at least two distinct strings.

### Example

```
Input: words = ["a","a","a","b"]
Output: 3
Explanation: words[0] = "a" and words[3] = "b" differ, giving the maximum possible distance of 3 - 0 = 3.
```

### Constraints

- `2 <= words.length <= 10^5`
- `1 <= words[i].length <= 10`
- `words` consists of lowercase English letters.
- At least two strings in `words` are different.

## Approach

An optimal pair always includes either the first or the last index of the array: if an optimal pair `(i, j)` with `i > 0` and `j < n - 1` exists, then either `words[0] != words[j]` (giving an equally good or better pair `(0, j)`) or `words[i] != words[n-1]` (giving an equally good or better pair `(i, n-1)`) must hold, since `words[i] != words[j]` and the values can't all pairwise match `words[0]` and `words[n-1]` simultaneously while doing worse. So it suffices to scan once, comparing every index against `words[0]` and against `words[n-1]`, and track the best achievable distance.

## C# Solution

```csharp
public class Solution
{
    public int MaxDistance(string[] words)
    {
        int n = words.Length;
        int best = 0;

        for (int i = 0; i < n; i++)
        {
            if (words[i] != words[0])
            {
                best = Math.Max(best, i);
            }
            if (words[i] != words[n - 1])
            {
                best = Math.Max(best, n - 1 - i);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
