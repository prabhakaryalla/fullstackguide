# 1770. Maximum Score from Performing Multiplication Operations

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given arrays `nums` and `multipliers` (with `multipliers.Length = m <= nums.Length = n`), perform `m` operations: on operation `i` (0-indexed), remove either the first or last remaining element of `nums`, multiply it by `multipliers[i]`, and add the result to your score. Return the maximum score achievable.

### Example

```
Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
```

## Approach

Define the state by how many elements have been taken from the left so far (the right pointer is derived from the total taken and the operation index). Using bottom-up DP over the operation index from last to first, each state either takes the next-left element or the next-right element, whichever yields a higher score when combined with the already-computed results for the remaining operations.

## C# Solution

```csharp
public class Solution
{
    public int MaximumScore(int[] nums, int[] multipliers)
    {
        int n = nums.Length, m = multipliers.Length;
        int[] curr = new int[m + 1];

        for (int opIdx = m - 1; opIdx >= 0; opIdx--)
        {
            int[] next = new int[m + 1];
            for (int left = opIdx; left >= 0; left--)
            {
                int right = n - 1 - (opIdx - left);
                int takeLeft = multipliers[opIdx] * nums[left] + curr[left + 1];
                int takeRight = multipliers[opIdx] * nums[right] + curr[left];
                next[left] = Math.Max(takeLeft, takeRight);
            }
            curr = next;
        }

        return curr[0];
    }
}
```

## Complexity

- **Time:** `O(m^2)`.
- **Space:** `O(m)`.
