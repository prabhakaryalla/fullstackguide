# 1929. Concatenation of Array

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given an integer array `nums` of length `n`, return an array `ans` of length `2n` where `ans[i] == nums[i]` and `ans[i + n] == nums[i]` for `0 <= i < n` (i.e., `nums` concatenated with itself).

### Example

```
Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
```

### Constraints

- `n == nums.length`
- `1 <= n <= 1000`
- `1 <= nums[i] <= 1000`

## Approach

Allocate an output array of size `2n` and copy `nums` into both the first half (`ans[i]`) and second half (`ans[i + n]`).

## C# Solution

```csharp
public class Solution
{
    public int[] GetConcatenation(int[] nums)
    {
        int n = nums.Length;
        int[] ans = new int[2 * n];

        for (int i = 0; i < n; i++)
        {
            ans[i] = nums[i];
            ans[i + n] = nums[i];
        }

        return ans;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass to fill the output.
- **Space:** `O(n)` for the output array.
