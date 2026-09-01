# 90. Subsets II

**Difficulty:** Medium
**Category:** Array, Backtracking, Bit Manipulation

## Problem

Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

### Example 1

```
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

### Example 2

```
Input: nums = [0]
Output: [[],[0]]
```

### Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

## Approach

Sort `nums` so duplicates are adjacent, then backtrack the same way as Subsets, but skip a candidate at the current recursion depth if it equals the previous candidate **already tried at this same depth** — this avoids generating the same subset twice without needing a final de-duplication step.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> SubsetsWithDup(int[] nums)
    {
        Array.Sort(nums);
        var result = new List<IList<int>>();
        Backtrack(nums, 0, new List<int>(), result);
        return result;
    }

    private void Backtrack(int[] nums, int start, List<int> current, List<IList<int>> result)
    {
        result.Add(new List<int>(current));

        for (int i = start; i < nums.Length; i++)
        {
            if (i > start && nums[i] == nums[i - 1]) continue; // skip sibling duplicates

            current.Add(nums[i]);
            Backtrack(nums, i + 1, current, result);
            current.RemoveAt(current.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** `O(n * 2^n)` worst case — bounded by the power set size, pruned by duplicate skipping.
- **Space:** `O(n)` for recursion depth, excluding the output.
