# 899. Orderly Queue

**Difficulty:** Hard
**Category:** String, Sorting

## Problem

Given a string `s` and an integer `k`, you may repeatedly move the leftmost character of `s` to the end of the string, but only if `k > 1` any character can effectively be moved to any position (a full permutation is reachable); if `k == 1`, only cyclic rotations are reachable. Return the lexicographically smallest string achievable.

### Example

```
Input: s = "cba", k = 1
Output: "acb"
```

## Approach

If `k > 1`, it's a known result that any permutation of the characters is reachable, so the lexicographically smallest result is simply the characters sorted in order. If `k == 1`, only rotations of the string are achievable, so generate every rotation and return the lexicographically smallest one.

## C# Solution

```csharp
public class Solution
{
    public string OrderlyQueue(string s, int k)
    {
        if (k > 1)
        {
            var chars = s.ToCharArray();
            Array.Sort(chars);
            return new string(chars);
        }

        string best = s;

        for (int i = 1; i < s.Length; i++)
        {
            string rotated = s.Substring(i) + s.Substring(0, i);
            if (string.Compare(rotated, best, StringComparison.Ordinal) < 0)
                best = rotated;
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)` for the `k == 1` case (rotation generation and comparison), `O(n log n)` for `k > 1`.
- **Space:** `O(n)` for the generated rotations.
