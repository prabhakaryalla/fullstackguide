# 3777. Minimum Deletions to Make Alternating Substring

**Difficulty:** Hard
**Category:** String, Segment Tree

## Problem

Given a string `s` of `'A'`/`'B'` and queries: `[1, j]` flips `s[j]` (persists for later queries), or `[2, l, r]` asks the minimum deletions to make `s[l..r]` alternating (no two adjacent equal characters). Return the answers to all type-2 queries in order.

### Example

Input: `s = "ABA", queries = [[2,1,2],[1,1],[2,0,2]]`
Output: `[0,2]`

## Approach

Define `eq[i] = 1` if `s[i] == s[i-1]` (for `i >= 1`), else `0`. The answer to a type-2 query `[l, r]` is `sum(eq[l+1..r])` (the count of equal adjacent pairs, each requiring one deletion). Maintain `eq` values in a Fenwick tree; a flip at index `j` only changes `eq[j]` and `eq[j+1]`, updated via point updates.

## C# Solution

```csharp
public class Solution 
{
    public int[] MinDeletions(string s, int[][] queries) 
    {
        int n = s.Length;
        char[] arr = s.ToCharArray();
        var eq = new int[n];
        var bit = new int[n + 1];

        void Update(int idx, int delta)
        {
            for (int i = idx + 1; i <= n; i += i & (-i)) bit[i] += delta;
        }
        int Prefix(int idx)
        {
            int sum = 0;
            for (int i = idx; i > 0; i -= i & (-i)) sum += bit[i];
            return sum;
        }

        for (int i = 1; i < n; i++)
        {
            eq[i] = arr[i] == arr[i - 1] ? 1 : 0;
            if (eq[i] == 1) Update(i, 1);
        }

        var results = new List<int>();
        foreach (var query in queries)
        {
            if (query[0] == 1)
            {
                int j = query[1];
                arr[j] = arr[j] == 'A' ? 'B' : 'A';
                if (j >= 1)
                {
                    int newEq = arr[j] == arr[j - 1] ? 1 : 0;
                    if (newEq != eq[j]) { Update(j, newEq - eq[j]); eq[j] = newEq; }
                }
                if (j + 1 < n)
                {
                    int newEq = arr[j + 1] == arr[j] ? 1 : 0;
                    if (newEq != eq[j + 1]) { Update(j + 1, newEq - eq[j + 1]); eq[j + 1] = newEq; }
                }
            }
            else
            {
                int l = query[1], r = query[2];
                int sum = Prefix(r) - Prefix(l);
                results.Add(sum);
            }
        }
        return results.ToArray();
    }
}
```

## Complexity

- **Time:** O((n + q) log n)
- **Space:** O(n)
