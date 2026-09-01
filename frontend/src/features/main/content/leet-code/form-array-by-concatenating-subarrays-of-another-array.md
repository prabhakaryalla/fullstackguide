# 1764. Form Array by Concatenating Subarrays of Another Array

**Difficulty:** Medium
**Category:** Array, String Matching, Greedy

## Problem

Given a 2D array `groups` and an array `nums`, return `true` if you can select non-overlapping, non-adjacent-order-preserving subarrays of `nums` — one matching each array in `groups`, in order — such that concatenating them (in the order they appear in `groups`) reproduces each group's contents exactly.

### Example

```
Input: groups = [[1,-1,-1],[3,-2,0]], nums = [1,-1,0,1,-1,-1,3,-2,0]
Output: true
```

## Approach

Greedily scan `nums` with a single moving pointer. For each group, search forward from the current pointer for the first position where the group's elements match exactly as a contiguous block; if found, advance the pointer past the match and continue with the next group, otherwise fail.

## C# Solution

```csharp
public class Solution
{
    public bool CanChoose(int[][] groups, int[] nums)
    {
        int pos = 0;

        foreach (var group in groups)
        {
            bool found = false;
            while (pos + group.Length <= nums.Length)
            {
                if (Matches(nums, pos, group))
                {
                    found = true;
                    pos += group.Length;
                    break;
                }
                pos++;
            }

            if (!found) return false;
        }

        return true;
    }

    private bool Matches(int[] nums, int start, int[] group)
    {
        for (int i = 0; i < group.Length; i++)
            if (nums[start + i] != group[i]) return false;

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * m)` where `m` is the average group length.
- **Space:** `O(1)`.
