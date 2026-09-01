# 277. Find the Celebrity

**Difficulty:** Medium
**Category:** Two Pointers, Graph, Interactive

## Problem

Among `n` people labeled `0` to `n - 1`, a celebrity is someone everyone else knows, but who knows nobody. Given a `Knows(a, b)` API that returns whether `a` knows `b`, find and return the celebrity's label, or `-1` if there is none. Minimize the number of calls to `Knows`.

### Example

```
Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
Output: 1
```

## Approach

First, find a single candidate in one pass: start with candidate `0`, and for each person `i`, if the candidate knows `i`, the candidate cannot be a celebrity (celebrities know nobody), so switch the candidate to `i`. After one pass, at most one person could possibly be the celebrity. Verify the candidate in a second pass by confirming everyone else knows them and the candidate knows nobody else.

## C# Solution

```csharp
public class Solution : Relation
{
    public int FindCelebrity(int n)
    {
        int candidate = 0;
        for (int i = 1; i < n; i++)
        {
            if (Knows(candidate, i)) candidate = i;
        }

        for (int i = 0; i < n; i++)
        {
            if (i == candidate) continue;
            if (!Knows(i, candidate) || Knows(candidate, i)) return -1;
        }

        return candidate;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass to find a candidate, one pass to verify.
- **Space:** `O(1)`.
