# 491. Non-decreasing Subsequences

**Difficulty:** Medium
**Category:** Array, Hash Table, Backtracking, Bit Manipulation

## Problem

Given an integer array `nums`, return all the different possible non-decreasing subsequences of the given array with at least two elements. The array may contain duplicates, and the returned combinations may be in any order but must not contain duplicate combinations.

### Example

```
Input: nums = [4,6,7,7]
Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
```

### Constraints

- `1 <= nums.length <= 15`
- `-100 <= nums[i] <= 100`

## Approach

Use backtracking to build subsequences, only ever appending a value that is `>=` the last chosen value (guaranteeing non-decreasing order without needing to sort, which would destroy the original index ordering required for subsequences). At each recursion level, use a local set to skip values already tried at that same level, which prevents generating the same subsequence combination multiple times from duplicate array values.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindSubsequences(int[] nums)
    {
        var result = new List<IList<int>>();
        Backtrack(nums, 0, new List<int>(), result);
        return result;
    }

    private void Backtrack(int[] nums, int start, List<int> current, IList<IList<int>> result)
    {
        if (current.Count >= 2)
            result.Add(new List<int>(current));

        var usedAtThisLevel = new HashSet<int>();

        for (int i = start; i < nums.Length; i++)
        {
            if (current.Count > 0 && nums[i] < current[^1]) continue;
            if (!usedAtThisLevel.Add(nums[i])) continue;

            current.Add(nums[i]);
            Backtrack(nums, i + 1, current, result);
            current.RemoveAt(current.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** `O(2^n * n)` in the worst case.
- **Space:** `O(n)` for the recursion stack, plus the output.
