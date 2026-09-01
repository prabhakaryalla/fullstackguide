# 936. Stamping The Sequence

**Difficulty:** Hard
**Category:** String, Stack, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Starting from a string of all `'?'` the same length as `target`, you may repeatedly "stamp" the string `stamp` onto any substring position, replacing those characters (regardless of what was there) as long as this brings the string strictly closer to `target`. Return a sequence of stamp starting indices that transforms all `'?'` into `target`, or an empty array if impossible.

### Example

```
Input: stamp = "abc", target = "ababc"
Output: [0,2]
```

## Approach

Work backward: repeatedly search `target` for a window that could have been the *last* stamp applied — i.e. a window where every character either already matches `stamp` or is still `'?'`, with at least one non-`'?'` character. Replace that whole window with `'?'` and record its start index. Repeat until the entire string turns into `'?'` (success) or no more windows can be "un-stamped" (failure), then reverse the recorded indices.

## C# Solution

```csharp
public class Solution
{
    public int[] MovesToStamp(string stamp, string target)
    {
        int m = stamp.Length, n = target.Length;
        var t = target.ToCharArray();
        var result = new List<int>();
        var stamped = new bool[n];
        int stampedCount = 0;
        bool progress = true;

        while (stampedCount < n && progress)
        {
            progress = false;

            for (int i = 0; i <= n - m; i++)
            {
                if (stamped[i]) continue;

                int changed = 0;
                bool canStamp = true;

                for (int j = 0; j < m; j++)
                {
                    if (t[i + j] == '?') continue;
                    if (t[i + j] != stamp[j]) { canStamp = false; break; }
                    changed++;
                }

                if (canStamp && changed > 0)
                {
                    for (int j = 0; j < m; j++) t[i + j] = '?';
                    stamped[i] = true;
                    stampedCount++;
                    result.Add(i);
                    progress = true;
                }
            }
        }

        if (stampedCount < n) return Array.Empty<int>();

        result.Reverse();
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n^2 * m)` worst case.
- **Space:** `O(n)`.
