# 3437. Permutations III

**Difficulty:** Medium
**Category:** Array, Backtracking
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an integer `n`, return all **zigzag permutations** of the numbers `1` to `n`, sorted in lexicographical order. A permutation `perm` is a zigzag permutation if it strictly alternates between rising and falling: `perm[0] < perm[1] > perm[2] < perm[3] > ...` (starting with an ascent).

## Approach
Use backtracking to build the permutation position by position, tracking whether the next comparison must be an ascent (`next > current`) or a descent (`next < current`) based on the current index's parity. At each step, try unused numbers in increasing order (which naturally keeps results in lexicographical order without needing to sort afterward), skip any candidate that violates the required direction relative to the last placed number, and recurse. When the permutation reaches length `n`, record a copy of it.

## C# Solution

```csharp
public class Solution 
{
    public IList<IList<int>> ZigzagPermutations(int n) 
    {
        var result = new List<IList<int>>();
        var used = new bool[n + 1];
        var current = new List<int>();

        Backtrack(n, used, current, result);
        return result;
    }

    private void Backtrack(int n, bool[] used, List<int> current, List<IList<int>> result) 
    {
        if (current.Count == n) 
        {
            result.Add(new List<int>(current));
            return;
        }

        bool needsAscent = current.Count % 2 == 0; // even index (0-based) requires next > previous
        for (int candidate = 1; candidate <= n; candidate++) 
        {
            if (used[candidate]) continue;

            if (current.Count > 0) 
            {
                int previous = current[^1];
                bool isAscent = candidate > previous;
                if (isAscent != needsAscent) continue;
            }

            used[candidate] = true;
            current.Add(candidate);
            Backtrack(n, used, current, result);
            current.RemoveAt(current.Count - 1);
            used[candidate] = false;
        }
    }
}
```

## Complexity

- **Time:** O(n! ) in the worst case for generating all valid permutations (bounded further in practice by the zigzag constraint pruning), each taking O(n) to copy into the result.
- **Space:** O(n) for the recursion stack and the `used` array, plus O(n · count) to store all results.
