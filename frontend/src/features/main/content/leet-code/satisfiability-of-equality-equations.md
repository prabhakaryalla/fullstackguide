# 990. Satisfiability of Equality Equations

**Difficulty:** Medium
**Category:** Array, Union Find, Graph, String

## Problem

Given an array of strings representing equations of the form `"a==b"` or `"a!=b"` between single lowercase letters, return `true` if it's possible to assign values to the letters satisfying all the equations.

### Example

```
Input: equations = ["a==b","b!=a"]
Output: false
```

## Approach

First union every pair of letters connected by an `"=="` equation using a union-find structure over the 26 letters. Then check every `"!="` equation: if both letters end up in the same union-find component, the equations are contradictory.

## C# Solution

```csharp
public class Solution
{
    public bool EquationsPossible(string[] equations)
    {
        var parent = new int[26];
        for (int i = 0; i < 26; i++) parent[i] = i;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

        foreach (var eq in equations)
        {
            if (eq[1] == '=')
            {
                int a = eq[0] - 'a', b = eq[3] - 'a';
                parent[Find(a)] = Find(b);
            }
        }

        foreach (var eq in equations)
        {
            if (eq[1] == '!')
            {
                int a = eq[0] - 'a', b = eq[3] - 'a';
                if (Find(a) == Find(b)) return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * alpha(26))`.
- **Space:** `O(1)` (fixed 26-letter union-find).
