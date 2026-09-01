# 47. Permutations II

**Difficulty:** Medium
**Category:** Array, Backtracking

## Problem

Given a collection of numbers `nums` that might contain duplicates, return all possible unique permutations in any order.

### Example 1

```
Input: nums = [1,1,2]
Output: [[1,1,2],[1,2,1],[2,1,1]]
```

### Example 2

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Constraints

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

## Approach

Sort `nums` so duplicates are adjacent, then backtrack by building the permutation left to right using a `used[]` marker array. At each position, skip a candidate if it equals the previous candidate and that previous one hasn't been used in the current path yet — this is the standard "skip if `nums[i] == nums[i-1] && !used[i-1]`" duplicate guard.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> PermuteUnique(int[] nums)
    {
        Array.Sort(nums);
        var result = new List<IList<int>>();
        var used = new bool[nums.Length];
        Backtrack(nums, used, new List<int>(), result);
        return result;
    }

    private void Backtrack(int[] nums, bool[] used, List<int> current, List<IList<int>> result)
    {
        if (current.Count == nums.Length)
        {
            result.Add(new List<int>(current));
            return;
        }

        for (int i = 0; i < nums.Length; i++)
        {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;

            used[i] = true;
            current.Add(nums[i]);
            Backtrack(nums, used, current, result);
            current.RemoveAt(current.Count - 1);
            used[i] = false;
        }
    }
}
```

## Complexity

- **Time:** `O(n * n!)` worst case — bounded above by the total permutation count, reduced by duplicate pruning.
- **Space:** `O(n)` for recursion depth and the `used` array, excluding the output.
