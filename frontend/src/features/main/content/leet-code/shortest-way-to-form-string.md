# 1055. Shortest Way to Form String

**Difficulty:** Medium
**Category:** String, Binary Search, Greedy, Two Pointers

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two strings `source` and `target`, return the minimum number of subsequences of `source` that need to be concatenated to form `target`. Return `-1` if it's impossible.

### Example

```
Input: source = "abc", target = "abcbc"
Output: 2
```

## Approach

Greedily consume `target` using repeated passes over `source`. On each pass, walk through `source` once and, for every character that matches the next unmatched character of `target`, advance the `target` pointer. If an entire pass over `source` produces no progress on `target`, some character in `target` doesn't exist in `source` at all, so it's impossible. Otherwise, count how many full passes over `source` were needed to consume all of `target`.

## C# Solution

```csharp
public class Solution
{
    public int ShortestWay(string source, string target)
    {
        int count = 0;
        int i = 0;
        int n = target.Length;

        while (i < n)
        {
            int start = i;

            foreach (var c in source)
            {
                if (i < n && target[i] == c) i++;
            }

            if (i == start) return -1;

            count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(count * source.Length)`, bounded by `O(target.Length * source.Length)`.
- **Space:** `O(1)`.
