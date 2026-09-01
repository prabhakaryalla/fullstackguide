# 798. Smallest Rotation with Highest Score

**Difficulty:** Hard
**Category:** Array

## Problem

Given an array `nums`, for a rotation by `k` (each element `nums[i]` moves to index `(i - k + n) % n`), a point is scored for every element whose new index is greater than or equal to its value. Return the smallest rotation `k` that maximizes the total score.

### Example

```
Input: nums = [2,3,1,4,0]
Output: 3
```

## Approach

For each element `nums[i]`, determine the set of rotation values `k` for which it scores a point, and represent that contribution using a difference array over all possible rotations `0` to `n-1`. If `nums[i] <= i`, the element scores for `k` in `[0, i - nums[i]]` (as its new index decreases from `i` down to `nums[i]`) and also for `k` in `[i + 1, n - 1]` (after wrapping around, where its new index becomes large again). If `nums[i] > i`, it only scores after wrapping around, for `k` in `[i + 1, n + i - nums[i]]`. Apply these ranges to a difference array, then sweep through it to find the rotation with the maximum cumulative score, preferring the smallest such rotation on ties (found naturally by only updating on strict improvement while scanning left to right).

## C# Solution

```csharp
public class Solution
{
    public int BestRotation(int[] nums)
    {
        int n = nums.Length;
        var diff = new int[n + 1];

        for (int i = 0; i < n; i++)
        {
            if (nums[i] <= i)
            {
                diff[0]++;
                diff[i - nums[i] + 1]--;
                diff[i + 1]++;
                diff[n]--;
            }
            else
            {
                diff[i + 1]++;
                diff[i - nums[i] + 1 + n]--;
            }
        }

        int bestRotation = 0, bestScore = -1, currentScore = 0;

        for (int k = 0; k < n; k++)
        {
            currentScore += diff[k];

            if (currentScore > bestScore)
            {
                bestScore = currentScore;
                bestRotation = k;
            }
        }

        return bestRotation;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the difference array.
