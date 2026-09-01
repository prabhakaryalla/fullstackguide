# 3366. Minimum Array Sum

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem
Given an integer array `nums`, an integer `k`, and integers `op1` and `op2`, you may perform two kinds of operations, each usable on any given index at most once total, and with a global cap on the number of times each operation can be used across the whole array:

- **Operation 1** (at most `op1` times total): divide an element by 2, rounding up.
- **Operation 2** (at most `op2` times total): subtract `k` from an element, but only if the element is at least `k`.

Both operations can be applied to the same index (in either order — the order affects the result). Return the minimum possible sum of the array after applying at most `op1` operation-1's and at most `op2` operation-2's.

## Approach
Use a DP over `(remaining op1 uses, remaining op2 uses)`, processing one element of `nums` at a time and updating the whole state table. For each element, consider the four possibilities: use neither operation, use only operation 1, use only operation 2 (if the element is at least `k`), or use both — trying **both orders** for "both" (operation 1 then 2, or operation 2 then 1) since they can yield different final values, and take whichever order is smaller.

## C# Solution

```csharp
public class Solution 
{
    public int MinArraySum(int[] nums, int k, int op1, int op2) 
    {
        int[,] dp = new int[op1 + 1, op2 + 1];

        foreach (int num in nums) 
        {
            int[,] ndp = new int[op1 + 1, op2 + 1];
            for (int a = 0; a <= op1; a++) 
            {
                for (int b = 0; b <= op2; b++) 
                {
                    int best = dp[a, b] + num;

                    if (a > 0) best = Math.Min(best, dp[a - 1, b] + (num + 1) / 2);

                    if (b > 0 && num >= k) best = Math.Min(best, dp[a, b - 1] + (num - k));

                    if (a > 0 && b > 0 && num >= k) 
                    {
                        int afterOp1 = (num + 1) / 2;
                        int op1ThenOp2 = afterOp1 >= k ? afterOp1 - k : afterOp1;
                        int op2ThenOp1 = ((num - k) + 1) / 2;
                        best = Math.Min(best, dp[a - 1, b - 1] + Math.Min(op1ThenOp2, op2ThenOp1));
                    }

                    ndp[a, b] = best;
                }
            }
            dp = ndp;
        }

        return dp[op1, op2];
    }
}
```

## Complexity

- **Time:** O(n * op1 * op2)
- **Space:** O(op1 * op2)
