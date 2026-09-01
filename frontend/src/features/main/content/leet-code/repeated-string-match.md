# 686. Repeated String Match

**Difficulty:** Medium
**Category:** String, String Matching

## Problem

Given two strings `a` and `b`, return the minimum number of times `a` must be repeated so that `b` is a substring of the repeated string, or `-1` if it's never possible.

### Example

```
Input: a = "abcd", b = "cdabcdab"
Output: 3
```

### Constraints

- `1 <= a.length, b.length <= 10^4`

## Approach

The minimum number of repetitions needed is at least `⌈b.Length / a.Length⌉`, since the repeated string must be at least as long as `b`. Try that count and up to two additional repetitions (enough to cover any misalignment at the boundary), checking each time whether `b` is a substring of the repeated string; return the first count that works, or `-1` if none do within that small margin.

## C# Solution

```csharp
public class Solution
{
    public int RepeatedStringMatch(string a, string b)
    {
        int count = (int)Math.Ceiling((double)b.Length / a.Length);

        for (int extra = 0; extra <= 2; extra++)
        {
            var candidate = string.Concat(Enumerable.Repeat(a, count + extra));
            if (candidate.Contains(b))
                return count + extra;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n * m)` in the worst case for the substring search, where `n` and `m` are the lengths of the candidate string and `b`.
- **Space:** `O(n)` for the repeated candidate string.
