# 2023. Number of Pairs of Strings With Concatenation Equal to Target

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given an array of digit strings `nums` and a string `target`, return *the number of pairs of indices* `(i, j)` (`i != j`) such that `nums[i] + nums[j] == target` (string concatenation).

### Example

```
Input: nums = ["777","7","77","77"], target = "7777"
Output: 4
```

## Approach

Given the small constraints (`nums.Length <= 100`), a direct double loop checking every ordered pair `(i, j)` with `i != j` for `nums[i] + nums[j] == target` (first verifying the combined length matches to avoid wasted string builds) is simple and efficient enough.

## C# Solution

```csharp
public class Solution
{
    public int NumOfPairs(string[] nums, string target)
    {
        int count = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            for (int j = 0; j < nums.Length; j++)
            {
                if (i == j) continue;

                if (nums[i].Length + nums[j].Length == target.Length &&
                    string.Concat(nums[i], nums[j]) == target)
                    count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2 * L)`, where `L` is the average string length.
- **Space:** `O(L)` for the concatenated string per comparison.
