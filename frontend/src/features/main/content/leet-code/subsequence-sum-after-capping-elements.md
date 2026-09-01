# 3685. Subsequence Sum After Capping Elements

**Difficulty:** Medium
**Category:** Array, Two Pointers, Dynamic Programming, Sorting

## Problem

You are given an integer array `nums` of size `n` and a positive integer `k`.

An array capped by value `x` is obtained by replacing every element `nums[i]` with `min(nums[i], x)`.

For each integer `x` from `1` to `n`, determine whether it is possible to choose a subsequence from the array capped by `x` such that the sum of the chosen elements is exactly `k`.

Return a 0-indexed boolean array `answer` of size `n`, where `answer[i]` is `true` if it is possible when using `x = i + 1`, and `false` otherwise.

### Example

```
Input: nums = [4,3,2,4], k = 5
Output: [false,false,true,true]
```

### Constraints

- `1 <= n == nums.length <= 4000`
- `1 <= nums[i] <= n`
- `1 <= k <= 4000`

## Approach

Since `1 <= nums[i] <= n`, as the cap `x` grows from `1` to `n`, the set of elements left *unchanged* by the cap (those with original value `<= x`) only grows. Process `x` from `1` to `n`, and just before evaluating `x`, add every element whose original value equals `x` into a subset-sum DP (`dp[s]` = can some subset of the "unchanged" elements sum to `s`), using standard 0/1 knapsack updates. The remaining elements (those with original value `> x`) all get capped to exactly `x`, and any number `m` of them (from `0` up to how many remain) can be added to a chosen subset sum. For each `x`, check whether `dp[k - m * x]` is true for some `m` in `[0, remainingCount]` — iterating `m` this way costs only `O(k / x)`, so summed over all `x` this is `O(k log n)`.

## C# Solution

```csharp
public class Solution
{
    public bool[] SubsequenceSumAfterCapping(int[] nums, int k)
    {
        int n = nums.Length;
        List<int>[] byValue = new List<int>[n + 1];
        for (int v = 0; v <= n; v++)
        {
            byValue[v] = new List<int>();
        }
        foreach (int v in nums)
        {
            byValue[v].Add(v);
        }

        bool[] dp = new bool[k + 1];
        dp[0] = true;

        int remainingAboveX = n;
        bool[] answer = new bool[n];

        for (int x = 1; x <= n; x++)
        {
            foreach (int v in byValue[x])
            {
                for (int s = k; s >= v; s--)
                {
                    if (dp[s - v])
                    {
                        dp[s] = true;
                    }
                }
                remainingAboveX--;
            }

            bool possible = false;
            for (int m = 0; m <= remainingAboveX && m * x <= k; m++)
            {
                int need = k - m * x;
                if (dp[need])
                {
                    possible = true;
                    break;
                }
            }

            answer[x - 1] = possible;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n * k)` for the knapsack updates, dominating the `O(k log n)` cap-checking loops.
- **Space:** `O(k)` for the DP array.
