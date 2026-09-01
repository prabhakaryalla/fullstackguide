# 455. Assign Cookies

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

Given an array `g` representing each child's greed factor and an array `s` representing each cookie's size, assign cookies to children such that each child gets at most one cookie they are content with (cookie size `>=` greed factor). Return the maximum number of content children.

### Example

```
Input: g = [1,2,3], s = [1,1]
Output: 1
```

### Constraints

- `1 <= g.length <= 3 * 10^4`
- `0 <= s.length <= 3 * 10^4`
- `1 <= g[i], s[j] <= 2^31 - 1`

## Approach

Sort both the greed factors and cookie sizes ascending. Use two pointers to greedily match the smallest available cookie that can satisfy the least-greedy remaining child: if the current cookie satisfies the current child, advance both pointers (a match found); otherwise, advance only the cookie pointer (that cookie is too small for anyone remaining).

## C# Solution

```csharp
public class Solution
{
    public int FindContentChildren(int[] g, int[] s)
    {
        Array.Sort(g);
        Array.Sort(s);

        int child = 0, cookie = 0;

        while (child < g.Length && cookie < s.Length)
        {
            if (s[cookie] >= g[child])
                child++;

            cookie++;
        }

        return child;
    }
}
```

## Complexity

- **Time:** `O(n log n + m log m)` for sorting.
- **Space:** `O(1)` extra.
