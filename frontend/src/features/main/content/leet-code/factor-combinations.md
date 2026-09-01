# 254. Factor Combinations

**Difficulty:** Medium
**Category:** Backtracking

## Problem

Given an integer `n`, return every combination of `n`'s factors (each factor greater than 1), where every combination has at least two factors and each combination's factors multiply to `n`. Factors within a combination should be listed in non-decreasing order, and combinations should not repeat.

### Example

```
Input: n = 12
Output: [[2,6],[2,2,3],[3,4]]
```

### Constraints

- `1 <= n <= 10^8`

## Approach

Backtrack starting from a minimum candidate factor of 2. At each step, try every divisor `d` of the remaining value starting from the last-used factor (to keep results non-decreasing and avoid duplicates). Recurse with the remaining quotient `n / d`, and whenever the quotient itself is `>= d`, it can be appended as the final factor to record a valid combination.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> GetFactors(int n)
    {
        var result = new List<IList<int>>();
        Backtrack(n, 2, new List<int>(), result);
        return result;
    }

    private void Backtrack(int remaining, int start, List<int> path, List<IList<int>> result)
    {
        for (int factor = start; (long)factor * factor <= remaining; factor++)
        {
            if (remaining % factor != 0) continue;

            path.Add(factor);
            path.Add(remaining / factor);
            result.Add(new List<int>(path));
            path.RemoveAt(path.Count - 1);

            Backtrack(remaining / factor, factor, path, result);
            path.RemoveAt(path.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** `O(d(n) * log n)` roughly — proportional to the number of divisor combinations explored.
- **Space:** `O(log n)` — recursion depth, plus output storage.
