# 40. Combination Sum II

**Difficulty:** Medium
**Category:** Array, Backtracking

## Problem

Given a collection of candidate numbers `candidates` (which may contain duplicates) and a target number `target`, find all unique combinations where the numbers sum to `target`. Each number in `candidates` may only be used once in a combination. The solution set must not contain duplicate combinations.

### Example 1

```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
```

### Example 2

```
Input: candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],[5]]
```

### Constraints

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

## Approach

Sort the candidates so duplicates sit next to each other, then backtrack, advancing the start index by one each recursive call (each element used at most once). At each level, skip a candidate if it equals the previous sibling candidate already tried at the same recursion depth — this prevents duplicate combinations without needing a final de-duplication pass.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> CombinationSum2(int[] candidates, int target)
    {
        Array.Sort(candidates);
        var result = new List<IList<int>>();
        Backtrack(candidates, target, 0, new List<int>(), result);
        return result;
    }

    private void Backtrack(int[] candidates, int remaining, int start, List<int> current, List<IList<int>> result)
    {
        if (remaining == 0)
        {
            result.Add(new List<int>(current));
            return;
        }

        for (int i = start; i < candidates.Length && candidates[i] <= remaining; i++)
        {
            if (i > start && candidates[i] == candidates[i - 1]) continue; // skip sibling duplicates

            current.Add(candidates[i]);
            Backtrack(candidates, remaining - candidates[i], i + 1, current, result); // no reuse: i + 1
            current.RemoveAt(current.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** `O(2^n)` worst case — exponential search space, pruned by sorting and duplicate skipping.
- **Space:** `O(n)` — recursion depth, excluding the output.
