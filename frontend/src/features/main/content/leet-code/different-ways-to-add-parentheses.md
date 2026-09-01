# 241. Different Ways to Add Parentheses

**Difficulty:** Medium
**Category:** Math, String, Dynamic Programming, Backtracking, Memoization

## Problem

Given a string `expression` of numbers and operators (`+`, `-`, `*`), return all possible results from computing all the different possible ways to group numbers and operators, in any order.

### Example

```
Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
```

### Constraints

- `1 <= expression.length <= 20`
- `expression` consists of digits and the operators `+`, `-`, and `*`.

## Approach

For every operator found in the string, split the expression into a left and right part, recursively compute all possible results for each part, then combine every pair of left/right results using that operator. If the substring has no operator, it is a single number and the base case. Memoize by substring to avoid recomputation.

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<string, List<int>> memo = new();

    public IList<int> DiffWaysToCompute(string expression)
    {
        return Solve(expression);
    }

    private List<int> Solve(string expr)
    {
        if (memo.TryGetValue(expr, out var cached)) return cached;

        var results = new List<int>();
        for (int i = 0; i < expr.Length; i++)
        {
            char c = expr[i];
            if (c != '+' && c != '-' && c != '*') continue;

            var left = Solve(expr[..i]);
            var right = Solve(expr[(i + 1)..]);

            foreach (var l in left)
            {
                foreach (var r in right)
                {
                    results.Add(c switch
                    {
                        '+' => l + r,
                        '-' => l - r,
                        _ => l * r
                    });
                }
            }
        }

        if (results.Count == 0)
            results.Add(int.Parse(expr));

        memo[expr] = results;
        return results;
    }
}
```

## Complexity

- **Time:** `O(n * Catalan(n))` in the worst case — exponential due to the combinatorial number of groupings, mitigated by memoization on repeated substrings.
- **Space:** `O(n * Catalan(n))` — for storing memoized results.
