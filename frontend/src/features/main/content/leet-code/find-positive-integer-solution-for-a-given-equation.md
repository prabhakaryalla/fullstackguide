# 1237. Find Positive Integer Solution for a Given Equation

**Difficulty:** Medium
**Category:** Math, Binary Search, Two Pointers, Interactive

## Problem

Given a callable `CustomFunction` implementing `f(x, y)` that is guaranteed to be strictly increasing in both `x` and `y` for positive integers, and a target `z`, return all pairs `(x, y)` with `1 <= x, y <= 1000` such that `f(x, y) == z`.

### Example

```
Input: function is f(x, y) = x + y, z = 5
Output: [[1,4],[2,3],[3,2],[4,1]]
```

## Approach

Start with `x = 1` and `y = 1000` — the smallest possible `x` and largest possible `y`. Because `f` is monotonic in both arguments, this two-pointer approach works exactly like searching a sorted matrix: if `f(x, y) == z`, record the pair and move both pointers inward (increase `x`, decrease `y`) to look for other combinations; if `f(x, y) < z`, only increasing `x` can help (increasing `y` would only be tried when necessary in the other direction), so increase `x`; if `f(x, y) > z`, decrease `y`. Continue until the pointers cross the valid range.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindSolution(CustomFunction customfunction, int z)
    {
        var result = new List<IList<int>>();
        int x = 1, y = 1000;

        while (x <= 1000 && y >= 1)
        {
            int value = customfunction.F(x, y);

            if (value == z)
            {
                result.Add(new List<int> { x, y });
                x++;
                y--;
            }
            else if (value < z)
            {
                x++;
            }
            else
            {
                y--;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the fixed bound (`1000`) on `x` and `y`.
- **Space:** `O(1)` extra beyond the output.
