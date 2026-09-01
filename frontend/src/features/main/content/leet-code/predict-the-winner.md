# 486. Predict the Winner

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Game Theory

## Problem

Given an integer array `nums`, two players take turns picking either the first or last element remaining, adding it to their own score. Return `true` if Player 1 can guarantee a score at least as high as Player 2's, assuming both play optimally.

### Example

```
Input: nums = [1,5,2]
Output: false
```

### Constraints

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 10^7`

## Approach

Use interval dynamic programming where `dp[i][j]` represents the maximum score *difference* the current player can achieve over the opponent when only the subarray `nums[i..j]` remains. Taking `nums[i]` leaves the opponent with `nums[i+1..j]` (contributing `-dp[i+1][j]` to the difference from the current player's perspective), and similarly for taking `nums[j]`; the current player picks whichever choice maximizes this difference. Player 1 wins or ties exactly when `dp[0][n-1] >= 0`.

## C# Solution

```csharp
public class Solution
{
    public bool PredictTheWinner(int[] nums)
    {
        int n = nums.Length;
        var dp = new int[n, n];

        for (int i = 0; i < n; i++)
            dp[i, i] = nums[i];

        for (int len = 2; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;
                dp[i, j] = Math.Max(nums[i] - dp[i + 1, j], nums[j] - dp[i, j - 1]);
            }
        }

        return dp[0, n - 1] >= 0;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP table.
