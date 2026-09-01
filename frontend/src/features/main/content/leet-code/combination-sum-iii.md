# 216. Combination Sum III

**Difficulty:** Medium
**Category:** Array, Backtracking

## Problem

Find all valid combinations of `k` numbers, chosen from `1` to `9` (each used at most once), that sum up to `n`. Return all such combinations, with no duplicate combinations.

### Example

```
k = 3, n = 7 -> [[1,2,4]]
k = 3, n = 9 -> [[1,2,6],[1,3,5],[2,3,4]]
```

## Approach

Backtrack over digits `1..9` in increasing order (never revisiting a smaller digit, which naturally avoids duplicate combinations). Prune branches early: stop if the running combination already has `k` numbers without summing to `n`, or if the current digit already exceeds the remaining needed sum.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> CombinationSum3(int k, int n)
    {
        var result = new List<IList<int>>();
        Backtrack(1, k, n, new List<int>(), result);
        return result;
    }

    private void Backtrack(int start, int k, int remaining, List<int> current, List<IList<int>> result)
    {
        if (current.Count == k)
        {
            if (remaining == 0) result.Add(new List<int>(current));
            return;
        }

        for (int digit = start; digit <= 9 && digit <= remaining; digit++)
        {
            current.Add(digit);
            Backtrack(digit + 1, k, remaining - digit, current, result);
            current.RemoveAt(current.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** `O(C(9, k))` — bounded by the fixed digit set `1..9`.
- **Space:** `O(k)` for recursion depth, excluding the output.
